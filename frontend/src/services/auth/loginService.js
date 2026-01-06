import api from '../../api/api';
import { setAccessToken } from '../../global/localStorage';
import { setLoggedIn } from '../../store/store';

export const loginService = async (email, password, dispatch) => {
  try {
    const { data } = await api.post('/login', { email, password });
    console.log('datattat', data);
    
    if (data.token) {
      setAccessToken(data.token);
    }

    if (dispatch && typeof data.isLoggedIn === 'boolean') {
      dispatch(setLoggedIn(data.isLoggedIn));
    }

    return data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};
