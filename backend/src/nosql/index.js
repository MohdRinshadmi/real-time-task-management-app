import mongoose from 'mongoose';
import { Task } from './taskModel.js';
import { User } from './userModel.js';
import { AccessKey } from './accessKey.js';
import { CommonSettings } from './commonSettings.js';
import { PendingRegistration } from './pendingRegistration.js';

export default {
  Task,
  User,
  AccessKey,
  CommonSettings,
  PendingRegistration,
};
