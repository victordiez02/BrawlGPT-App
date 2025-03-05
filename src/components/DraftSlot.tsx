
import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import BrawlerCard from './BrawlerCard';
import { Brawler, brawlers } from '@/lib/brawlers';

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
  const teamColorClass = team === 'blue' ? 'draft-slot-blue' : 'draft-slot-red';
  
  // Find brawler by id
  const brawler = brawlerId !== null ? brawlers.find(b => b.id === brawlerId) || null : null;
  
  // Set up drag
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'DRAFT_BRAWLER',
    item: { id: brawlerId, slotIndex: index } as DraftItemType,
    collect: (monitor) => ({
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
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }), [index, onMoveBrawler]);
  
  return (
    <div className="flex flex-col items-center space-y-2">
      <div 
        ref={drop}
        className={`w-full aspect-square ${teamColorClass} ${
          isActiveSlot ? 'ring-2 ring-yellow-400 animate-pulse-soft' : ''
        } ${isOver ? 'ring-2 ring-white' : ''}`}
      >
        {brawler ? (
          <div 
            ref={drag}
            className={`relative w-full h-full ${isDragging ? 'opacity-50' : ''}`}
          >
            <BrawlerCard
              brawler={brawler}
              size="lg"
              team={team}
            />
            <button
              onClick={() => onRemoveBrawler(index)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
            >
              ×
            </button>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {isActiveSlot && (
              <span className="text-sm font-medium opacity-70 animate-pulse">Selecciona</span>
            )}
          </div>
        )}
      </div>
      <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
        {pickLabel}
      </span>
    </div>
  );
};

export default DraftSlot;
