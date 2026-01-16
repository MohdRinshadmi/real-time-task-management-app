import React from 'react';
import { Box, Container, Typography, Grid, Avatar, Card } from '@mui/material';
import { motion } from 'framer-motion';

const testimonials = [
    {
        name: 'Alex Chen',
        role: 'Product Manager',
        company: 'TechCorp',
        content: 'Since switching to this platform, our team\'s productivity has skyrocketed. The real-time features are absolute game-changers for remote work.',
        avatar: ''
    },
    {
        name: 'Sarah Jones',
        role: 'Design Lead',
        company: 'Creative Studio',
        content: 'The interface is stunningly beautiful and intuitive. It makes managing complex projects feel simple and organized. Highly recommended!',
        avatar: ''
    },
    {
        name: 'Michael Brown',
        role: 'CTO',
        company: 'StartupX',
        content: 'Better than any other tool we have used. The scalability and performance are unmatched. It handles our growing team ease.',
        avatar: ''
    },
    {
        name: 'Emily Davis',
        role: 'Marketing Director',
        company: 'GrowthInc',
        content: 'I love how easy it is to track progress and generate reports. It saves me hours every week on manual updates.',
        avatar: ''
    },
    {
        name: 'David Wilson',
        role: 'Engineering Lead',
        company: 'DevFlow',
        content: 'The API integration capabilities are fantastic. We were able to plug it into our existing CI/CD pipeline seamlessly.',
        avatar: ''
    },
    {
        name: 'Lisa Taylor',
        role: 'Project Manager',
        company: 'BuildIt',
        content: 'Finally, a project management tool that doesn\'t feel like a chore to use. My team actually enjoys logging their tasks now.',
        avatar: ''
    }
];

const Testimonials = () => {
    return (
        <Box sx={{ py: 12, bgcolor: '#f8fafc', position: 'relative' }}>
            {/* Decorative background elements can go here */}
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mb: 10 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Box sx={{
                            display: 'inline-block',
                            px: 2,
                            py: 0.5,
                            borderRadius: '20px',
                            bgcolor: '#fce7f3',
                            color: '#db2777',
                            fontWeight: 600,
                            fontSize: '0.75rem',
                            mb: 2
                        }}>
                            COMMUNITY LOVE
                        </Box>
                        <Typography variant="h3" sx={{ fontWeight: 800, color: '#1e293b' }}>
                            Trusted by Teams
                        </Typography>
                    </motion.div>
                </Box>

                <Grid container spacing={4}>
                    {testimonials.map((t, i) => (
                        <Grid item xs={12} md={4} key={i}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <Card sx={{
                                    p: 4,
                                    borderRadius: '20px',
                                    boxShadow: '0 4px 20px -5px rgba(0,0,0,0.05)',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between'
                                }}>
                                    <Typography variant="body1" sx={{ color: '#475569', mb: 3, fontStyle: 'italic' }}>
                                        "{t.content}"
                                    </Typography>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Avatar sx={{ bgcolor: '#e2e8f0' }}>{t.name[0]}</Avatar>
                                        <Box>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1e293b' }}>
                                                {t.name}
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                                                {t.role}, {t.company}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Card>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default Testimonials;
