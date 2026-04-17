import logger from "../helper/logger.js";
import { successMessage } from "../helper/response.js";
import { sendEmail as sendEmailService } from "../services/mail/mailService.js";
import { getMailHistory as getMailHistoryRepo, getMailById, deleteMail } from "../services/mail/mailRepository.js";
import { validateEmail } from "../utils/emailvalidation.js";

export const sendEmail = async (req, res, next) => {
  try {
    const userId = req.auth?.user?.id;
    const userEmail = req.auth?.user?.email;

    logger.info(` userId=${userId} | userEmail=${userEmail}`);

    if (!userId || !userEmail) {
      return res.status(401).json({ error: "Unauthorized: User not authenticated" });
    }

    const { to, subject, body } = req.body;

    // Validate inputs
    if (!to || typeof to !== "string") {
      return res.status(400).json({ error: "Validation error: recipient email (to) is required" });
    }

    if (!subject || typeof subject !== "string") {
      return res.status(400).json({ error: "Validation error: subject is required" });
    }

    if (!body || typeof body !== "string") {
      return res.status(400).json({ error: "Validation error: body is required" });
    }

    // Validate email format
    if (!validateEmail(to)) {
      return res.status(400).json({ error: "Validation error: invalid recipient email format" });
    }

    // Send email via service
    const result = await sendEmailService({
      senderId: userId,
      senderEmail: userEmail,
      recipientEmail: to,
      subject,
      body
    });

    logger.info(`[sendEmail] Email sent by userId=${userId} | to=${to}`);
    const response = await successMessage({ data: { mail: result.mail, messageId: result.messageId } });
    return res.status(201).json(response);
  } catch (error) {
    logger.error("[sendEmail] Error sending email", { message: error.message, stack: error.stack });
    return res.status(400).json({ error: error.message });
  }
};

export const getMailHistory = async (req, res, next) => {
  try {
    const userId = req.auth?.user?.id;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: User not authenticated" });
    }

    const mails = await getMailHistoryRepo({ userId });
    logger.info(`[getMailHistory] Retrieved ${mails.length} emails for userId=${userId}`);
    const response = await successMessage({ data: { mails } });
    return res.json(response);
  } catch (error) {
    logger.error("[getMailHistory] Error retrieving mail history", { message: error.message, stack: error.stack });
    return next(error);
  }
};

export const getMailDetail = async (req, res, next) => {
  try {
    const userId = req.auth?.user?.id;
    const { mailId } = req.params;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: User not authenticated" });
    }

    if (!mailId) {
      return res.status(400).json({ error: "Validation error: mailId is required" });
    }

    const mail = await getMailById({ userId, mailId: Number(mailId) });

    if (!mail) {
      return res.status(404).json({ error: "Mail not found" });
    }

    logger.info(`[getMailDetail] Retrieved mail | mailId=${mailId} | userId=${userId}`);
    const response = await successMessage({ data: { mail } });
    return res.json(response);
  } catch (error) {
    logger.error("[getMailDetail] Error retrieving mail", { message: error.message, stack: error.stack });
    return next(error);
  }
};

export const deleteEmail = async (req, res, next) => {
  try {
    const userId = req.auth?.user?.id;
    const { mailId } = req.params;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: User not authenticated" });
    }

    if (!mailId) {
      return res.status(400).json({ error: "Validation error: mailId is required" });
    }

    const deleted = await deleteMail({ userId, mailId: Number(mailId) });

    if (!deleted) {
      return res.status(404).json({ error: "Mail not found or already deleted" });
    }

    logger.info(`[deleteEmail] Email deleted | mailId=${mailId} | userId=${userId}`);
    const response = await successMessage({ data: { message: "Email deleted successfully" } });
    return res.json(response);
  } catch (error) {
    logger.error("[deleteEmail] Error deleting email", { message: error.message, stack: error.stack });
    return next(error);
  }
};
