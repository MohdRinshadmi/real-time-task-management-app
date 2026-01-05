import mongoose from 'mongoose';
import { Counter } from './counterModel.js';

const TASK_STATUS = Object.freeze({
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed'
});

const taskSchema = new mongoose.Schema(
  {
    taskId: {
      type: Number,
      unique: true,
      index: true
    },

    userId: {
      type: Number,
      required: true,
      index: true
    },

    assigneeId: {
      type: Number,
      index: true,
      default: null
    },

    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100
    },

    description: {
      type: String,
      trim: true,
      maxlength: 500,
      default: ''
    },

    status: {
      type: String,
      enum: Object.values(TASK_STATUS),
      default: TASK_STATUS.PENDING,
      index: true
    }
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'Tasks'
  }
);

taskSchema.pre('save', async function (next) {
  if (!this.isNew) return next();

  try {
    const counter = await Counter.findByIdAndUpdate(
      { _id: 'taskId' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.taskId = counter.seq;
    next();
  } catch (error) {
    next(error);
  }
});

export const Task = mongoose.model('Task', taskSchema);

