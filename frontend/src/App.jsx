import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header';
import TaskBoardNew from './components/TaskBoardNew';

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
        <div className="min-h-screen">
          <Header />
          <Routes>
            <Route path="/" element={<TaskBoardNew />} />
            <Route path="/tasks" element={<TaskBoardNew />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
