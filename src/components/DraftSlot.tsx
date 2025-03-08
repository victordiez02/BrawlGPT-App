
import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import BrawlerCard from './BrawlerCard';
import { Brawler, brawlers } from '@/lib/brawlers';
import { useTranslation } from 'react-i18next';

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
  onRemoveBrawler: (index: number) => void;
  onMoveBrawler: (fromIndex: number, toIndex: number) => void;
}

const DraftSlot: React.FC<DraftSlotProps> = ({
  index,
  team,
  brawlerId,
  isActiveSlot,
  pickLabel,
  onRemoveBrawler,
  onMoveBrawler
}) => {
  const { t } = useTranslation();
  const teamColorClass = team === 'blue' ? 'draft-slot-blue' : 'draft-slot-red';

  // Find brawler by id
  const brawler = brawlerId !== null ? brawlers.find(b => b.id === brawlerId) || null : null;

  // Set up drag
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'DRAFT_BRAWLER',
    item: { id: brawlerId, slotIndex: index } as DraftItemType,
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    }),
    canDrag: brawlerId !== null
  }), [brawlerId, index]);

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
    })
  }), [index, onMoveBrawler]);

  // Handle right-click to remove
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (brawlerId !== null) {
      onRemoveBrawler(index);
    }
  };

  // Handle scrolling to brawler grid when clicking select
  const scrollToBrawlerGrid = () => {
    const brawlerGridElement = document.querySelector('.brawler-grid');
    if (brawlerGridElement) {
      brawlerGridElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <div 
        ref={drop} 
        className={`w-full aspect-square relative ${teamColorClass} ${isActiveSlot ? 'ring-2 ring-yellow-400 animate-pulse-soft' : ''} ${isOver ? 'ring-2 ring-white' : ''}`}
      >
        {brawler ? (
          <div 
            ref={drag} 
            className={`relative w-full h-full ${isDragging ? 'opacity-50' : ''}`} 
            onContextMenu={handleContextMenu}
          >
            <BrawlerCard brawler={brawler} size="lg" team={team} />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {isActiveSlot && (
              <button 
                onClick={scrollToBrawlerGrid}
                className="text-sm font-medium opacity-80 animate-pulse font-brawl text-white hover:text-yellow-300 transition-colors focus:outline-none"
              >
                {t('select')}
              </button>
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
