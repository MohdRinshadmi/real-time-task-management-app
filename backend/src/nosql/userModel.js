import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userId: { type: Number, required: true, unique: true },
  firstName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String },
  privacyAccepted: { type: String, default: "false" },
  password: { type: String},
}, {
  timestamps: true,
  collection: 'Users',
});

export const User = mongoose.model('User', userSchema);
