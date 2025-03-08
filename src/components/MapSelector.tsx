
import React, { useState } from 'react';
import { GameMap, gameMaps, gameModes } from '@/lib/maps';
import { Check, ChevronDown, ChevronUp, Map, Search, Maximize2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface MapSelectorProps {
  selectedMap: GameMap | null;
  onSelectMap: (map: GameMap) => void;
}

const MapSelector: React.FC<MapSelectorProps> = ({ selectedMap, onSelectMap }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filterMode, setFilterMode] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isExpandedView, setIsExpandedView] = useState(false);
  const { t, i18n } = useTranslation();
  
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

  // Get mode icon based on map mode
  const getModeIcon = (mode: string) => {
    const lowerMode = mode.toLowerCase();
    if (lowerMode === 'gem grab' || lowerMode === 'atrapagemas') 
      return 'https://cdn.brawlify.com/game-modes/regular/48000000.png';
    if (lowerMode === 'brawl ball' || lowerMode === 'balón brawl') 
      return 'https://cdn.brawlify.com/game-modes/regular/48000005.png';
    if (lowerMode === 'heist' || lowerMode === 'atraco') 
      return 'https://cdn.brawlify.com/game-modes/regular/48000002.png';
    if (lowerMode === 'hot zone' || lowerMode === 'zona restringida') 
      return 'https://cdn.brawlify.com/game-modes/regular/48000017.png';
    if (lowerMode === 'bounty' || lowerMode === 'caza estelar') 
      return 'https://cdn.brawlify.com/game-modes/regular/48000003.png';
    if (lowerMode === 'knockout' || lowerMode === 'noqueo') 
      return 'https://cdn.brawlify.com/game-modes/regular/48000020.png';
    if (lowerMode === 'brawl hockey' || lowerMode === 'hockey brawl') 
      return 'https://cdn.brawlify.com/game-modes/regular/48000045.png';
    return 'https://cdn.brawlify.com/placeholder.png';
  };

  // Get mode banner based on map mode
  const getModeBanner = (mode: string) => {
    const gameMode = gameModes.find(m => m.name === mode);
    return gameMode?.banner || '';
  };

  // Get translated mode name
  const getTranslatedMode = (mode: string) => {
    if (i18n.language !== 'es') return mode;
    
    const gameMode = gameModes.find(m => m.name === mode);
    return gameMode?.translatedName || mode;
  };

  return (
    <div className="w-full animate-slide-in">
      <div className="mb-2">
        <label className="block text-sm font-medium text-white mb-1 font-brawl">
          {t('select_map')}
        </label>
        
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="glass-card w-full flex items-center justify-between px-4 py-2 text-left"
          >
            {selectedMap ? (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-md overflow-hidden">
                  <img 
                    src={selectedMap.image} 
                    alt={selectedMap.name} 
                    className="w-full h-full object-contain"
                    onError={(e) => handleImageError(e, selectedMap.name)}
                  />
                </div>
                <div>
                  <p className="font-medium">{i18n.language === 'es' && selectedMap.translatedName ? selectedMap.translatedName : selectedMap.name}</p>
                  <p className="text-xs text-gray-400 flex items-center">
                    <img src={getModeIcon(selectedMap.mode)} alt={selectedMap.mode} className="w-4 h-4 mr-1" /> 
                    {getTranslatedMode(selectedMap.mode)}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2 text-gray-500">
                <Map size={18} />
                <span>{t('select_map')}</span>
              </div>
            )}
            <div className="flex items-center">
              <button 
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpandedView(!isExpandedView);
                }}
                className="p-1 mr-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              >
                <Maximize2 size={16} />
              </button>
              {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
          </button>
          
          {isOpen && (
            <div className="absolute z-10 mt-1 w-full glass-panel shadow-2xl rounded-xl overflow-hidden">
              <div className="p-2 border-b border-gray-200 dark:border-gray-700">
                <div className="relative mb-2">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={t('search')}
                    className="pl-10 pr-4 py-1.5 w-full rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-brawl-blue text-sm"
                  />
                </div>
                
                <div className="flex flex-wrap gap-1 mt-2">
                  <button
                    type="button"
                    onClick={() => setFilterMode(null)}
                    className={`px-2 py-1 text-xs rounded-full transition-colors ${
                      filterMode === null 
                        ? 'bg-brawl-blue text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {t('all_modes')}
                  </button>
                  {modes.map(mode => (
                    <button
                      type="button"
                      key={mode}
                      onClick={() => setFilterMode(mode)}
                      className={`px-2 py-1 text-xs rounded-full transition-colors flex items-center ${
                        filterMode === mode 
                          ? 'bg-brawl-blue text-white' 
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <img src={getModeIcon(mode)} alt={mode} className="w-4 h-4 mr-1" /> 
                      {getTranslatedMode(mode)}
                    </button>
                  ))}
                </div>
              </div>
              
              {filterMode && (
                <div className="border-b border-gray-200 dark:border-gray-700">
                  <img 
                    src={getModeBanner(filterMode)} 
                    alt={filterMode}
                    className="w-full h-auto object-cover max-h-24"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
              
              <div className="max-h-60 overflow-y-auto py-1">
                {filteredMaps.length > 0 ? (
                  filteredMaps.map(map => (
                    <button
                      type="button"
                      key={map.id}
                      className={`w-full flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                        selectedMap?.id === map.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                      }`}
                      onClick={() => {
                        onSelectMap(map);
                        setIsOpen(false);
                      }}
                    >
                      <div className="w-8 h-8 rounded-md overflow-hidden">
                        <img 
                          src={map.image} 
                          alt={map.name} 
                          className="w-full h-full object-contain"
                          onError={(e) => handleImageError(e, map.name)}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{i18n.language === 'es' && map.translatedName ? map.translatedName : map.name}</p>
                        <p className="text-xs text-gray-500 flex items-center">
                          <img src={getModeIcon(map.mode)} alt={map.mode} className="w-4 h-4 mr-1" /> 
                          {getTranslatedMode(map.mode)}
                        </p>
                      </div>
                      {selectedMap?.id === map.id && (
                        <Check size={16} className="text-brawl-blue" />
                      )}
                    </button>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    {t('no_maps_found')}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {isExpandedView && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-3xl w-full">
            <button 
              type="button"
              onClick={() => setIsExpandedView(false)}
              className="absolute -top-4 -right-4 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
            >
              ×
            </button>
            <div className="glass-panel p-4">
              <h3 className="text-lg font-bold mb-4 font-brawl flex items-center justify-between">
                {t('select_map')}
                <img 
                  src="/lovable-uploads/73ba99c9-265c-40aa-92f7-016afd79fabb.png" 
                  alt="Brawl Stars Logo" 
                  className="w-12 h-12 hover:scale-110 transition-transform cursor-pointer animate-pulse-soft"
                />
              </h3>
              
              <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={16} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={t('search')}
                  className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-brawl-blue"
                />
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => setFilterMode(null)}
                  className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                    filterMode === null 
                      ? 'bg-brawl-blue text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {t('all_modes')}
                </button>
                {modes.map(mode => (
                  <button
                    type="button"
                    key={mode}
                    onClick={() => setFilterMode(mode)}
                    className={`px-3 py-1.5 text-sm rounded-full transition-colors flex items-center ${
                      filterMode === mode 
                        ? 'bg-brawl-blue text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <img src={getModeIcon(mode)} alt={mode} className="w-5 h-5 mr-1" /> 
                    {getTranslatedMode(mode)}
                  </button>
                ))}
              </div>
              
              {filterMode && (
                <div className="mb-4 rounded-lg overflow-hidden">
                  <img 
                    src={getModeBanner(filterMode)} 
                    alt={filterMode}
                    className="w-full h-auto object-cover max-h-32"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4 max-h-[50vh] overflow-y-auto p-2">
                {filteredMaps.map(map => (
                  <div
                    key={map.id}
                    className={`overflow-hidden rounded-lg border-2 cursor-pointer transition-all ${
                      selectedMap?.id === map.id 
                        ? 'border-brawl-blue scale-105 shadow-lg' 
                        : 'border-transparent hover:border-gray-300 hover:shadow'
                    }`}
                    onClick={() => {
                      onSelectMap(map);
                      setIsExpandedView(false);
                    }}
                  >
                    <div className="aspect-square overflow-hidden flex items-center justify-center bg-transparent">
                      <img
                        src={map.image}
                        alt={map.name}
                        className="w-full h-full object-contain"
                        onError={(e) => handleImageError(e, map.name)}
                      />
                    </div>
                    <div className="p-2 bg-white/10 dark:bg-gray-800/80">
                      <p className="font-medium text-sm truncate">{i18n.language === 'es' && map.translatedName ? map.translatedName : map.name}</p>
                      <p className="text-xs text-gray-400 flex items-center">
                        <img src={getModeIcon(map.mode)} alt={map.mode} className="w-4 h-4 mr-1" /> 
                        {getTranslatedMode(map.mode)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {selectedMap && (
        <div className="mt-2 relative rounded-lg overflow-hidden flex items-center justify-center bg-transparent">
          <img
            src={selectedMap.image}
            alt={selectedMap.name}
            className="w-full object-contain h-48"
            onError={(e) => handleImageError(e, selectedMap.name)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 right-0 p-2 text-white">
            <p className="font-bold">{i18n.language === 'es' && selectedMap.translatedName ? selectedMap.translatedName : selectedMap.name}</p>
            <p className="text-sm opacity-80 flex items-center">
              <img src={getModeIcon(selectedMap.mode)} alt={selectedMap.mode} className="w-4 h-4 mr-1" /> 
              {getTranslatedMode(selectedMap.mode)}
            </p>
          </div>
          <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center">
            <img src={getModeIcon(selectedMap.mode)} alt={selectedMap.mode} className="w-6 h-6" />
          </div>
        </div>
      )}
    </div>
  );
};

export default MapSelector;
