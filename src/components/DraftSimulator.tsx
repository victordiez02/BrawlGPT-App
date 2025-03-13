
import React, { useState, useEffect, useMemo } from 'react';
import { brawlers, Brawler } from '@/lib/brawlers';
import { GameMap } from '@/lib/maps';
import MapSelector from './MapSelector';
import TeamSelector from './TeamSelector';
import DraftTeam from './DraftTeam';
import BannedBrawlers from './BannedBrawlers';
import BrawlerGrid from './BrawlerGrid';
import ResultModal from './ResultModal';
import TrashCan from './TrashCan';
import AIRecommendations from './AIRecommendations';
import DraftCompletionDialog from './DraftCompletionDialog';
import { ApiResponse, DraftData, GeminiResponse, GeminiSuggestion, getAIRecommendation, submitDraft } from '@/lib/api';
import { ArrowLeft, Cpu, Info, Loader2, SparkleIcon, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

interface DraftSimulatorProps {
  initialMap?: GameMap | null;
  onReturnToMapSelection?: () => void;
}

const DraftSimulator: React.FC<DraftSimulatorProps> = ({ 
  initialMap = null,
  onReturnToMapSelection 
}) => {
  const { t } = useTranslation();
  
  const [selectedMap, setSelectedMap] = useState<GameMap | null>(initialMap);
  const [firstPick, setFirstPick] = useState<'blue' | 'red'>('blue');
  const [selectedBrawlers, setSelectedBrawlers] = useState<(number | null)[]>([null, null, null, null, null, null]);
  const [bannedBrawlers, setBannedBrawlers] = useState<number[]>([]);
  const [currentPickIndex, setCurrentPickIndex] = useState<number>(0);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [apiResult, setApiResult] = useState<ApiResponse | null>(null);
  const [showResultModal, setShowResultModal] = useState<boolean>(false);
  
  // Estado para las recomendaciones de la IA
  const [isLoadingAIRecommendation, setIsLoadingAIRecommendation] = useState<boolean>(false);
  const [aiRecommendations, setAIRecommendations] = useState<GeminiSuggestion[] | null>(null);
  const [aiRecommendationError, setAIRecommendationError] = useState<Error | null>(null);
  const [isAIRecommendationsOpen, setIsAIRecommendationsOpen] = useState<boolean>(true);
  
  // Estado para el diálogo de draft completado
  const [showDraftCompletionDialog, setShowDraftCompletionDialog] = useState<boolean>(false);
  
  // Efecto para escuchar el evento de reset de recomendaciones
  useEffect(() => {
    const handleResetRecommendations = () => {
      setAIRecommendations(null);
      setAIRecommendationError(null);
    };
    
    document.addEventListener('resetAIRecommendations', handleResetRecommendations);
    
    return () => {
      document.removeEventListener('resetAIRecommendations', handleResetRecommendations);
    };
  }, []);
  
  const findTeamByIndex = (index: number) => {
    if (index < 3) return 'blue';
    return 'red';
  };
  
  const pickOrder = firstPick === 'blue' 
    ? [0, 3, 4, 1, 2, 5] // Blue first: Blue picks 1st, 4th, 5th; Red picks 2nd, 3rd, 6th
    : [3, 0, 1, 4, 5, 2]; // Red first: Red picks 1st, 4th, 5th; Blue picks 2nd, 3rd, 6th
  
  const currentPickTeam = useMemo(() => {
    return findTeamByIndex(currentPickIndex);
  }, [currentPickIndex]);

  const selectedBrawlersCount = useMemo(() => {
    return selectedBrawlers.filter(id => id !== null).length;
  }, [selectedBrawlers]);

  const getCurrentDraftPhase = (): number => {
    if (selectedBrawlersCount === 0) return 1; // First phase - no picks
    if (selectedBrawlersCount === 1) return 2; // Second phase - only first pick
    if (selectedBrawlersCount === 3) return 3; // Third phase - picks 1, 2, 3
    if (selectedBrawlersCount === 5) return 4; // Fourth phase - picks 1, 2, 3, 4, 5
    return 0; // Not a valid phase for recommendations
  };

  const isValidPhase = useMemo(() => {
    const filledPositions = selectedBrawlers
      .map((id, index) => ({ id, index }))
      .filter(item => item.id !== null)
      .map(item => item.index);
    
    const phase = getCurrentDraftPhase();
    
    if (phase === 1 && filledPositions.length === 0) return true;
    
    if (phase === 2 && filledPositions.length === 1) {
      return filledPositions[0] === pickOrder[0];
    }
    
    if (phase === 3 && filledPositions.length === 3) {
      const expectedPositions = [pickOrder[0], pickOrder[1], pickOrder[2]].sort();
      const actualPositions = [...filledPositions].sort();
      return JSON.stringify(expectedPositions) === JSON.stringify(actualPositions);
    }
    
    if (phase === 4 && filledPositions.length === 5) {
      const expectedPositions = [pickOrder[0], pickOrder[1], pickOrder[2], pickOrder[3], pickOrder[4]].sort();
      const actualPositions = [...filledPositions].sort();
      return JSON.stringify(expectedPositions) === JSON.stringify(actualPositions);
    }
    
    return false;
  }, [selectedBrawlers, pickOrder]);

  const getMissingPicksMessage = () => {
    const filledPositions = selectedBrawlers
      .map((id, index) => ({ id, index }))
      .filter(item => item.id !== null)
      .map(item => item.index);
    
    const missingPicks = [];
    for (let i = 0; i < 5; i++) {
      const pickPosition = pickOrder[i];
      if (!filledPositions.includes(pickPosition)) {
        missingPicks.push(i + 1);
      }
    }
    
    if (filledPositions.length === 0) return t('select_first_pick');
    if (filledPositions.length === 1) {
      if (filledPositions[0] !== pickOrder[0]) return t('select_first_pick_brawler');
      return t('select_second_pick_brawler');
    }
    if (filledPositions.length === 2) {
      if (!filledPositions.includes(pickOrder[0]) || 
          !filledPositions.includes(pickOrder[1])) {
        return t('select_first_second_pick_brawlers');
      }
      return t('select_third_pick_brawler');
    }
    if (filledPositions.length === 3) {
      if (!isValidPhase) return t('incorrect_pick_order', { missingPicks: missingPicks.slice(0, 3).join('º, ') });
      return t('select_fourth_pick_brawler');
    }
    if (filledPositions.length === 4) {
      if (!filledPositions.includes(pickOrder[0]) || 
          !filledPositions.includes(pickOrder[1]) ||
          !filledPositions.includes(pickOrder[2]) ||
          !filledPositions.includes(pickOrder[3])) {
        return t('incorrect_pick_order', { missingPicks: missingPicks.slice(0, 4).join('º, ') });
      }
      return t('select_fifth_pick_brawler');
    }
    if (filledPositions.length === 5) {
      return '';
    }
    
    return t('incorrect_pick_order', { missingPicks: missingPicks.join('º, ') });
  };

  const findNextPickSlot = () => {
    for (let i = 0; i < 5; i++) {
      const slotIndex = pickOrder[i];
      if (selectedBrawlers[slotIndex] === null) {
        return slotIndex;
      }
    }
    return -1;
  };

  useEffect(() => {
    const nextSlot = findNextPickSlot();
    if (nextSlot !== -1) {
      setCurrentPickIndex(nextSlot);
    }
  }, [selectedBrawlers]);

  const generateButtonConfig = useMemo(() => {
    const phase = getCurrentDraftPhase();
    
    if (!selectedMap) {
      return {
        enabled: false,
        text: t('generate_best_option'),
        disabledReason: t('select_map_first')
      };
    }
    
    if (!isValidPhase) {
      return {
        enabled: false,
        text: t('generate_best_option'),
        disabledReason: getMissingPicksMessage()
      };
    }
    
    switch (phase) {
      case 1:
        return {
          enabled: true,
          text: t('generate_phase_1'),
          disabledReason: ""
        };
      case 2:
        return {
          enabled: true,
          text: t('generate_phase_2'),
          disabledReason: ""
        };
      case 3:
        return {
          enabled: true,
          text: t('generate_phase_3'),
          disabledReason: ""
        };
      case 4:
        return {
          enabled: true,
          text: t('generate_phase_4'),
          disabledReason: ""
        };
      default:
        return {
          enabled: false,
          text: t('generate_best_option'),
          disabledReason: t('configure_draft_correctly')
        };
    }
  }, [selectedMap, isValidPhase, getMissingPicksMessage, t]);
  
  useEffect(() => {
    const elPrimo = brawlers.find(b => b.name === "El-Primo");
    if (elPrimo) {
      elPrimo.name = "El Primo";
    }
  }, []);

  const handleSelectBrawler = (brawler: Brawler) => {
    if (selectedBrawlers.includes(brawler.id) || bannedBrawlers.includes(brawler.id)) {
      return;
    }
    
    if (selectedBrawlersCount >= 5) {
      toast.error(t('max_picks_error', { max: 5 }));
      return;
    }
    
    let nextAvailableIndex = -1;
    for (let i = 0; i < 5; i++) {
      if (selectedBrawlers[pickOrder[i]] === null) {
        nextAvailableIndex = pickOrder[i];
        break;
      }
    }
    
    if (nextAvailableIndex === -1) return;
    
    const newSelectedBrawlers = [...selectedBrawlers];
    newSelectedBrawlers[nextAvailableIndex] = brawler.id;
    setSelectedBrawlers(newSelectedBrawlers);
    
    const team = nextAvailableIndex < 3 ? t('blue_team') : t('red_team');
    toast.success(t('brawler_selected', { name: brawler.name, team }));
  };
  
  const handleRemoveBrawler = (index: number) => {
    const newSelectedBrawlers = [...selectedBrawlers];
    const removedBrawlerId = newSelectedBrawlers[index];
    
    if (removedBrawlerId !== null) {
      const brawler = brawlers.find(b => b.id === removedBrawlerId);
      if (brawler) {
        toast.info(t('brawler_removed', { name: brawler.name }));
      }
      
      newSelectedBrawlers[index] = null;
      setSelectedBrawlers(newSelectedBrawlers);
    }
  };

  const handleRemoveBrawlerById = (brawlerId: number) => {
    const index = selectedBrawlers.indexOf(brawlerId);
    if (index !== -1) {
      handleRemoveBrawler(index);
    }
  };
  
  const handleMoveBrawler = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return;
    
    const newSelectedBrawlers = [...selectedBrawlers];
    const fromBrawlerId = newSelectedBrawlers[fromIndex];
    const toBrawlerId = newSelectedBrawlers[toIndex];
    
    newSelectedBrawlers[fromIndex] = toBrawlerId;
    newSelectedBrawlers[toIndex] = fromBrawlerId;
    
    setSelectedBrawlers(newSelectedBrawlers);
    
    const fromBrawler = brawlers.find(b => b.id === fromBrawlerId);
    const toBrawler = toBrawlerId !== null ? brawlers.find(b => b.id === toBrawlerId) : null;
    
    if (fromBrawler) {
      if (toBrawler) {
        toast.info(t('brawlers_swapped', { from: fromBrawler.name, to: toBrawler.name }));
      } else {
        toast.info(t('brawler_moved_position', { name: fromBrawler.name }));
      }
    }
  };
  
  const handleBanBrawler = (brawlerId: number) => {
    if (bannedBrawlers.includes(brawlerId) || selectedBrawlers.includes(brawlerId)) {
      return;
    }
    
    if (bannedBrawlers.length >= 6) {
      toast.error(t('max_bans_error'));
      return;
    }
    
    const brawler = brawlers.find(b => b.id === brawlerId);
    if (brawler) {
      toast.info(t('brawler_banned', { name: brawler.name }));
      setBannedBrawlers([...bannedBrawlers, brawlerId]);
    }
  };
  
  const handleUnbanBrawler = (brawlerId: number) => {
    const brawler = brawlers.find(b => b.id === brawlerId);
    if (brawler) {
      toast.info(t('brawler_unbanned', { name: brawler.name }));
    }
    
    setBannedBrawlers(bannedBrawlers.filter(id => id !== brawlerId));
  };
  
  const handleGenerateRecommendation = async () => {
    if (!selectedMap) {
      toast.error(t('must_select_map'));
      return;
    }
    
    if (!generateButtonConfig.enabled) {
      toast.error(generateButtonConfig.disabledReason);
      return;
    }
    
    const phase = getCurrentDraftPhase();
    if (![1, 2, 3, 4].includes(phase)) {
      toast.error(t('invalid_draft_phase'));
      return;
    }
    
    setIsLoadingAIRecommendation(true);
    setAIRecommendationError(null);
    setAIRecommendations(null);
    setIsAIRecommendationsOpen(true);
    
    try {
      const response = await getAIRecommendation(
        phase,
        selectedMap,
        bannedBrawlers,
        firstPick,
        selectedBrawlers
      );
      
      if (response?.gemini_response?.gemini_suggestions) {
        setAIRecommendations(response.gemini_response.gemini_suggestions);
        toast.success(t('ai_recommendations_generated'));
      } else {
        throw new Error(t('unexpected_api_response'));
      }
    } catch (error) {
      console.error('Error generating AI recommendation:', error);
      setAIRecommendationError(error instanceof Error ? error : new Error(String(error)));
      toast.error(t('error_generating_recommendation'));
    } finally {
      setIsLoadingAIRecommendation(false);
    }
  };
  
  const handleResetDraft = () => {
    setSelectedBrawlers([null, null, null, null, null, null]);
    setBannedBrawlers([]);
    setCurrentPickIndex(firstPick === 'blue' ? 0 : 3);
    setAIRecommendations(null);
    setAIRecommendationError(null);
    setShowDraftCompletionDialog(false);
    toast.info(t('draft_reset'));
  };
  
  // Nueva función para manejar la selección de una recomendación
  const handleSelectRecommendation = (suggestion: GeminiSuggestion, phase: number) => {
    if (phase === 4) {
      // Para la fase 4, mostrar el diálogo de draft completado
      setShowDraftCompletionDialog(true);
      return;
    }
    
    const brawlerNames = typeof suggestion.brawlers === 'string' 
      ? suggestion.brawlers.includes('+') 
        ? suggestion.brawlers.split('+').map(b => b.trim()) 
        : [suggestion.brawlers]
      : suggestion.brawlers;
    
    // Obtener los IDs de los brawlers recomendados
    const brawlerIds = brawlerNames.map(name => {
      const brawler = brawlers.find(b => b.name === name);
      return brawler ? brawler.id : null;
    }).filter(id => id !== null) as number[];
    
    // Clonar el array de brawlers seleccionados
    const newSelectedBrawlers = [...selectedBrawlers];
    
    // Según la fase, añadir los brawlers en las posiciones correctas
    if (phase === 1) {
      // Fase 1: Colocar en la primera posición (eliminar si ya hay un brawler)
      if (brawlerIds.length > 0) {
        newSelectedBrawlers[pickOrder[0]] = brawlerIds[0];
      }
    } else if (phase === 2) {
      // Fase 2: Colocar en las posiciones 2 y 3 (eliminar si ya hay brawlers)
      if (brawlerIds.length >= 2) {
        newSelectedBrawlers[pickOrder[1]] = brawlerIds[0];
        newSelectedBrawlers[pickOrder[2]] = brawlerIds[1];
      } else if (brawlerIds.length === 1) {
        newSelectedBrawlers[pickOrder[1]] = brawlerIds[0];
      }
    } else if (phase === 3) {
      // Fase 3: Colocar en las posiciones 4 y 5 (eliminar si ya hay brawlers)
      if (brawlerIds.length >= 2) {
        newSelectedBrawlers[pickOrder[3]] = brawlerIds[0];
        newSelectedBrawlers[pickOrder[4]] = brawlerIds[1];
      } else if (brawlerIds.length === 1) {
        newSelectedBrawlers[pickOrder[3]] = brawlerIds[0];
      }
    }
    
    // Actualizar el estado
    setSelectedBrawlers(newSelectedBrawlers);
    
    // Mostrar mensaje de éxito
    if (brawlerIds.length > 0) {
      const brawlerNames = brawlerIds.map(id => {
        const brawler = brawlers.find(b => b.id === id);
        return brawler ? brawler.name : '';
      }).filter(name => name !== '').join(', ');
      
      toast.success(t('recommendation_applied', { brawlers: brawlerNames }));
    }
  };
  
  useEffect(() => {
    setCurrentPickIndex(firstPick === 'blue' ? 0 : 3);
  }, [firstPick]);
  
  useEffect(() => {
    const handleRemoveBrawlerEvent = (event: Event) => {
      const customEvent = event as CustomEvent<{index: number, shouldBan: boolean}>;
      const { index, shouldBan } = customEvent.detail;
      
      const brawlerId = selectedBrawlers[index];
      
      if (brawlerId !== null) {
        handleRemoveBrawler(index);
        
        if (shouldBan) {
          handleBanBrawler(brawlerId);
        }
      }
    };
    
    window.addEventListener('removeBrawlerFromDraft', handleRemoveBrawlerEvent);
    
    return () => {
      window.removeEventListener('removeBrawlerFromDraft', handleRemoveBrawlerEvent);
    };
  }, [selectedBrawlers, bannedBrawlers]);

  // Efecto para limpiar las recomendaciones cuando se resetea el draft
  useEffect(() => {
    if (selectedBrawlersCount === 0) {
      setAIRecommendations(null);
      setAIRecommendationError(null);
    }
  }, [selectedBrawlersCount]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full max-w-6xl mx-auto px-4 animate-fade-in">
        <div className="glass-panel p-4 mb-6">
          <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
            <div className="md:w-1/3">
              <MapSelector 
                selectedMap={selectedMap} 
                onSelectMap={setSelectedMap} 
                onReturnToMapSelection={onReturnToMapSelection}
              />
            </div>
            <div className="md:w-1/3">
              <TeamSelector 
                firstPick={firstPick}
                onSelectFirstPick={setFirstPick}
              />
            </div>
            <div className="md:w-1/3">
              <BannedBrawlers
                bannedBrawlers={bannedBrawlers}
                onBanBrawler={handleBanBrawler}
                onUnbanBrawler={handleUnbanBrawler}
              />
            </div>
          </div>
        </div>
        
        {selectedMap && (
          <>
            <div className="glass-panel mb-6 overflow-hidden transition-all duration-300">
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold font-brawl">{t('current_draft')}</h2>
                  <TrashCan
                    onResetDraft={handleResetDraft}
                    onRemoveBrawler={handleRemoveBrawlerById}
                  />
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
              
              <div className="p-4 bg-gray-800/30">
                <Button
                  onClick={handleGenerateRecommendation}
                  disabled={!generateButtonConfig.enabled || isLoadingAIRecommendation}
                  variant="ai"
                  size="lg"
                  className="w-full group transition-all duration-300 font-brawl"
                >
                  <div className="absolute inset-0 bg-[#00E5FF] rounded-xl opacity-100"></div>
                  
                  <div className="circuit-node top-0 left-1/2 -translate-x-1/2 -translate-y-full"></div>
                  <div className="circuit-line h-1 w-8 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                  <div className="circuit-node top-0 left-1/4 -translate-y-full"></div>
                  <div className="circuit-line h-1 w-8 top-0 left-1/4 -translate-y-1/2"></div>
                  <div className="circuit-node top-0 right-1/4 -translate-y-full"></div>
                  <div className="circuit-line h-1 w-8 top-0 right-1/4 -translate-y-1/2"></div>
                  
                  <div className="circuit-node bottom-0 left-1/2 -translate-x-1/2 translate-y-full"></div>
                  <div className="circuit-line h-1 w-8 bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"></div>
                  <div className="circuit-node bottom-0 left-1/4 translate-y-full"></div>
                  <div className="circuit-line h-1 w-8 bottom-0 left-1/4 translate-y-1/2"></div>
                  <div className="circuit-node bottom-0 right-1/4 translate-y-full"></div>
                  <div className="circuit-line h-1 w-8 bottom-0 right-1/4 translate-y-1/2"></div>
                  
                  <div className="flex items-center justify-center relative z-10">
                    {isGenerating ? (
                      <>
                        <Loader2 size={20} className="mr-2 animate-spin" />
                        {t('generating')}
                      </>
                    ) : (
                      <>
                        <Cpu size={20} className="mr-2 animate-spin-slow" />
                        <SparkleIcon size={16} className="absolute -top-2 -left-1 text-[#00E5FF] animate-pulse" />
                        {generateButtonConfig.text}
                      </>
                    )}
                  </div>
                </Button>
                
                {!generateButtonConfig.enabled && generateButtonConfig.disabledReason && (
                  <div className="mt-2 flex items-center justify-center text-sm text-red-500 font-brawl">
                    <Info size={14} className="mr-1" />
                    {generateButtonConfig.disabledReason}
                  </div>
                )}
              </div>
            </div>
            
            {/* Área de recomendaciones de la IA */}
            {(isLoadingAIRecommendation || aiRecommendations || aiRecommendationError) && (
              <AIRecommendations
                isLoading={isLoadingAIRecommendation}
                error={aiRecommendationError}
                recommendations={aiRecommendations}
                phase={getCurrentDraftPhase()}
                onSelectRecommendation={handleSelectRecommendation}
                isOpen={isAIRecommendationsOpen}
                setIsOpen={setIsAIRecommendationsOpen}
              />
            )}
            
            <div className="md:col-span-2 order-1 md:order-2">
              <BrawlerGrid
                brawlers={brawlers}
                selectedBrawlers={selectedBrawlers}
                bannedBrawlers={bannedBrawlers}
                onSelectBrawler={handleSelectBrawler}
                onBanBrawler={handleBanBrawler}
                onUnbanBrawler={handleUnbanBrawler}
                onRemoveBrawlerFromDraft={handleRemoveBrawlerById}
              />
            </div>
            
            <ResultModal
              isOpen={showResultModal}
              onClose={() => setShowResultModal(false)}
              result={apiResult}
            />
            
            <DraftCompletionDialog
              isOpen={showDraftCompletionDialog}
              onClose={() => setShowDraftCompletionDialog(false)}
              selectedBrawlers={selectedBrawlers}
            />
          </>
        )}
      </div>
    </DndProvider>
  );
};

export default DraftSimulator;
