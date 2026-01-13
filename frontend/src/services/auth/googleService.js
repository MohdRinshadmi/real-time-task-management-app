import api from '../../api/api';

// Google OAuth login: get Google auth URL from backend and redirect
export const googleLoginService = async () => {
  try {
    // This endpoint should return the Google OAuth URL or trigger the redirect
    const response = await api.get('/auth-google');
    return response;
  } catch (error) {
    console.error('Google login failed:', error);
    throw error;
  }
};

// Google OAuth callback: exchange code for token (if using code flow)
export const googleCallbackService = async (query) => {
  try {
    // This endpoint should handle the callback and return the JWT token
    const response = await api.get(`/auth/google/callback${query}`);
    return response;
  } catch (error) {
    console.error('Google callback failed:', error);
    throw error;
  }
};
