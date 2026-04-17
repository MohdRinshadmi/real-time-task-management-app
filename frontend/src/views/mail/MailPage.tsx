import React, { useState } from "react";
import {
  Container,
  Paper,
  Button,
  Box,
  Typography,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Mail } from "../../services/mail/mailService";
import ComposeEmailModal from "../../components/mail/ComposeEmailModal";
import MailInbox from "../../components/mail/MailInbox";
import MailDetailModal from "../../components/mail/MailDetailModal";
import useMailHook from "../../hooks/useMailHook";

const MailPage: React.FC = () => {
  const [composeOpen, setComposeOpen] = useState(false);
  const [selectedMail, setSelectedMail] = useState<Mail | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const { refetch } = useMailHook.useMailHistory();

  const handleComposeClose = () => {
    setComposeOpen(false);
  };

  const handleEmailClick = (mail: Mail) => {
    setSelectedMail(mail);
    setDetailOpen(true);
  };

  const handleDetailClose = () => {
    setDetailOpen(false);
    setSelectedMail(null);
  };

  const handleEmailSent = () => {
    refetch();
  };

  const handleEmailDeleted = () => {
    refetch();
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Header Section */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          borderRadius: 2,
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
              Inbox
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Manage your emails
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="inherit"
            startIcon={<AddIcon />}
            onClick={() => setComposeOpen(true)}
            sx={{
              backgroundColor: "rgba(255,255,255,0.2)",
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.3)",
              },
            }}
          >
            Compose
          </Button>
        </Stack>
      </Paper>

      {/* Mail List Section */}
      <Box sx={{ mb: 3 }}>
        <MailInbox onEmailClick={handleEmailClick} />
      </Box>

      {/* Compose Email Modal */}
      <ComposeEmailModal
        open={composeOpen}
        onClose={handleComposeClose}
        onSuccess={handleEmailSent}
      />

      {/* Mail Detail Modal */}
      <MailDetailModal
        mail={selectedMail}
        open={detailOpen}
        onClose={handleDetailClose}
        onDelete={handleEmailDeleted}
      />
    </Container>
  );
};

export default MailPage;
