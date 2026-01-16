import React from 'react';
import { Box, Typography, Chip, Avatar, AvatarGroup } from '@mui/material';
import { Attachment, ChatBubbleOutline, CalendarToday, MoreHoriz } from '@mui/icons-material';
import { useTheme, alpha } from '@mui/material/styles';

import { Task } from '../../types';

interface TaskCardProps {
    task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
    const theme = useTheme();

    const priorityColors: Record<string, { bg: string; text: string }> = {
        high: { bg: alpha(theme.palette.error.main, 0.1), text: theme.palette.error.main },
        medium: { bg: alpha(theme.palette.warning.main, 0.1), text: theme.palette.warning.main },
        low: { bg: alpha(theme.palette.success.main, 0.1), text: theme.palette.success.main },
    };

    const priority = task.priority || 'low'; // Default to low if not specified
    const { bg, text } = priorityColors[priority] || priorityColors.low;

    return (
        <Box
            sx={{
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(10px)',
                borderRadius: 4,
                p: 2.5,
                mb: 2,
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.5)',
                transition: 'all 0.2s',
                cursor: 'pointer',
                '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.02)',
                    background: 'rgba(255, 255, 255, 0.9)',
                }
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                <Chip
                    label={priority.charAt(0).toUpperCase() + priority.slice(1)}
                    size="small"
                    sx={{
                        bgcolor: bg,
                        color: text,
                        fontWeight: 700,
                        fontSize: '0.7rem',
                        height: 24,
                        borderRadius: 1.5,
                        fontFamily: 'Inter, sans-serif'
                    }}
                />
                <MoreHoriz sx={{ color: theme.palette.text.secondary, fontSize: 20, cursor: 'pointer' }} />
            </Box>

            <Typography sx={{ fontWeight: 700, color: theme.palette.text.primary, mb: 1, fontSize: '0.95rem', fontFamily: 'Inter, sans-serif' }}>
                {task.title}
            </Typography>

            <Typography sx={{ color: theme.palette.text.secondary, fontSize: '0.85rem', lineHeight: 1.5, mb: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', fontFamily: 'Inter, sans-serif' }}>
                {task.description}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2.5 }}>
                <CalendarToday sx={{ fontSize: 14, color: theme.palette.text.secondary }} />
                <Typography sx={{ fontSize: '0.8rem', color: theme.palette.text.secondary, fontWeight: 500 }}>
                    {new Date(task.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </Typography>
            </Box>

            <Box sx={{ borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`, pt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 24, height: 24, fontSize: '0.7rem' } }}>
                    <Avatar src="https://randomuser.me/api/portraits/women/65.jpg" />
                    <Avatar src="https://randomuser.me/api/portraits/men/33.jpg" />
                </AvatarGroup>

                <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: theme.palette.text.secondary }}>
                        <Attachment sx={{ fontSize: 16, transform: 'rotate(-45deg)' }} />
                        <Typography sx={{ fontSize: '0.75rem', fontWeight: 600 }}>3</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: theme.palette.text.secondary }}>
                        <ChatBubbleOutline sx={{ fontSize: 16 }} />
                        <Typography sx={{ fontSize: '0.75rem', fontWeight: 600 }}>5</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default TaskCard;
