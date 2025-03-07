
import React, { useState } from 'react';
import { GameMap, gameMaps } from '@/lib/maps';
import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface MapSelectionPageProps {
  onSelectMap: (map: GameMap) => void;
}

const MapSelectionPage: React.FC<MapSelectionPageProps> = ({ onSelectMap }) => {
  const [filterMode, setFilterMode] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { t } = useTranslation();
  
  // Get unique modes for filtering
  const modes = Array.from(new Set(gameMaps.map(map => map.mode)));
  
  // Filter maps by selected mode and search term
  const filteredMaps = gameMaps
    .filter(map => filterMode ? map.mode === filterMode : true)
    .filter(map => 
      map.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      map.mode.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, mapName: string) => {
    console.error(`Failed to load image for map ${mapName}:`, e.currentTarget.src);
    e.currentTarget.src = 'https://cdn.brawlify.com/placeholder.png';
  };

  return (
    <div className="animate-fade-in max-w-5xl mx-auto">
      <div className="glass-panel p-6 mb-6">
        <h2 className="text-2xl font-bold font-brawl mb-6 text-center">{t('select_map_first')}</h2>
        
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('search')}
            className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-600 bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-brawl-blue"
          />
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            type="button"
            onClick={() => setFilterMode(null)}
            className={`px-4 py-2 text-sm rounded-full transition-colors ${
              filterMode === null 
                ? 'bg-brawl-blue text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {t('all_modes')}
          </button>
          {modes.map(mode => (
            <button
              type="button"
              key={mode}
              onClick={() => setFilterMode(mode)}
              className={`px-4 py-2 text-sm rounded-full transition-colors ${
                filterMode === mode 
                  ? 'bg-brawl-blue text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredMaps.map(map => (
          <div
            key={map.id}
            className="glass-panel overflow-hidden rounded-lg cursor-pointer transition-all hover:scale-105 hover:shadow-xl hover:shadow-brawl-blue/20"
            onClick={() => onSelectMap(map)}
          >
            <div className="aspect-video overflow-hidden">
              <img
                src={map.image}
                alt={map.name}
                className="w-full h-full object-cover transition-transform hover:scale-110"
                onError={(e) => handleImageError(e, map.name)}
              />
            </div>
            <div className="p-3 bg-gray-800/80">
              <p className="font-medium text-lg font-brawl">{map.name}</p>
              <p className="text-sm text-gray-300">{map.mode}</p>
            </div>
          </div>
        ))}
        
        {filteredMaps.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-400">
            {t('no_maps_found')}
          </div>
        )}
      </div>
    </div>
  );
};

export default MapSelectionPage;
