
import TaskBoardLayout from '../../components/glassDashboard/TaskBoardLayout';
import { useSelector } from 'react-redux';
import LandingPage from '../LandingPage/LandingPage';
import { RootState } from '../../store/store';

const MainDashboard = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);


  return (
    <div>
      <main>
        {isLoggedIn ? <TaskBoardLayout /> : <LandingPage />}
      </main>
    </div>
  );
};



export default MainDashboard;
