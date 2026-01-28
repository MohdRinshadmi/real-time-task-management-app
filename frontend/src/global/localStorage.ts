const ACCESS_TOKEN_KEY = 'access-token' as const;
export const setAccessToken = (token: string): void => {
  console.log('set access token', token);
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};


export const removeAccessToken = (): void => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
};


export const isAuthenticated = (): boolean => {
  return getAccessToken() !== null;
};

