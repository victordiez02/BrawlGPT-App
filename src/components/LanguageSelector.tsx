
import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  
  return (
    <div className="language-selector">
      <button
        className={`language-btn ${i18n.language === 'en' ? 'active' : ''}`}
        onClick={() => changeLanguage('en')}
        title="English"
      >
        <span className="text-xl">🇺🇸</span>
      </button>
      
      <button
        className={`language-btn ${i18n.language === 'es' ? 'active' : ''}`}
        onClick={() => changeLanguage('es')}
        title="Español"
      >
        <span className="text-xl">🇪🇸</span>
      </button>
    </div>
  );
};

export default LanguageSelector;
