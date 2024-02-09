import { api } from './api';
import { IUser } from '@/ts/types';

export const getUserProfile = (): Promise<IUser> => {
  return api.get('/profile/').then((res) => res.data);
};
