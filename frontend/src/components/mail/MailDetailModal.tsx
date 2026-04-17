import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
  Chip,
  Skeleton,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { Mail } from "../../services/mail/mailService";
import useMailHook from "../../hooks/useMailHook";
import { toast } from "react-toastify";

interface MailDetailModalProps {
  mail: Mail | null;
  open: boolean;
  onClose: () => void;
  onDelete?: () => void;
}

const MailDetailModal: React.FC<MailDetailModalProps> = ({
  mail,
  open,
  onClose,
  onDelete,
}) => {
  const { mutate: deleteMail, isPending: isDeleting } = useMailHook.useDeleteMail();

  const handleDelete = () => {
    if (!mail) return;

    if (window.confirm("Are you sure you want to delete this email?")) {
      deleteMail(mail.mailId, {
        onSuccess: () => {
          onDelete?.();
          onClose();
        },
        onError: (error: any) => {
          toast.error(error?.message || "Failed to delete email");
        },
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string): "success" | "error" | "warning" | "info" => {
    switch (status) {
      case "sent":
        return "success";
      case "failed":
        return "error";
      case "draft":
        return "warning";
      default:
        return "info";
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pr: 1,
        }}
      >
        <Typography variant="h6">Email Details</Typography>
        <Button
          size="small"
          onClick={onClose}
          disabled={isDeleting}
          sx={{ minWidth: "40px" }}
        >
          <CloseIcon />
        </Button>
      </DialogTitle>

      <DialogContent dividers>
        {mail ? (
          <Stack spacing={2}>
            {/* Subject */}
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                SUBJECT
              </Typography>
              <Typography variant="h6" sx={{ mt: 0.5, fontWeight: 600 }}>
                {mail.subject}
              </Typography>
            </Box>

            <Divider />

            {/* From/To */}
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                  FROM
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5 }}>
                  {mail.senderEmail}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                  TO
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5 }}>
                  {mail.recipientEmail}
                </Typography>
              </Box>
            </Box>

            {/* Status and Date */}
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                  STATUS
                </Typography>
                <Box sx={{ mt: 0.5 }}>
                  <Chip
                    label={mail.status}
                    color={getStatusColor(mail.status)}
                    size="small"
                    variant="outlined"
                  />
                </Box>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                  DATE
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5 }}>
                  {formatDate(mail.createdAt)}
                </Typography>
              </Box>
            </Box>

            <Divider />

            {/* Body */}
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                MESSAGE
              </Typography>
              <Box
                sx={{
                  mt: 1,
                  p: 2,
                  backgroundColor: "background.default",
                  borderRadius: 1,
                  borderLeft: "4px solid",
                  borderLeftColor: "primary.main",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  lineHeight: 1.6,
                }}
              >
                <Typography variant="body2" component="div">
                  {mail.body}
                </Typography>
              </Box>
            </Box>
          </Stack>
        ) : (
          // Loading skeleton
          <Stack spacing={2}>
            <Skeleton variant="text" height={40} />
            <Skeleton variant="text" height={20} width="50%" />
            <Skeleton variant="text" height={200} />
          </Stack>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button onClick={onClose} disabled={isDeleting}>
          Close
        </Button>
        <Button
          onClick={handleDelete}
          variant="outlined"
          color="error"
          disabled={isDeleting}
          startIcon={isDeleting ? null : <DeleteIcon />}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MailDetailModal;
