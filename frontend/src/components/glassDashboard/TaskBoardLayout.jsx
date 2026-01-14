import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Sidebar from './Sidebar';
import Header from './Header';
import TaskColumn from './TaskColumn';
import ApiHook from '../../hooks/apiHook';
import AddTaskModal from '../taskBoard/AddTaskModal';

const TaskBoardLayout = () => {
    const theme = useTheme();
    // State management
    const [tasks, setTasks] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskForm, setTaskForm] = useState({
        title: '',
        description: '',
        status: 'pending',
    });

    // Fetch tasks
    useEffect(() => {
        ApiHook.fetchTasks({ setTasks, setLoading });
    }, []);

    // Create task handlers reuse from ApiHook for now, passing necessary setters
    const createDetailedTask = async () => {
        await ApiHook.createDetailedTask({ taskForm, tasks, setTasks, setIsModalOpen, setTaskForm });
    };

    // Filter tasks for columns
    const inProgressTasks = tasks.filter(t => t.status === 'pending' || t.status === 'in_progress');
    const inReviewTasks = tasks.filter(t => t.status === 'in_review'); // Assuming this might exist or will be 0
    const doneTasks = tasks.filter(t => t.status === 'completed');

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: theme.palette.background.default }}>
            <Sidebar />

            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    // Gradient background matching the design
                    background: 'linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%)',
                    overflowY: 'auto',
                    height: '100vh'
                }}
            >
                <Box sx={{ p: { xs: 2, md: 5 }, maxWidth: 1600, mx: 'auto', width: '100%' }}>
                    <Header />

                    {/* Kanban Board */}
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                            gap: 4,
                            alignItems: 'start'
                        }}
                    >
                        <TaskColumn
                            title="In Progress"
                            count={inProgressTasks.length}
                            tasks={inProgressTasks}
                            statusColor={theme.palette.primary.main}
                            onAddTask={() => {
                                setTaskForm({ ...taskForm, status: 'pending' });
                                setIsModalOpen(true);
                            }}
                        />

                        <TaskColumn
                            title="In Review"
                            count={inReviewTasks.length}
                            tasks={inReviewTasks}
                            statusColor={theme.palette.warning.main}
                            onAddTask={() => {
                                setTaskForm({ ...taskForm, status: 'in_review' });
                                setIsModalOpen(true);
                            }}
                        />

                        <TaskColumn
                            title="Done"
                            count={doneTasks.length}
                            tasks={doneTasks}
                            statusColor={theme.palette.secondary.main} // Using secondary (green/purple) or success if preferred. Design used green for done.
                            onAddTask={() => {
                                setTaskForm({ ...taskForm, status: 'completed' });
                                setIsModalOpen(true);
                            }}
                        />
                    </Box>
                </Box>
            </Box>

            {/* Reuse existing Modal for functionality */}
            <AddTaskModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                taskForm={taskForm}
                setTaskForm={setTaskForm}
                createDetailedTask={createDetailedTask}
            />
        </Box>
    );
};

export default TaskBoardLayout;
