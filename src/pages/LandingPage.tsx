
/** @jsxImportSource react */
import React from 'react';
import LanguageSelector from '@/components/LanguageSelector';
import HelpDialog from '@/components/HelpDialog';
import Footer from '@/components/Footer';
import HeroSection from '@/components/landing/HeroSection';
import FeatureCards from '@/components/landing/FeatureCards';
import VisualizationPanel from '@/components/landing/VisualizationPanel';
import Background from '@/components/landing/Background';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col relative bg-cybernetic text-white">
      <div className="absolute top-6 right-6 z-10 scale-75 md:scale-100 origin-top-right">
        <LanguageSelector />
      </div>
      
      <div className="absolute top-6 right-20 z-10 scale-75 md:scale-100 origin-top-right">
        <HelpDialog />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-4 py-12 md:py-24 relative z-10 overflow-hidden">
        <div className="w-full max-w-6xl">
          <HeroSection />
          <FeatureCards />
          <VisualizationPanel />
        </div>
      </div>
      
      <Background />
      <Footer />
    </div>
  );
};

export default LandingPage;
