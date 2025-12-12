import React, { useState, useEffect } from 'react';
import axios from 'axios';
import anime from 'animejs';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Chip,
  IconButton
} from '@mui/material';
import { CheckCircle, Delete } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import { Modal, Select } from 'antd';

const API_URL = 'http://localhost:3000';

const PRIMARY_GRADIENT = 'linear-gradient(135deg, #5B68F4 0%, #8B7FF6 100%)';

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTask, setNewTask] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    status: 'pending',
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const login = false; // Temporary hardcoded login status

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

  const StatCard = ({ title, count, gradient, icon }) => (
    <Card
      sx={{
        background: gradient,
        color: 'white',
        borderRadius: 4,
        boxShadow: '0 10px 30px rgba(91, 104, 244, 0.4)',
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            {count}
          </Typography>
          {icon}
        </Box>
        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          {title}
        </Typography>
      </CardContent>
    </Card>
  );

return (
  <div
    className="min-h-screen p-4 md:p-8"
    style={{
      background:
        'linear-gradient(180deg, #E6ECFF 0%, #F4F7FF 40%, #FFFFFF 100%)',
    }}
  >
    {!login && (
      <>
        <ToastContainer position="top-right" autoClose={3000} />

        <Box sx={{ width: '80%', mx: 'auto', mt: { xs: 2, md: 6 }, px: { xs: 1, md: 0 } }}>
          {/* ---------------- HERO SECTION ---------------- */}
          <Box sx={{ textAlign: 'center', mb: 10 }}>
            {/* Title Line 1 */}

            <Box sx={{ position: 'relative', textAlign: 'center', mb: { xs: 6, md: 10 }, minHeight: { xs: 'auto', md: 320 } }}>
              {/* Floating avatars and notes with lines */}
              {/* Top left note */}
              <div className="hidden md:flex" style={{ position: 'absolute', left: 0, top: 30, display: 'flex', alignItems: 'center', zIndex: 2 }}>
                <div style={{
                  background: '#fff',
                  borderRadius: 16,
                  boxShadow: '0 8px 32px 0 rgba(91,104,244,0.10), 0 2px 8px #e0e7ff',
                  padding: '6px 16px',
                  fontSize: 14,
                  fontWeight: 500,
                  color: '#5B68F4',
                  border: '1px solid #e0e7ff',
                  transform: 'translateY(-18px)',
                  transition: 'box-shadow 0.3s, transform 0.3s',
                }}>
                  <span role="img" aria-label="file">📤</span> Sending a file project
                </div>
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="avatar" style={{ width: 32, height: 32, borderRadius: '50%', marginLeft: 8, border: '2px solid #fff', boxShadow: '0 1px 4px #c7d2fe' }} />
              </div>

              {/* Top right note */}
              <div className="hidden md:flex" style={{ position: 'absolute', right: 0, top: 40, display: 'flex', alignItems: 'center', zIndex: 2 }}>
                <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px #e0e7ff', padding: '6px 16px', fontSize: 14, fontWeight: 500, color: '#5B68F4', border: '1px solid #e0e7ff' }}>
                  <span role="img" aria-label="calendar">📅</span> Schedule a meeting
                </div>
                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="avatar" style={{ width: 32, height: 32, borderRadius: '50%', marginLeft: 8, border: '2px solid #fff', boxShadow: '0 1px 4px #c7d2fe' }} />
              </div>

              {/* Bottom left note */}
              <div className="hidden md:flex" style={{ position: 'absolute', left: 40, bottom: 10, display: 'flex', alignItems: 'center', zIndex: 2 }}>
                <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px #e0e7ff', padding: '6px 16px', fontSize: 14, fontWeight: 500, color: '#5B68F4', border: '1px solid #e0e7ff' }}>
                  <span role="img" aria-label="video">💻</span> Virtual conferencing
                </div>
                <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="avatar" style={{ width: 32, height: 32, borderRadius: '50%', marginLeft: 8, border: '2px solid #fff', boxShadow: '0 1px 4px #c7d2fe' }} />
              </div>

              {/* Bottom right note */}
              <div className="hidden md:flex" style={{ position: 'absolute', right: 40, bottom: 20, display: 'flex', alignItems: 'center', zIndex: 2 }}>
                <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px #e0e7ff', padding: '6px 16px', fontSize: 14, fontWeight: 500, color: '#5B68F4', border: '1px solid #e0e7ff' }}>
                  <span role="img" aria-label="progress">📈</span> Tracking the progress of a project
                </div>
                <img src="https://randomuser.me/api/portraits/women/55.jpg" alt="avatar" style={{ width: 32, height: 32, borderRadius: '50%', marginLeft: 8, border: '2px solid #fff', boxShadow: '0 1px 4px #c7d2fe' }} />
              </div>

              {/* Center lines (decorative) */}
              <svg className="hidden md:block" width="100%" height="320" style={{ position: 'absolute', left: 0, top: 0, zIndex: 1, pointerEvents: 'none' }}>
                <line x1="10%" y1="60" x2="50%" y2="100" stroke="#c7d2fe" strokeWidth="2" strokeDasharray="6 6" />
                <line x1="90%" y1="80" x2="50%" y2="100" stroke="#c7d2fe" strokeWidth="2" strokeDasharray="6 6" />
                <line x1="15%" y1="270" x2="50%" y2="180" stroke="#c7d2fe" strokeWidth="2" strokeDasharray="6 6" />
                <line x1="85%" y1="290" x2="50%" y2="180" stroke="#c7d2fe" strokeWidth="2" strokeDasharray="6 6" />
              </svg>

              {/* Title Line 1 */}
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 400,
                  fontSize: { xs: '1.75rem', sm: '2.3rem', md: '3.2rem' },
                  color: '#0F172A',
                  mb: 1,
                  position: 'relative',
                  zIndex: 3,
                  px: { xs: 2, md: 0 },
                }}
              >
                Empower Your Team with
              </Typography>

              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', position: 'relative', zIndex: 3, flexWrap: 'wrap', padding: '0 8px' }}>
                <div
                  style={{
                    display: 'inline-block',
                    border: '2px dashed #8B7FF6',
                    borderRadius: '12px',
                    padding: '4px 28px',
                    marginRight: '16px',
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 500,
                      fontSize: { xs: '1.75rem', sm: '2.3rem', md: '3.2rem' },
                      background: 'linear-gradient(90deg, #5B68F4 0%, #8B7FF6 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Seamless
                  </Typography>
                </div>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 500,
                    fontSize: { xs: '1.75rem', sm: '2.3rem', md: '3rem' },
                    color: '#000',
                  }}
                >
                  Collaboration
                </Typography>
              </div>

              {/* Subtitle */}
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{
                  opacity: 0.85,
                  mt: 2,
                  fontSize: { xs: '0.875rem', md: '1rem' },
                  position: 'relative',
                  zIndex: 3,
                  px: { xs: 2, md: 0 },
                }}
              >
                Bring your team together to plan, track, and manage tasks in real-time.
              </Typography>
            </Box>
            {/* Subtitle */}
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                opacity: 0.85,
                mt: 2,
                fontSize: { xs: '1rem', md: '1rem' },
              }}
            >
              Bring your team together to plan, track, and manage tasks in
              real-time.
            </Typography>
          </Box>

          {/* ---------------- STAT CARDS ---------------- */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: 4,
              mb: 8,
            }}
          >
            <StatCard
              title="Total Tasks"
              count={tasks.length}
              gradient={PRIMARY_GRADIENT}
              icon={<Typography variant="h4">📊</Typography>}
            />

            <StatCard
              title="Completed"
              count={tasks.filter((t) => t.status === 'completed').length}
              gradient="linear-gradient(135deg, #10b981 0%, #059669 100%)"
              icon={<Typography variant="h4">✅</Typography>}
            />

            <StatCard
              title="In Progress"
              count={tasks.filter((t) => t.status === 'in_progress').length}
              gradient="linear-gradient(135deg, #f97316 0%, #ea580c 100%)"
              icon={<Typography variant="h4">🚧</Typography>}
            />
          </Box>

          {/* ---------------- QUICK ADD ---------------- */}
          <Card
            sx={{
              mb: 8,
              background: '#FFFFFF',
              boxShadow: '0 12px 40px rgba(91, 104, 244, 0.08)',
              borderRadius: 4,
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <TextField
                  fullWidth
                  placeholder="Quick add: What is the main task?"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addTask()}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                      background: '#F8FAFC',
                    },
                  }}
                />

                <button
                  onClick={addTask}
                  style={{
                    background: PRIMARY_GRADIENT,
                    border: 'none',
                    color: 'white',
                    padding: '10px 18px',
                    borderRadius: 12,
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Add
                </button>

                <button
                  onClick={() => setIsModalOpen(true)}
                  style={{
                    border: '1px solid #c4b5fd',
                    background: '#eef2ff',
                    padding: '10px 18px',
                    borderRadius: 12,
                    cursor: 'pointer',
                  }}
                >
                  Detailed Task
                </button>
              </Box>
            </CardContent>
          </Card>

          {loading ? (
            <Typography>Loading tasks...</Typography>
          ) : tasks.length === 0 ? (
            <Typography color="text.secondary">
              No tasks yet. Add your first task.
            </Typography>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {tasks.map((task) => (
                <Card
                  key={task.id || task._id}
                  sx={{
                    background: 'white',
                    borderRadius: 3,
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 3px 10px rgba(0,0,0,0.04)',
                    transition: '0.25s',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 10px 30px rgba(91, 104, 244, 0.12)',
                      borderColor: '#c7d2fe',
                    },
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      {/* Left */}
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 600 }}
                        >
                          {task.title}
                        </Typography>

                        {task.description && (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 1 }}
                          >
                            {task.description}
                          </Typography>
                        )}

                        <Chip
                          label={task.status.replace('_', ' ')}
                          size="small"
                          sx={{
                            textTransform: 'capitalize',
                            fontWeight: 600,
                          }}
                          color={getStatusColor(task.status)}
                        />
                      </Box>

                      {/* Right buttons */}
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                          color="success"
                          onClick={() => markComplete(task)}
                        >
                          <CheckCircle />
                        </IconButton>

                        <IconButton
                          color="error"
                          onClick={() => deleteTask(task)}
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

        <Modal
          title="Create Detailed Task"
          open={isModalOpen}
          onOk={createDetailedTask}
          onCancel={() => setIsModalOpen(false)}
          okText="Create Task"
          okButtonProps={{
            style: { background: PRIMARY_GRADIENT, border: 'none' },
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              fullWidth
              label="Task Title"
              value={taskForm.title}
              onChange={(e) =>
                setTaskForm({ ...taskForm, title: e.target.value })
              }
            />

            <TextField
              fullWidth
              label="Description"
              multiline
              rows={4}
              value={taskForm.description}
              onChange={(e) =>
                setTaskForm({ ...taskForm, description: e.target.value })
              }
            />

            <Select
              value={taskForm.status}
              onChange={(value) =>
                setTaskForm({ ...taskForm, status: value })
              }
              options={[
                { value: 'pending', label: 'Pending' },
                { value: 'in_progress', label: 'In Progress' },
                { value: 'completed', label: 'Completed' },
              ]}
              style={{ width: '100%', height: 48 }}
            />
          </Box>
        </Modal>
      </>
    )}
  </div>
);


};

export default TaskBoard;
