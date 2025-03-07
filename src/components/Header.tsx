
import React from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';

const Header = () => {
  const { t } = useTranslation();
  
  return (
    <header className="w-full mb-8 text-center animate-fade-in relative">
      <LanguageSelector />
      <div className="max-w-5xl mx-auto px-4 py-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-brawl-blue via-brawl-purple to-brawl-red bg-clip-text text-transparent font-brawl">
          BrawlGPT - {t('current_draft')}
        </h1>
        <div className="h-1 w-40 bg-gradient-to-r from-brawl-blue to-brawl-red rounded-full mx-auto mb-4"></div>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto font-brawl">
          {t('landing_subtitle_2')}
        </p>
      </div>
    </header>
  );
};

export default Header;
