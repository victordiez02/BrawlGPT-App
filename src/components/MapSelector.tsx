
import React, { useState } from 'react';
import { GameMap, gameMaps } from '@/lib/maps';
import { ArrowLeft, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
  const { t } = useTranslation();
  
  if (!selectedMap) return null;
  
  return (
    <div className="p-4 bg-gray-800/30 rounded-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-lg md:text-xl font-brawl flex items-center">
          <Map className="mr-2" size={24} /> 
          {t('select_map')}
        </h3>
        
        {onReturnToMapSelection && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReturnToMapSelection}
            className="text-white/80 hover:text-white hover:bg-white/10 hidden md:flex"
          >
            <ArrowLeft size={18} className="mr-1" />
            {t('back_to_home')}
          </Button>
        )}
      </div>
      
      <div className="mt-2 p-2 bg-gray-700/50 rounded flex items-center space-x-2">
        <div 
          className="rounded-lg overflow-hidden w-12 h-12 flex-shrink-0 bg-gray-600/50"
          style={{
            backgroundImage: `url(/lovable-uploads/1efb5e95-dc69-4eed-8530-c71db784db73.png)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        <div className="flex-1">
          <p className="font-brawl text-sm md:text-base text-white/90">{selectedMap.name}</p>
          <p className="text-xs text-white/60">{t(selectedMap.mode.toLowerCase())}</p>
        </div>
      </div>
    </div>
  );
};

export default MapSelector;
