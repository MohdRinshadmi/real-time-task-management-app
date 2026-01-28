import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';
import CssBaseline from '@mui/material/CssBaseline';
import { getAccessToken } from './global/localStorage';
import ShimmerLoader from './components/ShimmerLoader';

// Lazy load route components for code splitting
const MainDashboard = lazy(() => import('./views/dashboard/MainDashboard'));
const Register = lazy(() => import('./views/register/Register'));
const LandingPage = lazy(() => import('./views/LandingPage/LandingPage'));

function App(): React.ReactElement {
  const token: string | null = getAccessToken();
  console.log('get tokennnnnnn', token);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Suspense fallback={<ShimmerLoader />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<MainDashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;