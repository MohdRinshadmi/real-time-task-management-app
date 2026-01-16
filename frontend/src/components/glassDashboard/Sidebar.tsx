
import { useTheme, alpha } from '@mui/material/styles';
import {
    Dashboard as DashboardIcon,
    Inbox,
    CalendarToday,
    Settings,
    Folder,
    Add,
    KeyboardArrowDown,
    Bolt
} from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

const Sidebar = () => {
    const theme = useTheme();


    const menuItems = [
        { icon: <DashboardIcon fontSize="small" />, label: 'Dashboard', active: false },
        { icon: <Inbox fontSize="small" />, label: 'Inbox', badge: 5, active: false },
    ];

    const generalItems = [
        { icon: <CalendarToday fontSize="small" />, label: 'Calendar' },
        { icon: <Settings fontSize="small" />, label: 'Settings' },
    ];

    const workspaces = ['Mintify', 'Superfast', 'Nimblefy'];

    return (
        <Box
            sx={{
                width: 250,
                height: '100vh',
                position: 'sticky',
                top: 0,
                display: { xs: 'none', md: 'flex' },
                flexDirection: 'column',
                p: 3,
                borderRight: '1px solid rgba(255, 255, 255, 0.3)',
                background: 'rgba(255, 255, 255, 0.6)',
                backdropFilter: 'blur(12px)',
                zIndex: 50,
            }}
        >
            {/* Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 6 }}>
                <Box
                    sx={{
                        width: 32,
                        height: 32,
                        bgcolor: theme.palette.secondary.main,
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                    }}
                >
                    <Bolt fontSize="small" />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.text.primary, fontFamily: 'Inter, sans-serif' }}>
                    Kaizen
                </Typography>
            </Box>

            {/* Main Menu */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 4 }}>
                {menuItems.map((item) => (
                    <Box
                        key={item.label}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            p: 1.5,
                            borderRadius: 3,
                            cursor: 'pointer',
                            color: item.active ? theme.palette.primary.main : theme.palette.text.secondary,
                            bgcolor: item.active ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
                            transition: 'all 0.2s',
                            '&:hover': {
                                bgcolor: alpha(theme.palette.primary.main, 0.05),
                                color: theme.palette.text.primary
                            }
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            {item.icon}
                            <Typography sx={{ fontSize: '0.9375rem', fontWeight: 500, fontFamily: 'Inter, sans-serif' }}>
                                {item.label}
                            </Typography>
                        </Box>
                        {item.badge && (
                            <Box
                                sx={{
                                    bgcolor: '#FF5C5C',
                                    color: 'white',
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    width: 20,
                                    height: 20,
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                {item.badge}
                            </Box>
                        )}
                    </Box>
                ))}
            </Box>

            {/* General */}
            <Typography sx={{ fontSize: '0.75rem', color: theme.palette.text.secondary, fontWeight: 600, mb: 2, px: 1.5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                General
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 4 }}>
                {generalItems.map((item) => (
                    <Box
                        key={item.label}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                            p: 1.5,
                            borderRadius: 3,
                            cursor: 'pointer',
                            color: theme.palette.text.secondary,
                            transition: 'all 0.2s',
                            '&:hover': {
                                bgcolor: alpha(theme.palette.primary.main, 0.05),
                                color: theme.palette.text.primary
                            }
                        }}
                    >
                        {item.icon}
                        <Typography sx={{ fontSize: '0.9375rem', fontWeight: 500, fontFamily: 'Inter, sans-serif' }}>
                            {item.label}
                        </Typography>
                    </Box>
                ))}
            </Box>

            {/* Workspaces */}
            <Typography sx={{ fontSize: '0.75rem', color: theme.palette.text.secondary, fontWeight: 600, mb: 2, px: 1.5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Workspace
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {workspaces.map((ws) => (
                    <Box
                        key={ws}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            p: 1.5,
                            borderRadius: 3,
                            cursor: 'pointer',
                            color: theme.palette.text.secondary,
                            transition: 'all 0.2s',
                            '&:hover': {
                                bgcolor: alpha(theme.palette.primary.main, 0.05),
                                color: theme.palette.text.primary
                            }
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Folder fontSize="small" sx={{ opacity: 0.7 }} />
                            <Typography sx={{ fontSize: '0.9375rem', fontWeight: 500, fontFamily: 'Inter, sans-serif' }}>
                                {ws}
                            </Typography>
                        </Box>
                        <KeyboardArrowDown fontSize="small" sx={{ opacity: 0.5, fontSize: 18 }} />
                    </Box>
                ))}

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        p: 1.5,
                        mt: 1,
                        borderRadius: 3,
                        cursor: 'pointer',
                        color: theme.palette.text.secondary,
                        transition: 'all 0.2s',
                        '&:hover': {
                            color: theme.palette.text.primary
                        }
                    }}
                >
                    <Add fontSize="small" />
                    <Typography sx={{ fontSize: '0.9375rem', fontWeight: 500, fontFamily: 'Inter, sans-serif' }}>
                        Create New
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Sidebar;
