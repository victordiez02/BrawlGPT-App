
import React, { useState } from 'react';
import Header from '@/components/Header';
import DraftSimulator from '@/components/DraftSimulator';
import LanguageSelector from '@/components/LanguageSelector';
import MapSelectionPage from '@/components/MapSelectionPage';
import { GameMap } from '@/lib/maps';
import { useTranslation } from 'react-i18next';

const SimulatorPage: React.FC = () => {
  const [selectedMap, setSelectedMap] = useState<GameMap | null>(null);
  const { t } = useTranslation();
  const [logoHover, setLogoHover] = useState(false);

  return (
    <div className="min-h-screen pb-12 bg-cybernetic text-white">
      <Header />
      <div className="absolute top-6 right-6 z-10">
        <LanguageSelector />
      </div>
      
      <main className="container mx-auto pb-20">
        {selectedMap ? (
          <DraftSimulator initialMap={selectedMap} />
        ) : (
          <MapSelectionPage onSelectMap={setSelectedMap} />
        )}
      </main>
      
      <div 
        className="fixed bottom-4 right-4 transition-all duration-300 z-20"
        style={{ 
          transform: logoHover ? 'scale(1.5) rotate(10deg)' : 'scale(1.2) rotate(0deg)',
          opacity: logoHover ? 1 : 0.9
        }}
        onMouseEnter={() => setLogoHover(true)}
        onMouseLeave={() => setLogoHover(false)}
        onClick={() => window.open('https://brawlstars.com', '_blank')}
      >
        <img 
          src="/lovable-uploads/73ba99c9-265c-40aa-92f7-016afd79fabb.png" 
          alt="Brawl Stars Logo" 
          className="w-24 h-24 cursor-pointer drop-shadow-lg"
        />
      </div>
    </div>
  );
};

export default SimulatorPage;
