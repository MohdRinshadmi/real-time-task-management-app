
import express from 'express';
import compression from 'compression';
import cors from 'cors';
import { connectMongoDB } from './src/config/mongo.js';
import authRouter from './src/routes/authRoutes.js';
import taskRouter from './src/routes/taskRoutes.js';
import { initDb } from './src/models/index.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;



const app = express();

// Sync MySQL models (create tables if not exist)
initDb()

// Connect to MongoDB
connectMongoDB();

// MySQL connection is initialized by importing sequelize

app.use(cors());
app.use(express.json({
    limit: '10mb'
}))

app.use(express.urlencoded({extended: true, limit: '10mb'}));
app.use(compression());
app.use('/api', authRouter);
app.use('/api', taskRouter);


app.use((req, res) => {
    res.status(200).json("Welcome to the application. No such Api")
})

app.listen(PORT, () => {
  console.log('Server running on port 3000');
});

export default app;