
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Header = () => {
  const { t } = useTranslation();
  
  return (
    <header className="w-full mb-8 text-center animate-fade-in relative">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <Link to="/" className="absolute left-4 top-8 text-white/80 hover:text-white transition flex items-center">
          <ArrowLeft className="mr-1" />
          <span className="font-brawl">{t('back_to_home')}</span>
        </Link>
        
        <div className="flex items-center justify-center">
          <img 
            src="/lovable-uploads/73ba99c9-265c-40aa-92f7-016afd79fabb.png" 
            alt="Brawl Stars Logo" 
            className="w-12 h-12 mr-3"
          />
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-brawl-blue via-brawl-purple to-brawl-red bg-clip-text text-transparent font-brawl text-glow">
              BrawlGPT - {t('current_draft')}
            </h1>
            <div className="h-1 w-40 bg-gradient-to-r from-brawl-blue to-brawl-red rounded-full mx-auto mb-4"></div>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-brawl">
              {t('landing_subtitle_2')}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
