import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MainDashboard from './views/MainDashboard';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5b68f4',
    },
    secondary: {
      main: '#8b7ff6',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<MainDashboard />} />
          <Route path="/tasks" element={<MainDashboard />} />
          <Route path="/team" element={<MainDashboard />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
