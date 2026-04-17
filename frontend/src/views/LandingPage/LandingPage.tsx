
import FeatureCards from '../../components/landing/FeatureCards';
import DeepDiveSection from '../../components/landing/DeepDiveSection';
import Testimonials from '../../components/landing/Testimonials';
import FAQFooter from '../../components/landing/FAQFooter';
import Dashboard from '../../components/dashboard/Dashboard';
import Header from '../../components/header/Header';

import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const LandingPage = () => {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const showHeader = !isLoggedIn;
    return (
        <div>
            {showHeader && (
                <header>
                    <Header />
                </header>
            )}
            <main>
                <Dashboard />
                <FeatureCards />
                <DeepDiveSection />
                <Testimonials />
                <FAQFooter />
            </main>
        </div>
    );
};

export default LandingPage;
