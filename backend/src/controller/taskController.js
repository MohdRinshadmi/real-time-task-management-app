import { logger } from 'sequelize/lib/utils/logger';
import Task from '../models/taskModel.js';

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json({ tasks });
  } catch (err) {
    logger.error('get tasks error', err);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description, status, assigneeId } = req.body;
    const task = await Task.create({
      title,
      description: description || '',
      status: status || 'pending',
      assigneeId: assigneeId || null,
    });
    res.status(201).json({ task });
  } catch (err) {
    logger.error('create task error', err);
    res.status(500).json({ error: 'Failed to create task' });
  }
};
