import api from '../../api/api';
import { AuthResponse } from '../../types';

export const loginService = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const data = await api.post<any, AuthResponse>('/login', { email, password });
    console.log('loginService', data);
    return data;
  } catch (error: any) {
    if (error && error.message) {
      console.error('Login failed:', error.message);
    } else {
      console.error('Login failed:', error);
    }
    throw error;
  }
};
