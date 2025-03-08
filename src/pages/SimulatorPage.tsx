
import React, { useState } from 'react';
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
      
      <Footer />
    </div>
  );
};

export default SimulatorPage;
