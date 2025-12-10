import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  TextField, 
  Button, 
  Chip,
  Box,
  IconButton,
  LinearProgress
} from '@mui/material';
import { Add, Delete, Edit, CheckCircle } from '@mui/icons-material';
import { Modal, Select } from 'antd';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import anime from 'animejs';

const API_URL = 'http://localhost:3000';

function TaskBoard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    status: 'pending'
  });

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
        easing: 'easeOutExpo'
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
        status: 'pending'
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
      toast.error('Failed to create task');
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'success';
      case 'in_progress': return 'primary';
      default: return 'warning';
    }
  };

  return (
    <div className="min-h-screen p-8" style={{ background: 'linear-gradient(to bottom, #e8ecff, #f0f4ff, #fef3ff)' }}>
      <ToastContainer position="top-right" autoClose={3000} />
      
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 700,
              background: 'linear-gradient(135deg, #5b68f4 0%, #8b7ff6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2
            }}
          >
            ✨ Empower Your Team with Seamless Collaboration
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Stay in sync, communicate clearly. Organize, prioritize, and achieve your goals.
          </Typography>
        </Box>

        <Card 
          sx={{ 
            mb: 4,
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px rgba(91, 104, 244, 0.12)',
            borderRadius: 3
          }}
        >
          <CardContent>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                placeholder="What needs to be done?"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTask()}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    bgcolor: 'white'
                  }
                }}
              />
              <Button 
                variant="contained" 
                onClick={addTask}
                startIcon={<Add />}
                sx={{
                  background: 'linear-gradient(135deg, #5b68f4 0%, #8b7ff6 100%)',
                  borderRadius: 2,
                  px: 4,
                  boxShadow: '0 4px 15px rgba(91, 104, 244, 0.3)',
                  '&:hover': {
                    boxShadow: '0 6px 20px rgba(91, 104, 244, 0.4)',
                  }
                }}
              >
                Add
              </Button>
              <Button 
                variant="outlined" 
                onClick={() => setIsModalOpen(true)}
                startIcon={<Edit />}
                sx={{ borderRadius: 2, borderColor: '#8b7ff6', color: '#8b7ff6' }}
              >
                Detailed
              </Button>
            </Box>
          </CardContent>
        </Card>

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 3, mb: 4 }}>
          <Card sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>{tasks.length}</Typography>
              <Typography variant="body2">Total Tasks</Typography>
            </CardContent>
          </Card>
          <Card sx={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white', borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {tasks.filter(t => t.status === 'completed').length}
              </Typography>
              <Typography variant="body2">Completed</Typography>
            </CardContent>
          </Card>
          <Card sx={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white', borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {tasks.filter(t => t.status === 'in_progress').length}
              </Typography>
              <Typography variant="body2">In Progress</Typography>
            </CardContent>
          </Card>
        </Box>

        {loading ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <LinearProgress sx={{ mb: 2 }} />
            <Typography color="text.secondary">Loading tasks...</Typography>
          </Box>
        ) : tasks.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              📝 No tasks yet. Create your first task to get started!
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'grid', gap: 2 }}>
            {tasks.map((task, index) => (
              <Card 
                key={task.id || index}
                className="task-card"
                sx={{
                  background: 'white',
                  borderRadius: 3,
                  border: '1px solid #e2e8f0',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateX(8px)',
                    boxShadow: '0 4px 20px rgba(91, 104, 244, 0.15)',
                    borderColor: '#c7d2fe'
                  }
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" sx={{ mb: 1 }}>{task.title}</Typography>
                      {task.description && (
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {task.description}
                        </Typography>
                      )}
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Chip 
                          label={task.status || 'pending'} 
                          color={getStatusColor(task.status)}
                          size="small"
                        />
                      </Box>
                    </Box>
                    <Box>
                      <IconButton color="success">
                        <CheckCircle />
                      </IconButton>
                      <IconButton color="error">
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
          style: { background: 'linear-gradient(135deg, #5b68f4 0%, #8b7ff6 100%)', border: 'none' }
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, py: 2 }}>
          <TextField
            fullWidth
            label="Task Title"
            value={taskForm.title}
            onChange={(e) => setTaskForm({...taskForm, title: e.target.value})}
          />
          <TextField
            fullWidth
            label="Description"
            multiline
            rows={3}
            value={taskForm.description}
            onChange={(e) => setTaskForm({...taskForm, description: e.target.value})}
          />
          <Select
            placeholder="Select Status"
            value={taskForm.status}
            onChange={(value) => setTaskForm({...taskForm, status: value})}
            options={[
              { value: 'pending', label: 'Pending' },
              { value: 'in_progress', label: 'In Progress' },
              { value: 'completed', label: 'Completed' }
            ]}
            style={{ width: '100%' }}
          />
        </Box>
      </Modal>
    </div>
  );
}

export default TaskBoard;
