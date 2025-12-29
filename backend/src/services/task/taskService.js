import Task from '../../models/taskModel.js';


export const getTasksService = async () => {
  try {
    const tasks = await Task.findAll();
    return { status: true, data: tasks };
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return { status: false, error: error.message };
  }
};


export const addTaskService = async ({ title, description, status, assigneeId }) => {
  if (!title) {
    return { status: false, error: 'Task title is required.' };
  }
  try {
    const newTask = await Task.create({ title, description: description || '', status: status || 'pending', assigneeId: assigneeId || null });
    return { status: true, data: newTask };
  } catch (error) {
    console.error('Error creating task:', error);
    return { status: false, error: error.message };
  }
};


export const deleteTaskService = async (id) => {
  try {
    const deleted = await Task.destroy({ where: { taskId: id } });
    console.log('deleted task service', id);
    
    if (deleted) {
      return { status: true, message: 'Task deleted successfully.' };
    } else {
      return { status: false, error: 'Task not found.' };
    }
  } catch (error) {
    console.error('Error deleting task:', error);
    return { status: false, error: error.message };
  }
};

export const updateTaskService = async (id, updateData) => {
  if (!id) {
    return { status: false, error: 'Task ID is required.' };
  }
  try {
    const [updated] = await Task.update(updateData, { where: { taskId: id } });
    if (updated) {
      const updatedTask = await Task.findOne({ where: { taskId: id } });
      return { status: true, data: updatedTask };
    } else {
      return { status: false, error: 'Task not found or not updated.' };
    }
  } catch (error) {
    console.error('Error updating task:', error);
    return { status: false, error: error.message };
  }
};
