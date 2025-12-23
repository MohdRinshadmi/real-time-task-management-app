// src/global/localStorage.js

export const setAccessToken = (token) => {
  localStorage.setItem('access-token', token);
};

export const getAccessToken = () => {
  return localStorage.getItem('access-token');
};

export const removeAccessToken = () => {
  localStorage.removeItem('access-token');
};
