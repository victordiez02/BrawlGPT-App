
/** @jsxImportSource react */
import React from 'react';
import { Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const VisualizationPanel = () => {
  const { t } = useTranslation();

  return (
    <div className="glass-panel bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 shadow-xl mb-12">
      <div className="grid grid-cols-6 gap-3 mb-6">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            className={`aspect-square rounded-xl ${i < 3 ? 'bg-blue-500/30 border-[6px] border-blue-500/50' : 'bg-red-500/30 border-[6px] border-red-500/50'} 
                ${[0, 3].includes(i) ? 'animate-pulse-soft' : ''}`}
          >
            {[0, 3].includes(i) && (
              <div className="w-full h-full flex items-center justify-center">
                <Zap size={24} className={i === 0 ? 'text-blue-400' : 'text-red-400'} />
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="text-center opacity-80 font-brawl">{t('draft_visualization_text')}</p>
    </div>
  );
};

export default VisualizationPanel;
