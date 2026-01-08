import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userId: { type: Number, required: true, unique: true },
  firstName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String },
  password: { type: String},
  googleId: { type: String, unique: true, sparse: true }, // For Google OAuth users, sparse allows multiple nulls.
}, {
  timestamps: true,
  collection: 'Users',
});

export const User = mongoose.model('User', userSchema);
