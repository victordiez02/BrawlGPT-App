
import React from 'react';
import BrawlerCard from './BrawlerCard';
import { Brawler, brawlers } from '@/lib/brawlers';
import { UserRound } from 'lucide-react';

interface DraftTeamProps {
  team: 'blue' | 'red';
  brawlerIds: (number | null)[];
  activeSlot: number | null;
  currentPickTeam: 'blue' | 'red';
  onRemoveBrawler: (index: number) => void;
}

const DraftTeam: React.FC<DraftTeamProps> = ({
  team,
  brawlerIds,
  activeSlot,
  currentPickTeam,
  onRemoveBrawler
}) => {
  const teamColorClass = team === 'blue' ? 'draft-slot-blue' : 'draft-slot-red';
  
  // Find brawler by id
  const getBrawler = (id: number | null): Brawler | null => {
    if (id === null) return null;
    return brawlers.find(b => b.id === id) || null;
  };
  
  // Determine pick order labels
  const getPickLabel = (index: number): string => {
    const globalIndex = team === 'blue' ? index : index + 3;
    
    const pickOrder = ['1st Pick', '3rd Pick', '5th Pick'];
    
    if (team === 'blue') return pickOrder[index];
    return ['2nd Pick', '4th Pick', '6th Pick'][index];
  };
  
  return (
    <div className={`w-full ${team === 'blue' ? 'order-1' : 'order-2'}`}>
      <div className={`flex items-center justify-center p-2 ${
        team === 'blue' ? 'bg-brawl-blue/80' : 'bg-brawl-red/80'
      } text-white rounded-t-lg`}>
        <h3 className="font-bold flex items-center text-lg">
          <UserRound size={20} className="mr-2" />
          Equipo {team === 'blue' ? 'Azul' : 'Rojo'}
        </h3>
      </div>
      
      <div className="grid grid-cols-3 gap-3 p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-b-lg">
        {Array.from({ length: 3 }).map((_, index) => {
          const brawlerId = brawlerIds[index];
          const brawler = getBrawler(brawlerId);
          const isActiveSlot = team === currentPickTeam && ((team === 'blue' && index === activeSlot) || 
                              (team === 'red' && index + 3 === activeSlot));
          
          return (
            <div key={index} className="flex flex-col items-center space-y-2">
              <div className={`w-full aspect-square ${teamColorClass} ${
                isActiveSlot ? 'ring-2 ring-yellow-400 animate-pulse-soft' : ''
              }`}>
                {brawler ? (
                  <div className="relative w-full h-full">
                    <BrawlerCard
                      brawler={brawler}
                      size="lg"
                      team={team}
                    />
                    <button
                      onClick={() => onRemoveBrawler(team === 'blue' ? index : index + 3)}
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
                {getPickLabel(index)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DraftTeam;
