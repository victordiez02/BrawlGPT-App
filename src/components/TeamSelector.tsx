
import React from 'react';

interface TeamSelectorProps {
  selectedTeam: 'blue' | 'red';
  onSelectTeam: (team: 'blue' | 'red') => void;
}

const TeamSelector: React.FC<TeamSelectorProps> = ({ selectedTeam, onSelectTeam }) => {
  return (
    <div className="mb-6 animate-slide-in">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Selecciona tu equipo
      </label>
      
      <div className="flex space-x-4">
        <button
          onClick={() => onSelectTeam('blue')}
          className={`flex-1 glass-card py-3 transition-all duration-300 ${
            selectedTeam === 'blue' 
              ? 'ring-2 ring-brawl-blue shadow-lg shadow-blue-500/20' 
              : 'opacity-70 hover:opacity-100'
          }`}
        >
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 bg-brawl-blue rounded-full mb-2"></div>
            <span className="font-medium">Equipo Azul</span>
          </div>
        </button>
        
        <button
          onClick={() => onSelectTeam('red')}
          className={`flex-1 glass-card py-3 transition-all duration-300 ${
            selectedTeam === 'red' 
              ? 'ring-2 ring-brawl-red shadow-lg shadow-red-500/20' 
              : 'opacity-70 hover:opacity-100'
          }`}
        >
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 bg-brawl-red rounded-full mb-2"></div>
            <span className="font-medium">Equipo Rojo</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default TeamSelector;
