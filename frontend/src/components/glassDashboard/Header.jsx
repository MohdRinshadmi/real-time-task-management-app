import React from 'react';
import { Box, Typography, Button, Avatar, Chip, AvatarGroup } from '@mui/material';
import { PersonAdd } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const Header = () => {
    const theme = useTheme();

    return (
        <Box sx={{ mb: 4 }}>
            {/* Breadcrumbs */}
            <Typography sx={{ color: theme.palette.text.secondary, fontSize: '0.875rem', fontWeight: 500, mb: 1, fontFamily: 'Inter, sans-serif' }}>
                Mintify <span style={{ margin: '0 8px' }}>/</span> <span style={{ color: theme.palette.text.primary }}>Enhancing UX</span>
            </Typography>

            {/* Title */}
            <Typography variant="h4" sx={{ fontWeight: 800, color: theme.palette.text.primary, mb: 1, letterSpacing: '-0.02em', fontFamily: 'Inter, sans-serif' }}>
                Enhancing UX
            </Typography>

            {/* Description */}
            <Typography sx={{ color: theme.palette.text.secondary, maxWidth: 600, mb: 3, fontSize: '0.95rem', fontFamily: 'Inter, sans-serif' }}>
                Improving key features to streamline workflows, boost collaboration, and ensure a seamless experience.
            </Typography>

            {/* Meta Info Bar */}
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'flex-start', md: 'center' }, justifyContent: 'space-between', gap: 2, mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography sx={{ color: theme.palette.text.secondary, fontSize: '0.875rem', fontWeight: 500 }}>Timeline:</Typography>
                        <Typography sx={{ color: '#374151', fontSize: '0.875rem', fontWeight: 600 }}>May 9, 2025 - August 18 2025</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography sx={{ color: theme.palette.text.secondary, fontSize: '0.875rem', fontWeight: 500 }}>Status:</Typography>
                        <Chip
                            label="In Progress"
                            size="small"
                            sx={{
                                bgcolor: 'rgba(6, 182, 212, 0.1)',
                                color: '#0891b2',
                                fontWeight: 700,
                                fontSize: '0.75rem',
                                borderRadius: 1,
                                fontFamily: 'Inter, sans-serif'
                            }}
                        />
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography sx={{ color: theme.palette.text.secondary, fontSize: '0.875rem', fontWeight: 500 }}>Assignees:</Typography>
                        <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 28, height: 28, fontSize: '0.75rem' } }}>
                            <Avatar src="https://randomuser.me/api/portraits/men/32.jpg" />
                            <Avatar src="https://randomuser.me/api/portraits/women/44.jpg" />
                            <Avatar src="https://randomuser.me/api/portraits/men/45.jpg" />
                            <Avatar>+2</Avatar>
                        </AvatarGroup>
                    </Box>

                    <Button
                        startIcon={<PersonAdd />}
                        sx={{
                            bgcolor: theme.palette.secondary.main,
                            color: 'white',
                            textTransform: 'none',
                            borderRadius: 2,
                            px: 2,
                            py: 0.5,
                            fontWeight: 600,
                            fontSize: '0.875rem',
                            '&:hover': { bgcolor: '#7c70e7' } // Could also derivative of secondary
                        }}
                    >
                        Invite
                    </Button>
                </Box>
            </Box>

            {/* Navigation Tabs */}
            <Box sx={{ borderBottom: '1px solid rgba(229, 231, 235, 0.5)', display: 'flex', gap: 4 }}>
                <Box
                    sx={{
                        pb: 1.5,
                        borderBottom: `2px solid ${theme.palette.primary.main}`,
                        color: theme.palette.text.primary,
                        fontWeight: 600,
                        cursor: 'pointer',
                        fontSize: '0.9375rem',
                        fontFamily: 'Inter, sans-serif'
                    }}
                >
                    Task Board
                </Box>
                <Box
                    sx={{
                        pb: 1.5,
                        color: theme.palette.text.secondary,
                        fontWeight: 500,
                        cursor: 'pointer',
                        fontSize: '0.9375rem',
                        fontFamily: 'Inter, sans-serif',
                        '&:hover': { color: theme.palette.text.primary }
                    }}
                >
                    Timeline
                </Box>
            </Box>
        </Box>
    );
};
export default Header;
