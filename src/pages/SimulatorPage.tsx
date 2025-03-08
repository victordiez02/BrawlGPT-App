
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import DraftSimulator from '@/components/DraftSimulator';
import LanguageSelector from '@/components/LanguageSelector';
import MapSelectionPage from '@/components/MapSelectionPage';
import Footer from '@/components/Footer';
import { GameMap } from '@/lib/maps';
import { useTranslation } from 'react-i18next';

const SimulatorPage: React.FC = () => {
  const [selectedMap, setSelectedMap] = useState<GameMap | null>(null);
  const { t } = useTranslation();
  
  // Sparkle effect on page load
  const [showSparkle, setShowSparkle] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSparkle(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen pb-12 bg-cybernetic text-white">
      {showSparkle && (
        <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center opacity-30">
          <img 
            src="/lovable-uploads/73ba99c9-265c-40aa-92f7-016afd79fabb.png" 
            alt="Brawl Stars Logo" 
            className="w-96 h-96 animate-pulse-slow"
          />
        </div>
      )}
      
      <Header />
      <div className="absolute top-6 right-6 z-10">
        <LanguageSelector />
      </div>
      
      <main className="container mx-auto pb-20 relative z-10">
        {selectedMap ? (
          <DraftSimulator initialMap={selectedMap} />
        ) : (
          <MapSelectionPage onSelectMap={setSelectedMap} />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default SimulatorPage;
