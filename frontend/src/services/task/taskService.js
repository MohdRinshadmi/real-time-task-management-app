import api from '../../api/api';

// Get all tasks
export const getTasksService = async () => {
  const response = await api.get('/get-tasks');
  return response.data;
};

// Create a new task
export const addTaskService = async (taskData) => {
  const response = await api.post('/add-task', taskData);
  return response.data;
};

// Delete a task by id
export const deleteTaskService = async (id) => {
  const response = await api.delete(`/delete-task/${id}`);
  return response.data;
};
