
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

const features = [
    {
        title: 'Proven Performance',
        description: 'Lightning fast load times and optimized workflows for maximum efficiency.',
        icon: <SpeedIcon sx={{ fontSize: 40, color: '#6366f1' }} />,
        delay: 0
    },
    {
        title: 'Innovative Design',
        description: 'A beautiful, intuitive interface that your team will actually enjoy using.',
        icon: <AutoGraphIcon sx={{ fontSize: 40, color: '#8b5cf6' }} />,
        delay: 0.2
    },
    {
        title: 'Better Results',
        description: 'Data-driven insights to help you make smarter decisions and grow faster.',
        icon: <SecurityIcon sx={{ fontSize: 40, color: '#ec4899' }} />,
        delay: 0.4
    }
];

const FeatureCards = () => {
    return (
        <Box sx={{ py: 12, bgcolor: '#f8fafc' }}>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mb: 8 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <Box sx={{
                            display: 'inline-block',
                            px: 2,
                            py: 0.5,
                            borderRadius: '20px',
                            bgcolor: '#e0e7ff',
                            color: '#4338ca',
                            fontWeight: 600,
                            fontSize: '0.75rem',
                            mb: 2
                        }}>
                            WHY CHOOSE US
                        </Box>
                        <Typography variant="h3" sx={{ fontWeight: 800, color: '#1e293b', mb: 2 }}>
                            Experience the Difference
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#64748b', maxWidth: '600px', mx: 'auto' }}>
                            We've rethought project management from the ground up to provide a superior experience.
                        </Typography>
                    </motion.div>
                </Box>

                <Grid container spacing={4}>
                    {features.map((feature, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: feature.delay }}
                            >
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 4,
                                        borderRadius: '24px',
                                        height: '100%',
                                        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease',
                                        cursor: 'default',
                                        '&:hover': {
                                            transform: 'translateY(-10px)',
                                            boxShadow: '0 20px 40px -5px rgba(0, 0, 0, 0.1)'
                                        }
                                    }}
                                >
                                    <Box sx={{
                                        width: 70,
                                        height: 70,
                                        borderRadius: '20px',
                                        bgcolor: 'rgba(241, 245, 249, 0.8)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        mb: 3
                                    }}>
                                        {feature.icon}
                                    </Box>
                                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#1e293b' }}>
                                        {feature.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#64748b', lineHeight: 1.6 }}>
                                        {feature.description}
                                    </Typography>
                                </Paper>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default FeatureCards;
