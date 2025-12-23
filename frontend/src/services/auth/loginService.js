import api from '../../api/api';
import { setAccessToken } from '../../global/localStorage';
import { setLoggedIn } from '../../store/store';

/**
 * Login user with email and password
 * @param {string} email
 * @param {string} password
 * @param {function} dispatch - Redux dispatch function
 * @returns {Promise}
 */
export const loginService = async (email, password, dispatch) => {
  try {
    const { data } = await api.post('/login', { email, password });
    console.log('datattat', data);
    
    if (data.data.token) {
      setAccessToken(data.data.token);
    }

    if (dispatch && typeof data.data.isLoggedIn === 'boolean') {
      dispatch(setLoggedIn(data.data.isLoggedIn));
    }

    return data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};
