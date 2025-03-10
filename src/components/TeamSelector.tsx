/** @jsxImportSource react */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';

interface TeamSelectorProps {
  firstPick: 'blue' | 'red';
  onSelectFirstPick: (team: 'blue' | 'red') => void;
}

const TeamSelector: React.FC<TeamSelectorProps> = ({ firstPick, onSelectFirstPick }) => {
  const { t } = useTranslation();
  
  return (
    <div className="animate-slide-in w-full">
      <label className="block text-sm font-medium text-white mb-4 font-brawl text-center">
        {t('who_picks_first')}
      </label>
      
      <div className="flex flex-col space-y-4 items-center w-full">
        <button
          onClick={() => onSelectFirstPick('blue')}
          className={`glass-card py-4 px-6 w-full max-w-xs transition-all duration-300 rounded-xl ${
            firstPick === 'blue' 
              ? 'ring-3 ring-brawl-blue shadow-lg shadow-blue-500/30' 
              : 'opacity-80 hover:opacity-100 hover:shadow-md hover:shadow-blue-500/10'
          }`}
        >
          <div className="flex items-center justify-center gap-3">
            <div className="w-6 h-6 bg-brawl-blue rounded-full"></div>
            <span className="font-medium font-brawl text-lg">{t('blue_team')}</span>
          </div>
        </button>
        
        <button
          onClick={() => onSelectFirstPick('red')}
          className={`glass-card py-4 px-6 w-full max-w-xs transition-all duration-300 rounded-xl ${
            firstPick === 'red' 
              ? 'ring-3 ring-brawl-red shadow-lg shadow-red-500/30' 
              : 'opacity-80 hover:opacity-100 hover:shadow-md hover:shadow-red-500/10'
          }`}
        >
          <div className="flex items-center justify-center gap-3">
            <div className="w-6 h-6 bg-brawl-red rounded-full"></div>
            <span className="font-medium font-brawl text-lg">{t('red_team')}</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default TeamSelector;
