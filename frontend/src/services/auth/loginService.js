import api from '../../api/api';

export const loginService = async (email, password) => {
  try {
    const data = await api.post('/login', { email, password });
    console.log('loginService', data);
    return data;
  } catch (error) {
    if (error && error.message) {
      console.error('Login failed:', error.message);
    } else {
      console.error('Login failed:', error);
    }
    // Optionally, return a default value or a more descriptive error object
    return { success: false, error: error?.message || 'Unknown error' };
  }
};
