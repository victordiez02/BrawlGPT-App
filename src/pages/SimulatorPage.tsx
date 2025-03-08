
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import DraftSimulator from '@/components/DraftSimulator';
import LanguageSelector from '@/components/LanguageSelector';
import MapSelectionPage from '@/components/MapSelectionPage';
import Footer from '@/components/Footer';
import { GameMap } from '@/lib/maps';
import { useTranslation } from 'react-i18next';
import { Sparkle } from 'lucide-react';

const SimulatorPage: React.FC = () => {
  const [selectedMap, setSelectedMap] = useState<GameMap | null>(null);
  const [showIconBS, setShowIconBS] = useState(true);
  const { t } = useTranslation();

  // Efecto para mostrar el icono solo durante un segundo al cargar
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIconBS(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen pb-12 bg-cybernetic text-white">
      <Header />
      <div className="absolute top-6 right-6 z-10">
        <LanguageSelector />
      </div>
      
      <main className="container mx-auto pb-20 relative">
        {showIconBS && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-fade-in z-10">
            <Sparkle className="text-yellow-400 opacity-80" size={100} />
          </div>
        )}
        
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
