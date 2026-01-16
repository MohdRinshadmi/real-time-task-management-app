import React from 'react';
import { Box } from '@mui/material';
import HeroSection from '../../components/dashboard/HeroSection';
import BrandStrip from '../../components/landing/BrandStrip';
import FeatureCards from '../../components/landing/FeatureCards';
import DeepDiveSection from '../../components/landing/DeepDiveSection';
import Testimonials from '../../components/landing/Testimonials';
import FAQFooter from '../../components/landing/FAQFooter';
import Dashboard from '../../components/dashboard/Dashboard';
import BrandShowCase from '../../components/dashboard/BrandShowCase';
import Header from '../../components/header/Header';

import { useSelector } from 'react-redux';

const LandingPage = () => {
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
