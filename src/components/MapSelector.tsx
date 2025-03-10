/** @jsxImportSource react */
import React, { useState } from 'react';
import { GameMap, gameMaps, getGameModeByName } from '@/lib/maps';
import { Map, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface MapSelectorProps {
  selectedMap: GameMap | null;
  onSelectMap: (map: GameMap) => void;
  onReturnToMapSelection?: () => void;
}

const MapSelector: React.FC<MapSelectorProps> = ({ 
  selectedMap, 
  onSelectMap,
  onReturnToMapSelection 
}) => {
  const { t, i18n } = useTranslation();

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

  // Get translated mode name
  const getTranslatedMode = (mode: string) => {
    if (i18n.language !== 'es') return mode;
    
    const modeMap: Record<string, string> = {
      'Gem Grab': 'Atrapagemas',
      'Brawl Ball': 'Balón Brawl',
      'Heist': 'Atraco',
      'Hot Zone': 'Zona Restringida',
      'Bounty': 'Caza Estelar',
      'Knockout': 'Noqueo',
      'Brawl Hockey': 'Hockey Brawl',
      'Showdown': 'Supervivencia',
      'Siege': 'Asedio'
    };
    
    return modeMap[mode] || mode;
  };

  return (
    <div className="w-full animate-slide-in">
      <div className="mb-2">
        <label className="block text-sm font-medium text-white mb-1 font-brawl">
          {t('select_map')}
        </label>
        
        <div className="relative">
          <button
            onClick={() => onReturnToMapSelection && onReturnToMapSelection()}
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
            <ArrowLeft size={20} />
          </button>
        </div>
      </div>
      
      {selectedMap && (
        <div className="mt-2 relative rounded-lg overflow-hidden bg-transparent flex items-center justify-center">
          <img
            src={selectedMap.image}
            alt={selectedMap.name}
            className="w-full object-contain h-48"
            onError={(e) => handleImageError(e, selectedMap.name)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
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
