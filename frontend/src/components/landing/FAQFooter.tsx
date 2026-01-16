import { useState } from 'react';
import { Box, Container, Typography, Grid, Button, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
    { q: "How does the platform handle large project sizes?", a: "Our platform is built to scale. We use advanced partitioning and caching to ensure performance remains snappy, even with thousands of tasks." },
    { q: "Can I customize the workflow to fit my team's needs?", a: "Absolutely. We offer flexible workflow configurations, custom fields, and automation rules." },
    { q: "Do you offer free and paid plans usually?", a: "Yes, we have a generous free tier for small teams, and paid plans with advanced features for growing organizations." },
    { q: "How secure is my data in your cloud?", a: "We use bank-grade encryption for data in transit and at rest. Security is our top priority." },
    { q: "Can I import data from Trello or Asana?", a: "Yes, we have one-click importers for most major project management tools." },
];

interface FAQItemProps {
    faq: { q: string; a: string };
    isOpen: boolean;
    onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ faq, isOpen, onClick }) => {
    return (
        <Box
            onClick={onClick}
            sx={{
                border: '1px solid',
                borderColor: isOpen ? '#e2e8f0' : '#f1f5f9',
                borderRadius: '16px',
                p: 3,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                bgcolor: 'white',
                '&:hover': {
                    borderColor: '#cbd5e1',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                },
                boxShadow: isOpen ? '0 4px 20px rgba(0,0,0,0.05)' : 'none'
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontSize: '1.05rem', fontWeight: 600, color: isOpen ? '#0f172a' : '#334155' }}>
                    {faq.q}
                </Typography>
                <Box
                    sx={{
                        color: isOpen ? '#6366f1' : '#94a3b8',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'transform 0.3s ease',
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                    }}
                >
                    {/* Using simple chevron for cleaner look matching the request or +/- */}
                    {/* The design image shows a chevron/arrow on the right. */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </Box>
            </Box>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        style={{ overflow: 'hidden' }}
                    >
                        <Typography sx={{ mt: 2, color: '#64748b', lineHeight: 1.6 }}>
                            {faq.a}
                        </Typography>
                    </motion.div>
                )}
            </AnimatePresence>
        </Box>
    );
};

const FAQFooter = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(0); // Default open first one or null

    return (
        <Box sx={{ pt: 12, pb: 4, bgcolor: '#ffffff' }}>
            <Container maxWidth="lg" sx={{ mb: 16 }}>
                <Grid container spacing={8}>
                    {/* Left Column: Heading & Info */}
                    <Grid item xs={12} md={5}>
                        <Box sx={{ position: 'sticky', top: 100 }}>
                            <Box sx={{
                                display: 'inline-block',
                                px: 2,
                                py: 0.5,
                                borderRadius: '100px',
                                border: '1px solid #e2e8f0',
                                mb: 4
                            }}>
                                <Typography variant="subtitle2" sx={{ color: '#64748b', fontWeight: 500 }}>
                                    FAQs
                                </Typography>
                            </Box>

                            <Box sx={{ mb: 4, position: 'relative', width: 'fit-content' }}>
                                {/* Abstract Chat Bubbles Icon */}
                                <Box sx={{ position: 'relative', height: 60, width: 80, mb: 2 }}>
                                    <Box sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: 50,
                                        height: 40,
                                        bgcolor: '#f1f5f9',
                                        borderRadius: '12px 12px 12px 0',
                                        border: '2px solid white',
                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                                    }} />
                                    <Box sx={{
                                        position: 'absolute',
                                        bottom: 0,
                                        right: 0,
                                        width: 60,
                                        height: 46,
                                        bgcolor: 'white',
                                        borderRadius: '12px 12px 12px 0',
                                        border: '1px solid #e2e8f0',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)'
                                    }}>
                                        <Box sx={{ width: 30, height: 4, bgcolor: '#e2e8f0', borderRadius: 2 }} />
                                    </Box>
                                </Box>
                                <Typography variant="h3" sx={{ fontWeight: 800, color: '#0f172a', lineHeight: 1.2 }}>
                                    Need Help?
                                </Typography>
                            </Box>

                            <Typography variant="body1" sx={{ color: '#64748b', mb: 4, lineHeight: 1.7 }}>
                                Find clear answers to most common questions to help you navigate our platform.
                            </Typography>
                        </Box>
                    </Grid>

                    {/* Right Column: FAQ List */}
                    <Grid item xs={12} md={7}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {faqs.map((faq, i) => (
                                <FAQItem
                                    key={i}
                                    faq={faq}
                                    isOpen={i === activeIndex}
                                    onClick={() => setActiveIndex(i === activeIndex ? null : i)}
                                />
                            ))}
                        </Box>
                    </Grid>
                </Grid>
            </Container>

            <Container maxWidth="lg" sx={{ mb: 12 }}>
                <Box
                    component={motion.div}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    sx={{
                        borderRadius: '32px',
                        overflow: 'hidden',
                        position: 'relative',
                        boxShadow: '0 20px 50px -10px rgba(79, 70, 229, 0.3)',
                    }}
                >
                    <Box sx={{
                        background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', // Dark purple theme
                        p: { xs: 6, md: 10 },
                        textAlign: 'center',
                        color: 'white'
                    }}>
                        <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
                            Elevate Your Work Today
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#a5b4fc', mb: 6, maxWidth: '600px', mx: 'auto' }}>
                            Join thousands of teams that use our platform to ship faster and work better together.
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            sx={{
                                bgcolor: '#6366f1',
                                color: 'white',
                                '&:hover': { bgcolor: '#4f46e5' },
                                borderRadius: '12px',
                                px: 5,
                                py: 1.5,
                                fontSize: '1.1rem'
                            }}
                        >
                            Get Started for Free
                        </Button>
                    </Box>
                    {/* Decorative abstract shapes */}
                    <Box sx={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
                        <div style={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }} />
                        <div style={{ position: 'absolute', bottom: -50, left: -50, width: 300, height: 300, background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }} />
                    </Box>
                </Box>
            </Container>

            <Container maxWidth="lg" sx={{ borderTop: '1px solid #f1f5f9', pt: 8 }}>
                <Grid container spacing={4} justifyContent="space-between">
                    <Grid item xs={12} md={4}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                            <Box sx={{ width: 24, height: 24, bgcolor: '#6366f1', borderRadius: '6px' }} />
                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b' }}>TaskMaster</Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: '#94a3b8', mb: 3 }}>
                            Seamless project management for modern teams. Build better, faster.
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton size="small"><TwitterIcon sx={{ color: '#94a3b8' }} /></IconButton>
                            <IconButton size="small"><FacebookIcon sx={{ color: '#94a3b8' }} /></IconButton>
                            <IconButton size="small"><LinkedInIcon sx={{ color: '#94a3b8' }} /></IconButton>
                            <IconButton size="small"><InstagramIcon sx={{ color: '#94a3b8' }} /></IconButton>
                        </Box>
                    </Grid>
                    <Grid item xs={6} md={2}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: '#1e293b' }}>Product</Typography>
                        {['Features', 'Pricing', 'Integrations', 'FAQ'].map(item => (
                            <Typography key={item} variant="body2" sx={{ color: '#64748b', mb: 1, cursor: 'pointer', '&:hover': { color: '#6366f1' } }}>{item}</Typography>
                        ))}
                    </Grid>
                    <Grid item xs={6} md={2}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: '#1e293b' }}>Company</Typography>
                        {['About Us', 'Careers', 'Blog', 'Contact'].map(item => (
                            <Typography key={item} variant="body2" sx={{ color: '#64748b', mb: 1, cursor: 'pointer', '&:hover': { color: '#6366f1' } }}>{item}</Typography>
                        ))}
                    </Grid>
                    <Grid item xs={6} md={2}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: '#1e293b' }}>Legal</Typography>
                        {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(item => (
                            <Typography key={item} variant="body2" sx={{ color: '#64748b', mb: 1, cursor: 'pointer', '&:hover': { color: '#6366f1' } }}>{item}</Typography>
                        ))}
                    </Grid>
                </Grid>
                <Box sx={{ mt: 8, textAlign: 'center' }}>
                    <Typography variant="caption" sx={{ color: '#cbd5e1' }}>
                        © 2026 TaskMaster Inc. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default FAQFooter;
