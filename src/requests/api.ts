import axios from 'axios';
import { getToken, removeTokens } from '@/utils/token';

export const api = axios.create({
  baseURL: 'https://user.yui-chan.com/api',
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if ([401].includes(error.response.status)) {
      removeTokens();
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

export default api;
