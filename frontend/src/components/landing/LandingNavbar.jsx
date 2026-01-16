import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingNavbar = () => {
    const navigate = useNavigate();

    return (
        <AppBar position="absolute" color="transparent" elevation={0} sx={{ pt: 2 }}>
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    {/* Logo */}
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            flexGrow: 0,
                            fontWeight: 800,
                            color: '#1e293b',
                            mr: 4,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                        }}
                        onClick={() => navigate('/')}
                    >
                        <Box sx={{ width: 24, height: 24, bgcolor: '#6366f1', borderRadius: '6px' }} />
                        TaskMaster
                    </Typography>

                    {/* Centered Links (Hidden on mobile for now, can add drawer later) */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', gap: 4 }}>
                        {['Products', 'Solutions', 'Resources', 'Pricing'].map((item) => (
                            <Button
                                key={item}
                                sx={{
                                    color: '#64748b',
                                    textTransform: 'none',
                                    fontWeight: 500,
                                    '&:hover': { color: '#1e293b', bgcolor: 'transparent' }
                                }}
                            >
                                {item}
                            </Button>
                        ))}
                    </Box>

                    {/* Right Side Buttons */}
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button
                            variant="contained"
                            sx={{
                                bgcolor: '#1e293b',
                                color: 'white',
                                textTransform: 'none',
                                borderRadius: '8px',
                                fontWeight: 600,
                                '&:hover': { bgcolor: '#0f172a' }
                            }}
                            onClick={() => navigate('/register')}
                        >
                            Get Started
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default LandingNavbar;
