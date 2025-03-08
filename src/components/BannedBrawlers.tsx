
import React, { useState } from 'react';
import { Brawler, brawlers } from '@/lib/brawlers';
import BrawlerCard from './BrawlerCard';
import { Ban } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

interface BannedBrawlersProps {
  bannedBrawlers: number[];
  onBanBrawler: (brawlerId: number) => void;
  onUnbanBrawler: (brawlerId: number) => void;
}

const MAX_BANNED_BRAWLERS = 6;

const BannedBrawlers: React.FC<BannedBrawlersProps> = ({
  bannedBrawlers,
  onBanBrawler,
  onUnbanBrawler
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const { t } = useTranslation();
  
  // Filter brawlers for dropdown
  const filteredBrawlers = brawlers
    .filter(brawler => !bannedBrawlers.includes(brawler.id))
    .filter(brawler => 
      brawler.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
  // Get banned brawler objects
  const bannedBrawlerObjects = bannedBrawlers.map(id => 
    brawlers.find(brawler => brawler.id === id)
  ).filter(Boolean) as Brawler[];
  
  const handleBanBrawler = (brawlerId: number) => {
    if (bannedBrawlers.length >= MAX_BANNED_BRAWLERS) {
      toast.error(t('max_bans_error'));
      return;
    }
    onBanBrawler(brawlerId);
  };
  
  return (
    <div className="animate-fade-in">
      <h3 className="flex items-center text-lg font-bold mb-4 font-brawl">
        <Ban size={20} className="mr-2 text-red-500" />
        {t('banned_brawlers')} ({bannedBrawlers.length}/{MAX_BANNED_BRAWLERS})
      </h3>
      
      <div className="relative mb-4 w-full">
        <div className="flex w-full">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setShowDropdown(true)}
            placeholder={t('search_to_ban')}
            className="flex-1 p-2 rounded-l-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-brawl-red text-sm w-full text-gray-800 dark:text-white"
          />
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className={`${bannedBrawlers.length >= MAX_BANNED_BRAWLERS ? 'bg-gray-400 cursor-not-allowed' : 'bg-brawl-red'} text-white px-3 rounded-r-lg`}
            disabled={bannedBrawlers.length >= MAX_BANNED_BRAWLERS}
          >
            +
          </button>
        </div>
        
        {showDropdown && searchTerm.length > 0 && (
          <div className="absolute z-50 mt-1 w-full max-h-60 overflow-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            {filteredBrawlers.length > 0 ? (
              filteredBrawlers.slice(0, 8).map(brawler => (
                <div
                  key={brawler.id}
                  className="flex items-center space-x-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => {
                    if (bannedBrawlers.length < MAX_BANNED_BRAWLERS) {
                      handleBanBrawler(brawler.id);
                      setSearchTerm('');
                      setShowDropdown(false);
                    } else {
                      toast.error(t('max_bans_error'));
                    }
                  }}
                >
                  <img
                    src={brawler.image}
                    alt={brawler.name}
                    className="w-8 h-8 rounded-md"
                  />
                  <span className="text-gray-800 dark:text-white">{brawler.name}</span>
                </div>
              ))
            ) : (
              <div className="p-2 text-gray-500 text-center">{t('no_brawlers_found')}</div>
            )}
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3">
        {bannedBrawlerObjects.length > 0 ? (
          bannedBrawlerObjects.map(brawler => (
            <div key={brawler.id} className="relative">
              <BrawlerCard
                brawler={brawler}
                banned={true}
                size="sm"
              />
              <button
                onClick={() => onUnbanBrawler(brawler.id)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                ×
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-4 text-gray-500 dark:text-gray-400 font-brawl">
            {t('no_banned_brawlers')}
          </div>
        )}
      </div>
    </div>
  );
};

export default BannedBrawlers;
