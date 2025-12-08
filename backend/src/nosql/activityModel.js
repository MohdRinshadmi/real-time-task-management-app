import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
type: String,
payload: Object,
userId: Number,
createdAt: { type: Date, default: Date.now }
});

export const Activity = mongoose.model('Activity', activitySchema);