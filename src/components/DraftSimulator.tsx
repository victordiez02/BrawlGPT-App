
import React, { useState, useEffect } from 'react';
import { brawlers, Brawler } from '@/lib/brawlers';
import { GameMap, gameMaps } from '@/lib/maps';
import MapSelector from './MapSelector';
import TeamSelector from './TeamSelector';
import DraftTeam from './DraftTeam';
import BannedBrawlers from './BannedBrawlers';
import BrawlerGrid from './BrawlerGrid';
import ResultModal from './ResultModal';
import { ApiResponse, DraftData, submitDraft } from '@/lib/api';
import { ArrowLeft, Loader2, Zap } from 'lucide-react';
import { toast } from 'sonner';

const DraftSimulator: React.FC = () => {
  // State management
  const [selectedMap, setSelectedMap] = useState<GameMap | null>(null);
  const [userTeam, setUserTeam] = useState<'blue' | 'red'>('blue');
  const [selectedBrawlers, setSelectedBrawlers] = useState<(number | null)[]>([null, null, null, null, null, null]);
  const [bannedBrawlers, setBannedBrawlers] = useState<number[]>([]);
  const [currentPickIndex, setCurrentPickIndex] = useState<number>(0);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [apiResult, setApiResult] = useState<ApiResponse | null>(null);
  const [showResultModal, setShowResultModal] = useState<boolean>(false);
  
  // Determine which team is currently picking
  const currentPickTeam = currentPickIndex % 2 === 0 ? 'blue' : 'red';
  
  // Handle brawler selection
  const handleSelectBrawler = (brawler: Brawler) => {
    // Skip if the brawler is already selected or banned
    if (selectedBrawlers.includes(brawler.id) || bannedBrawlers.includes(brawler.id)) {
      return;
    }
    
    // Update selected brawlers
    const newSelectedBrawlers = [...selectedBrawlers];
    newSelectedBrawlers[currentPickIndex] = brawler.id;
    setSelectedBrawlers(newSelectedBrawlers);
    
    // Move to next pick if not at the end
    if (currentPickIndex < 5) {
      setCurrentPickIndex(currentPickIndex + 1);
    }
    
    // Show success toast
    toast.success(`${brawler.name} seleccionado para el equipo ${currentPickTeam === 'blue' ? 'Azul' : 'Rojo'}`);
  };
  
  // Handle brawler removal
  const handleRemoveBrawler = (index: number) => {
    const newSelectedBrawlers = [...selectedBrawlers];
    const removedBrawlerId = newSelectedBrawlers[index];
    
    // Only proceed if there's a brawler to remove
    if (removedBrawlerId !== null) {
      const brawler = brawlers.find(b => b.id === removedBrawlerId);
      if (brawler) {
        toast.info(`${brawler.name} eliminado del draft`);
      }
      
      newSelectedBrawlers[index] = null;
      setSelectedBrawlers(newSelectedBrawlers);
      
      // Set current pick index to the removed slot
      setCurrentPickIndex(index);
    }
  };
  
  // Handle banning a brawler
  const handleBanBrawler = (brawlerId: number) => {
    // Skip if already banned or selected
    if (bannedBrawlers.includes(brawlerId) || selectedBrawlers.includes(brawlerId)) {
      return;
    }
    
    const brawler = brawlers.find(b => b.id === brawlerId);
    if (brawler) {
      toast.info(`${brawler.name} baneado`);
      setBannedBrawlers([...bannedBrawlers, brawlerId]);
    }
  };
  
  // Handle unbanning a brawler
  const handleUnbanBrawler = (brawlerId: number) => {
    const brawler = brawlers.find(b => b.id === brawlerId);
    if (brawler) {
      toast.info(`Ban de ${brawler.name} eliminado`);
    }
    
    setBannedBrawlers(bannedBrawlers.filter(id => id !== brawlerId));
  };
  
  // Generate API request
  const handleGenerateRecommendation = async () => {
    // Validate requirements
    if (!selectedMap) {
      toast.error('Debes seleccionar un mapa');
      return;
    }
    
    // Count filled picks
    const filledPicks = selectedBrawlers.filter(id => id !== null).length;
    if (filledPicks < 3) {
      toast.error('Debes seleccionar al menos 3 brawlers para el draft');
      return;
    }
    
    setIsGenerating(true);
    
    try {
      // Prepare draft data
      const draftData: DraftData = {
        map: {
          id: selectedMap.id,
          name: selectedMap.name,
          mode: selectedMap.mode
        },
        userTeam,
        blueTeam: selectedBrawlers.slice(0, 3),
        redTeam: selectedBrawlers.slice(3, 6),
        banned: bannedBrawlers
      };
      
      // Call API
      const result = await submitDraft(draftData);
      setApiResult(result);
      setShowResultModal(true);
    } catch (error) {
      console.error('Error generating recommendation:', error);
      toast.error('Error al generar la recomendación. Inténtalo de nuevo.');
    } finally {
      setIsGenerating(false);
    }
  };
  
  // Reset draft
  const handleResetDraft = () => {
    if (window.confirm('¿Estás seguro de querer reiniciar el draft? Perderás todas las selecciones actuales.')) {
      setSelectedBrawlers([null, null, null, null, null, null]);
      setCurrentPickIndex(0);
      toast.info('Draft reiniciado');
    }
  };
  
  return (
    <div className="w-full max-w-6xl mx-auto px-4 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-2">
          <MapSelector 
            selectedMap={selectedMap} 
            onSelectMap={setSelectedMap} 
          />
        </div>
        <div>
          <TeamSelector 
            selectedTeam={userTeam}
            onSelectTeam={setUserTeam}
          />
        </div>
      </div>
      
      <div className="glass-panel mb-6 overflow-hidden">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Draft en Curso</h2>
            <button
              onClick={handleResetDraft}
              className="flex items-center text-sm text-gray-600 hover:text-red-500 transition-colors"
            >
              <ArrowLeft size={16} className="mr-1" /> Reiniciar
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DraftTeam
              team="blue"
              brawlerIds={selectedBrawlers.slice(0, 3)}
              activeSlot={currentPickTeam === 'blue' ? currentPickIndex : null}
              currentPickTeam={currentPickTeam}
              onRemoveBrawler={handleRemoveBrawler}
            />
            
            <DraftTeam
              team="red"
              brawlerIds={selectedBrawlers.slice(3, 6)}
              activeSlot={currentPickTeam === 'red' ? currentPickIndex - 3 : null}
              currentPickTeam={currentPickTeam}
              onRemoveBrawler={handleRemoveBrawler}
            />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-brawl-blue via-brawl-purple to-brawl-red h-1"></div>
        
        <div className="p-4 bg-gray-50 dark:bg-gray-800/50">
          <button
            onClick={handleGenerateRecommendation}
            disabled={isGenerating}
            className="btn-success w-full flex items-center justify-center"
          >
            {isGenerating ? (
              <>
                <Loader2 size={20} className="mr-2 animate-spin" />
                Generando...
              </>
            ) : (
              <>
                <Zap size={20} className="mr-2" />
                Generar Mejor Opción
              </>
            )}
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-1 order-2 md:order-1">
          <BannedBrawlers
            bannedBrawlers={bannedBrawlers}
            onBanBrawler={handleBanBrawler}
            onUnbanBrawler={handleUnbanBrawler}
          />
        </div>
        
        <div className="md:col-span-2 order-1 md:order-2">
          <BrawlerGrid
            brawlers={brawlers}
            selectedBrawlers={selectedBrawlers}
            bannedBrawlers={bannedBrawlers}
            onSelectBrawler={handleSelectBrawler}
          />
        </div>
      </div>
      
      <ResultModal
        isOpen={showResultModal}
        onClose={() => setShowResultModal(false)}
        result={apiResult}
      />
    </div>
  );
};

export default DraftSimulator;
