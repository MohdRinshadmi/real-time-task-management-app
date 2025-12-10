import express from 'express';
import { createTask, getTasks } from '../controller/taskController.js';
const router = express.Router();

router.get('/tasks', getTasks);
router.post('/tasks', createTask);

export default router;
