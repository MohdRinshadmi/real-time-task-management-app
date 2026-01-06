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
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/auth/authService';
import { LogoIcon } from '../../assets/svgIcon/headerIcon';
import { toast } from 'react-toastify';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    password: '',
    company: '',
    industry: '',
    phoneNumber: '',
    privacyAccepted: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  // Centralized validation function
  const validateFields = (fields) => {
    const newErrors = {};
    Object.entries(fields).forEach(([key, value]) => {
      if (key === 'firstName' && !value.trim()) newErrors.firstName = 'First name is required';
      if (key === 'email') {
        if (!value.trim() || value === '') newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(value)) newErrors.email = 'Email is invalid';
      }
      if (key === 'password' && (!value || value.length < 6)) newErrors.password = 'Password must be at least 6 characters';
      if (key === 'phoneNumber' && !value.trim()) newErrors.phoneNumber = 'Phone number is required';
      if (key === 'privacyAccepted' && !value) newErrors.privacyAccepted = 'You must accept the privacy policy';
    });
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    const updatedFormData = { ...formData, [name]: fieldValue };
    setFormData(updatedFormData);

    // Validate only the changed field
    const fieldError = validateFields({ [name]: fieldValue });
    setErrors({ ...errors, [name]: fieldError[name] || '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateFields(formData);
    setErrors(newErrors);
    // if (Object.keys(newErrors).length > 0) {
    //   toast.error('Please fill in all required fields and accept the privacy policy');
    //   return;
    // }
    try {
      await registerUser(formData);
      toast.success('Registration successful!');
      navigate('/login');
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
        {/* Left Side - Dark Branding */}
        <Box
          sx={{
            flex: 1,
            bgcolor: '#0F172A', // Dark Slate (Matches Dashboard Title Color)
            color: 'white',
            p: { xs: 4, md: 8 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            backgroundImage: 'radial-gradient(circle at top right, #1E293B 0%, #0F172A 40%)'
          }}
        >
          {/* Logo */}
          <Box sx={{ display: 'flex', items: 'center', gap: 2, mb: 4 }}>
            <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-xl text-white">
               <LogoIcon className="w-6 h-6" />
            </div>
            <Typography variant="h6" fontWeight="bold" sx={{ letterSpacing: '0.5px' }}>
              CollabNow
            </Typography>
          </Box>

          {/* Main Text */}
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

          {/* Testimonial Card */}
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

          {/* Decorative Circles */}
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

        {/* Right Side - Registration Form */}
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

            {/* Account Type Toggle */}
            {/* <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
              <ToggleButtonGroup
                value={accountType}
                exclusive
                onChange={handleAccountTypeChange}
                aria-label="account type"
                sx={{
                  bgcolor: '#F1F5F9',
                  borderRadius: '12px',
                  p: 0.5,
                  '& .MuiToggleButton-root': {
                    border: 'none',
                    borderRadius: '10px',
                    px: 4,
                    py: 1,
                    textTransform: 'none',
                    fontWeight: 600,
                    color: '#64748B',
                    '&.Mui-selected': {
                      bgcolor: '#000',
                      color: 'white',
                      '&:hover': {
                        bgcolor: '#333',
                      }
                    }
                  }
                }}
              >
                <ToggleButton value="merchant">Merchant</ToggleButton>
                <ToggleButton value="agent">Agent</ToggleButton>
              </ToggleButtonGroup>
            </Box> */}

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
                            color: '#5B68F4', // Brand Blue
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
                    <Typography variant="body2" color="error" sx={{  ml: 1.5, fontSize: '0.750rem', mt: 0.5 }}>
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
                      bgcolor: '#000', // Black button to match Dashboard
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
