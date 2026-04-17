import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import MailService, { Mail, SendEmailPayload } from "../services/mail/mailService";

export const useMailHook = {
  // Fetch all emails (mail history)
  useMailHistory: () => {
    return useQuery({
      queryKey: ["mailHistory"],
      queryFn: async () => {
        try {
          const response = await MailService.getMailHistory();
          return response.data?.data?.mails || [];
        } catch (error) {
          toast.error("Failed to fetch mail history");
          throw error;
        }
      },
      staleTime: 1000 * 60 * 5, // 5 minutes
    });
  },

  // Fetch a single email by ID
  useMailDetail: (mailId: number | null) => {
    return useQuery({
      queryKey: ["mail", mailId],
      queryFn: async () => {
        if (!mailId) return null;
        try {
          const response = await MailService.getMailById(mailId);
          return response.data?.data?.mail || null;
        } catch (error) {
          toast.error("Failed to fetch email details");
          throw error;
        }
      },
      enabled: !!mailId, // Only run if mailId exists
      staleTime: 1000 * 60 * 5,
    });
  },

  // Send a new email
  useSendEmail: () => {
    return useMutation({
      mutationFn: async (payload: SendEmailPayload) => {
        try {
          const response = await MailService.sendEmail(payload);
          return response;
        } catch (error) {
          throw error;
        }
      },
      onSuccess: (data) => {
        console.log("Email sent successfully", data);
        toast.success("Email sent successfully!");
      },
      onError: (error: any) => {
        const errorMessage = error?.error || "Failed to send email";
        toast.error(errorMessage);
      },
    });
  },

  // Delete an email
  useDeleteMail: () => {
    return useMutation({
      mutationFn: async (mailId: number) => {
        try {
          const response = await MailService.deleteMail(mailId);
          return response;
        } catch (error) {
          throw error;
        }
      },
      onSuccess: () => {
        toast.success("Email deleted successfully!");
      },
      onError: (error: any) => {
        const errorMessage = error?.error || "Failed to delete email";
        toast.error(errorMessage);
      },
    });
  },
};

export default useMailHook;
