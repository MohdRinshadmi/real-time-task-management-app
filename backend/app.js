
import express from 'express';
import compression from 'compression';
import cors from 'cors';
import { connectMongoDB } from './src/config/mongo.js';
import router from './src/routes/authRoutes.js';


const app = express();

// Connect to MongoDB
connectMongoDB();

// MySQL connection is initialized by importing sequelize

app.use(cors());
app.use(express.json({
    limit: '10mb'
}))

app.use(express.urlencoded({extended: true, limit: '10mb'}));
app.use(compression());
app.use('/api/auth', router);


app.use((req, res) => {
    res.status(200).json("Welcome to the application. No such Api")
})

export default app;