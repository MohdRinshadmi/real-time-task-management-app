import React from 'react';
import Header from '../components/Header';
import TaskBoard from "../components/TaskBoard"

const MainDashboard = () => {
  return (
    <div className="min-h-screen relative" style={{ background: 'linear-gradient(180deg, #E6ECFF 0%, #F4F7FF 40%, #FFFFFF 100%)' }}>
      {/* Header overlays above TaskBoard */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 10 }}>
        <Header />
      </div>

      {/* TaskBoard background visually wraps header */}
      <main className="pt-12">
        <div className="mb-6">
          <TaskBoard />
        </div>
      </main>
    </div>
  );
};

export default MainDashboard;
