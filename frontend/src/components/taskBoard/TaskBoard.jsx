import React, { useState } from 'react';
import { Box, Typography, TextField, Card, CardContent, Chip, IconButton } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { Select } from 'antd';
import AddTaskModal from './AddTaskModal';
import TaskStatCard from './TaskStatCard';
import axios from 'axios';
import { CheckCircle, Delete } from '@mui/icons-material';
import anime from 'animejs';
const API_URL = 'http://localhost:3000';
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
      const res = await axios.get(`${API_URL}/api/tasks`);
      setTasks(res.data.tasks || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tasks:', error);
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
      const res = await axios.post(`${API_URL}/api/tasks`, {
        title: newTask,
        status: 'pending',
      });
      setTasks([...tasks, res.data.task]);
      setNewTask('');
      toast.success('Task added successfully!');
    } catch (error) {
      console.error('Error adding task:', error);
      toast.error('Failed to add task');
    }
  };

  const createDetailedTask = async () => {
    try {
      const res = await axios.post(`${API_URL}/api/tasks`, taskForm);
      setTasks([...tasks, res.data.task]);
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
    try {
      await axios.delete(`${API_URL}/api/tasks/${task.id || task._id}`);
      setTasks(tasks.filter((t) => t.id !== task.id && t._id !== task._id));
      toast.success('Task deleted successfully!');
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in_progress':
        return 'primary';
      default:
        return 'warning';
    }
  };

  return (
    <div
      className="min-h-screen p-4 md:p-8"
      style={{
        background: 'linear-gradient(180deg, #E6ECFF 0%, #F4F7FF 40%, #FFFFFF 100%)',
      }}
    >
      <ToastContainer position="top-right" autoClose={3000} />

      <Box sx={{ width: { xs: '95%', sm: '90%', md: '80%' }, mx: 'auto', mt: { xs: 2, md: 6 }, px: { xs: 1, md: 0 } }}>
        {/* ---------------- HERO SECTION / LOGIN UI ---------------- */}
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
            gap: { xs: 2.5, sm: 3, md: 3.5 },
            mb: { xs: 6, md: 8 },
            px: { xs: 2, sm: 3, md: 0 },
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
            mb: { xs: 4, md: 5 },
            background: '#FFFFFF',
            boxShadow: 'none',
            borderRadius: 2,
            border: '1px solid #E5E7EB',
            mx: { xs: 2, md: 0 },
          }}
        >
          <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
            <Typography
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontSize: { xs: '0.875rem', sm: '0.9375rem' },
                fontWeight: 600,
                color: '#111827',
                mb: 2,
              }}
            >
              Quick Add Task
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1.5, alignItems: 'stretch' }}>
              <TextField
                fullWidth
                placeholder="What needs to be done?"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addTask()}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1.5,
                    background: '#F9FAFB',
                    border: '1px solid #E5E7EB',
                    fontSize: { xs: '0.8125rem', sm: '0.875rem' },
                    fontFamily: 'Inter, sans-serif',
                    '& fieldset': { border: 'none' },
                    '&:hover': { background: '#F3F4F6' },
                    '&.Mui-focused': { background: '#FFFFFF', borderColor: '#9CA3AF' },
                  },
                  '& input': { padding: '10px 12px' },
                }}
              />

              <Box sx={{ display: 'flex', gap: 1.5, flexDirection: { xs: 'row', sm: 'row' } }}>
                <button
                  onClick={addTask}
                  style={{
                    background: '#111827',
                    border: 'none',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: 6,
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: '0.8125rem',
                    fontFamily: 'Inter, sans-serif',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => { e.target.style.background = '#1F2937'; }}
                  onMouseLeave={(e) => { e.target.style.background = '#111827'; }}
                >
                  Add Task
                </button>

                <button
                  onClick={() => setIsModalOpen(true)}
                  style={{
                    border: '1px solid #E5E7EB',
                    background: '#FFFFFF',
                    padding: '10px 20px',
                    borderRadius: 6,
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '0.8125rem',
                    fontFamily: 'Inter, sans-serif',
                    color: '#374151',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => { e.target.style.background = '#F9FAFB'; e.target.style.borderColor = '#D1D5DB'; }}
                  onMouseLeave={(e) => { e.target.style.background = '#FFFFFF'; e.target.style.borderColor = '#E5E7EB'; }}
                >
                  Detailed
                </button>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* ---------------- TASK LIST ---------------- */}
        <Box sx={{ px: { xs: 2, md: 0 } }}>
          <Typography
            sx={{
              fontFamily: 'Inter, sans-serif',
              fontSize: { xs: '0.875rem', sm: '0.9375rem' },
              fontWeight: 600,
              color: '#111827',
              mb: 2.5,
            }}
          >
            All Tasks
          </Typography>
          {loading ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography sx={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', color: '#9CA3AF' }}>
                Loading tasks...
              </Typography>
            </Box>
          ) : tasks.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography sx={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9375rem', fontWeight: 600, color: '#6B7280', mb: 0.5 }}>
                No tasks yet
              </Typography>
              <Typography sx={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8125rem', color: '#9CA3AF' }}>
                Add your first task to get started
              </Typography>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {tasks.map((task) => (
                <Card
                  key={task.id || task._id}
                  className="task-card"
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
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2 }}>
                      <Box sx={{ flex: 1, width: '100%' }}>
                        <Typography sx={{ fontFamily: 'Inter, sans-serif', fontSize: { xs: '0.875rem', sm: '0.9375rem' }, fontWeight: 600, color: '#111827', mb: 0.5 }}>
                          {task.title}
                        </Typography>

                        {task.description && (
                          <Typography sx={{ fontFamily: 'Inter, sans-serif', fontSize: { xs: '0.8125rem', sm: '0.875rem' }, color: '#6B7280', mb: 1.5, lineHeight: 1.6 }}>
                            {task.description}
                          </Typography>
                        )}

                        <Chip
                          label={task.status.replace('_', ' ')}
                          size="small"
                          sx={{ textTransform: 'capitalize', fontWeight: 600, fontSize: '0.75rem', borderRadius: 2 }}
                          color={getStatusColor(task.status)}
                        />
                      </Box>

                      <Box sx={{ display: 'flex', gap: 1, flexShrink: 0 }}>
                        <IconButton
                          color="success"
                          onClick={() => markComplete(task)}
                          sx={{ '&:hover': { background: 'rgba(16, 185, 129, 0.1)', transform: 'scale(1.1)' }, transition: 'all 0.2s' }}
                        >
                          <CheckCircle />
                        </IconButton>

                        <IconButton
                          color="error"
                          onClick={() => deleteTask(task)}
                          sx={{ '&:hover': { background: 'rgba(239, 68, 68, 0.1)', transform: 'scale(1.1)' }, transition: 'all 0.2s' }}
                        >
                          <Delete />
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
