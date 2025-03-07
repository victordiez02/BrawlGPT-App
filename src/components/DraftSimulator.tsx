
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
import { useTranslation } from 'react-i18next';

const DraftSimulator: React.FC = () => {
  const { t } = useTranslation();
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
  const currentPickTeam = useMemo(() => {
    return findTeamByIndex(currentPickIndex);
  }, [currentPickIndex]);

  const findTeamByIndex = (index: number) => {
    return index < 3 ? 'blue' : 'red';
  };

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

  // Get detailed error message about missing picks
  const getMissingPicksMessage = () => {
    const filledPositions = selectedBrawlers
      .map((id, index) => ({ id, index }))
      .filter(item => item.id !== null)
      .map(item => item.index);
    
    // Find which picks are missing
    const missingPicks = [];
    for (let i = 0; i < 6; i++) {
      const pickPosition = pickOrder[i];
      if (!filledPositions.includes(pickPosition)) {
        missingPicks.push(i + 1); // Convert to 1-based for user display
      }
    }
    
    // Filter to show only the next expected picks based on the filled count
    const filledCount = filledPositions.length;
    
    if (filledCount === 0) return t('select_first_pick');
    if (filledCount === 1) {
      if (filledPositions[0] !== pickOrder[0]) return t('select_first_pick_brawler');
      return t('select_second_pick_brawler');
    }
    if (filledCount === 2) {
      if (!filledPositions.includes(pickOrder[0]) || 
          !filledPositions.includes(pickOrder[1])) {
        return t('select_first_second_pick_brawlers');
      }
      return t('select_third_pick_brawler');
    }
    if (filledCount === 3) {
      if (!isValidPhase) return t('incorrect_pick_order', { missingPicks: missingPicks.slice(0, 3).join('º, ') });
      return t('select_fourth_pick_brawler');
    }
    if (filledCount === 4) {
      if (!filledPositions.includes(pickOrder[0]) || 
          !filledPositions.includes(pickOrder[1]) ||
          !filledPositions.includes(pickOrder[2]) ||
          !filledPositions.includes(pickOrder[3])) {
        return t('incorrect_pick_order', { missingPicks: missingPicks.slice(0, 4).join('º, ') });
      }
      return t('select_fifth_pick_brawler');
    }
    if (filledCount === 6) {
      return t('remove_sixth_pick');
    }
    
    return t('incorrect_pick_order', { missingPicks: missingPicks.join('º, ') });
  };

  // Find the next empty slot for picking
  const findNextPickSlot = () => {
    for (let i = 0; i < pickOrder.length; i++) {
      const slotIndex = pickOrder[i];
      if (selectedBrawlers[slotIndex] === null) {
        return slotIndex;
      }
    }
    return -1; // All slots filled
  };

  // Update the active slot
  useEffect(() => {
    const nextSlot = findNextPickSlot();
    if (nextSlot !== -1) {
      setCurrentPickIndex(nextSlot);
    }
  }, [selectedBrawlers]);

  // Generate button state and text
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
    
    // Show success toast
    const team = nextAvailableIndex < 3 ? t('blue_team') : t('red_team');
    toast.success(t('brawler_selected', { name: brawler.name, team }));
  };
  
  // Handle brawler removal
  const handleRemoveBrawler = (index: number) => {
    const newSelectedBrawlers = [...selectedBrawlers];
    const removedBrawlerId = newSelectedBrawlers[index];
    
    // Only proceed if there's a brawler to remove
    if (removedBrawlerId !== null) {
      const brawler = brawlers.find(b => b.id === removedBrawlerId);
      if (brawler) {
        toast.info(t('brawler_removed', { name: brawler.name }));
      }
      
      newSelectedBrawlers[index] = null;
      setSelectedBrawlers(newSelectedBrawlers);
    }
  };

  // Handle removing a brawler from draft by ID
  const handleRemoveBrawlerById = (brawlerId: number) => {
    const index = selectedBrawlers.indexOf(brawlerId);
    if (index !== -1) {
      handleRemoveBrawler(index);
    }
  };
  
  // Handle moving brawlers (drag and drop) - swap implementation
  const handleMoveBrawler = (fromIndex: number, toIndex: number) => {
    // Don't do anything if source and destination are the same
    if (fromIndex === toIndex) return;
    
    const newSelectedBrawlers = [...selectedBrawlers];
    const fromBrawlerId = newSelectedBrawlers[fromIndex];
    const toBrawlerId = newSelectedBrawlers[toIndex];
    
    // Only proceed if there's a source brawler
    if (fromBrawlerId !== null) {
      // Simply swap the positions
      newSelectedBrawlers[fromIndex] = toBrawlerId;
      newSelectedBrawlers[toIndex] = fromBrawlerId;
      
      setSelectedBrawlers(newSelectedBrawlers);
      
      // Get brawler names for toast
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
  
  // Handle banning a brawler
  const handleBanBrawler = (brawlerId: number) => {
    // Skip if already banned or selected or max bans reached
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
  
  // Handle unbanning a brawler
  const handleUnbanBrawler = (brawlerId: number) => {
    const brawler = brawlers.find(b => b.id === brawlerId);
    if (brawler) {
      toast.info(t('brawler_unbanned', { name: brawler.name }));
    }
    
    setBannedBrawlers(bannedBrawlers.filter(id => id !== brawlerId));
  };
  
  // Generate API request
  const handleGenerateRecommendation = async () => {
    // Validate requirements
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
      toast.error(t('error_generating_recommendation'));
    } finally {
      setIsGenerating(false);
    }
  };
  
  // Reset draft
  const handleResetDraft = () => {
    if (window.confirm(t('confirm_reset_draft'))) {
      setSelectedBrawlers([null, null, null, null, null, null]);
      setCurrentPickIndex(firstPick === 'blue' ? 0 : 3);
      toast.info(t('draft_reset'));
    }
  };
  
  // Update current pick index based on first pick changes
  useEffect(() => {
    setCurrentPickIndex(firstPick === 'blue' ? 0 : 3);
  }, [firstPick]);
  
  // Listen for custom events to remove brawlers from draft
  useEffect(() => {
    const handleRemoveBrawlerEvent = (event: Event) => {
      const customEvent = event as CustomEvent<{index: number, shouldBan: boolean}>;
      const { index, shouldBan } = customEvent.detail;
      
      // Get the brawler ID before removing it
      const brawlerId = selectedBrawlers[index];
      
      if (brawlerId !== null) {
        // Remove from draft
        handleRemoveBrawler(index);
        
        // Ban the brawler if requested
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
              <h2 className="text-xl font-bold font-brawl">{t('current_draft')}</h2>
              <button
                onClick={handleResetDraft}
                className="flex items-center text-sm text-gray-600 hover:text-red-500 transition-colors font-brawl"
              >
                <ArrowLeft size={16} className="mr-1" /> {t('reset')}
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
              onUnbanBrawler={handleUnbanBrawler}
              onRemoveBrawlerFromDraft={handleRemoveBrawlerById}
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
