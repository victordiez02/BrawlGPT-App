
/** @jsxImportSource react */
import React from 'react';
import { Map, Ban, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FeatureCards = () => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mr-4">
            <Map size={24} className="text-blue-400" />
          </div>
          <h3 className="font-bold text-xl font-brawl">{t('step_1_title')}</h3>
        </div>
        <p className="opacity-80">{t('step_1_desc')}</p>
      </div>
      
      <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center mr-4">
            <Ban size={24} className="text-red-400" />
          </div>
          <h3 className="font-bold text-xl font-brawl">{t('step_2_title')}</h3>
        </div>
        <p className="opacity-80">{t('step_2_desc')}</p>
      </div>
      
      <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mr-4">
            <Target size={24} className="text-purple-400" />
          </div>
          <h3 className="font-bold text-xl font-brawl">{t('step_3_title')}</h3>
        </div>
        <p className="opacity-80">{t('step_3_desc')}</p>
      </div>
    </div>
  );
};

export default FeatureCards;
