import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const TaskStatCard = ({ title, count, accentColor, icon, assigned, percentage, taskList = [] }) => {
    const [showTasks, setShowTasks] = React.useState(false);

    const getStatusColor = (status) => {
      switch (status) {
        case 'completed': return '#10B981';
        case 'in_progress': return '#3B82F6';
        default: return '#F59E0B';
      }
    };






    return (
      <Card
        sx={{
          background: '#FFFFFF',
          borderRadius: 2,
          border: '1px solid #E5E7EB',
          boxShadow: 'none',
          transition: 'all 0.2s ease',
          '&:hover': { borderColor: '#D1D5DB', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' },
        }}
      >
        <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
          <Typography sx={{ fontFamily: 'Inter, sans-serif', fontSize: { xs: '0.875rem', sm: '0.9375rem' }, fontWeight: 600, color: '#111827', mb: 0.5 }}>
            {title}
          </Typography>
          <Typography sx={{ fontFamily: 'Inter, sans-serif', fontSize: '1.5rem', fontWeight: 700, color: accentColor, mb: 1 }}>
            {count}
          </Typography>
          {typeof percentage !== 'undefined' && (
            <Typography sx={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8125rem', color: '#6B7280' }}>
              {percentage}% of {assigned ? assigned : 'tasks'}
            </Typography>
          )}
          {/* You can add more details or icons here if needed */}
        </CardContent>
      </Card>
    );
};

export default TaskStatCard;