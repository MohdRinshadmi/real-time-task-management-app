import mongoose from 'mongoose';

const accessKeySchema = new mongoose.Schema({
  userId: { type: Number, required: true },
  token: { type: String, required: true },
  mobileToken: { type: String },
  ip: { type: String },
  expiry: { type: Number },
}, {
  collection: 'AccessKeys',
});

export const AccessKey = mongoose.model('AccessKey', accessKeySchema);
