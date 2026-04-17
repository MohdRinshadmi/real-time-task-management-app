import mongoose from 'mongoose';
import { Counter } from './counterModel.js';

const MAIL_STATUS = Object.freeze({
  SENT: 'sent',
  FAILED: 'failed',
  DRAFT: 'draft'
});

const MAIL_DIRECTION = Object.freeze({
  SENT: 'sent',
  RECEIVED: 'received'
});

const mailSchema = new mongoose.Schema(
  {
    mailId: {
      type: Number,
      unique: true,
      index: true
    },

    senderId: {
      type: Number,
      required: true,
      index: true
    },

    senderEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },

    recipientEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },

    subject: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255
    },

    body: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: Object.values(MAIL_STATUS),
      default: MAIL_STATUS.DRAFT,
      index: true
    },

    direction: {
      type: String,
      enum: Object.values(MAIL_DIRECTION),
      default: MAIL_DIRECTION.SENT
    },

    deleted: {
      type: Boolean,
      default: false,
      index: true
    }
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'Mails'
  }
);

mailSchema.pre('save', async function (next) {
  if (!this.isNew) return next();

  try {
    const counter = await Counter.findByIdAndUpdate(
      { _id: 'mailId' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.mailId = counter.seq;
    next();
  } catch (error) {
    next(error);
  }
});

export const Mail = mongoose.model('Mail', mailSchema);
