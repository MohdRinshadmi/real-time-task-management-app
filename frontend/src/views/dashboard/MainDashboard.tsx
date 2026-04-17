
import TaskBoardLayout from '../../components/glassDashboard/TaskBoardLayout';
import { useSelector } from 'react-redux';
import LandingPage from '../LandingPage/LandingPage';
import { RootState } from '../../store/store';
import { logger } from '../../utils/console.log';

const MainDashboard = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <div>
      <main>
        {isLoggedIn ? <TaskBoardLayout isLoggedIn={isLoggedIn} /> : <LandingPage />}
      </main>
    </div>
  );
};



export default MainDashboard;
