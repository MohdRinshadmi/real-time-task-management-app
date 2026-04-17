import express from 'express';
import { sendEmail, getMailHistory, getMailDetail, deleteEmail } from '../controller/mailController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Send a new email
router.post('/send-email', authMiddleware, sendEmail);

// Get all emails for the user
router.get('/mail-history', authMiddleware, getMailHistory);

// Get specific email details
router.get('/mail/:mailId', authMiddleware, getMailDetail);

// Delete/archive an email
router.delete('/mail/:mailId', authMiddleware, deleteEmail);

export default router;
