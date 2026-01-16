
import React from 'react';
import { Modal, Select } from 'antd';
import { Box, Typography, TextField } from '@mui/material';

import { TaskForm } from '../../types';

interface AddTaskModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  taskForm: TaskForm;
  setTaskForm: (form: TaskForm) => void;
  createDetailedTask: () => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  taskForm,
  setTaskForm,
  createDetailedTask
}) => {
  return (
    <Modal
      title={null}
      open={isModalOpen}
      onOk={createDetailedTask}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
      width={600}
      closeIcon={<span style={{ fontSize: '1.5rem', color: '#9CA3AF', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '50%', transition: 'background 0.2s' }}>×</span>}
      styles={{
        content: { borderRadius: 16, padding: 0, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' },
        header: { padding: 0, border: 'none' },
        body: { padding: 0 },
      }}
    >
      <Box sx={{ p: 4 }}>
        <Typography sx={{ fontFamily: 'Inter, sans-serif', fontSize: '1.25rem', fontWeight: 700, color: '#111827', mb: 4 }}>
          Create Detailed Task
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography sx={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', fontWeight: 600, color: '#374151', mb: 1 }}>
            Task Title
          </Typography>
          <TextField
            fullWidth
            placeholder="Enter task title"
            value={taskForm.title}
            onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.9375rem',
                background: '#F9FAFB',
                '& fieldset': { borderColor: '#E5E7EB' },
                '&:hover fieldset': { borderColor: '#D1D5DB' },
                '&.Mui-focused fieldset': { borderColor: '#3B82F6', borderWidth: 1 },
                '&.Mui-focused': { background: '#FFFFFF' },
              },
              '& input': { padding: '12px 14px' },
            }}
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography sx={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', fontWeight: 600, color: '#374151', mb: 1 }}>
            Description
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Enter task description"
            value={taskForm.description}
            onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.9375rem',
                background: '#F9FAFB',
                '& fieldset': { borderColor: '#E5E7EB' },
                '&:hover fieldset': { borderColor: '#D1D5DB' },
                '&.Mui-focused fieldset': { borderColor: '#3B82F6', borderWidth: 1 },
                '&.Mui-focused': { background: '#FFFFFF' },
              },
              '& textarea': { padding: '12px 14px' },
            }}
          />
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography sx={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', fontWeight: 600, color: '#374151', mb: 1 }}>
            Status
          </Typography>
          <Select
            value={taskForm.status}
            onChange={(value) => setTaskForm({ ...taskForm, status: value })}
            options={[
              { value: 'pending', label: 'Pending' },
              { value: 'in_progress', label: 'In Progress' },
              { value: 'completed', label: 'Completed' },
            ]}
            style={{ width: '100%', height: 46, fontFamily: 'Inter, sans-serif', fontSize: '0.9375rem' }}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', pt: 2, borderTop: '1px solid #F3F4F6' }}>
          <button
            onClick={() => setIsModalOpen(false)}
            style={{
              border: '1px solid #E5E7EB',
              background: '#FFFFFF',
              padding: '12px 24px',
              borderRadius: 10,
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.9375rem',
              fontFamily: 'Inter, sans-serif',
              color: '#4B5563',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLElement;
              target.style.background = '#F9FAFB';
              target.style.borderColor = '#D1D5DB';
              target.style.color = '#111827';
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLElement;
              target.style.background = '#FFFFFF';
              target.style.borderColor = '#E5E7EB';
              target.style.color = '#4B5563';
            }}
          >
            Cancel
          </button>
          <button
            onClick={createDetailedTask}
            style={{
              background: '#2563EB',
              border: 'none',
              color: 'white',
              padding: '12px 24px',
              borderRadius: 10,
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '0.9375rem',
              fontFamily: 'Inter, sans-serif',
              transition: 'all 0.2s',
              boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2), 0 2px 4px -1px rgba(37, 99, 235, 0.1)',
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLElement;
              target.style.background = '#1D4ED8';
              target.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLElement;
              target.style.background = '#2563EB';
              target.style.transform = 'translateY(0)';
            }}
          >
            Create Task
          </button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddTaskModal;