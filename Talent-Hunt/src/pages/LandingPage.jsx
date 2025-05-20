// src/pages/LandingPage/LandingPage.jsx
import React from 'react';
import { Hero } from '../components/landing';
import { ServiceOptions } from '../components/landing';
import { FeatureSection } from '../components/landing';
import { MainLayout } from '../components/layout';

const LandingPage = () => {
  return (
    <MainLayout>
      <Hero />
      <ServiceOptions />
      <FeatureSection />
    </MainLayout>
  );
};

export default LandingPage;