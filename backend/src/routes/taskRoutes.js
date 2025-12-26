
import express from 'express';
import { createTask, deleteTask, getTasks } from '../controller/taskController.js';
import authMiddleware from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/get-tasks', authMiddleware, getTasks);
router.post('/add-task', authMiddleware, createTask);
router.delete('/delete-task/:id', authMiddleware, deleteTask);

export default router;
