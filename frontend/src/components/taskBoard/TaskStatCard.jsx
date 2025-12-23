import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';

const TaskStatCard = ({ title, count, accentColor, icon, assigned, percentage, taskList = [] }) => {
    return (
      <Card
        sx={{
          background: '#FFFFFF',
          borderRadius: 4,
          border: '1px solid rgba(229, 231, 235, 0.5)',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': { 
            transform: 'translateY(-4px)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
            borderColor: 'rgba(209, 213, 219, 0.8)' 
          },
        }}
      >
        <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
          <Typography sx={{ fontFamily: 'Inter, sans-serif', fontSize: { xs: '0.875rem', sm: '0.9375rem' }, fontWeight: 600, color: '#4B5563', mb: 1, letterSpacing: '0.01em' }}>
            {title}
          </Typography>
          <Typography sx={{ fontFamily: 'Inter, sans-serif', fontSize: '2rem', fontWeight: 800, color: '#111827', mb: 1.5, lineHeight: 1 }}>
            {count}
          </Typography>
        </CardContent>
      </Card>
    );
};

export default TaskStatCard;