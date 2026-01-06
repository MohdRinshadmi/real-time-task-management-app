import mongoose from 'mongoose';

const pendingRegistrationSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  status: { type: String },
  userTokens: { type: String },
  dateAdded: { type: Date },
  dateModified: { type: Date },
}, {
  collection: 'PendingRegistrations',
});

export const PendingRegistration = mongoose.model('PendingRegistration', pendingRegistrationSchema);
