import { useEffect, useRef } from 'react';
import { Box, Container, Stack, useTheme, alpha } from '@mui/material';
import anime from 'animejs';

const ShimmerLoader = (): React.ReactElement => {
    const shimmerRef = useRef<HTMLDivElement>(null);
    const theme = useTheme();

    // Use theme's primary color with low opacity for shimmer boxes
    const shimmerBoxColor = alpha(theme.palette.primary.main, 0.08);

    useEffect(() => {
        if (!shimmerRef.current) return;

        // Animate all shimmer elements with staggered timing
        anime({
            targets: '.shimmer-item',
            opacity: [0.3, 1, 0.3],
            duration: 2000,
            easing: 'easeInOutQuad',
            loop: true,
            delay: anime.stagger(100),
        });

        // Animate the shimmer overlay (mirror reflection effect)
        anime({
            targets: '.shimmer-overlay',
            translateX: ['-100%', '100%'],
            duration: 1500,
            easing: 'easeInOutQuad',
            loop: true,
            direction: 'normal',
        });
    }, []);

    return (
        <Box
            ref={shimmerRef}
            sx={{
                minHeight: '100vh',
                backgroundColor: 'background.default',
                pt: 4,
                overflow: 'hidden',
            }}
        >
            <Container maxWidth="lg">
                <Stack spacing={3}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box
                            className="shimmer-item"
                            sx={{
                                width: 200,
                                height: 60,
                                borderRadius: 1,
                                backgroundColor: shimmerBoxColor,
                                position: 'relative',
                                overflow: 'hidden',
                            }}
                        >
                            <Box
                                className="shimmer-overlay"
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                                }}
                            />
                        </Box>
                        <Box
                            className="shimmer-item"
                            sx={{
                                width: 40,
                                height: 40,
                                borderRadius: '50%',
                                backgroundColor: shimmerBoxColor,
                                position: 'relative',
                                overflow: 'hidden',
                            }}
                        >
                            <Box
                                className="shimmer-overlay"
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                                }}
                            />
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                        {[1, 2, 3].map((item) => (
                            <Box
                                key={item}
                                className="shimmer-item"
                                sx={{
                                    width: 100,
                                    height: 40,
                                    borderRadius: 1,
                                    backgroundColor: shimmerBoxColor,
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}
                            >
                                <Box
                                    className="shimmer-overlay"
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                                    }}
                                />
                            </Box>
                        ))}
                    </Box>

                    <Box
                        className="shimmer-item"
                        sx={{
                            width: '100%',
                            height: 300,
                            borderRadius: 2,
                            backgroundColor: shimmerBoxColor,
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        <Box
                            className="shimmer-overlay"
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                            }}
                        />
                    </Box>

                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 3 }}>
                        {[1, 2, 3].map((item) => (
                            <Box
                                key={item}
                                className="shimmer-item"
                                sx={{
                                    height: 200,
                                    borderRadius: 2,
                                    backgroundColor: shimmerBoxColor,
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}
                            >
                                <Box
                                    className="shimmer-overlay"
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                                    }}
                                />
                            </Box>
                        ))}
                    </Box>

                    <Stack spacing={2}>
                        {[60, 80, 70].map((width, index) => (
                            <Box
                                key={index}
                                className="shimmer-item"
                                sx={{
                                    width: `${width}%`,
                                    height: index === 0 ? 40 : 30,
                                    borderRadius: 1,
                                    backgroundColor: shimmerBoxColor,
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}
                            >
                                <Box
                                    className="shimmer-overlay"
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                                    }}
                                />
                            </Box>
                        ))}
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
};

export default ShimmerLoader;

