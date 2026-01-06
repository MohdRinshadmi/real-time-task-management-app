import React, { useState } from 'react';
import { Box, Typography, TextField, Card, CardContent, Chip, IconButton } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import AddTaskModal from './AddTaskModal';
import TaskStatCard from './TaskStatCard';
import axios from 'axios';
import { CheckCircle, Delete } from '@mui/icons-material';
import anime from 'animejs';
import API from '../../api/api';

const TaskBoard = () => {
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(false);
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    status: 'pending',
  });
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      anime({
        targets: '.task-card',
        translateY: [30, 0],
        opacity: [0, 1],
        delay: anime.stagger(100),
        duration: 800,
        easing: 'easeOutExpo',
      });
    }
  }, [tasks]);

  const fetchTasks = async () => {
    try {
      const res = await API.get(`/get-tasks`);
      console.log('fetch taskkk', res);
      
      setTasks(res.data.data.tasks || []);
      setLoading(false);
    } catch (error) {
      console.log('Error fetching tasks:', error);
      toast.error('Failed to fetch tasks');
      setLoading(false);
    }
  };

  const addTask = async () => {
    if (!newTask.trim()) {
      toast.warning('Please enter a task title');
      return;
    }

    try {
      const res = await API.post(`/add-task`, {
        title: newTask,
        status: 'pending',
      });
      setTasks([...tasks, res.data.data.task]);
      setNewTask('');
      toast.success('Task added successfully!');
    } catch (error) {
      console.error('Error adding task:', error);
      toast.error('Failed to add task');
    }
  };

  const createDetailedTask = async () => {
    try {
      const res = await API.post(`/create-tasks`, taskForm);
      console.log('create detaikled task response', res);
      
      setTasks([...tasks, res.data.data.task]);
      setIsModalOpen(false);
      setTaskForm({ title: '', description: '', status: 'pending' });
      toast.success('Task created successfully!');
    } catch (error) {
      console.error('Error creating task:', error);
      toast.error('Failed to create task');
    }
  };

  const markComplete = async (task) => {
    try {
      const res = await axios.put(`${API_URL}/api/tasks/${task.id || task._id}`, {
        ...task,
        status: 'completed',
      });
      setTasks(tasks.map((t) => (t.id === task.id || t._id === task._id ? res.data.task : t)));
      toast.success('Task marked as complete!');
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Failed to update task');
    }
  };

  const deleteTask = async (task) => {
    console.log('task id for deleting task', task);
    try {
      await API.delete(`/delete-task/${task.taskId}`);
      setTasks(tasks.filter((t) => t.id !== task.id && t._id !== task._id));
      toast.success('Task deleted successfully!');
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task');
    }
  };

  return (
    <div
      className="min-h-screen p-4 md:p-8"
      style={{
        background: 'linear-gradient(180deg, #E6ECFF 0%, #F4F7FF 40%, #FFFFFF 100%)',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <Box sx={{ width: { xs: '100%', sm: '95%', md: '90%', lg: '85%' }, mx: 'auto', mt: { xs: 2, md: 4 }, px: { xs: 1, md: 0 } }}>
        {/* ---------------- HERO SECTION / LOGIN UI ---------------- */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#111827', mb: 1, letterSpacing: '-0.02em' }}>
            Task Board
          </Typography>
          <Typography variant="body1" sx={{ color: '#6B7280', fontSize: '1rem' }}>
            Manage your tasks and track progress efficiently.
          </Typography>
        </Box>

        {/* ---------------- STAT CARDS ---------------- */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(4, 1fr)'
            },
            gap: { xs: 2, sm: 3 },
            mb: { xs: 6, md: 8 },
          }}
        >
          <TaskStatCard
            title="Today"
            count={tasks.filter((t) => {
              const today = new Date().toDateString();
              return new Date(t.createdAt || Date.now()).toDateString() === today;
            }).length.toString().padStart(2, '0')}
            accentColor="#EF4444"
            icon={tasks.filter((t) => {
              const today = new Date().toDateString();
              return new Date(t.createdAt || Date.now()).toDateString() === today;
            }).length.toString()}
            percentage={tasks.length > 0 ? Math.round((tasks.filter((t) => {
              const today = new Date().toDateString();
              return new Date(t.createdAt || Date.now()).toDateString() === today;
            }).length / tasks.length) * 100) : 1}
            taskList={tasks.filter((t) => {
              const today = new Date().toDateString();
              return new Date(t.createdAt || Date.now()).toDateString() === today;
            })}
          />

          <TaskStatCard
            title="Yesterday"
            count={tasks.filter((t) => {
              const yesterday = new Date();
              yesterday.setDate(yesterday.getDate() - 1);
              return new Date(t.createdAt || Date.now()).toDateString() === yesterday.toDateString();
            }).length.toString().padStart(2, '0')}
            accentColor="#FBBF24"
            icon={tasks.filter((t) => {
              const yesterday = new Date();
              yesterday.setDate(yesterday.getDate() - 1);
              return new Date(t.createdAt || Date.now()).toDateString() === yesterday.toDateString();
            }).length.toString()}
            percentage={tasks.length > 0 ? Math.round((tasks.filter((t) => {
              const yesterday = new Date();
              yesterday.setDate(yesterday.getDate() - 1);
              return new Date(t.createdAt || Date.now()).toDateString() === yesterday.toDateString();
            }).length / tasks.length) * 100) : 60}
            taskList={tasks.filter((t) => {
              const yesterday = new Date();
              yesterday.setDate(yesterday.getDate() - 1);
              return new Date(t.createdAt || Date.now()).toDateString() === yesterday.toDateString();
            })}
          />

          <TaskStatCard
            title="This Week"
            count={tasks.filter((t) => {
              const oneWeekAgo = new Date();
              oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
              return new Date(t.createdAt || Date.now()) >= oneWeekAgo;
            }).length.toString().padStart(2, '0')}
            assigned={tasks.length.toString().padStart(2, '0')}
            accentColor={tasks.filter((t) => {
              const oneWeekAgo = new Date();
              oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
              return new Date(t.createdAt || Date.now()) >= oneWeekAgo;
            }).length > 0 ? "#10B981" : "#EF4444"}
            icon={tasks.filter((t) => {
              const oneWeekAgo = new Date();
              oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
              return new Date(t.createdAt || Date.now()) >= oneWeekAgo;
            }).length.toString()}
            percentage={tasks.length > 0 ? Math.round((tasks.filter((t) => {
              const oneWeekAgo = new Date();
              oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
              return new Date(t.createdAt || Date.now()) >= oneWeekAgo;
            }).length / tasks.length) * 100) : 0}
            taskList={tasks.filter((t) => {
              const oneWeekAgo = new Date();
              oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
              return new Date(t.createdAt || Date.now()) >= oneWeekAgo;
            })}
          />

          <TaskStatCard
            title="This Month"
            count={tasks.filter((t) => {
              const oneMonthAgo = new Date();
              oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
              return new Date(t.createdAt || Date.now()) >= oneMonthAgo;
            }).length.toString().padStart(2, '0')}
            assigned={tasks.length.toString().padStart(2, '0')}
            accentColor="#FBBF24"
            icon={tasks.length.toString()}
            percentage={tasks.length > 0 ? Math.round((tasks.filter((t) => {
              const oneMonthAgo = new Date();
              oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
              return new Date(t.createdAt || Date.now()) >= oneMonthAgo;
            }).length / tasks.length) * 100) : 75}
            taskList={tasks.filter((t) => {
              const oneMonthAgo = new Date();
              oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
              return new Date(t.createdAt || Date.now()) >= oneMonthAgo;
            })}
          />
        </Box>

        {/* ---------------- QUICK ADD ---------------- */}
        <Card
          sx={{
            mb: { xs: 4, md: 6 },
            background: '#FFFFFF',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
            borderRadius: 4,
            border: 'none',
            overflow: 'visible',
          }}
        >
          <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
            <Typography
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontSize: { xs: '1rem', sm: '1.125rem' },
                fontWeight: 700,
                color: '#111827',
                mb: 3,
                letterSpacing: '-0.01em',
              }}
            >
              Quick Add Task
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, alignItems: 'stretch' }}>
              <TextField
                fullWidth
                placeholder="What needs to be done?"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addTask()}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    background: '#F9FAFB',
                    border: '1px solid #E5E7EB',
                    fontSize: '0.9375rem',
                    fontFamily: 'Inter, sans-serif',
                    transition: 'all 0.2s',
                    '& fieldset': { border: 'none' },
                    '&:hover': { background: '#F3F4F6', boxShadow: '0 0 0 4px rgba(243, 244, 246, 0.5)' },
                    '&.Mui-focused': { background: '#FFFFFF', boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.1)', border: '1px solid #3B82F6' },
                  },
                  '& input': { padding: '14px 16px' },
                }}
              />

              <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'row', sm: 'row' } }}>
                <button
                  onClick={addTask}
                  style={{
                    background: '#2563EB',
                    border: 'none',
                    color: 'white',
                    padding: '0 24px',
                    borderRadius: 12,
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: '0.9375rem',
                    fontFamily: 'Inter, sans-serif',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s',
                    boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2), 0 2px 4px -1px rgba(37, 99, 235, 0.1)',
                    height: '52px',
                  }}
                  onMouseEnter={(e) => { e.target.style.background = '#1D4ED8'; e.target.style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={(e) => { e.target.style.background = '#2563EB'; e.target.style.transform = 'translateY(0)'; }}
                >
                  Add Task
                </button>

                <button
                  onClick={() => setIsModalOpen(true)}
                  style={{
                    border: '1px solid #E5E7EB',
                    background: '#FFFFFF',
                    padding: '0 24px',
                    borderRadius: 12,
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '0.9375rem',
                    fontFamily: 'Inter, sans-serif',
                    color: '#4B5563',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s',
                    height: '52px',
                  }}
                  onMouseEnter={(e) => { e.target.style.background = '#F9FAFB'; e.target.style.borderColor = '#D1D5DB'; e.target.style.color = '#111827'; }}
                  onMouseLeave={(e) => { e.target.style.background = '#FFFFFF'; e.target.style.borderColor = '#E5E7EB'; e.target.style.color = '#4B5563'; }}
                >
                  Detailed
                </button>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* ---------------- TASK LIST ---------------- */}
        <Box sx={{ px: { xs: 1, md: 0 } }}>
          <Typography
            sx={{
              fontFamily: 'Inter, sans-serif',
              fontSize: { xs: '1rem', sm: '1.125rem' },
              fontWeight: 700,
              color: '#111827',
              mb: 3,
              letterSpacing: '-0.01em',
            }}
          >
            All Tasks
          </Typography>
          {loading ? (
            <Box sx={{ textAlign: 'center', py: 12 }}>
              <Typography sx={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9375rem', color: '#9CA3AF' }}>
                Loading tasks...
              </Typography>
            </Box>
          ) : tasks.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 12, background: '#FFFFFF', borderRadius: 4, border: '1px dashed #E5E7EB' }}>
              <Typography sx={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', fontWeight: 600, color: '#4B5563', mb: 1 }}>
                No tasks yet
              </Typography>
              <Typography sx={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', color: '#9CA3AF' }}>
                Add your first task to get started
              </Typography>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {tasks.map((task) => (
                <Card
                  key={task.id || task._id}
                  className="task-card"
                  sx={{
                    background: '#FFFFFF',
                    borderRadius: 3,
                    border: '1px solid rgba(229, 231, 235, 0.5)',
                    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                    transition: 'all 0.2s ease',
                    '&:hover': { 
                      borderColor: 'rgba(209, 213, 219, 0.8)', 
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                      transform: 'translateY(-2px)'
                    },
                  }}
                >
                  <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2 }}>
                      <Box sx={{ flex: 1, width: '100%' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                          <Typography sx={{ fontFamily: 'Inter, sans-serif', fontSize: { xs: '0.9375rem', sm: '1rem' }, fontWeight: 600, color: '#111827' }}>
                            {task.title}
                          </Typography>
                          <Chip
                            label={task.status.replace('_', ' ')}
                            size="small"
                            sx={{ 
                              textTransform: 'capitalize', 
                              fontWeight: 600, 
                              fontSize: '0.75rem', 
                              borderRadius: 1.5,
                              height: '24px',
                              bgcolor: task.status === 'completed' ? 'rgba(16, 185, 129, 0.1)' : task.status === 'in_progress' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                              color: task.status === 'completed' ? '#059669' : task.status === 'in_progress' ? '#2563EB' : '#D97706',
                            }}
                          />
                        </Box>

                        {task.description && (
                          <Typography sx={{ fontFamily: 'Inter, sans-serif', fontSize: { xs: '0.875rem', sm: '0.9375rem' }, color: '#6B7280', lineHeight: 1.6 }}>
                            {task.description}
                          </Typography>
                        )}
                      </Box>

                      <Box sx={{ display: 'flex', gap: 1, flexShrink: 0 }}>
                        <IconButton
                          onClick={() => markComplete(task)}
                          sx={{ 
                            color: '#10B981',
                            bgcolor: 'rgba(16, 185, 129, 0.05)',
                            '&:hover': { bgcolor: 'rgba(16, 185, 129, 0.15)', transform: 'scale(1.05)' }, 
                            transition: 'all 0.2s',
                            borderRadius: 2,
                            p: 1
                          }}
                        >
                          <CheckCircle fontSize="small" />
                        </IconButton>

                        <IconButton
                          onClick={() => deleteTask(task)}
                          sx={{ 
                            color: '#EF4444',
                            bgcolor: 'rgba(239, 68, 68, 0.05)',
                            '&:hover': { bgcolor: 'rgba(239, 68, 68, 0.15)', transform: 'scale(1.05)' }, 
                            transition: 'all 0.2s',
                            borderRadius: 2,
                            p: 1
                          }}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}
        </Box>
      </Box>


          <AddTaskModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            taskForm={taskForm}
            setTaskForm={setTaskForm}
            createDetailedTask={createDetailedTask}
          />
        </div>
      );
    };

export default TaskBoard;
