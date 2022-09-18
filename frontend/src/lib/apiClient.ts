import axios from 'axios';
import aspida from '@aspida/axios';
import api from '../api/$api';

axios.interceptors.request.use((config) => {
    // 末尾にスラッシュなかったら追加
    if (config.url && config.url[config.url.length - 1] !== '/') {
        config.url += '/';
    }
    return config;
});

// axios.defaults.headers.post['Content-Type'] = 'application/json';

export const apiClient = api(aspida(axios, {baseURL: process.env.NEXT_PUBLIC_API_URI}));
