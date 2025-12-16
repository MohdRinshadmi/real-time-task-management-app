import React from 'react';
import Dashboard from '../../components/dashboard/Dashboard';
import Header from '../../components/header/Header';
import TaskBoard from '../../components/taskBoard/TaskBoard';

const MainDashboard = () => {
  const login = true;
  return (
    <div className="min-h-screen relative" style={{ background: 'linear-gradient(180deg, #E6ECFF 0%, #F4F7FF 40%, #FFFFFF 100%)' }}>
      {/* Header overlays above TaskBoard */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 10 }}>
        <Header />
      </div>

      {/* TaskBoard background visually wraps header */}
      <main className="pt-12">
        {login ? (
          <TaskBoard />
        ) : (
          <div>
            <Dashboard />
          </div>
        )}
      </main>
    </div>
  );
};

export default MainDashboard;
