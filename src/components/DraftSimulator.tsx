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
import { ApiResponse, DraftData, submitDraft } from '@/lib/api';
import { ArrowLeft, Info, Loader2, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useTranslation } from 'react-i18next';

interface DraftSimulatorProps {
  initialMap?: GameMap | null;
}

const DraftSimulator: React.FC<DraftSimulatorProps> = ({ initialMap = null }) => {
  const { t } = useTranslation();
  
  const [selectedMap, setSelectedMap] = useState<GameMap | null>(initialMap);
  const [firstPick, setFirstPick] = useState<'blue' | 'red'>('blue');
  const [selectedBrawlers, setSelectedBrawlers] = useState<(number | null)[]>([null, null, null, null, null, null]);
  const [bannedBrawlers, setBannedBrawlers] = useState<number[]>([]);
  const [currentPickIndex, setCurrentPickIndex] = useState<number>(0);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [apiResult, setApiResult] = useState<ApiResponse | null>(null);
  const [showResultModal, setShowResultModal] = useState<boolean>(false);
  
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

  const getCurrentDraftPhase = (): number => {
    const filledPicks = selectedBrawlers.filter(id => id !== null).length;
    if (filledPicks === 0) return 1; // First phase - no picks
    if (filledPicks === 1) return 2; // Second phase - only first pick
    if (filledPicks === 3) return 3; // Third phase - picks 1, 2, 3
    if (filledPicks === 5) return 4; // Fourth phase - picks 1, 2, 3, 4, 5
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
    for (let i = 0; i < 6; i++) {
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
    if (filledPositions.length === 6) {
      return t('remove_sixth_pick');
    }
    
    return t('incorrect_pick_order', { missingPicks: missingPicks.join('º, ') });
  };

  const findNextPickSlot = () => {
    for (let i = 0; i < pickOrder.length; i++) {
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
  
  const handleSelectBrawler = (brawler: Brawler) => {
    if (selectedBrawlers.includes(brawler.id) || bannedBrawlers.includes(brawler.id)) {
      return;
    }
    
    let nextAvailableIndex = -1;
    for (let i = 0; i < pickOrder.length; i++) {
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
    
    if (fromBrawlerId !== null) {
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
    
    setIsGenerating(true);
    
    try {
      const draftData: DraftData = {
        map: {
          id: selectedMap.id,
          name: selectedMap.name,
          mode: selectedMap.mode
        },
        userTeam: 'blue',
        blueTeam: selectedBrawlers.slice(0, 3),
        redTeam: selectedBrawlers.slice(3, 6),
        banned: bannedBrawlers
      };
      
      const result = await submitDraft(draftData);
      setApiResult(result);
      setShowResultModal(true);
    } catch (error) {
      console.error('Error generating recommendation:', error);
      toast.error(t('error_generating_recommendation'));
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleResetDraft = () => {
    setSelectedBrawlers([null, null, null, null, null, null]);
    setBannedBrawlers([]);
    setCurrentPickIndex(firstPick === 'blue' ? 0 : 3);
    toast.info(t('draft_reset'));
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

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full max-w-6xl mx-auto px-4 animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="md:col-span-2 glass-panel p-4">
            <MapSelector 
              selectedMap={selectedMap} 
              onSelectMap={setSelectedMap} 
            />
          </div>
          <div className="glass-panel p-4">
            <TeamSelector 
              firstPick={firstPick}
              onSelectFirstPick={setFirstPick}
            />
            
            <div className="mt-4">
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
            <div className="glass-panel mb-6 overflow-hidden">
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
                <button
                  onClick={handleGenerateRecommendation}
                  disabled={!generateButtonConfig.enabled || isGenerating}
                  className={`w-full flex items-center justify-center font-brawl ${
                    generateButtonConfig.enabled 
                      ? 'btn-success' 
                      : 'bg-gradient-to-r from-green-300 to-green-400 text-white font-bold py-3 px-6 rounded-xl opacity-60 cursor-not-allowed'
                  }`}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 size={20} className="mr-2 animate-spin" />
                      {t('generating')}
                    </>
                  ) : (
                    <>
                      <Zap size={20} className="mr-2" />
                      {generateButtonConfig.text}
                    </>
                  )}
                </button>
                
                {!generateButtonConfig.enabled && generateButtonConfig.disabledReason && (
                  <div className="mt-2 flex items-center justify-center text-sm text-red-500 font-brawl">
                    <Info size={14} className="mr-1" />
                    {generateButtonConfig.disabledReason}
                  </div>
                )}
              </div>
            </div>
            
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
          </>
        )}
      </div>
    </DndProvider>
  );
};

export default DraftSimulator;
