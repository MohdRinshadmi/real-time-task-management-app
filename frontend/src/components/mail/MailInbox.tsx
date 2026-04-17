import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Box,
  IconButton,
  Skeleton,
  Stack,
  Grid,
  Chip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import MailIcon from "@mui/icons-material/Mail";
import useMailHook from "../../hooks/useMailHook";
import { Mail } from "../../services/mail/mailService";
import { toast } from "react-toastify";

interface MailInboxProps {
  onEmailClick?: (mail: Mail) => void;
}

const MailInbox: React.FC<MailInboxProps> = ({ onEmailClick }) => {
  const { data: mails = [], isLoading, error, refetch } = useMailHook.useMailHistory();
  const { mutate: deleteMail } = useMailHook.useDeleteMail();

  // Handle delete with refetch
  const handleDelete = (mailId: number) => {
    deleteMail(mailId, {
      onSuccess: () => {
        refetch();
      },
      onError: (error: any) => {
        toast.error(error?.message || "Failed to delete email");
      },
    });
  };

  // Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    }
  };

  // Get preview text from body
  const getBodyPreview = (body: string, length: number = 100) => {
    return body.length > length ? body.substring(0, length) + "..." : body;
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

  // Loading skeleton
  if (isLoading) {
    return (
      <Grid container spacing={2}>
        {[...Array(3)].map((_, i) => (
          <Grid item xs={12} key={i}>
            <Card>
              <CardContent>
                <Skeleton variant="text" height={24} />
                <Skeleton variant="text" height={20} sx={{ mt: 1 }} />
                <Skeleton variant="text" height={16} sx={{ mt: 1 }} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }

  // Error state
  if (error) {
    return (
      <Card sx={{ p: 3, textAlign: "center" }}>
        <Typography color="error">Failed to load emails</Typography>
      </Card>
    );
  }

  // Empty state
  if (!mails || mails.length === 0) {
    return (
      <Card
        sx={{
          p: 4,
          textAlign: "center",
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        }}
      >
        <MailIcon
          sx={{
            fontSize: 64,
            color: "text.secondary",
            mb: 2,
            opacity: 0.5,
          }}
        />
        <Typography variant="h6" color="text.secondary">
          No emails yet
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Compose a new email to get started
        </Typography>
      </Card>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {mails.map((mail: Mail) => (
        <Card
          key={mail.mailId}
          sx={{
            cursor: "pointer",
            transition: "all 0.3s ease",
            "&:hover": {
              boxShadow: 4,
              transform: "translateY(-2px)",
            },
          }}
          onClick={() => onEmailClick?.(mail)}
        >
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: 1 }}>
              <Box sx={{ flex: 1 }}>
                {/* From/To */}
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "text.primary" }}>
                  {mail.direction === "sent" ? "To:" : "From:"}{" "}
                  <Typography
                    component="span"
                    variant="subtitle2"
                    sx={{ fontWeight: 400, color: "primary.main" }}
                  >
                    {mail.direction === "sent" ? mail.recipientEmail : mail.senderEmail}
                  </Typography>
                </Typography>

                {/* Subject */}
                <Typography
                  variant="h6"
                  sx={{ mt: 1, mb: 0.5, fontWeight: 600, color: "text.primary" }}
                >
                  {mail.subject}
                </Typography>

                {/* Body Preview */}
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {getBodyPreview(mail.body)}
                </Typography>

                {/* Status and Date */}
                <Box sx={{ display: "flex", gap: 1, alignItems: "center", flexWrap: "wrap" }}>
                  <Chip
                    label={mail.status}
                    color={getStatusColor(mail.status)}
                    size="small"
                    variant="outlined"
                  />
                  <Typography variant="caption" color="text.secondary">
                    {formatDate(mail.createdAt)}
                  </Typography>
                </Box>
              </Box>

              {/* Delete Button */}
              <CardActions disableSpacing sx={{ p: 0 }}>
                <IconButton
                  size="small"
                  color="error"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(mail.mailId);
                  }}
                  title="Delete email"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </CardActions>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default MailInbox;
