import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Sidebar from './Sidebar';
import Header from '../header/Header';
import TaskColumn from './TaskColumn';
import ApiHook from '../../hooks/apiHook';
import AddTaskModal from '../taskBoard/AddTaskModal';

const TaskBoardLayout = () => {
    const theme = useTheme();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskForm, setTaskForm] = useState({
        title: '',
        description: '',
        status: 'pending',
    });

    useEffect(() => {
        ApiHook.fetchTasks({ setTasks, setLoading });
    }, []);
    const createDetailedTask = async () => {
        await ApiHook.createDetailedTask({ taskForm, tasks, setTasks, setIsModalOpen, setTaskForm });
    };

    const inPendingTasks = tasks.filter(t => t.status === 'pending');
    const inProgressTasks = tasks.filter(t => t.status === 'in_progress');
    const doneTasks = tasks.filter(t => t.status === 'completed');

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: theme.palette.background.default }}>
            <Sidebar />

            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    background: 'linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%)',
                    overflowY: 'auto',
                    height: '100vh'
                }}
            >
                <Box sx={{ p: { xs: 2, md: 5 }, maxWidth: 1600, mx: 'auto', width: '100%' }}>
                    <Header />

                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                            gap: 4,
                            alignItems: 'start'
                        }}
                    >
                        <TaskColumn
                            title="In Pending"
                            count={inPendingTasks.length}
                            tasks={inPendingTasks}
                            statusColor={theme.palette.primary.main}
                            onAddTask={() => {
                                setTaskForm({ ...taskForm, status: 'pending' });
                                setIsModalOpen(true);
                            }}
                        />

                        <TaskColumn
                            title="In Progress"
                            count={inProgressTasks.length}
                            tasks={inProgressTasks}
                            statusColor={theme.palette.warning.main}
                            onAddTask={() => {
                                setTaskForm({ ...taskForm, status: 'in_progress' });
                                setIsModalOpen(true);
                            }}
                        />

                        <TaskColumn
                            title="Done"
                            count={doneTasks.length}
                            tasks={doneTasks}
                            statusColor={theme.palette.secondary.main}
                            onAddTask={() => {
                                setTaskForm({ ...taskForm, status: 'completed' });
                                setIsModalOpen(true);
                            }}
                        />
                    </Box>
                </Box>
            </Box>

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
