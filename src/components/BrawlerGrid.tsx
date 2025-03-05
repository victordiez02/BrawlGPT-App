
import React, { useMemo } from 'react';
import { Brawler } from '@/lib/brawlers';
import BrawlerCard from './BrawlerCard';

interface BrawlerGridProps {
  brawlers: Brawler[];
  selectedBrawlers: (number | null)[];
  bannedBrawlers: number[];
  onSelectBrawler: (brawler: Brawler) => void;
}

const BrawlerGrid: React.FC<BrawlerGridProps> = ({
  brawlers,
  selectedBrawlers,
  bannedBrawlers,
  onSelectBrawler
}) => {
  // Find which team (if any) the brawler is on
  const getBrawlerTeam = (brawlerId: number) => {
    const blueTeamIds = selectedBrawlers.slice(0, 3);
    const redTeamIds = selectedBrawlers.slice(3, 6);
    
    if (blueTeamIds.includes(brawlerId)) return 'blue';
    if (redTeamIds.includes(brawlerId)) return 'red';
    return null;
  };
  
  // Create sections by rarity
  const brawlersByRarity = useMemo(() => {
    const rarityOrder = ['Common', 'Rare', 'Super Rare', 'Epic', 'Mythic', 'Legendary', 'Chromatic'];
    const grouped = brawlers.reduce((acc, brawler) => {
      if (!acc[brawler.rarity]) {
        acc[brawler.rarity] = [];
      }
      acc[brawler.rarity].push(brawler);
      return acc;
    }, {} as Record<string, Brawler[]>);
    
    // Sort by rarity order
    return Object.entries(grouped)
      .sort((a, b) => {
        return rarityOrder.indexOf(a[0]) - rarityOrder.indexOf(b[0]);
      })
      .map(([rarity, brawlers]) => ({
        rarity,
        brawlers
      }));
  }, [brawlers]);
  
  return (
    <div className="glass-panel p-4 animate-fade-in">
      <h3 className="text-lg font-bold mb-4">Selecciona Brawlers</h3>
      
      <div className="space-y-6">
        {brawlersByRarity.map(({ rarity, brawlers }) => (
          <div key={rarity}>
            <h4 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              {rarity}
            </h4>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
              {brawlers.map(brawler => {
                const isSelected = selectedBrawlers.includes(brawler.id);
                const isBanned = bannedBrawlers.includes(brawler.id);
                const team = getBrawlerTeam(brawler.id);
                
                return (
                  <BrawlerCard
                    key={brawler.id}
                    brawler={brawler}
                    disabled={isSelected}
                    banned={isBanned}
                    team={team}
                    onClick={() => onSelectBrawler(brawler)}
                    size="sm"
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrawlerGrid;
