import React, { useMemo, useState, useCallback } from 'react';
import { Brawler } from '@/lib/brawlers';
import BrawlerCard from './BrawlerCard';
import BrawlerSearch from './BrawlerSearch';
import { ArrowDownAZ, ArrowUpAZ, Filter, LayoutGrid } from 'lucide-react';
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
  const {
    t
  } = useTranslation();
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
  return <div className="glass-panel p-4 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <h3 className="text-lg font-bold font-brawl">{t('select_brawlers')}</h3>
        
        <div className="flex items-center space-x-2">
          <div className="relative">
            <button onClick={() => setShowSortDropdown(!showSortDropdown)} className="flex items-center space-x-1 p-2 rounded-lg transition-colors bg-slate-500 hover:bg-slate-400">
              <Filter size={16} />
              <span className="text-sm font-brawl">{t('sort_by')}</span>
            </button>
            
            {showSortDropdown && <div className="absolute right-0 z-10 mt-1 w-48 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 bg-slate-500">
                <div className="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer font-brawl" onClick={() => {
              setSortOrder('rarity');
              setShowSortDropdown(false);
            }}>
                  <LayoutGrid size={16} />
                  <span className="text-sm">{t('by_rarity')}</span>
                  {sortOrder === 'rarity' && <span className="ml-auto text-green-500">✓</span>}
                </div>
                <div className="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer font-brawl" onClick={() => {
              setSortOrder('nameAsc');
              setShowSortDropdown(false);
            }}>
                  <ArrowDownAZ size={16} />
                  <span className="text-sm">{t('name_az')}</span>
                  {sortOrder === 'nameAsc' && <span className="ml-auto text-green-500">✓</span>}
                </div>
                <div className="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer font-brawl" onClick={() => {
              setSortOrder('nameDesc');
              setShowSortDropdown(false);
            }}>
                  <ArrowUpAZ size={16} />
                  <span className="text-sm">{t('name_za')}</span>
                  {sortOrder === 'nameDesc' && <span className="ml-auto text-green-500">✓</span>}
                </div>
              </div>}
          </div>
        </div>
      </div>
      
      <BrawlerSearch onSearch={setSearchTerm} />
      
      <div className="space-y-4">
        {brawlersByRarity.map(({
        rarity,
        brawlers
      }) => <div key={rarity} className="transition-all duration-300">
            {sortOrder === 'rarity' && <div className={`p-2 rounded-lg mb-2 ${getRarityBackground(rarity)}`}>
                <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 font-brawl">
                  {rarity}
                </h4>
              </div>}
            <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-2 transition-all duration-300">
              {brawlers.map(brawler => {
            const isSelected = selectedBrawlers.includes(brawler.id);
            const isBanned = bannedBrawlers.includes(brawler.id);
            const team = getBrawlerTeam(brawler.id);
            return <div key={brawler.id} onContextMenu={e => handleBrawlerContextMenu(e, brawler)}>
                    <BrawlerCard brawler={brawler} disabled={isSelected} banned={isBanned} team={team} onClick={() => handleBrawlerClick(brawler)} size="sm" />
                  </div>;
          })}
            </div>
          </div>)}
        
        {filteredAndSortedBrawlers.length === 0 && <div className="text-center py-8 text-gray-500 font-brawl">
            {t('no_brawlers_found')}
          </div>}
      </div>
    </div>;
};
export default BrawlerGrid;