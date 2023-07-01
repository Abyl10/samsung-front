import React, { createContext, useContext, useEffect, useState } from 'react';
import { IUser } from '@/ts/types';

export const initialUserState: IUser = {
  id: 0,
  email: '',
  created_at: '',
};

type UserContextType = {
  user: IUser | null;
  setUser: (user: IUser) => void;
  logout: () => void;
};

export const UserContext = createContext<UserContextType>({
  user: initialUserState,
  setUser: () => null,
  logout: () => null,
});

export const useUserContext = (): UserContextType => useContext(UserContext);

type UserProviderProps = {
  children: React.ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : initialUserState;
  });

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const logout = () => {
    setUser(initialUserState);
  };

  return <UserContext.Provider value={{ user, setUser, logout }}>{children}</UserContext.Provider>;
};
