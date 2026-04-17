import nodemailer from "nodemailer";
import logger from "../../helper/logger.js";

// Initialize nodemailer transporter with SMTP configuration
const createTransporter = () => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST || "smtp.gmail.com",
    port: parseInt(process.env.MAIL_PORT || "587"),
    secure: process.env.MAIL_PORT === "465", // true for port 465, false for other ports
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  // Verify connection on startup
  transporter.verify((error, success) => {
    if (error) {
      logger.error("[emailConfig] SMTP connection failed:", error.message);
    } else {
      logger.info("[emailConfig] SMTP server ready to send emails");
    }
  });

  return transporter;
};

const transporter = createTransporter();

export default transporter;
