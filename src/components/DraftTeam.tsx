/** @jsxImportSource react */
import React from 'react';
import { UserRound } from 'lucide-react';
import DraftSlot from './DraftSlot';
import { useTranslation } from 'react-i18next';

interface DraftTeamProps {
  team: 'blue' | 'red';
  brawlerIds: (number | null)[];
  activeSlot: number | null;
  currentPickTeam: 'blue' | 'red';
  pickOrder: number[];
  onRemoveBrawler: (index: number) => void;
  onMoveBrawler: (fromIndex: number, toIndex: number) => void;
}

const DraftTeam: React.FC<DraftTeamProps> = ({
  team,
  brawlerIds,
  activeSlot,
  currentPickTeam,
  pickOrder,
  onRemoveBrawler,
  onMoveBrawler
}) => {
  const { t } = useTranslation();
  
  // Determine pick order labels
  const getPickLabel = (index: number): string => {
    const globalIndex = team === 'blue' ? index : index + 3;
    const pickNumber = pickOrder.indexOf(globalIndex) + 1;
    return `${pickNumber}° Pick`;
  };

  // Check if this slot is the 6th pick (last pick)
  const isLastPickSlot = (index: number): boolean => {
    const globalIndex = team === 'blue' ? index : index + 3;
    const pickNumber = pickOrder.indexOf(globalIndex) + 1;
    return pickNumber === 6; // 6th pick
  };
  
  return (
    <div className={`w-full ${team === 'blue' ? 'order-1' : 'order-2'}`}>
      <div className={`flex items-center justify-center p-2 ${
        team === 'blue' ? 'bg-brawl-blue/80' : 'bg-brawl-red/80'
      } text-white rounded-t-lg`}>
        <h3 className="font-bold flex items-center text-lg">
          <UserRound size={20} className="mr-2" />
          {team === 'blue' ? t('blue_team') : t('red_team')}
        </h3>
      </div>
      
      <div className="grid grid-cols-3 gap-3 p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-b-lg">
        {Array.from({ length: 3 }).map((_, index) => {
          const globalIndex = team === 'blue' ? index : index + 3;
          const brawlerId = brawlerIds[index];
          
          // Fix: properly calculate isActiveSlot for both teams
          const isActiveSlot = currentPickTeam === team && activeSlot === index;
          
          // Check if this slot is the 6th pick
          const isLocked = isLastPickSlot(index);
          
          return (
            <DraftSlot
              key={index}
              index={globalIndex}
              team={team}
              brawlerId={brawlerId}
              isActiveSlot={isActiveSlot}
              pickLabel={getPickLabel(index)}
              isLocked={isLocked}
              onRemoveBrawler={onRemoveBrawler}
              onMoveBrawler={onMoveBrawler}
            />
          );
        })}
      </div>
    </div>
  );
};

export default DraftTeam;
