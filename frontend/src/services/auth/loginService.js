import api from '../../api/api';

export const loginService = async (email, password) => {
  try {
    const data = await api.post('/login', { email, password });
    console.log('loginService', data);
    
    return data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};
