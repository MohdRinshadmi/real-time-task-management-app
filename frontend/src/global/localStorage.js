export const setAccessToken = (token) => {
  console.log('set access token', token);
  
  localStorage.setItem('access-token', token);
};

export const getAccessToken = () => {
  return localStorage.getItem('access-token');
};

export const removeAccessToken = () => {
  localStorage.removeItem('access-token');
};
