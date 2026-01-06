import api from '../../api/api';

// Create a detailed task
export const createDetailedTaskService = async (taskData) => {
  const response = await api.post('/create-tasks', taskData);
  return response;
};

// Update a task (mark as complete)
export const updateTaskService = async (taskId, taskData) => {
  const response = await api.put(`/update-task/${taskId}`, taskData);
  return response;
};
