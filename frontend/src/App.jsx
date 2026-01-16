import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';
import CssBaseline from '@mui/material/CssBaseline';
import MainDashboard from './views/dashboard/MainDashboard';
import Register from './views/register/Register';
import LandingPage from './views/LandingPage/LandingPage';
import { useSelector } from 'react-redux';
import { getAccessToken } from './global/localStorage';

function App() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const token = getAccessToken();
  console.log('get tokennnnnnn', token);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<MainDashboard isLoggedIn={isLoggedIn} token={token} />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
