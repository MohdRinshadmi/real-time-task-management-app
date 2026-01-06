// A thin repository that switches between MongoDB (default) and MySQL via env TASK_STORE

const isSql = () => (process.env.TASK_STORE || '').toLowerCase() === 'sql';

// Resolve SQL Task model from various possible folder layouts
const getSqlTask = async () => {
  try {
    const mod = await import('../../mysql/taskModel.js');
    return mod.Task || mod.default;
  } catch (_) {}
  try {
    const mod = await import('../../mysql/models/taskModel.js');
    return mod.Task || mod.default;
  } catch (_) {}
  const mod = await import('../../models/taskModel.js');
  return mod.Task || mod.default;
};

export const listTasks = async ({ userId }) => {
  if (isSql()) {
    const SqlTask = await getSqlTask();
    const rows = await SqlTask.findAll({ where: { userId } });
    return rows.map(r => ({ ...r.toJSON(), id: r.taskId }));
  }
  const { Task } = await import('../../nosql/taskModel.js');
  const docs = await Task.find({ userId });
  return docs.map(d => ({ ...d.toObject(), id: d.taskId }));
};

export const createTask = async ({ title, description = '', status = 'pending', userId }) => {
  if (isSql()) {
    const SqlTask = await getSqlTask();
    const row = await SqlTask.create({ title, description, status, userId });
    const obj = row.toJSON();
    return { ...obj, id: obj.taskId };
  }
  const { Task } = await import('../../nosql/taskModel.js');
  const doc = await Task.create({ title, description, status, userId });
  const obj = doc.toObject();
  return { ...obj, id: obj.taskId };
};

export const deleteTaskById = async ({ taskId }) => {
  if (isSql()) {
    const SqlTask = await getSqlTask();
    const count = await SqlTask.destroy({ where: { taskId } });
    return count > 0;
  }
  const { Task } = await import('../../nosql/taskModel.js');
  const res = await Task.deleteOne({ taskId: Number(taskId) });
  return res.deletedCount > 0;
};
