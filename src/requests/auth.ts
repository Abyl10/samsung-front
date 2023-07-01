import { api } from './api';

export const authLogin = (email: string): Promise<{ message: string }> => {
  return api.post(`/auth/?email=${email}`).then((res) => res.data);
};

export const authCheck = (email: string, code: string): Promise<{ access_token: string }> => {
  return api.post('/auth/check', { email, code }).then((res) => res.data);
};
