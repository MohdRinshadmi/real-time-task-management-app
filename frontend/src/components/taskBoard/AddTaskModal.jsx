
import React from 'react';
import { Modal, Select } from 'antd';
import { Box, Typography, TextField } from '@mui/material';

const AddTaskModal = ({
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
      closeIcon={<span style={{ fontSize: '1.25rem', color: '#9CA3AF' }}>×</span>}
      styles={{
        content: { borderRadius: 12, padding: 0 },
        header: { padding: 0, border: 'none' },
        body: { padding: 0 },
      }}
    >
      <Box sx={{ p: 3 }}>
        <Typography sx={{ fontFamily: 'Inter, sans-serif', fontSize: '1.125rem', fontWeight: 600, color: '#111827', mb: 3 }}>
          Create Detailed Task
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography sx={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8125rem', fontWeight: 500, color: '#6B7280', mb: 0.75 }}>
            Task Title
          </Typography>
          <TextField
            fullWidth
            placeholder="Enter task title"
            value={taskForm.title}
            onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 1.5,
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.875rem',
                '& fieldset': { borderColor: '#E5E7EB' },
                '&:hover fieldset': { borderColor: '#D1D5DB' },
                '&.Mui-focused fieldset': { borderColor: '#3B82F6', borderWidth: 1 },
              },
              '& input': { padding: '10px 12px' },
            }}
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography sx={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8125rem', fontWeight: 500, color: '#6B7280', mb: 0.75 }}>
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
                borderRadius: 1.5,
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.875rem',
                '& fieldset': { borderColor: '#E5E7EB' },
                '&:hover fieldset': { borderColor: '#D1D5DB' },
                '&.Mui-focused fieldset': { borderColor: '#3B82F6', borderWidth: 1 },
              },
              '& textarea': { padding: '10px 12px' },
            }}
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography sx={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8125rem', fontWeight: 500, color: '#6B7280', mb: 0.75 }}>
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
            style={{ width: '100%', height: 42, fontFamily: 'Inter, sans-serif', fontSize: '0.875rem' }}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', pt: 2 }}>
          <button
            onClick={() => setIsModalOpen(false)}
            style={{
              border: '1px solid #E5E7EB',
              background: '#FFFFFF',
              padding: '10px 24px',
              borderRadius: 6,
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.875rem',
              fontFamily: 'Inter, sans-serif',
              color: '#374151',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => { e.target.style.background = '#F9FAFB'; e.target.style.borderColor = '#D1D5DB'; }}
            onMouseLeave={(e) => { e.target.style.background = '#FFFFFF'; e.target.style.borderColor = '#E5E7EB'; }}
          >
            Cancel
          </button>
          <button
            onClick={createDetailedTask}
            style={{
              background: '#3B82F6',
              border: 'none',
              color: 'white',
              padding: '10px 24px',
              borderRadius: 6,
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontFamily: 'Inter, sans-serif',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => { e.target.style.background = '#2563EB'; }}
            onMouseLeave={(e) => { e.target.style.background = '#3B82F6'; }}
          >
            Create Task
          </button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddTaskModal;