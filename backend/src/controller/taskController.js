import logger from "../helper/logger.js";
import Task from "../models/taskModel.js";
import { successMessage } from "../helper/response.js";

export const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.findAll();
    if (!tasks) {
      return res.status(404).json({ error: "No tasks found" });
    }
    const response = await successMessage({ data: { tasks } });
    res.json(response);
  } catch (err) {
    logger.error("get tasks error", err);
    return next(err);
  }
};

export const createTask = async (req, res, next) => {
  logger.info("createTask request body:", req);
  try {
    const { title, description, status, userId } = req.body;
    const userid = req.params.userid;
    const finalUserId = userId || userid;
    logger.info("Creating task for user:", finalUserId);
    const task = await Task.create({
      title,
      description: description || "",
      status: status || "pending",
      userId: finalUserId,
    });
    const response = await successMessage({ data: { task } });
    res.status(201).json(response);
  } catch (err) {
    logger.error("create task error", err);
    return next(err);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const deleted = await Task.destroy({ where: { taskId } });
    if (deleted) {
      const response = await successMessage({
        data: { message: "Task deleted successfully" },
      });
      res.json(response);
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (err) {
    logger.error("delete task error", err);
    return next(err);
  }
};
