
import React, { useMemo, useState, useCallback } from 'react';
import { Brawler } from '@/lib/brawlers';
import BrawlerCard from './BrawlerCard';
import BrawlerSearch from './BrawlerSearch';
import { ArrowDownAZ, ArrowUpAZ, LayoutGrid } from 'lucide-react';

interface BrawlerGridProps {
  brawlers: Brawler[];
  selectedBrawlers: (number | null)[];
  bannedBrawlers: number[];
  onSelectBrawler: (brawler: Brawler) => void;
  onBanBrawler: (brawlerId: number) => void;
}

const BrawlerGrid: React.FC<BrawlerGridProps> = ({
  brawlers,
  selectedBrawlers,
  bannedBrawlers,
  onSelectBrawler,
  onBanBrawler
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'rarity' | 'nameAsc' | 'nameDesc'>('rarity');
  
  // Find which team (if any) the brawler is on
  const getBrawlerTeam = (brawlerId: number) => {
    const blueTeamIds = selectedBrawlers.slice(0, 3);
    const redTeamIds = selectedBrawlers.slice(3, 6);
    
    if (blueTeamIds.includes(brawlerId)) return 'blue';
    if (redTeamIds.includes(brawlerId)) return 'red';
    return null;
  };
  
  // Handle right-click to ban
  const handleBrawlerContextMenu = useCallback((e: React.MouseEvent, brawler: Brawler) => {
    e.preventDefault();
    if (!selectedBrawlers.includes(brawler.id) && !bannedBrawlers.includes(brawler.id)) {
      onBanBrawler(brawler.id);
    }
  }, [selectedBrawlers, bannedBrawlers, onBanBrawler]);
  
  // Sort and filter brawlers
  const filteredAndSortedBrawlers = useMemo(() => {
    const rarityOrder = ['Common', 'Rare', 'Super Rare', 'Epic', 'Mythic', 'Legendary', 'Chromatic'];
    
    // Filter by search term
    const filtered = brawlers.filter(brawler => 
      brawler.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Sort based on selected order
    let sorted;
    switch (sortOrder) {
      case 'nameAsc':
        sorted = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'nameDesc':
        sorted = [...filtered].sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'rarity':
      default:
        // First group by rarity, then sort groups by rarity order
        const grouped = filtered.reduce((acc, brawler) => {
          if (!acc[brawler.rarity]) {
            acc[brawler.rarity] = [];
          }
          acc[brawler.rarity].push(brawler);
          return acc;
        }, {} as Record<string, Brawler[]>);
        
        // Sort by rarity order
        sorted = Object.entries(grouped)
          .sort((a, b) => {
            return rarityOrder.indexOf(a[0]) - rarityOrder.indexOf(b[0]);
          })
          .flatMap(([_, brawlers]) => brawlers);
    }
    
    return sorted;
  }, [brawlers, searchTerm, sortOrder]);
  
  // Group by rarity (only for rarity sort)
  const brawlersByRarity = useMemo(() => {
    if (sortOrder !== 'rarity') {
      return [{ rarity: 'Todos', brawlers: filteredAndSortedBrawlers }];
    }
    
    const rarityOrder = ['Common', 'Rare', 'Super Rare', 'Epic', 'Mythic', 'Legendary', 'Chromatic'];
    const filtered = brawlers.filter(brawler => 
      brawler.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const grouped = filtered.reduce((acc, brawler) => {
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
  }, [brawlers, searchTerm, sortOrder, filteredAndSortedBrawlers]);
  
  // Toggle sort order
  const toggleSortOrder = () => {
    if (sortOrder === 'rarity') setSortOrder('nameAsc');
    else if (sortOrder === 'nameAsc') setSortOrder('nameDesc');
    else setSortOrder('rarity');
  };
  
  return (
    <div className="glass-panel p-4 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <h3 className="text-lg font-bold">Selecciona Brawlers</h3>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleSortOrder}
            className="flex items-center space-x-1 p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {sortOrder === 'rarity' && <LayoutGrid size={16} />}
            {sortOrder === 'nameAsc' && <ArrowDownAZ size={16} />}
            {sortOrder === 'nameDesc' && <ArrowUpAZ size={16} />}
            <span className="text-sm">
              {sortOrder === 'rarity' ? 'Rareza' : 
               sortOrder === 'nameAsc' ? 'A-Z' : 'Z-A'}
            </span>
          </button>
        </div>
      </div>
      
      <BrawlerSearch onSearch={setSearchTerm} />
      
      <div className="space-y-6">
        {brawlersByRarity.map(({ rarity, brawlers }) => (
          <div key={rarity} className="transition-all duration-300">
            {sortOrder === 'rarity' && (
              <h4 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                {rarity}
              </h4>
            )}
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 transition-all duration-300">
              {brawlers.map(brawler => {
                const isSelected = selectedBrawlers.includes(brawler.id);
                const isBanned = bannedBrawlers.includes(brawler.id);
                const team = getBrawlerTeam(brawler.id);
                
                return (
                  <div 
                    key={brawler.id}
                    onContextMenu={(e) => handleBrawlerContextMenu(e, brawler)}
                  >
                    <BrawlerCard
                      brawler={brawler}
                      disabled={isSelected}
                      banned={isBanned}
                      team={team}
                      onClick={() => onSelectBrawler(brawler)}
                      size="sm"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        
        {filteredAndSortedBrawlers.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No se encontraron brawlers
          </div>
        )}
      </div>
    </div>
  );
};

export default BrawlerGrid;
