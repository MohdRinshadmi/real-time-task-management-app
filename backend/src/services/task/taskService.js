import Task from '../../models/taskModel.js';

export const getTasksService = async () => {
  return await Task.findAll();
};

export const createTaskService = async ({ title, description, status, assigneeId }) => {
  return await Task.create({
    title,
    description: description || '',
    status: status || 'pending',
    assigneeId: assigneeId || null,
  });
};

export const deleteTaskService = async (id) => {
  return await Task.destroy({ where: { id } });
};
