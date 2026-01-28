
import { Box, Typography } from '@mui/material';

const BrandShowCase = () => {
  return (
    <Box sx={{ textAlign: 'center', mt: 6, mb: 8 }}>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{
          opacity: 0.7,
          fontSize: { xs: '0.875rem', md: '1rem' },
          mb: 4,
          fontWeight: 500,
        }}
      >
        More than 10,000 teams are boosting productivity with CollabNow
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: { xs: 4, sm: 8, md: 16 },
          flexWrap: 'wrap',
          px: { xs: 2, md: 0 },
        }}
      >
        <Box sx={{ opacity: 0.5, transition: 'opacity 0.3s', '&:hover': { opacity: 0.9 }, width: { xs: '80px', sm: '120px', md: '150px' } }}>
          <svg width="100%" height="40" viewBox="0 0 200 60" fill="none" preserveAspectRatio="xMidYMid meet">
            <g>
              <path d="M50.1045 10.8978C45.5792 8.8214 40.7265 7.2916 35.6527 6.41542C35.5603 6.39851 35.468 6.44077 35.4204 6.52529C34.7963 7.6353 34.105 9.0834 33.6209 10.2216C28.1637 9.4046 22.7345 9.4046 17.3892 10.2216C16.905 9.0581 16.1886 7.6353 15.5617 6.52529C15.5141 6.44359 15.4218 6.40133 15.3294 6.41542C10.2584 7.2888 5.4057 8.8186 0.877602 10.8978C0.838402 10.9147 0.804802 10.9429 0.782502 10.9795C-8.42205 24.7309 -10.9436 38.1443 -9.70659 51.3914C-9.70099 51.4562 -9.66461 51.5182 -9.61424 51.5576C-3.54134 56.0174 2.34134 58.7249 8.11474 60.5195C8.20714 60.5477 8.30504 60.5139 8.36384 60.4378C9.72954 58.5728 10.9469 56.6063 11.9907 54.5383C12.0523 54.4172 11.9935 54.2735 11.8676 54.2256C9.93664 53.4931 8.09794 52.6 6.32924 51.5858C6.18934 51.5041 6.17814 51.304 6.30684 51.2082C6.67904 50.9293 7.05134 50.6391 7.40674 50.3461C7.47104 50.2926 7.56064 50.2813 7.63624 50.3151C19.2558 55.6202 31.8354 55.6202 43.3179 50.3151C43.3935 50.2785 43.4831 50.2898 43.5502 50.3433C43.9057 50.6363 44.2779 50.9293 44.6529 51.2082C44.7816 51.304 44.7732 51.5041 44.6333 51.5858C42.8646 52.6197 41.0259 53.4931 39.0921 54.2228C38.9662 54.2707 38.9102 54.4172 38.9718 54.5383C40.038 56.6034 41.2554 58.5699 42.5959 60.435C42.6519 60.5139 42.7526 60.5477 42.845 60.5195C48.6464 58.7249 54.529 56.0174 60.6019 51.5576C60.6551 51.5182 60.6887 51.459 60.6943 51.3942C62.1747 36.0791 58.2147 22.7757 50.1968 10.9823C50.1772 10.9429 50.1437 10.9147 50.1045 10.8978ZM13.7259 43.3253C10.2276 43.3253 7.34514 40.1136 7.34514 36.1693C7.34514 32.225 10.1717 29.0133 13.7259 29.0133C17.308 29.0133 20.1626 32.2532 20.1066 36.1693C20.1066 40.1136 17.28 43.3253 13.7259 43.3253ZM37.3178 43.3253C33.8196 43.3253 30.9371 40.1136 30.9371 36.1693C30.9371 32.225 33.7636 29.0133 37.3178 29.0133C40.9 29.0133 43.7545 32.2532 43.6986 36.1693C43.6986 40.1136 40.9 43.3253 37.3178 43.3253Z" fill="#5865F2" />
              <text x="70" y="40" fontSize="24" fontWeight="600" fill="#333">Discord</text>
            </g>
          </svg>
        </Box>

        <Box sx={{ opacity: 0.5, transition: 'opacity 0.3s', '&:hover': { opacity: 0.9 }, width: { xs: '70px', sm: '100px', md: '140px' } }}>
          <svg width="100%" height="40" viewBox="0 0 169 40" fill="none" preserveAspectRatio="xMidYMid meet">
            <path d="M16.875 0C7.55859 0 0 7.55859 0 16.875C0 26.1914 7.55859 33.75 16.875 33.75C26.1914 33.75 33.75 26.1914 33.75 16.875C33.75 7.55859 26.1914 0 16.875 0ZM16.875 30.9375C9.11719 30.9375 2.8125 24.6328 2.8125 16.875C2.8125 9.11719 9.11719 2.8125 16.875 2.8125C24.6328 2.8125 30.9375 9.11719 30.9375 16.875C30.9375 24.6328 24.6328 30.9375 16.875 30.9375Z" fill="#00A82D" />
            <text x="45" y="26" fontSize="24" fontWeight="600" fill="#333">Evernote</text>
          </svg>
        </Box>

        <Box sx={{ opacity: 0.5, transition: 'opacity 0.3s', '&:hover': { opacity: 0.9 }, width: { xs: '70px', sm: '100px', md: '140px' } }}>
          <svg width="100%" height="40" viewBox="0 0 200 40" fill="none" preserveAspectRatio="xMidYMid meet">
            <path d="M12.293 8.293a1 1 0 011.414 0l8 8a1 1 0 010 1.414l-8 8a1 1 0 01-1.414-1.414L19.586 17l-7.293-7.293a1 1 0 010-1.414z" fill="#FCB400" />
            <rect x="6" y="12" width="4" height="16" rx="1" fill="#FCB400" />
            <rect x="14" y="8" width="4" height="24" rx="1" fill="#FCB400" />
            <rect x="22" y="12" width="4" height="16" rx="1" fill="#FCB400" />
            <text x="35" y="26" fontSize="24" fontWeight="600" fill="#333">Airtable</text>
          </svg>
        </Box>

        <Box sx={{ opacity: 0.5, transition: 'opacity 0.3s', '&:hover': { opacity: 0.9 }, width: { xs: '70px', sm: '100px', md: '140px' } }}>
          <svg width="100%" height="40" viewBox="0 0 180 40" fill="none" preserveAspectRatio="xMidYMid meet">
            <path d="M10 6l8 6-8 6-8-6 8-6zm16 0l8 6-8 6-8-6 8-6zM2 24l8-6 8 6-8 6-8-6zm16 0l8-6 8 6-8 6-8-6z" fill="#0061FF" />
            <text x="45" y="26" fontSize="24" fontWeight="600" fill="#333">Dropbox</text>
          </svg>
        </Box>

        <Box sx={{ opacity: 0.5, transition: 'opacity 0.3s', '&:hover': { opacity: 0.9 }, width: { xs: '60px', sm: '90px', md: '120px' } }}>
          <svg width="100%" height="40" viewBox="0 0 150 40" fill="none" preserveAspectRatio="xMidYMid meet">
            <rect x="6" y="8" width="22" height="22" rx="4" fill="#3E4348" />
            <rect x="10" y="12" width="14" height="14" rx="2" fill="white" />
            <text x="38" y="26" fontSize="24" fontWeight="600" fill="#333">Square</text>
          </svg>
        </Box>

        <Box sx={{ opacity: 0.5, transition: 'opacity 0.3s', '&:hover': { opacity: 0.9 }, width: { xs: '60px', sm: '90px', md: '120px' } }}>
          <svg width="100%" height="40" viewBox="0 0 150 40" fill="none" preserveAspectRatio="xMidYMid meet">
            <path d="M8 6h18c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2z" fill="white" stroke="#000" strokeWidth="2" />
            <path d="M12 10h10v2H12v-2zm0 4h10v2H12v-2zm0 4h6v2h-6v-2z" fill="#000" />
            <text x="38" y="26" fontSize="24" fontWeight="600" fill="#333">Notion</text>
          </svg>
        </Box>
      </Box>
    </Box>
  );
};

export default BrandShowCase;
