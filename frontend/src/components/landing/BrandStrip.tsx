
import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const brands = [
    'SmartPay', 'WorkFlow', 'CloudScale', 'NextGen', 'FastTask', 'LogiTech', 'SendSwift'
];

const BrandStrip = () => {
    return (
        <Box sx={{ py: 6, bgcolor: '#ffffff', borderBottom: '1px solid #f1f5f9' }}>
            <Container maxWidth="lg">
                <Typography
                    variant="body2"
                    align="center"
                    sx={{ mb: 4, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 600 }}
                >
                    Trusted by innovative teams globally
                </Typography>

                <Box
                    component={motion.div}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ staggerChildren: 0.1 }}
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: { xs: 4, md: 8 },
                        alignItems: 'center',
                        opacity: 0.6
                    }}
                >
                    {brands.map((brand, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Typography
                                variant="h5"
                                sx={{
                                    color: '#cbd5e1',
                                    fontWeight: 700,
                                    fontFamily: 'Inter, sans-serif',
                                    userSelect: 'none',
                                    '&:hover': { color: '#94a3b8', cursor: 'default' }
                                }}
                            >
                                {brand}
                            </Typography>
                        </motion.div>
                    ))}
                </Box>
            </Container>
        </Box>
    );
};

export default BrandStrip;
