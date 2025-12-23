import express from 'express';
import { createTask, deleteTask, getTasks } from '../controller/taskController.js';
const router = express.Router();

router.get('/get-tasks', getTasks);
router.post('/add-task', createTask);
router.delete('/delete-task/:id', deleteTask);

export default router;
