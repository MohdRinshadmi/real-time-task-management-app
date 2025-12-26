// app.js
import express from 'express';
import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';

import { connectMongoDB } from './src/config/mongo.js';
import authRouter from './src/routes/authRoutes.js';
import taskRouter from './src/routes/taskRoutes.js';
import { initDb } from './src/models/index.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

// Initialize databases (prefer async/await in real app bootstrap)
initDb();
connectMongoDB();

// Global middlewares
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(compression());

// Routers
app.use('/api', authRouter);  // /api/register, /api/login (no auth middleware here)
app.use('/api', taskRouter);  // protected routes will use authMiddleware inside taskRoutes

// Fallback route (should be 404)
app.use((req, res) => {
  return res
    .status(404)
    .json({ message: 'Welcome to the application. No such API' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
