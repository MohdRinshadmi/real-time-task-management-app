import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import useMailHook from "../../hooks/useMailHook";

interface ComposeEmailModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const ComposeEmailModal: React.FC<ComposeEmailModalProps> = ({
  open,
  onClose,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    to: "",
    subject: "",
    body: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { mutate: sendEmail, isPending, isError, error } = useMailHook.useSendEmail();

  // Email validation regex
  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.to.trim()) {
      newErrors.to = "Recipient email is required";
    } else if (!validateEmail(formData.to)) {
      newErrors.to = "Invalid email format";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.body.trim()) {
      newErrors.body = "Body is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSend = () => {
    if (validateForm()) {
      sendEmail(formData, {
        onSuccess: () => {
          setFormData({ to: "", subject: "", body: "" });
          onSuccess?.();
          onClose();
        },
      });
    }
  };

  const handleClose = () => {
    if (!isPending) {
      setFormData({ to: "", subject: "", body: "" });
      setErrors({});
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Compose Email</DialogTitle>
      <DialogContent sx={{ pt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
        {isError && (
          <Alert severity="error">
            {error?.message || "Failed to send email"}
          </Alert>
        )}

        <TextField
          label="To"
          name="to"
          value={formData.to}
          onChange={handleChange}
          placeholder="recipient@example.com"
          fullWidth
          error={!!errors.to}
          helperText={errors.to}
          disabled={isPending}
        />

        <TextField
          label="Subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Email subject"
          fullWidth
          error={!!errors.subject}
          helperText={errors.subject}
          disabled={isPending}
        />

        <TextField
          label="Body"
          name="body"
          value={formData.body}
          onChange={handleChange}
          placeholder="Email body"
          fullWidth
          multiline
          rows={6}
          error={!!errors.body}
          helperText={errors.body}
          disabled={isPending}
        />
      </DialogContent>
      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button onClick={handleClose} disabled={isPending}>
          Cancel
        </Button>
        <Button
          onClick={handleSend}
          variant="contained"
          color="primary"
          disabled={isPending}
          startIcon={isPending ? <CircularProgress size={20} /> : null}
        >
          {isPending ? "Sending..." : "Send"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ComposeEmailModal;
