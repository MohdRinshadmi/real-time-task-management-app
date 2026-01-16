
import { Box, Typography } from '@mui/material';

const StatsSection = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
        gap: { xs: 4, md: 6 },
        mb: { xs: 8, md: 12 },
        px: { xs: 3, md: 0 },
      }}
    >
      {/* Stat 1 */}
      <Box
        sx={{
          textAlign: 'center',
          py: { xs: 3, md: 4 },
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            right: { xs: '50%', md: 0 },
            top: '50%',
            transform: { xs: 'translateY(calc(100% + 20px))', md: 'translateY(-50%)' },
            width: { xs: '60%', md: '1px' },
            height: { xs: '1px', md: '60%' },
            background: '#E2E8F0',
            display: { xs: 'none', md: 'block' },
          },
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontSize: { xs: '3rem', md: '4rem' },
            fontWeight: 500,
            color: '#5F6AF4',
            lineHeight: 1,
            mb: 2,
            letterSpacing: '-0.02em',
          }}
        >
          80<span style={{ fontSize: '0.5em', verticalAlign: 'super' }}>%</span>
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontSize: { xs: '0.75rem', md: '0.8125rem' },
            color: '#94A3B8',
            lineHeight: 1.6,
            maxWidth: 200,
            mx: 'auto',
            fontWeight: 400,
          }}
        >
          Seamless collaboration and effective task management.
        </Typography>
      </Box>

      {/* Stat 2 */}
      <Box
        sx={{
          textAlign: 'center',
          py: { xs: 3, md: 4 },
          position: 'relative',
          borderTop: { xs: '1px solid #E2E8F0', md: 'none' },
          borderBottom: { xs: '1px solid #E2E8F0', md: 'none' },
          '&::after': {
            content: '""',
            position: 'absolute',
            right: { xs: '50%', md: 0 },
            top: '50%',
            transform: { xs: 'translateY(calc(100% + 20px))', md: 'translateY(-50%)' },
            width: { xs: '60%', md: '1px' },
            height: { xs: '1px', md: '60%' },
            background: '#E2E8F0',
            display: { xs: 'none', md: 'block' },
          },
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontSize: { xs: '3rem', md: '4rem' },
            fontWeight: 500,
            color: '#5F6AF4',
            lineHeight: 1,
            mb: 2,
            letterSpacing: '-0.02em',
          }}
        >
          10K<span style={{ fontSize: '0.5em', verticalAlign: 'super' }}>+</span>
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontSize: { xs: '0.75rem', md: '0.8125rem' },
            color: '#94A3B8',
            lineHeight: 1.6,
            maxWidth: 240,
            mx: 'auto',
            fontWeight: 400,
          }}
        >
          Remote teams across industries rely on our platform for seamless collaboration.
        </Typography>
      </Box>

      {/* Stat 3 */}
      <Box
        sx={{
          textAlign: 'center',
          py: { xs: 3, md: 4 },
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontSize: { xs: '3rem', md: '4rem' },
            fontWeight: 500,
            color: '#5F6AF4',
            lineHeight: 1,
            mb: 2,
            letterSpacing: '-0.02em',
          }}
        >
          98<span style={{ fontSize: '0.5em', verticalAlign: 'super' }}>%</span>
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontSize: { xs: '0.75rem', md: '0.8125rem' },
            color: '#94A3B8',
            lineHeight: 1.6,
            maxWidth: 240,
            mx: 'auto',
            fontWeight: 400,
          }}
        >
          Users rate us highly for our platform's ease of use and workflow impact.
        </Typography>
      </Box>
    </Box>
  );
};

export default StatsSection;
