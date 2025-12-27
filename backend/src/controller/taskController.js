import logger from "../helper/logger.js";
import Task from "../models/taskModel.js";
import { successMessage } from "../helper/response.js";

export const getTasks = async (req, res, next) => {
  try {
    const userId = req.auth?.user?.id;
    const tasks = await Task.findAll({ where: { userId } });
    if (!tasks) {
      return res.status(404).json({ error: "No tasks found" });
    }
      // Map taskId to id for frontend compatibility
// const tasksWithId = tasks.map(task => {
//   logger.debug(`[getTasks] Mapping taskId to id for task:`, task);
//   return {
//     ...task.dataValues,
//     id: task.taskId
//   };
// });
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
    const task = await Task.create({ title, status: status || "pending", userId });
    const response = await successMessage({ data: { task } });
    res.status(201).json(response);
  } catch (err) {
    logger.error("create task error", err);
    return next(err);
  }
};

export const createTask = async (req, res, next) => {
  try {
    const userId = req.auth?.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: User not authenticated" });
    }
    const { title, description = "", status = "pending" } = req.body;
    if (!title || typeof title !== "string") {
      return res.status(400).json({ error: "Validation error: title is required" });
    }
    const task = await Task.create({ title: title, description, status, userId });
    logger.info( `[createTask] Task created | taskId=${task.taskId} | userId=${userId}` );
    const response = await successMessage({ data: { task: { ...task.get({ plain: true }), id: task.taskId, } } });
    return res.status(201).json(response);
  } catch (error) {
    logger.error("[createTask] Error creating task", { message: error.message, stack: error.stack});
    return next(error);
  }
};

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
