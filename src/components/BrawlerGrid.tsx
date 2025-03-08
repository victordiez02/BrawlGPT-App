
import React, { useMemo, useState, useCallback } from 'react';
import { Brawler } from '@/lib/brawlers';
import BrawlerCard from './BrawlerCard';
import BrawlerSearch from './BrawlerSearch';
import { ArrowDownAZ, ArrowUpAZ, Filter, LayoutGrid, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

interface BrawlerGridProps {
  brawlers: Brawler[];
  selectedBrawlers: (number | null)[];
  bannedBrawlers: number[];
  onSelectBrawler: (brawler: Brawler) => void;
  onBanBrawler: (brawlerId: number) => void;
  onUnbanBrawler: (brawlerId: number) => void;
  onRemoveBrawlerFromDraft: (brawlerId: number) => void;
}

const BrawlerGrid: React.FC<BrawlerGridProps> = ({
  brawlers,
  selectedBrawlers,
  bannedBrawlers,
  onSelectBrawler,
  onBanBrawler,
  onUnbanBrawler,
  onRemoveBrawlerFromDraft
}) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'rarity' | 'nameAsc' | 'nameDesc'>('rarity');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [expandedRarities, setExpandedRarities] = useState<string[]>([]);

  // Toggle rarity section expansion
  const toggleRarityExpansion = (rarity: string) => {
    setExpandedRarities(prev => 
      prev.includes(rarity)
        ? prev.filter(r => r !== rarity)
        : [...prev, rarity]
    );
  };

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
        return 'bg-blue-200 dark:bg-blue-800/40';
      case 'Rare':
        return 'bg-green-300 dark:bg-green-700/40';
      case 'Super Rare':
        return 'bg-blue-400 dark:bg-blue-600/50';
      case 'Epic':
        return 'bg-purple-300 dark:bg-purple-700/40';
      case 'Mythic':
        return 'bg-red-300 dark:bg-red-700/40';
      case 'Legendary':
        return 'bg-yellow-300 dark:bg-yellow-700/40';
      default:
        return '';
    }
  };

  // Handle brawler context menu (right-click)
  const handleBrawlerContextMenu = useCallback((e: React.MouseEvent, brawler: Brawler) => {
    e.preventDefault();

    // If already banned, unban it
    if (bannedBrawlers.includes(brawler.id)) {
      onUnbanBrawler(brawler.id);
      return;
    }

    // If brawler is in draft, remove from draft and ban it
    if (selectedBrawlers.includes(brawler.id)) {
      onRemoveBrawlerFromDraft(brawler.id);

      // Check if we can ban (max 6 bans)
      if (bannedBrawlers.length < 6) {
        onBanBrawler(brawler.id);
      }
      return;
    }

    // Otherwise, just ban it if we haven't reached the limit
    if (bannedBrawlers.length >= 6) {
      toast.error(t('max_bans_error'));
      return;
    }
    onBanBrawler(brawler.id);
  }, [selectedBrawlers, bannedBrawlers, onBanBrawler, onUnbanBrawler, onRemoveBrawlerFromDraft, t]);

  // Handle brawler click
  const handleBrawlerClick = useCallback((brawler: Brawler) => {
    // If banned, unban it
    if (bannedBrawlers.includes(brawler.id)) {
      onUnbanBrawler(brawler.id);
      return;
    }

    // If already selected, remove from draft
    if (selectedBrawlers.includes(brawler.id)) {
      onRemoveBrawlerFromDraft(brawler.id);
      return;
    }

    // Otherwise, select the brawler
    onSelectBrawler(brawler);
  }, [bannedBrawlers, selectedBrawlers, onUnbanBrawler, onRemoveBrawlerFromDraft, onSelectBrawler]);

  // Get translated rarity name
  const getTranslatedRarity = (rarity: string) => {
    if (rarity === 'Common') return t('common');
    if (rarity === 'Rare') return t('rare');
    if (rarity === 'Super Rare') return t('super_rare');
    if (rarity === 'Epic') return t('epic');
    if (rarity === 'Mythic') return t('mythic');
    if (rarity === 'Legendary') return t('legendary');
    if (rarity === 'Chromatic') return t('chromatic');
    return rarity;
  };

  // Sort and filter brawlers
  const filteredAndSortedBrawlers = useMemo(() => {
    const rarityOrder = ['Common', 'Rare', 'Super Rare', 'Epic', 'Mythic', 'Legendary'];

    // Filter by search term
    const filtered = brawlers.filter(brawler => brawler.name.toLowerCase().includes(searchTerm.toLowerCase()));

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
        sorted = Object.entries(grouped).sort((a, b) => {
          return rarityOrder.indexOf(a[0]) - rarityOrder.indexOf(b[0]);
        }).flatMap(([_, brawlers]) => brawlers);
    }
    return sorted;
  }, [brawlers, searchTerm, sortOrder]);

  // Group by rarity (only for rarity sort)
  const brawlersByRarity = useMemo(() => {
    if (sortOrder !== 'rarity') {
      return [{
        rarity: 'All',
        brawlers: filteredAndSortedBrawlers
      }];
    }
    const rarityOrder = ['Common', 'Rare', 'Super Rare', 'Epic', 'Mythic', 'Legendary'];
    const filtered = brawlers.filter(brawler => brawler.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const grouped = filtered.reduce((acc, brawler) => {
      if (!acc[brawler.rarity]) {
        acc[brawler.rarity] = [];
      }
      acc[brawler.rarity].push(brawler);
      return acc;
    }, {} as Record<string, Brawler[]>);

    // Sort by rarity order
    return Object.entries(grouped).sort((a, b) => {
      return rarityOrder.indexOf(a[0]) - rarityOrder.indexOf(b[0]);
    }).map(([rarity, brawlers]) => ({
      rarity,
      brawlers
    }));
  }, [brawlers, searchTerm, sortOrder, filteredAndSortedBrawlers]);

  // Count selected and banned brawlers in each rarity
  const getRarityCounts = (rarity: string, brawlers: Brawler[]) => {
    const totalCount = brawlers.length;
    const selectedCount = brawlers.filter(b => selectedBrawlers.includes(b.id)).length;
    const bannedCount = brawlers.filter(b => bannedBrawlers.includes(b.id)).length;
    
    return { totalCount, selectedCount, bannedCount };
  };

  return (
    <div className="glass-panel p-4 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <h3 className="text-lg font-bold font-brawl">{t('select_brawlers')}</h3>
        
        <div className="flex items-center space-x-2">
          <div className="relative">
            <button onClick={() => setShowSortDropdown(!showSortDropdown)} className="flex items-center space-x-1 p-2 rounded-lg transition-colors bg-slate-500 hover:bg-slate-400">
              <Filter size={16} />
              <span className="text-sm font-brawl">{t('sort_by')}</span>
            </button>
            
            {showSortDropdown && (
              <div className="absolute right-0 z-10 mt-1 w-48 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 bg-slate-500">
                <div 
                  onClick={() => {
                    setSortOrder('rarity');
                    setShowSortDropdown(false);
                  }} 
                  className="flex items-center space-x-2 p-2 cursor-pointer font-brawl bg-slate-500"
                >
                  <LayoutGrid size={16} />
                  <span className="text-sm">{t('by_rarity')}</span>
                  {sortOrder === 'rarity' && <span className="ml-auto text-green-500">✓</span>}
                </div>
                <div 
                  onClick={() => {
                    setSortOrder('nameAsc');
                    setShowSortDropdown(false);
                  }} 
                  className="flex items-center space-x-2 p-2 cursor-pointer font-brawl bg-slate-500"
                >
                  <ArrowDownAZ size={16} />
                  <span className="text-sm">{t('name_az')}</span>
                  {sortOrder === 'nameAsc' && <span className="ml-auto text-green-500">✓</span>}
                </div>
                <div 
                  onClick={() => {
                    setSortOrder('nameDesc');
                    setShowSortDropdown(false);
                  }} 
                  className="flex items-center space-x-2 p-2 cursor-pointer font-brawl bg-slate-500"
                >
                  <ArrowUpAZ size={16} />
                  <span className="text-sm">{t('name_za')}</span>
                  {sortOrder === 'nameDesc' && <span className="ml-auto text-green-500">✓</span>}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <BrawlerSearch onSearch={setSearchTerm} />
      
      <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2">
        {brawlersByRarity.map(({ rarity, brawlers }) => {
          const isExpanded = expandedRarities.includes(rarity);
          const counts = getRarityCounts(rarity, brawlers);
          
          return (
            <div key={rarity} className="transition-all duration-300 border border-slate-600 rounded-lg">
              {sortOrder === 'rarity' && (
                <div 
                  className={`p-3 rounded-lg ${getRarityBackground(rarity)} cursor-pointer`}
                  onClick={() => toggleRarityExpansion(rarity)}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-semibold text-gray-800 dark:text-gray-200 font-brawl flex items-center">
                      {getTranslatedRarity(rarity)}
                      <span className="ml-2 text-sm font-normal">({brawlers.length})</span>
                    </h4>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1 text-xs">
                        {counts.selectedCount > 0 && (
                          <span className="px-2 py-1 rounded-full bg-blue-500/20 text-xs">
                            {counts.selectedCount} {t('selected')}
                          </span>
                        )}
                        {counts.bannedCount > 0 && (
                          <span className="px-2 py-1 rounded-full bg-red-500/20 text-xs">
                            {counts.bannedCount} {t('banned')}
                          </span>
                        )}
                      </div>
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </div>
                </div>
              )}
              
              {(isExpanded || sortOrder !== 'rarity' || rarity === 'All') && (
                <div className="p-2 animate-accordion-down">
                  <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-2 transition-all duration-300">
                    {brawlers.map(brawler => {
                      const isSelected = selectedBrawlers.includes(brawler.id);
                      const isBanned = bannedBrawlers.includes(brawler.id);
                      const team = getBrawlerTeam(brawler.id);
                      return (
                        <div key={brawler.id} onContextMenu={e => handleBrawlerContextMenu(e, brawler)}>
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
              )}
            </div>
          );
        })}
        
        {filteredAndSortedBrawlers.length === 0 && (
          <div className="text-center py-8 text-gray-500 font-brawl">
            {t('no_brawlers_found')}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrawlerGrid;
