import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  taskId: { type: Number, required: true, unique: true },
  userId: { type: Number, required: true },
  assigneeId: { type: Number },
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['pending', 'in_progress', 'completed'], default: 'pending' },
}, {
  timestamps: true,
  collection: 'Tasks',
});

export const Task = mongoose.model('Task', taskSchema);
