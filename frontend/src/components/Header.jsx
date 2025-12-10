import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Badge
} from '@mui/material';
import { 
  Dashboard, 
  TaskAlt, 
  People, 
  Settings,
  Notifications,
  AccountCircle
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar 
      position="sticky"
      elevation={0}
      sx={{ 
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(139, 127, 246, 0.1)',
        color: '#1e293b'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box 
            sx={{ 
              background: 'linear-gradient(135deg, #5b68f4 0%, #8b7ff6 100%)',
              p: 1,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <TaskAlt sx={{ fontSize: 28, color: 'white' }} />
          </Box>
          <Typography 
            variant="h5" 
            component="div" 
            sx={{ 
              fontWeight: 800,
              background: 'linear-gradient(135deg, #5b68f4 0%, #8b7ff6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            TaskCollab
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Button 
            component={Link}
            to="/"
            startIcon={<Dashboard />}
            sx={{ 
              color: '#64748b',
              fontWeight: 600,
              px: 2,
              '&:hover': { 
                bgcolor: 'rgba(91, 104, 244, 0.08)',
                color: '#5b68f4'
              } 
            }}
          >
            Dashboard
          </Button>
          <Button 
            component={Link}
            to="/tasks"
            startIcon={<TaskAlt />}
            sx={{ 
              color: '#64748b',
              fontWeight: 600,
              px: 2,
              '&:hover': { 
                bgcolor: 'rgba(91, 104, 244, 0.08)',
                color: '#5b68f4'
              } 
            }}
          >
            Tasks
          </Button>
          <Button 
            component={Link}
            to="/team"
            startIcon={<People />}
            sx={{ 
              color: '#64748b',
              fontWeight: 600,
              px: 2,
              '&:hover': { 
                bgcolor: 'rgba(91, 104, 244, 0.08)',
                color: '#5b68f4'
              } 
            }}
          >
            Team
          </Button>
          
          <Box sx={{ borderLeft: '1px solid #e2e8f0', pl: 2, ml: 1, display: 'flex', gap: 1 }}>
            <IconButton 
              sx={{ 
                color: '#64748b',
                '&:hover': { bgcolor: 'rgba(91, 104, 244, 0.08)' }
              }}
            >
              <Badge badgeContent={3} color="error">
                <Notifications />
              </Badge>
            </IconButton>
            <IconButton 
              sx={{ 
                color: '#64748b',
                '&:hover': { bgcolor: 'rgba(91, 104, 244, 0.08)' }
              }}
            >
              <Settings />
            </IconButton>
            <IconButton 
              onClick={handleMenu}
              sx={{ p: 0.5 }}
            >
              <Avatar 
                sx={{ 
                  width: 36, 
                  height: 36,
                  background: 'linear-gradient(135deg, #5b68f4 0%, #8b7ff6 100%)'
                }}
              >
                U
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              PaperProps={{
                sx: {
                  mt: 1.5,
                  borderRadius: 2,
                  boxShadow: '0 4px 20px rgba(91, 104, 244, 0.15)'
                }
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My Account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
