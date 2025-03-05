
import React, { useState } from 'react';
import { GameMap, gameMaps } from '@/lib/maps';
import { Check, ChevronDown, ChevronUp, Map } from 'lucide-react';

interface MapSelectorProps {
  selectedMap: GameMap | null;
  onSelectMap: (map: GameMap) => void;
}

const MapSelector: React.FC<MapSelectorProps> = ({ selectedMap, onSelectMap }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filterMode, setFilterMode] = useState<string | null>(null);
  
  // Get unique modes for filtering
  const modes = Array.from(new Set(gameMaps.map(map => map.mode)));
  
  // Filter maps by selected mode
  const filteredMaps = filterMode 
    ? gameMaps.filter(map => map.mode === filterMode)
    : gameMaps;

  return (
    <div className="w-full animate-slide-in">
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Selecciona un mapa
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
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{selectedMap.name}</p>
                  <p className="text-xs text-gray-500">{selectedMap.mode}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2 text-gray-500">
                <Map size={18} />
                <span>Selecciona un mapa</span>
              </div>
            )}
            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          
          {isOpen && (
            <div className="absolute z-10 mt-1 w-full glass-panel shadow-2xl rounded-xl overflow-hidden">
              <div className="p-2 border-b border-gray-200 dark:border-gray-700">
                <div className="flex flex-wrap gap-1">
                  <button
                    onClick={() => setFilterMode(null)}
                    className={`px-2 py-1 text-xs rounded-full transition-colors ${
                      filterMode === null 
                        ? 'bg-brawl-blue text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    Todos
                  </button>
                  {modes.map(mode => (
                    <button
                      key={mode}
                      onClick={() => setFilterMode(mode)}
                      className={`px-2 py-1 text-xs rounded-full transition-colors ${
                        filterMode === mode 
                          ? 'bg-brawl-blue text-white' 
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="max-h-60 overflow-y-auto py-1">
                {filteredMaps.map(map => (
                  <button
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
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{map.name}</p>
                      <p className="text-xs text-gray-500">{map.mode}</p>
                    </div>
                    {selectedMap?.id === map.id && (
                      <Check size={16} className="text-brawl-blue" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapSelector;
