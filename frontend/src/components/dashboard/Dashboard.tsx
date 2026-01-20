import { useState } from 'react';
import {
  Box,
  Typography,
  TextField
} from '@mui/material';
import BrandShowCase from './BrandShowCase';
import StatsSection from './StatsSection';
import ApiHook from '../../hooks/apiHook';
import HeroSection from './HeroSection';

const Dashboard = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPasswordField, setShowPasswordField] = useState(false);
  const loginMutation = ApiHook.CallLoginUser();

  const handleLogin = async () => {
    await loginMutation.mutateAsync({ email, password });
  };

  return (
    <div className="min-h-screen p-4 md:p-8" style={{ background: 'linear-gradient(180deg, #E6ECFF 0%, #F4F7FF 40%, #FFFFFF 100%)' }}>
      <Box sx={{ width: { xs: '95%', sm: '90%', md: '80%' }, mx: 'auto', mt: { xs: 2, md: 6 }, px: { xs: 1, md: 0 } }}>
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 10 } }}>
          <Box sx={{ position: 'relative', textAlign: 'center', mb: { xs: 6, md: 10 }, minHeight: { xs: 'auto', md: 320 } }}>
            {/* Top left note */}
            <div className="hidden md:flex" style={{ position: 'absolute', left: 0, top: 30, display: 'flex', alignItems: 'center', zIndex: 2 }}>
              <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 8px 32px 0 rgba(91,104,244,0.10), 0 2px 8px #e0e7ff', padding: '6px 16px', fontSize: 14, fontWeight: 500, color: '#5976c2', border: '1px solid #e0e7ff', transform: 'translateY(-18px)', transition: 'box-shadow 0.3s, transform 0.3s' }}>
                <span role="img" aria-label="file">📤</span> Sending a file project
              </div>
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="avatar" style={{ width: 32, height: 32, borderRadius: '50%', marginLeft: 8, border: '2px solid #fff', boxShadow: '0 1px 4px #c7d2fe' }} />
            </div>

            {/* Top right note */}
            <div className="hidden md:flex" style={{ position: 'absolute', right: 0, top: 40, display: 'flex', alignItems: 'center', zIndex: 2 }}>
              <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px #e0e7ff', padding: '6px 16px', fontSize: 14, fontWeight: 500, color: '#5B68F4', border: '1px solid #e0e7ff' }}>
                <span role="img" aria-label="calendar">📅</span> Schedule a meeting
              </div>
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="avatar" style={{ width: 32, height: 32, borderRadius: '50%', marginLeft: 8, border: '2px solid #fff', boxShadow: '0 1px 4px #c7d2fe' }} />
            </div>

            {/* Bottom left note */}
            <div className="hidden md:flex" style={{ position: 'absolute', left: 40, bottom: 10, display: 'flex', alignItems: 'center', zIndex: 2 }}>
              <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px #e0e7ff', padding: '6px 16px', fontSize: 14, fontWeight: 500, color: '#5B68F4', border: '1px solid #e0e7ff' }}>
                <span role="img" aria-label="video">💻</span> Virtual conferencing
              </div>
              <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="avatar" style={{ width: 32, height: 32, borderRadius: '50%', marginLeft: 8, border: '2px solid #fff', boxShadow: '0 1px 4px #c7d2fe' }} />
            </div>

            {/* Bottom right note */}
            <div className="hidden md:flex" style={{ position: 'absolute', right: 40, bottom: 20, display: 'flex', alignItems: 'center', zIndex: 2 }}>
              <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px #e0e7ff', padding: '6px 16px', fontSize: 14, fontWeight: 500, color: '#5B68F4', border: '1px solid #e0e7ff' }}>
                <span role="img" aria-label="progress">📈</span> Tracking the progress of a project
              </div>
              <img src="https://randomuser.me/api/portraits/women/55.jpg" alt="avatar" style={{ width: 32, height: 32, borderRadius: '50%', marginLeft: 8, border: '2px solid #fff', boxShadow: '0 1px 4px #c7d2fe' }} />
            </div>

            {/* Center lines (decorative) */}
            <svg className="hidden md:block" width="100%" height="320" style={{ position: 'absolute', left: 0, top: 0, zIndex: 1, pointerEvents: 'none' }}>
              <line x1="10%" y1="60" x2="50%" y2="100" stroke="#c7d2fe" strokeWidth="2" strokeDasharray="6 6" />
              <line x1="90%" y1="80" x2="50%" y2="100" stroke="#c7d2fe" strokeWidth="2" strokeDasharray="6 6" />
              <line x1="15%" y1="270" x2="50%" y2="180" stroke="#c7d2fe" strokeWidth="2" strokeDasharray="6 6" />
              <line x1="85%" y1="290" x2="50%" y2="180" stroke="#c7d2fe" strokeWidth="2" strokeDasharray="6 6" />
            </svg>

            {/* Title Line 1 */}
            <Typography
              variant="h3"
              sx={{
                fontWeight: 500,
                fontSize: { xs: '1.75rem', sm: '2.3rem', md: '3.2rem' },
                color: '#0F172A',
                mb: 1,
                position: 'relative',
                zIndex: 3,
                px: { xs: 2, md: 0 },
              }}
            >
              Empower Your Team with
            </Typography>

            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                zIndex: 3,
                gap: { xs: 1, sm: 2 },
                px: { xs: 2, md: 0 },
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  display: 'inline-block',
                  border: '2px dashed #8B7FF6',
                  borderRadius: '12px',
                  padding: { xs: '4px 20px', md: '4px 28px' },
                  background: '#CBD4FD',
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 500,
                    fontSize: { xs: '1.75rem', sm: '2.3rem', md: '3.2rem' },
                    background: 'linear-gradient(90deg, #5B68F4 0%, #8B7FF6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Seamless
                </Typography>

                {/* Curved arrow icon - bottom left corner - hidden on mobile */}
                <Box
                  component="svg"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  sx={{
                    display: { xs: 'none', md: 'block' },
                    width: 32,
                    height: 32,
                    position: 'absolute',
                    top: 58,
                    left: -18
                  }}
                >
                  <defs>
                    <style>{".cls-1{fill:#5f7cf9;}.cls-2{fill:#5f7cf9;}"}</style>
                  </defs>
                  <g data-name="Arrow">
                    <path
                      className="cls-1"
                      d="M27.71,4.29a1,1,0,0,0-1.14-.19l-23,11A1,1,0,0,0,4,17H15V28a1,1,0,0,0,.78,1L16,29a1,1,0,0,0,.9-.57l11-23A1,1,0,0,0,27.71,4.29Z"
                    />
                    <path
                      className="cls-2"
                      d="M15,28a1,1,0,0,0,.78,1L16,29a1,1,0,0,0,.9-.57l11-23a1,1,0,0,0-.19-1.14L15,17Z"
                    />
                  </g>
                </Box>
              </Box>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 500,
                  fontSize: { xs: '1.75rem', sm: '2.3rem', md: '3rem' },
                  color: '#000',
                }}
              >
                Collaboration
              </Typography>
            </Box>

            {/* Subtitle */}
            <Typography
              color="text.secondary"
              sx={{
                opacity: 0.85,
                mt: 2,
                fontSize: { xs: '0.875rem', md: '1rem' },
                position: 'relative',
                zIndex: 3,
                px: { xs: 2, md: 0 },
              }}
            >
              Bring your team together to plan, track, and manage tasks in real-time.
            </Typography>

            {/* Email Signup Form */}
            <Box
              sx={{
                mt: 4,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                maxWidth: { xs: '100%', sm: 400 },
                mx: 'auto',
                px: { xs: 2, md: 0 },
                position: 'relative',
                zIndex: 3,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: { xs: 1.5, sm: 2 },
                  alignItems: 'stretch',
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(139, 127, 246, 0.2)',
                  borderRadius: { xs: 16, sm: 24 },
                  padding: { xs: '8px', sm: '6px' },
                  boxShadow: '0 4px 12px rgba(91, 104, 244, 0.08)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: 'rgba(139, 127, 246, 0.4)',
                    boxShadow: '0 6px 16px rgba(91, 104, 244, 0.12)',
                  },
                  '&:focus-within': {
                    borderColor: '#8B7FF6',
                    boxShadow: '0 0 0 3px rgba(139, 127, 246, 0.1)',
                    background: 'rgba(255, 255, 255, 1)',
                  },
                }}
              >
                <TextField
                  fullWidth
                  placeholder="Enter your email address"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (e.target.value.trim() !== '') {
                      setShowPasswordField(true);
                    } else {
                      setShowPasswordField(false);
                      setPassword('');
                    }
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '24px',
                      boxShadow: 'none',
                      '& fieldset': {
                        border: 'none',
                      },
                    },
                    '& input': {
                      padding: { xs: '10px 12px', sm: '8px 12px' },
                      fontSize: { xs: '0.875rem', sm: '0.95rem' },
                    },
                  }}
                />
                {!showPasswordField && (
                  <Box
                    component="button"
                    sx={{
                      background: '#000',
                      border: 'none',
                      color: 'white',
                      padding: { xs: '12px 24px', sm: '12px 20px' },
                      borderRadius: { xs: 16, sm: 24 },
                      fontWeight: 600,
                      cursor: 'pointer',
                      fontSize: { xs: '0.875rem', sm: '0.800rem' },
                      whiteSpace: 'nowrap',
                      transition: 'all 0.3s ease',
                      minWidth: { xs: '100%', sm: '110px' },
                      '&:hover': {
                        transform: 'scale(1.02)',
                      },
                    }}
                  >
                    Get Started
                  </Box>
                )}
              </Box>

              {/* Password field - shows when email is entered */}
              {showPasswordField && (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: { xs: 1.5, sm: 2 },
                    alignItems: 'stretch',
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(139, 127, 246, 0.2)',
                    borderRadius: { xs: 16, sm: 24 },
                    padding: { xs: '8px', sm: '4px' },
                    boxShadow: '0 4px 12px rgba(91, 104, 244, 0.08)',
                    transition: 'all 0.3s ease',
                    animation: 'fadeInUp 0.4s ease-out',
                    '&:hover': {
                      borderColor: 'rgba(139, 127, 246, 0.4)',
                      boxShadow: '0 6px 16px rgba(91, 104, 244, 0.12)',
                    },
                    '&:focus-within': {
                      borderColor: '#8B7FF6',
                      boxShadow: '0 0 0 3px rgba(139, 127, 246, 0.1)',
                      background: 'rgba(255, 255, 255, 1)',
                    },
                    '@keyframes fadeInUp': {
                      from: {
                        opacity: 0,
                        transform: 'translateY(10px)',
                      },
                      to: {
                        opacity: 1,
                        transform: 'translateY(0)',
                      },
                    },
                  }}
                >
                  <TextField
                    fullWidth
                    placeholder="Enter your password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '24px',
                        boxShadow: 'none',
                        '& fieldset': {
                          border: 'none',
                        },
                      },
                      '& input': {
                        padding: { xs: '10px 12px', sm: '8px 12px' },
                        fontSize: { xs: '0.875rem', sm: '0.95rem' },
                      },
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleLogin();
                    }}
                    disabled={loginMutation.isPending}
                  />
                  <Box
                    component="button"
                    sx={{
                      background: '#000',
                      border: 'none',
                      color: 'white',
                      padding: { xs: '12px 24px', sm: '12px 20px' },
                      borderRadius: { xs: 16, sm: 24 },
                      fontWeight: 600,
                      cursor: loginMutation.isPending ? 'not-allowed' : 'pointer',
                      fontSize: { xs: '0.875rem', sm: '0.800rem' },
                      whiteSpace: 'nowrap',
                      transition: 'all 0.3s ease',
                      minWidth: { xs: '100%', sm: '110px' },
                      opacity: loginMutation.isPending ? 0.7 : 1,
                      '&:hover': {
                        transform: loginMutation.isPending ? 'none' : 'scale(1.02)',
                      },
                    }}
                    onClick={handleLogin}
                    disabled={loginMutation.isPending}
                  >
                    {loginMutation.isPending ? 'Logging in...' : 'Get Started'}
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Box>

        <HeroSection />

        <BrandShowCase />

        <StatsSection />
      </Box>
    </div>
  );
};

export default Dashboard;
