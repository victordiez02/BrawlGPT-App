
import React from 'react';
import { useTranslation } from 'react-i18next';

interface TeamSelectorProps {
  firstPick: 'blue' | 'red';
  onSelectFirstPick: (team: 'blue' | 'red') => void;
}

const TeamSelector: React.FC<TeamSelectorProps> = ({ firstPick, onSelectFirstPick }) => {
  const { t } = useTranslation();
  
  return (
    <div className="animate-slide-in">
      <label className="block text-sm font-medium text-white mb-2 font-brawl">
        {t('who_picks_first')}
      </label>
      
      <div className="flex space-x-4">
        <button
          onClick={() => onSelectFirstPick('blue')}
          className={`flex-1 glass-card py-3 transition-all duration-300 ${
            firstPick === 'blue' 
              ? 'ring-2 ring-brawl-blue shadow-lg shadow-blue-500/20' 
              : 'opacity-70 hover:opacity-100'
          }`}
        >
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 bg-brawl-blue rounded-full mb-2"></div>
            <span className="font-medium font-brawl">{t('blue_team')}</span>
          </div>
        </button>
        
        <button
          onClick={() => onSelectFirstPick('red')}
          className={`flex-1 glass-card py-3 transition-all duration-300 ${
            firstPick === 'red' 
              ? 'ring-2 ring-brawl-red shadow-lg shadow-red-500/20' 
              : 'opacity-70 hover:opacity-100'
          }`}
        >
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 bg-brawl-red rounded-full mb-2"></div>
            <span className="font-medium font-brawl">{t('red_team')}</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default TeamSelector;
