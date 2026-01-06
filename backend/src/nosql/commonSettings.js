import mongoose from 'mongoose';

const commonSettingsSchema = new mongoose.Schema({
  logoutTime: { type: Number },
  active: { type: Number },
}, {
  collection: 'CommonSettings',
  timestamps: false,
});

export const CommonSettings = mongoose.model('CommonSettings', commonSettingsSchema);
