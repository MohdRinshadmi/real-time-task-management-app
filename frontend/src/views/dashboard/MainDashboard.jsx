import React from 'react';
import Dashboard from '../../components/dashboard/Dashboard';
import Header from '../../components/header/Header';
import TaskBoardLayout from '../../components/glassDashboard/TaskBoardLayout';
import { useSelector } from 'react-redux';

const MainDashboard = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const showHeader = !isLoggedIn;

  return (
    <div>
      {showHeader && (
        <header>
          <Header />
        </header>
      )}

      <main>
        {isLoggedIn ? <TaskBoardLayout /> : <Dashboard />}
      </main>
    </div>
  );
};



export default MainDashboard;
