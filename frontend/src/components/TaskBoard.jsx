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

const API_URL = 'http://192.168.12.28:3000';

function TaskBoard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium'
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
      setTaskForm({ title: '', description: '', status: 'pending', priority: 'medium' });
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
    <div className="max-w-4xl w-full mx-auto my-10 px-6">
      <div className="bg-white/80 backdrop-blur-xl border border-primary-purple/15 rounded-3xl shadow-xl shadow-primary-blue/10 p-12 animate-[fadeInUp_0.6s_ease-out]">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary-blue to-primary-purple bg-clip-text text-transparent">
            ✨ Empower Your Team with Seamless Collaboration
          </h2>
          <p className="text-slate-600 text-lg mt-3">
            Stay in sync, communicate clearly. Organize, prioritize, and achieve your goals.
          </p>
        </div>
        
        <div className="flex gap-3 mb-8">
          <input
            type="text"
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="What needs to be done?"
            className="flex-1 px-5 py-4 rounded-2xl border border-slate-200 bg-white text-slate-800 text-base transition-all outline-none focus:border-primary-purple focus:shadow-lg focus:shadow-primary-purple/10 focus:-translate-y-0.5 placeholder:text-slate-400"
          />
          <button 
            onClick={addTask}
            className="px-8 py-4 bg-gradient-to-r from-primary-blue to-primary-purple text-white rounded-2xl font-semibold text-base transition-all shadow-lg shadow-primary-blue/25 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary-blue/35 active:translate-y-0 relative overflow-hidden group"
          >
            <span className="relative z-10">Add Task</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
          </button>
        </div>
        
        {loading ? (
          <div className="text-center py-16 text-slate-400 text-lg">
            <div className="text-6xl mb-4 opacity-50">⏳</div>
            <p>Loading tasks...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-16 text-slate-400 text-lg">
            <div className="text-6xl mb-4 opacity-50">📝</div>
            <p>No tasks yet. Create your first task to get started!</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {tasks.map((task, index) => (
              <li 
                key={task.id || task._id || index}
                className="bg-white backdrop-blur-sm border border-slate-200 px-6 py-5 rounded-2xl text-slate-800 text-base transition-all cursor-pointer hover:bg-slate-50 hover:translate-x-2 hover:border-primary-light hover:shadow-lg hover:shadow-primary-blue/15 relative overflow-hidden group animate-[fadeInUp_0.4s_ease-out_backwards]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-primary-blue to-primary-purple scale-y-0 group-hover:scale-y-100 transition-transform"></div>
                <span className="relative">{task.title}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TaskBoard;
