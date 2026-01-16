import React from 'react';
import Dashboard from '../../components/dashboard/Dashboard';
import Header from '../../components/header/Header';
import TaskBoardLayout from '../../components/glassDashboard/TaskBoardLayout';
import { useSelector } from 'react-redux';
import LandingPage from '../LandingPage/LandingPage';

const MainDashboard = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);


  return (
    <div>
      <main>
        {isLoggedIn ? <TaskBoardLayout /> : <LandingPage />}
      </main>
    </div>
  );
};



export default MainDashboard;
