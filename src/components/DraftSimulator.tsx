
import React, { useState, useEffect, useMemo } from 'react';
import { brawlers, Brawler } from '@/lib/brawlers';
import { GameMap } from '@/lib/maps';
import MapSelector from './MapSelector';
import TeamSelector from './TeamSelector';
import DraftTeam from './DraftTeam';
import BannedBrawlers from './BannedBrawlers';
import BrawlerGrid from './BrawlerGrid';
import ResultModal from './ResultModal';
import { ApiResponse, DraftData, submitDraft } from '@/lib/api';
import { ArrowLeft, Info, Loader2, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const DraftSimulator: React.FC = () => {
  // State management
  const [selectedMap, setSelectedMap] = useState<GameMap | null>(null);
  const [firstPick, setFirstPick] = useState<'blue' | 'red'>('blue');
  const [selectedBrawlers, setSelectedBrawlers] = useState<(number | null)[]>([null, null, null, null, null, null]);
  const [bannedBrawlers, setBannedBrawlers] = useState<number[]>([]);
  const [currentPickIndex, setCurrentPickIndex] = useState<number>(0);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [apiResult, setApiResult] = useState<ApiResponse | null>(null);
  const [showResultModal, setShowResultModal] = useState<boolean>(false);
  
  // Calculate pick order based on who goes first
  const pickOrder = firstPick === 'blue' 
    ? [0, 3, 4, 1, 2, 5] // Blue first: Blue picks 1st, 4th, 5th; Red picks 2nd, 3rd, 6th
    : [3, 0, 1, 4, 5, 2]; // Red first: Red picks 1st, 4th, 5th; Blue picks 2nd, 3rd, 6th
  
  // Determine which team is currently picking based on the current pick index
  const currentPickTeam = currentPickIndex < 3 ? 'blue' : 'red';

  // Get current draft phase
  const getCurrentDraftPhase = (): number => {
    const filledPicks = selectedBrawlers.filter(id => id !== null).length;
    if (filledPicks === 0) return 1; // First phase - no picks
    if (filledPicks === 1) return 2; // Second phase - only first pick
    if (filledPicks === 3) return 3; // Third phase - picks 1, 2, 3
    if (filledPicks === 5) return 4; // Fourth phase - picks 1, 2, 3, 4, 5
    return 0; // Not a valid phase for recommendations
  };

  // Check if picks match a valid phase
  const isValidPhase = useMemo(() => {
    const filledPositions = selectedBrawlers
      .map((id, index) => ({ id, index }))
      .filter(item => item.id !== null)
      .map(item => item.index);
    
    const phase = getCurrentDraftPhase();
    
    // First phase - no picks
    if (phase === 1 && filledPositions.length === 0) return true;
    
    // Second phase - only first pick
    if (phase === 2 && filledPositions.length === 1) {
      return filledPositions[0] === pickOrder[0];
    }
    
    // Third phase - picks 1, 2, 3
    if (phase === 3 && filledPositions.length === 3) {
      const expectedPositions = [pickOrder[0], pickOrder[1], pickOrder[2]].sort();
      const actualPositions = [...filledPositions].sort();
      return JSON.stringify(expectedPositions) === JSON.stringify(actualPositions);
    }
    
    // Fourth phase - picks 1, 2, 3, 4, 5
    if (phase === 4 && filledPositions.length === 5) {
      const expectedPositions = [pickOrder[0], pickOrder[1], pickOrder[2], pickOrder[3], pickOrder[4]].sort();
      const actualPositions = [...filledPositions].sort();
      return JSON.stringify(expectedPositions) === JSON.stringify(actualPositions);
    }
    
    return false;
  }, [selectedBrawlers, pickOrder]);

  // Generate button state and text
  const generateButtonConfig = useMemo(() => {
    const phase = getCurrentDraftPhase();
    
    if (!selectedMap) {
      return {
        enabled: false,
        text: "Generar Mejor Opción",
        disabledReason: "Selecciona un mapa primero"
      };
    }
    
    if (!isValidPhase) {
      return {
        enabled: false,
        text: "Generar Mejor Opción",
        disabledReason: "Orden de picks incorrecto"
      };
    }
    
    switch (phase) {
      case 1:
        return {
          enabled: true,
          text: "Genera la mejor opción para la primera fase",
          disabledReason: ""
        };
      case 2:
        return {
          enabled: true,
          text: "Genera la mejor opción para la segunda fase",
          disabledReason: ""
        };
      case 3:
        return {
          enabled: true,
          text: "Genera la mejor opción para la tercera fase",
          disabledReason: ""
        };
      case 4:
        return {
          enabled: true,
          text: "Genera la mejor opción para la última fase",
          disabledReason: ""
        };
      default:
        return {
          enabled: false,
          text: "Generar Mejor Opción",
          disabledReason: "Configura el draft correctamente"
        };
    }
  }, [selectedMap, isValidPhase, getCurrentDraftPhase]);
  
  // Handle brawler selection
  const handleSelectBrawler = (brawler: Brawler) => {
    // Skip if the brawler is already selected or banned
    if (selectedBrawlers.includes(brawler.id) || bannedBrawlers.includes(brawler.id)) {
      return;
    }
    
    // Find the next available position according to the pick order
    let nextAvailableIndex = -1;
    for (let i = 0; i < pickOrder.length; i++) {
      if (selectedBrawlers[pickOrder[i]] === null) {
        nextAvailableIndex = pickOrder[i];
        break;
      }
    }
    
    if (nextAvailableIndex === -1) return; // All positions are filled
    
    // Update selected brawlers
    const newSelectedBrawlers = [...selectedBrawlers];
    newSelectedBrawlers[nextAvailableIndex] = brawler.id;
    setSelectedBrawlers(newSelectedBrawlers);
    
    // Update current pick index to the next available slot
    const nextIndex = pickOrder.findIndex(i => i === nextAvailableIndex);
    const followingIndex = nextIndex < pickOrder.length - 1 ? pickOrder[nextIndex + 1] : -1;
    if (followingIndex !== -1 && newSelectedBrawlers[followingIndex] === null) {
      setCurrentPickIndex(followingIndex);
    }
    
    // Show success toast
    const team = nextAvailableIndex < 3 ? 'Azul' : 'Rojo';
    toast.success(`${brawler.name} seleccionado para el equipo ${team}`);
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
  
  // Handle moving brawlers (drag and drop)
  const handleMoveBrawler = (fromIndex: number, toIndex: number) => {
    const newSelectedBrawlers = [...selectedBrawlers];
    const fromBrawlerId = newSelectedBrawlers[fromIndex];
    
    // Only proceed if there's a source brawler
    if (fromBrawlerId !== null) {
      const toBrawlerId = newSelectedBrawlers[toIndex];
      
      // Update brawler positions
      newSelectedBrawlers[fromIndex] = null;
      newSelectedBrawlers[toIndex] = fromBrawlerId;
      
      setSelectedBrawlers(newSelectedBrawlers);
      
      const fromBrawler = brawlers.find(b => b.id === fromBrawlerId);
      const toBrawler = toBrawlerId !== null ? brawlers.find(b => b.id === toBrawlerId) : null;
      
      if (fromBrawler) {
        if (toBrawler) {
          toast.info(`${fromBrawler.name} intercambiado con ${toBrawler.name}`);
        } else {
          toast.info(`${fromBrawler.name} movido a nueva posición`);
        }
      }
      
      // Set current pick index to the source slot
      setCurrentPickIndex(fromIndex);
    }
  };
  
  // Handle banning a brawler
  const handleBanBrawler = (brawlerId: number) => {
    // Skip if already banned or selected or max bans reached
    if (bannedBrawlers.includes(brawlerId) || selectedBrawlers.includes(brawlerId)) {
      return;
    }
    
    if (bannedBrawlers.length >= 6) {
      toast.error("No puedes banear más de 6 brawlers");
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
    
    if (!generateButtonConfig.enabled) {
      toast.error(generateButtonConfig.disabledReason);
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
        userTeam: 'blue', // User is always blue team in Brawl Stars
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
  
  // Update current pick index based on first pick changes
  useEffect(() => {
    setCurrentPickIndex(firstPick === 'blue' ? 0 : 3);
  }, [firstPick]);
  
  return (
    <DndProvider backend={HTML5Backend}>
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
              firstPick={firstPick}
              onSelectFirstPick={setFirstPick}
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
                pickOrder={pickOrder}
                onRemoveBrawler={handleRemoveBrawler}
                onMoveBrawler={handleMoveBrawler}
              />
              
              <DraftTeam
                team="red"
                brawlerIds={selectedBrawlers.slice(3, 6)}
                activeSlot={currentPickTeam === 'red' ? currentPickIndex - 3 : null}
                currentPickTeam={currentPickTeam}
                pickOrder={pickOrder}
                onRemoveBrawler={handleRemoveBrawler}
                onMoveBrawler={handleMoveBrawler}
              />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-brawl-blue via-brawl-purple to-brawl-red h-1"></div>
          
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50">
            <button
              onClick={handleGenerateRecommendation}
              disabled={!generateButtonConfig.enabled || isGenerating}
              className={`w-full flex items-center justify-center ${
                generateButtonConfig.enabled 
                  ? 'btn-success' 
                  : 'bg-gradient-to-r from-green-300 to-green-400 text-white font-bold py-3 px-6 rounded-xl opacity-60 cursor-not-allowed'
              }`}
            >
              {isGenerating ? (
                <>
                  <Loader2 size={20} className="mr-2 animate-spin" />
                  Generando...
                </>
              ) : (
                <>
                  <Zap size={20} className="mr-2" />
                  {generateButtonConfig.text}
                </>
              )}
            </button>
            
            {!generateButtonConfig.enabled && generateButtonConfig.disabledReason && (
              <div className="mt-2 flex items-center justify-center text-sm text-red-500">
                <Info size={14} className="mr-1" />
                {generateButtonConfig.disabledReason}
              </div>
            )}
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
              onBanBrawler={handleBanBrawler}
            />
          </div>
        </div>
        
        <ResultModal
          isOpen={showResultModal}
          onClose={() => setShowResultModal(false)}
          result={apiResult}
        />
      </div>
    </DndProvider>
  );
};

export default DraftSimulator;
