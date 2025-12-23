import logger from "../helper/logger.js";
import Task from "../models/taskModel.js";
import { successMessage } from "../helper/response.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    if (!tasks) {
      return res.status(404).json({ error: "No tasks found" });
    }
    const response = await successMessage({ data: { tasks } });
    res.json(response);
  } catch (err) {
    logger.error("get tasks error", err);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const task = await Task.create({
      title,
      description: description || "",
      status: status || "pending",
    });
    const response = await successMessage({ data: { task } });
    res.status(201).json(response);
  } catch (err) {
    logger.error("create task error", err);
    res.status(500).json({ error: "Failed to create task" });
  }
};

export const deleteTask = async (req, res) => {
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
    res.status(500).json({ error: "Failed to delete task" });
  }
};
