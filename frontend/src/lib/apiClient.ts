import axios from 'axios';
import aspida from '@aspida/axios';
import api from '../api/$api';

const SAFE_METHODS = ['GET', 'HEAD', 'OPTIONS', 'TRACE']; // RFC7231


// axios.defaults.headers.post['Content-Type'] = 'application/json';

export const apiClient = api(aspida(axios,
  {
    baseURL: process.env.NEXT_PUBLIC_API_URI,
    withCredentials: true,
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  }));

/**
 * CSRFトークンの取得
 */
const getCsrfToken = async () => {
  const res = await apiClient.csrf.$get();
  // @ts-ignore
  return res['csrfToken'];
};

const appendSlash = (url: string | undefined) => {
  if (url && url[url.length - 1] !== '/') return url + '/';
  return url;
};

axios.interceptors.request.use(async (config) => {
  console.log(config.baseURL, process.env.NEXT_PUBLIC_API_URI);
  const isAppApiRequest = appendSlash(config.baseURL) == appendSlash(process.env.NEXT_PUBLIC_API_URI);
  if (isAppApiRequest) {
    // 末尾にスラッシュなかったら追加
    config.url = appendSlash(config.url);
    const headers = Object.assign({}, config['headers']);

    // CSRFトークンの追加
    const isUnsafe = !SAFE_METHODS.includes(config.method?.toUpperCase() || '');
    if (isUnsafe) {
      const csrfToken = await getCsrfToken();
      headers['X-CSRFToken'] = csrfToken;
    }
    console.log(headers);

    config['headers'] = headers;
  }

  return config;
});
