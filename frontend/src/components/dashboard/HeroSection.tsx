import { motion } from 'framer-motion';
import { Box, Container } from '@mui/material';
import DashboardMockup from '../../assets/ui_realtime_task.png';

const HeroSection = () => {

    return (
        <Box
            sx={{
                position: 'relative',
                pt: { xs: 4, md: 8 },
                pb: { xs: 4, md: 8 },
                overflow: 'hidden',
            }}
        >

            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                >
                    <Box
                        sx={{
                            position: 'relative',
                            borderRadius: '24px',
                            overflow: 'hidden',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
                            backdropFilter: 'blur(20px)',
                        }}
                    >
                        <Box sx={{ width: '100%', height: 'auto', bgcolor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img src={DashboardMockup} alt="Dashboard Preview" style={{ width: '100%', height: 'auto', display: 'block' }} />
                        </Box>
                    </Box>
                </motion.div>
            </Container>
        </Box>
    );
};

export default HeroSection;
