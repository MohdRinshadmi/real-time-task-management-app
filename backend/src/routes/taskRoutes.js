import express from 'express';
import { createTask, getTasks } from '../controller/taskController.js';
const router = express.Router();

router.get('/get-tasks', getTasks);
router.post('/add-task', createTask);

export default router;
