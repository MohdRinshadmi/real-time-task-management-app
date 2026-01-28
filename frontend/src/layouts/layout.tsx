import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../components/header/Header';
import Dashboard from '../components/dashboard/Dashboard';
import TaskBoard from '../components/taskBoard/TaskBoard';
import TaskBoardLayout from '../components/glassDashboard/TaskBoardLayout';
import LandingPage from '../views/LandingPage/LandingPage';
import { RootState } from '../store/store';

interface LayoutProps {
  children?: React.ReactNode;
  isLoggedIn?: boolean;
  showHeader?: boolean;
}

// Main Layout for Dashboard with authentication logic
const DashboardLayout: React.FC<{ isLoggedIn?: boolean }> = ({ isLoggedIn: propIsLoggedIn }) => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn) || propIsLoggedIn;

  return (
    <div className="min-h-screen">
      <main>
        {isLoggedIn ? <TaskBoardLayout isLoggedIn={isLoggedIn} /> : <LandingPage />}
      </main>
    </div>
  );
};

// TaskBoard Layout with Header
const TaskBoardLayoutWithHeader: React.FC<{ isLoggedIn?: boolean }> = ({ isLoggedIn }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-4">
        <TaskBoard />
      </main>
    </div>
  );
};

// Glass Dashboard Layout (no header)
const GlassTaskBoardLayout: React.FC<{ isLoggedIn?: boolean }> = ({ isLoggedIn }) => {
  return (
    <div className="min-h-screen">
      <TaskBoardLayout isLoggedIn={isLoggedIn} />
    </div>
  );
};

// Landing Page Layout with conditional header
const LandingPageLayout: React.FC = () => {
  return (
    <div className="min-h-screen">
      <LandingPage />
    </div>
  );
};

// Generic Layout for other pages
const GenericLayout: React.FC<LayoutProps> = ({ children, showHeader = true }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {showHeader && <Header />}
      <main className={showHeader ? "pt-4" : ""}>
        {children}
      </main>
    </div>
  );
};

// Main Layout Component with route-based rendering
const Layout: React.FC<LayoutProps> = ({ children, isLoggedIn = false, showHeader = true }) => {
  const location = useLocation();
  const pathname = location.pathname;

  // Route-specific layout rendering
  const renderLayout = () => {
    switch (pathname) {
      case '/':
      case '/dashboard':
        return <DashboardLayout isLoggedIn={isLoggedIn} />;
      
      case '/taskboard':
      case '/task-board':
        return <TaskBoardLayoutWithHeader isLoggedIn={isLoggedIn} />;
      
      case '/glass-taskboard':
      case '/glass-dashboard':
        return <GlassTaskBoardLayout isLoggedIn={isLoggedIn} />;
      
      case '/landing':
        return <LandingPageLayout />;
      
      default:
        return <GenericLayout showHeader={showHeader}>{children}</GenericLayout>;
    }
  };

  return renderLayout();
};

export default Layout;

// Export individual layout components for direct use
export {
  DashboardLayout,
  TaskBoardLayoutWithHeader,
  GlassTaskBoardLayout,
  LandingPageLayout,
  GenericLayout
};
