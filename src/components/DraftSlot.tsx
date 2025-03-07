import React, { useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import { X } from 'lucide-react';
import BrawlerCard from './BrawlerCard';
import { Brawler, brawlers } from '@/lib/brawlers';
import { useTranslation } from 'react-i18next';

interface DraftSlotProps {
  index: number;
  team: 'blue' | 'red';
  brawler: number | null;
  isCurrentTurn: boolean;
  onDropBrawler: (brawler: Brawler, index: number) => void;
  onRemoveBrawler: (index: number) => void;
}

const DraftItemType = 'brawler';

const DraftSlot: React.FC<DraftSlotProps> = ({ 
  index, 
  team, 
  brawler,
  isCurrentTurn,
  onDropBrawler,
  onRemoveBrawler
}) => {
  const { t } = useTranslation();
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'brawler',
    drop: (item: any) => {
      if (item.brawler) {
        onDropBrawler(item.brawler, index);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
    canDrop: () => isCurrentTurn
  }));

  // Determine if the brawler is already in the team
  const [isAlreadyInTeam, setIsAlreadyInTeam] = useState(false);

  useEffect(() => {
    if (brawler) {
      const brawlerObj = brawlers.find(b => b.id.toString() === brawler.toString());
      if (brawlerObj) {
        setIsAlreadyInTeam(true);
      } else {
        setIsAlreadyInTeam(false);
      }
    } else {
      setIsAlreadyInTeam(false);
    }
  }, [brawler]);

  const getBrawlerById = (id: number): Brawler | undefined => {
    return brawlers.find(b => b.id === id);
  };

  const slotClass = team === 'blue' ? 'draft-slot-blue' : 'draft-slot-red';
  
  const glowClass = isCurrentTurn 
    ? team === 'blue' 
      ? 'shadow-lg shadow-blue-500/50' 
      : 'shadow-lg shadow-red-500/50'
    : '';
    
  const pulseClass = isCurrentTurn ? 'animate-pulse-soft' : '';
  
  return (
    <div 
      ref={drop} 
      className={`${slotClass} ${glowClass} ${pulseClass} ${isOver ? 'ring-2' : ''} h-32 relative`}
    >
      {brawler ? (
        <div className="relative w-full h-full">
          <BrawlerCard 
            brawler={getBrawlerById(brawler) as Brawler} 
            size="lg"
            team={team}
          />
          <button
            onClick={() => onRemoveBrawler(index)}
            className="absolute -top-2 -right-2 z-10 bg-red-500/80 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg border-2 border-white"
            aria-label="Remove brawler"
          >
            <X size={20} className="text-white" />
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-center p-2">
          {isCurrentTurn ? (
            <>
              <span className="text-lg font-bold font-brawl text-white text-glow-blue">
                {team === 'blue' ? `${t('select')} ${index + 1}` : `${t('select')} ${index - 2}`}
              </span>
              <span className="text-sm text-white/70">
                {team === 'blue' ? t('blue_team') : t('red_team')}
              </span>
            </>
          ) : (
            <span className="text-gray-500/50 text-sm">
              {team === 'blue' ? t('blue_team') : t('red_team')} {index >= 3 ? index - 2 : index + 1}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default DraftSlot;
