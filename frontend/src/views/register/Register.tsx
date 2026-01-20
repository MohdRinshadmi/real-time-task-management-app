import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  Grid,
  Avatar,
} from '@mui/material';
import { Visibility, VisibilityOff, Facebook, Apple } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/auth/authService';
import { LogoIcon } from '../../assets/svgIcon/headerIcon';
import { toast } from 'react-toastify';
import { validateRegistrationFields, RegistrationFields, Errors } from '../../validator/emailField';
import { ApiHook } from '../../hooks/apiHook';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/store';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const googleLogin = ApiHook.CallGoogleLogin();
  const [formData, setFormData] = useState<RegistrationFields>({
    firstName: '',
    email: '',
    password: '',
    company: '',
    industry: '',
    phoneNumber: '',
    privacyAccepted: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    const updatedFormData = { ...formData, [name]: fieldValue };
    setFormData(updatedFormData);

    // Validate only the changed field
    const fieldError = validateRegistrationFields({ [name]: fieldValue });
    setErrors({ ...errors, [name]: fieldError[name] || '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateRegistrationFields(formData);
    setErrors(newErrors);
    try {
      const response = await registerUser(formData);
      toast.success('Registration successful!');
      // Store user details in Redux
      if (response && response.data && response.data.user) {
        dispatch(setUser(response.data.user));
      }
      navigate('/dashboard');
    } catch (error) {
      console.log('Registration failed:', error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 md:p-8"
      style={{
        background: 'linear-gradient(180deg, #E6ECFF 0%, #F4F7FF 40%, #FFFFFF 100%)',
      }}
    >
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          width: '100%',
          maxWidth: 1200,
          borderRadius: '32px',
          overflow: 'hidden',
          minHeight: '800px',
          boxShadow: '0 20px 40px rgba(91, 104, 244, 0.1)'
        }}
      >
        <Box
          sx={{
            flex: 1,
            bgcolor: '#0F172A',
            color: 'white',
            p: { xs: 4, md: 8 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            backgroundImage: 'radial-gradient(circle at top right, #1E293B 0%, #0F172A 40%)'
          }}
        >
          <Box sx={{ display: 'flex', items: 'center', gap: 2, mb: 4 }}>
            <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-xl text-white">
              <LogoIcon className="w-6 h-6" />
            </div>
            <Typography variant="h6" fontWeight="bold" sx={{ letterSpacing: '0.5px' }}>
              CollabNow
            </Typography>
          </Box>

          <Box sx={{ mb: 8, position: 'relative', zIndex: 2 }}>
            <Typography variant="h2" fontWeight="600" sx={{ mb: 3, lineHeight: 1.2, fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
              Manage your Tasks <br />
              <span style={{ color: '#8B7FF6' }}>Anywhere</span>
            </Typography>
            <Typography variant="body1" sx={{ color: '#94A3B8', maxWidth: 400, fontSize: '1.1rem', lineHeight: 1.6 }}>
              View all the analytics and grow your business from anywhere!
              Collaborate with your team in real-time.
            </Typography>
          </Box>

          <Box
            sx={{
              bgcolor: 'rgba(30, 41, 59, 0.6)',
              backdropFilter: 'blur(10px)',
              p: 3,
              borderRadius: 4,
              border: '1px solid rgba(139, 127, 246, 0.1)',
              maxWidth: 400
            }}
          >
            <Typography variant="body1" sx={{ mb: 2, fontStyle: 'italic', color: '#E2E8F0' }}>
              "This task management platform is a game-changer! It's easy to use, provides valuable insights, and has helped me make smarter business decisions."
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar src="https://randomuser.me/api/portraits/women/44.jpg" sx={{ width: 48, height: 48, border: '2px solid #5B68F4' }} />
              <Box>
                <Typography variant="subtitle2" fontWeight="bold">Casey Bachmeyer</Typography>
                <Typography variant="caption" sx={{ color: '#94A3B8' }}>Founder, StayPlus Ventures</Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{
            position: 'absolute',
            top: '20%',
            right: '-10%',
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(91, 104, 244, 0.15) 0%, rgba(0,0,0,0) 70%)',
            pointerEvents: 'none'
          }} />
        </Box>

        <Box
          sx={{
            flex: 1,
            bgcolor: 'white',
            p: { xs: 4, md: 8 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 480 }}>
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 4, textAlign: 'center', color: '#111827' }}>
              Create an account
            </Typography>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                    InputProps={{
                      sx: { borderRadius: 3, bgcolor: '#F9FAFB', '& fieldset': { border: 'none' } }
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="email"
                    type="email"
                    placeholder="E-mail"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    InputProps={{
                      sx: { borderRadius: 3, bgcolor: '#F9FAFB', '& fieldset': { border: 'none' } }
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="phoneNumber"
                    placeholder="Phone number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber}
                    InputProps={{
                      sx: { borderRadius: 3, bgcolor: '#F9FAFB', '& fieldset': { border: 'none' } }
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    error={!!errors.password}
                    helperText={errors.password}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                      sx: { borderRadius: 3, bgcolor: '#F9FAFB', '& fieldset': { border: 'none' } }
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="privacyAccepted"
                        checked={formData.privacyAccepted}
                        onChange={handleChange}
                        sx={{
                          color: '#CBD5E1',
                          '&.Mui-checked': {
                            color: '#5B68F4',
                          },
                        }}
                      />
                    }
                    label={
                      <Typography variant="body2" color="text.secondary">
                        I accept the <span style={{ fontWeight: 600, color: '#0F172A' }}>Privacy Policy</span>
                      </Typography>
                    }
                  />
                  {errors.privacyAccepted && (
                    <Typography variant="body2" color="error" sx={{ ml: 1.5, fontSize: '0.750rem', mt: 0.5 }}>
                      {errors.privacyAccepted}
                    </Typography>
                  )}
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    sx={{
                      mt: 2,
                      py: 1.8,
                      borderRadius: 3,
                      bgcolor: '#000',
                      color: 'white',
                      textTransform: 'none',
                      fontSize: '1rem',
                      fontWeight: 600,
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      '&:hover': {
                        bgcolor: '#333',
                        transform: 'translateY(-1px)',
                        boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
                      },
                      transition: 'all 0.2s ease'
                    }}
                  >
                    Create an Account
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ mt: 3, mb: 1, display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ flex: 1, height: '1px', bgcolor: '#E2E8F0' }} />
                    <Typography variant="caption" sx={{ px: 2, color: '#94A3B8', fontWeight: 500 }}>
                      Or sign in with
                    </Typography>
                    <Box sx={{ flex: 1, height: '1px', bgcolor: '#E2E8F0' }} />
                  </Box>

                  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 2 }}>
                    <Button
                      sx={{
                        flex: 1,
                        py: 1.5,
                        borderRadius: 3,
                        bgcolor: 'rgba(255, 255, 255, 0.8)',
                        border: '1px solid rgba(226, 232, 240, 0.8)',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                        backdropFilter: 'blur(8px)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
                          bgcolor: 'rgba(255, 255, 255, 0.95)',
                          borderColor: '#DB4437',
                        },
                      }}
                      onClick={googleLogin}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.12c-.22-.66-.35-1.36-.35-2.12s.13-1.46.35-2.12V7.04H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.96l3.66-2.84z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.04l3.66 2.84c.87-2.6 3.3-4.5 6.16-4.5z" fill="#EA4335" />
                      </svg>
                      <span style={{ marginLeft: 8, color: '#111827', fontWeight: 600 }}>Google</span>
                    </Button>
                    <Button
                      sx={{
                        flex: 1,
                        py: 1.5,
                        borderRadius: 3,
                        bgcolor: 'rgba(255, 255, 255, 0.8)',
                        border: '1px solid rgba(226, 232, 240, 0.8)',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                        backdropFilter: 'blur(8px)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
                          bgcolor: 'rgba(255, 255, 255, 0.95)',
                          borderColor: '#1877F2',
                        },
                      }}
                    >
                      <Facebook sx={{ fontSize: 24, color: '#1877F2' }} />
                      <span style={{ marginLeft: 8, color: '#111827', fontWeight: 600 }}>Facebook</span>
                    </Button>
                    <Button
                      sx={{
                        flex: 1,
                        py: 1.5,
                        borderRadius: 3,
                        bgcolor: 'rgba(255, 255, 255, 0.8)',
                        border: '1px solid rgba(226, 232, 240, 0.8)',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                        backdropFilter: 'blur(8px)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
                          bgcolor: 'rgba(255, 255, 255, 0.95)',
                          borderColor: 'black',
                        },
                      }}
                    >
                      <Apple sx={{ fontSize: 24, color: 'black' }} />
                      <span style={{ marginLeft: 8, color: '#111827', fontWeight: 600 }}>Apple</span>
                    </Button>
                  </Box>
                </Grid>
              </Grid>

              <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Typography variant="body2" color="text.secondary">
                  Already have an account?{' '}
                  <Box
                    component="span"
                    sx={{
                      color: '#5B68F4',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 0.5,
                      '&:hover': { textDecoration: 'underline' }
                    }}
                    onClick={() => navigate('/login')}
                  >
                    Log In <span style={{ fontSize: '1.2em' }}>→</span>
                  </Box>
                </Typography>
              </Box>
            </form>
          </Box>
        </Box>
      </Paper>
    </div>
  );
};

export default Register;
