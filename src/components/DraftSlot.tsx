
import React, { useEffect, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import BrawlerCard from './BrawlerCard';
import { Brawler, brawlers } from '@/lib/brawlers';
import { useTranslation } from 'react-i18next';
import { Lock } from 'lucide-react';

type DraftItemType = {
  id: number;
  slotIndex: number;
};

interface DraftSlotProps {
  index: number;
  team: 'blue' | 'red';
  brawlerId: number | null;
  isActiveSlot: boolean;
  pickLabel: string;
  isLocked: boolean;
  onRemoveBrawler: (index: number) => void;
  onMoveBrawler: (fromIndex: number, toIndex: number) => void;
}

const DraftSlot: React.FC<DraftSlotProps> = ({
  index,
  team,
  brawlerId,
  isActiveSlot,
  pickLabel,
  isLocked,
  onRemoveBrawler,
  onMoveBrawler
}) => {
  const { t } = useTranslation();
  const teamColorClass = team === 'blue' ? 'draft-slot-blue' : 'draft-slot-red';

  // Add a local state to track the current brawler and force re-render when it changes
  const [currentBrawlerId, setCurrentBrawlerId] = useState<number | null>(brawlerId);
  
  // Update the local state when the prop changes
  useEffect(() => {
    setCurrentBrawlerId(brawlerId);
  }, [brawlerId]);

  // Find brawler by id
  const brawler = currentBrawlerId !== null ? brawlers.find(b => b.id === currentBrawlerId) || null : null;

  // Set up drag
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'DRAFT_BRAWLER',
    item: () => {
      document.dispatchEvent(new CustomEvent('brawlerDragStart'));
      return { id: currentBrawlerId, slotIndex: index };
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    }),
    canDrag: currentBrawlerId !== null && !isLocked,
    // Dispatch a custom event when dragging ends
    end: (item, monitor) => {
      document.dispatchEvent(new CustomEvent('brawlerDragEnd'));
    }
  }), [currentBrawlerId, index, isLocked]);

  // Set up drop
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'DRAFT_BRAWLER',
    drop: (item: DraftItemType) => {
      if (item.slotIndex !== index) {
        onMoveBrawler(item.slotIndex, index);
      }
    },
    collect: monitor => ({
      isOver: !!monitor.isOver()
    }),
    // Don't allow dropping on locked slots
    canDrop: () => !isLocked
  }), [index, onMoveBrawler, isLocked]);

  // Handle right-click to remove
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentBrawlerId !== null && !isLocked) {
      onRemoveBrawler(index);
    }
  };

  // Handle scrolling to brawler grid when clicking empty slot
  const scrollToBrawlerGrid = () => {
    if (isLocked) return; // Don't scroll if slot is locked
    
    const brawlerGridElement = document.querySelector('.brawler-grid');
    if (brawlerGridElement) {
      brawlerGridElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <div 
        ref={drop} 
        className={`w-full aspect-square relative ${teamColorClass} ${isActiveSlot && !isLocked ? 'ring-2 ring-yellow-400 animate-pulse-soft' : ''} ${isOver ? 'ring-2 ring-white' : ''} ${isLocked ? 'opacity-70' : ''}`}
      >
        {brawler ? (
          <div 
            ref={drag} 
            className={`relative w-full h-full ${isDragging ? 'opacity-50' : ''}`} 
            onContextMenu={handleContextMenu}
          >
            <BrawlerCard 
              brawler={brawler} 
              size="lg" 
              team={team}
              isDragging={isDragging}
              disabled={isLocked}
            />
            {isLocked && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Lock size={24} className="text-white" />
              </div>
            )}
          </div>
        ) : (
          <div 
            className="w-full h-full flex items-center justify-center cursor-pointer"
            onClick={scrollToBrawlerGrid}
          >
            {isActiveSlot && !isLocked && (
              <span className="text-sm font-medium opacity-80 animate-pulse font-brawl text-white hover:text-yellow-300 transition-colors">
                {t('select')}
              </span>
            )}
            {isLocked && (
              <div className="flex flex-col items-center justify-center">
                <Lock size={24} className="text-white/70 mb-1" />
                <span className="text-xs font-medium text-white/70 font-brawl">
                  {t('locked')}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
      <span className="text-xs font-medium text-white dark:text-gray-200 font-brawl text-glow">
        {pickLabel}
      </span>
    </div>
  );
};

export default DraftSlot;
