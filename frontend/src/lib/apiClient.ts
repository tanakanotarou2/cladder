import axios from 'axios';
import aspida from '@aspida/axios';
import api from '../api/$api';
import { addMinutes, compareAsc } from 'date-fns';

const SAFE_METHODS = ['GET', 'HEAD', 'OPTIONS', 'TRACE']; // RFC7231
const appendSlash = (url: string | undefined) => {
  if (url && url[url.length - 1] !== '/') return url + '/';
  return url;
};

export const apiClient = api(aspida(axios,
  {
    baseURL: process.env.NEXT_PUBLIC_API_URI,
    withCredentials: true,
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  }));


let _csrfToken: string | null = null;
/**
 * CSRFトークンの取得
 */
const getCsrfToken = async () => {
  if (_csrfToken) return _csrfToken!;
  const res = await apiClient.csrf.$get();
  // @ts-ignore
  _csrfToken = res['csrfToken'];
  return _csrfToken!;
};


/**
 * トークンのリフレッシュ
 * アクセストークンの有効期限が短ければ、リフレッシュする
 */
const refreshToken = async () => {
  const expiredAt = localStorage.getItem('tokenExpireAt');
  if (!expiredAt) return;

  const expireAt = new Date(Number(expiredAt));
  const dt = addMinutes(new Date(), 5); // offset. 有効期限切れがこれより短ければリフレッシュする

  if (compareAsc(expireAt, dt) <= 0) {
    localStorage.removeItem('tokenExpireAt');

    // @ts-ignore
    const res = await apiClient.token.refresh.$post({ body: {} }).catch(reason => {
      console.log('raise error');
      console.log(reason);
      localStorage.setItem('tokenExpireAt', expiredAt);

      return false;
    });
    // @ts-ignore
    localStorage.setItem('tokenExpireAt', new Date(res['access_token_expiration']).getTime());
    return true;
  }
};

const EXCLUDE_REFRESH_PATHS = [
  appendSlash(apiClient.token.refresh.$path())!,
  appendSlash(apiClient.login.$path())!,
  appendSlash(apiClient.csrf.$path())!,
];

axios.interceptors.request.use(async (config) => {
  const isAppApiRequest = appendSlash(config.baseURL) == appendSlash(process.env.NEXT_PUBLIC_API_URI);

  if (isAppApiRequest) {
    // 末尾にスラッシュなかったら追加
    config.url = appendSlash(config.url) || '';

    if (EXCLUDE_REFRESH_PATHS.every(s => !s.endsWith(config.url!))) {
      await refreshToken();
    }
    const headers = Object.assign({}, config['headers']);

    // CSRFトークンの追加
    const isUnsafe = !SAFE_METHODS.includes(config.method?.toUpperCase() || '');
    if (isUnsafe) {
      headers['X-CSRFToken'] = await getCsrfToken();
    }
    config['headers'] = headers;
  }

  return config;
});
