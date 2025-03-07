import React, { useMemo, useState, useCallback } from 'react';
import { Brawler } from '@/lib/brawlers';
import BrawlerCard from './BrawlerCard';
import BrawlerSearch from './BrawlerSearch';
import { ArrowDownAZ, ArrowUpAZ, Filter, LayoutGrid } from 'lucide-react';
import { toast } from 'sonner';

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
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  
  // Find which team (if any) the brawler is on
  const getBrawlerTeam = (brawlerId: number) => {
    const blueTeamIds = selectedBrawlers.slice(0, 3);
    const redTeamIds = selectedBrawlers.slice(3, 6);
    
    if (blueTeamIds.includes(brawlerId)) return 'blue';
    if (redTeamIds.includes(brawlerId)) return 'red';
    return null;
  };

  // Get background color for rarity
  const getRarityBackground = (rarity: string) => {
    switch (rarity) {
      case 'Common':
        return 'bg-blue-100 dark:bg-blue-900/20';
      case 'Rare':
        return 'bg-green-100 dark:bg-green-900/20';
      case 'Super Rare':
        return 'bg-blue-200 dark:bg-blue-800/30';
      case 'Epic':
        return 'bg-purple-100 dark:bg-purple-900/20';
      case 'Mythic':
        return 'bg-red-100 dark:bg-red-900/20';
      case 'Legendary':
        return 'bg-yellow-100 dark:bg-yellow-900/20';
      default:
        return '';
    }
  };
  
  // Handle right-click to ban
  const handleBrawlerContextMenu = useCallback((e: React.MouseEvent, brawler: Brawler) => {
    e.preventDefault();
    if (selectedBrawlers.includes(brawler.id)) {
      // If brawler is in draft, remove from draft and ban it
      const team = getBrawlerTeam(brawler.id);
      const indexInDraft = selectedBrawlers.indexOf(brawler.id);
      if (indexInDraft !== -1) {
        // Remove from draft first, then ban
        // This is handled outside by dispatching a simulated click event
        const event = new CustomEvent('removeBrawlerFromDraft', { 
          detail: { index: indexInDraft, shouldBan: true }
        });
        window.dispatchEvent(event);
      }
    } else if (!bannedBrawlers.includes(brawler.id)) {
      if (bannedBrawlers.length >= 6) {
        toast.error("You cannot ban more than 6 brawlers");
        return;
      }
      onBanBrawler(brawler.id);
    }
  }, [selectedBrawlers, bannedBrawlers, onBanBrawler]);
  
  // Handle click on selected brawler to remove from draft
  const handleBrawlerClick = useCallback((brawler: Brawler) => {
    if (selectedBrawlers.includes(brawler.id)) {
      // If brawler is in draft, remove it
      const indexInDraft = selectedBrawlers.indexOf(brawler.id);
      if (indexInDraft !== -1) {
        const event = new CustomEvent('removeBrawlerFromDraft', { 
          detail: { index: indexInDraft, shouldBan: false }
        });
        window.dispatchEvent(event);
      }
      return;
    }
    
    // Otherwise, select the brawler
    onSelectBrawler(brawler);
  }, [selectedBrawlers, onSelectBrawler]);
  
  // Sort and filter brawlers
  const filteredAndSortedBrawlers = useMemo(() => {
    const rarityOrder = ['Common', 'Rare', 'Super Rare', 'Epic', 'Mythic', 'Legendary'];
    
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
      return [{ rarity: 'All', brawlers: filteredAndSortedBrawlers }];
    }
    
    const rarityOrder = ['Common', 'Rare', 'Super Rare', 'Epic', 'Mythic', 'Legendary'];
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
  
  return (
    <div className="glass-panel p-4 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <h3 className="text-lg font-bold">Select Brawlers</h3>
        
        <div className="flex items-center space-x-2">
          <div className="relative">
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="flex items-center space-x-1 p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <Filter size={16} />
              <span className="text-sm">Sort by</span>
            </button>
            
            {showSortDropdown && (
              <div className="absolute right-0 z-10 mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                <div 
                  className="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => {
                    setSortOrder('rarity');
                    setShowSortDropdown(false);
                  }}
                >
                  <LayoutGrid size={16} />
                  <span className="text-sm">By rarity</span>
                  {sortOrder === 'rarity' && <span className="ml-auto text-green-500">✓</span>}
                </div>
                <div 
                  className="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => {
                    setSortOrder('nameAsc');
                    setShowSortDropdown(false);
                  }}
                >
                  <ArrowDownAZ size={16} />
                  <span className="text-sm">Name (A-Z)</span>
                  {sortOrder === 'nameAsc' && <span className="ml-auto text-green-500">✓</span>}
                </div>
                <div 
                  className="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => {
                    setSortOrder('nameDesc');
                    setShowSortDropdown(false);
                  }}
                >
                  <ArrowUpAZ size={16} />
                  <span className="text-sm">Name (Z-A)</span>
                  {sortOrder === 'nameDesc' && <span className="ml-auto text-green-500">✓</span>}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <BrawlerSearch onSearch={setSearchTerm} />
      
      <div className="space-y-6">
        {brawlersByRarity.map(({ rarity, brawlers }) => (
          <div key={rarity} className="transition-all duration-300">
            {sortOrder === 'rarity' && (
              <div className={`p-2 rounded-lg mb-2 ${getRarityBackground(rarity)}`}>
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {rarity}
                </h4>
              </div>
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
                      onClick={() => handleBrawlerClick(brawler)}
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
            No brawlers found
          </div>
        )}
      </div>
    </div>
  );
};

export default BrawlerGrid;
