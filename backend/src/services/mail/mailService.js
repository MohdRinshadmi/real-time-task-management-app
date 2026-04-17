import transporter from './emailConfig.js';
import logger from '../../helper/logger.js';
import { saveMail } from './mailRepository.js';
import { validateEmail } from '../../utils/emailvalidation.js';

// Send email via SMTP and save to database
export const sendEmail = async ({ senderId, senderEmail, recipientEmail, subject, body }) => {
  try {
    // Validate recipient email
    if (!validateEmail(recipientEmail)) {
      logger.warn(`[sendEmail] Invalid email format: ${recipientEmail}`);
      throw new Error('Invalid recipient email format');
    }

    // Validate inputs
    if (!subject || typeof subject !== 'string' || subject.trim().length === 0) {
      throw new Error('Subject is required');
    }
    if (!body || typeof body !== 'string' || body.trim().length === 0) {
      throw new Error('Body is required');
    }

    // Prepare email options
    const mailOptions = {
      from: process.env.MAIL_FROM || senderEmail,
      to: recipientEmail,
      subject: subject.trim(),
      html: `<html><body><pre>${body}</pre></body></html>`, // Simple HTML wrapping
    };

    // Send email via SMTP
    const info = await transporter.sendMail(mailOptions);
    logger.info(`[sendEmail] Email sent successfully | messageId=${info.messageId} | to=${recipientEmail} | senderId=${senderId}`);

    // Save to database
    const savedMail = await saveMail({
      senderId,
      senderEmail,
      recipientEmail,
      subject,
      body,
      status: 'sent',
      direction: 'sent'
    });

    return {
      success: true,
      mail: savedMail,
      messageId: info.messageId
    };
  } catch (error) {
    logger.error(`[sendEmail] Error sending email to ${recipientEmail}:`, error.message);

    // Try to save as failed email to database
    try {
      await saveMail({
        senderId,
        senderEmail,
        recipientEmail,
        subject,
        body,
        status: 'failed',
        direction: 'sent'
      });
    } catch (dbError) {
      logger.error('[sendEmail] Failed to save failed email to database:', dbError.message);
    }

    throw new Error(`Failed to send email: ${error.message}`);
  }
};
