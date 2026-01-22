import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoURI = process.env.MONGODB_URI;

export const connectMongoDB = async () => {
    try {
        const mongoDB = await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB");
        return mongoDB;
    } catch (error){
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}