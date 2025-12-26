import logger from "../helper/logger.js";
import Task from "../models/taskModel.js";
import { successMessage } from "../helper/response.js";

export const getTasks = async (req, res, next) => {
  try {
    const userId = req.auth?.user?.id;
    logger.info(`[getTasks] Authenticated userId: ${userId}`);
    if (!userId) {
      logger.error('[getTasks] Unauthorized: User ID missing');
      return res.status(401).json({ error: "Unauthorized: User ID missing" });
    }
    logger.info(`[getTasks] Fetching tasks for userId: ${userId}`);
    const tasks = await Task.findAll({ where: { userId } });
    logger.info(`[getTasks] Found ${tasks.length} tasks for userId: ${userId}`);
    if (!tasks) {
      logger.warn(`[getTasks] No tasks found for userId: ${userId}`);
      return res.status(404).json({ error: "No tasks found" });
    }
    const response = await successMessage({ data: { tasks } });
    res.json(response);
  } catch (err) {
    logger.error("get tasks error", err);
    return next(err);
  }
};

export const addTask = async (req, res, next) => {
  try {
    const { title, status } = req.body;
    const userId = req.auth?.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: User ID missing" });
    }
    const task = await Task.create({ title, status: status || "pending", userId });
    const response = await successMessage({ data: { task } });
    res.status(201).json(response);
  } catch (err) {
    logger.error("create task error", err);
    return next(err);
  }
};

export const createTask = async (req, res, next) => {
  try{
    const { title, description, status } = req.body;
    const userId = req.auth?.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: User ID missing" });
    }
    const task = await Task.create({ title, description: description || "", status: status || "pending", userId });
    const response = await successMessage({ data: { task } });
    res.status(201).json(response);
  } catch (err) {
    logger.error("create task error", err);
    return next(err);
  }
}

export const deleteTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const deleted = await Task.destroy({ where: { taskId } });
    if (deleted) {
      const response = await successMessage({ data: { message: "Task deleted successfully" }, });
      res.json(response);
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (err) {
    logger.error("delete task error", err);
    return next(err);
  }
};
