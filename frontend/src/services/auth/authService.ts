import API from '../../api/api';

export const registerUser = async (userData: any) => {
  try {
    const response = await API.post('/register', userData);
    console.log('response of register user', response);

    return response.data;
  } catch (error) {
    console.log('Error registering user:', error);
    throw error;
  }
};