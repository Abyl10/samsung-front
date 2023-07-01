export const setToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const removeTokens = () => {
  localStorage.removeItem('token');
};

export const getToken = () => {
  return localStorage.getItem('token');
};
