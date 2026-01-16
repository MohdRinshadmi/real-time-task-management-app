import React from 'react';
import { Box, Container, Typography, Grid, Button } from '@mui/material';
import { motion } from 'framer-motion';

const FeatureBlock = ({ title, description, imagePos, delay }) => {
    const isLeft = imagePos === 'left';

    return (
        <Grid container spacing={8} alignItems="center" sx={{ mb: { xs: 10, md: 20 } }} direction={isLeft ? 'row-reverse' : 'row'}>
            <Grid item xs={12} md={6}>
                <motion.div
                    initial={{ opacity: 0, x: isLeft ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: delay }}
                >
                    <Typography variant="overline" sx={{ color: '#6366f1', fontWeight: 700, letterSpacing: 1 }}>
                        FEATURE HIGHLIGHT
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 800, color: '#1e293b', mt: 1, mb: 3 }}>
                        {title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#64748b', fontSize: '1.1rem', mb: 4, lineHeight: 1.7 }}>
                        {description}
                    </Typography>
                    <Button
                        variant="text"
                        color="primary"
                        sx={{
                            fontWeight: 600,
                            textTransform: 'none',
                            fontSize: '1rem',
                            p: 0,
                            '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' }
                        }}
                    >
                        Learn more &rarr;
                    </Button>
                </motion.div>
            </Grid>

            <Grid item xs={12} md={6}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: delay + 0.2 }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            height: '400px',
                            borderRadius: '24px',
                            bgcolor: '#f1f5f9', // Placeholder color
                            boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            border: '1px solid #e2e8f0'
                        }}
                    >
                        <Typography variant="h6" sx={{ color: '#94a3b8' }}>
                            {title} UI Mockup
                        </Typography>
                        {/* Image will go here */}
                    </Box>
                </motion.div>
            </Grid>
        </Grid>
    );
};

const DeepDiveSection = () => {
    return (
        <Box sx={{ py: 12, overflow: 'hidden' }}>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mb: 16 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Typography variant="h3" sx={{ fontWeight: 800, color: '#1e293b' }}>
                            Elevate Your Team's Performance
                        </Typography>
                    </motion.div>
                </Box>

                <FeatureBlock
                    title="Real-Time Collaboration"
                    description="Stay exactly on the same page with instant updates and shared workspaces. Work together on the same document without conflict, with cursors and presence indicators."
                    imagePos="right"
                    delay={0.1}
                />

                <FeatureBlock
                    title="In-App Messaging"
                    description="Contextual communication exactly where you need it. Discuss tasks, share files, and make decisions without ever leaving your workflow environment."
                    imagePos="left"
                    delay={0.2}
                />
            </Container>
        </Box>
    );
};

export default DeepDiveSection;
