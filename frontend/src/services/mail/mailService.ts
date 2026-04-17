import API from "../../api/api";

export interface Mail {
  id: number;
  mailId: number;
  senderId: number;
  senderEmail: string;
  recipientEmail: string;
  subject: string;
  body: string;
  status: "sent" | "failed" | "draft";
  direction: "sent" | "received";
  createdAt: string;
  updatedAt: string;
}

export interface SendEmailPayload {
  to: string;
  subject: string;
  body: string;
}

export interface MailResponse {
  data: {
    status: boolean;
    data: Mail | Mail[];
  };
}

class MailService {
  // Send a new email
  static async sendEmail(payload: SendEmailPayload): Promise<any> {
    try {
      const response = await API.post("/send-email", {
        to: payload.to,
        subject: payload.subject,
        body: payload.body,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Get all emails for the logged-in user
  static async getMailHistory(): Promise<any> {
    try {
      const response = await API.get("/mail-history");
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Get a specific email by ID
  static async getMailById(mailId: number): Promise<any> {
    try {
      const response = await API.get(`/mail/${mailId}`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Delete an email
  static async deleteMail(mailId: number): Promise<any> {
    try {
      const response = await API.delete(`/mail/${mailId}`);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default MailService;
