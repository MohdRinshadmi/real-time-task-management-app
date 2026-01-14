import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Add, MoreHoriz } from '@mui/icons-material';
import { useTheme, alpha } from '@mui/material/styles';
import TaskCard from './TaskCard';

const TaskColumn = ({ title, count, tasks, statusColor, onAddTask }) => {
    const theme = useTheme();

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 300, flex: 1 }}>
            {/* Column Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: theme.palette.text.secondary, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {title}
                    </Typography>
                    <Box
                        sx={{
                            bgcolor: 'rgba(255, 255, 255, 0.8)',
                            color: statusColor,
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            width: 24,
                            height: 24,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                        }}
                    >
                        {count}
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <IconButton size="small" onClick={onAddTask} sx={{ color: theme.palette.text.secondary, '&:hover': { bgcolor: alpha(theme.palette.action.active, 0.05), color: theme.palette.text.primary } }}>
                        <Add fontSize="small" />
                    </IconButton>
                    <IconButton size="small" sx={{ color: theme.palette.text.secondary, '&:hover': { bgcolor: alpha(theme.palette.action.active, 0.05), color: theme.palette.text.primary } }}>
                        <MoreHoriz fontSize="small" />
                    </IconButton>
                </Box>
            </Box>

            {/* Task List */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 0,
                    pb: 4
                }}
            >
                {tasks.map((task) => (
                    <TaskCard key={task.id || task._id} task={task} />
                ))}
                {/* Placeholder for empty state if needed */}
                {tasks.length === 0 && (
                    <Box
                        onClick={onAddTask}
                        sx={{
                            border: `2px dashed ${alpha(theme.palette.text.secondary, 0.5)}`,
                            borderRadius: 3,
                            p: 3,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer',
                            color: theme.palette.text.secondary,
                            transition: 'all 0.2s',
                            '&:hover': { borderColor: statusColor, color: statusColor, bgcolor: 'rgba(255,255,255,0.3)' }
                        }}
                    >
                        <Typography sx={{ fontSize: '0.875rem', fontWeight: 500 }}>+ Add Task</Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default TaskColumn;
