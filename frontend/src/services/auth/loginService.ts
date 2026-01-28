import API from '../../api/api';
import { AuthResponse } from '../../types';

export const loginService = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const data = await API.post<any, AuthResponse>('/login', { email, password });
    console.log('loginService', data);
    return data;
  } catch (error: any) {
    console.log('Login failed:', error);
    throw error;
  }
};
