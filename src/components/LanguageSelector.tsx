/** @jsxImportSource react */
import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  
  return (
    <div className="language-selector flex items-center space-x-2">
      <button
        className={`language-btn rounded-xl overflow-hidden w-10 h-7 transition-all hover:scale-110 ${i18n.language === 'en' ? 'ring-2 ring-white scale-110' : 'opacity-70 hover:opacity-100'}`}
        onClick={() => changeLanguage('en')}
        title="English"
      >
        <img 
          src="/lovable-uploads/e3fc2912-d0fa-4dab-a69b-24b2c9c5e742.png" 
          alt="English" 
          className="w-full h-full object-cover"
        />
      </button>
      
      <button
        className={`language-btn rounded-xl overflow-hidden w-10 h-7 transition-all hover:scale-110 ${i18n.language === 'es' ? 'ring-2 ring-white scale-110' : 'opacity-70 hover:opacity-100'}`}
        onClick={() => changeLanguage('es')}
        title="Español"
      >
        <img 
          src="/lovable-uploads/39d7e2ca-f838-45b3-a243-e1adea00c090.png" 
          alt="Español" 
          className="w-full h-full object-cover"
        />
      </button>
    </div>
  );
};

export default LanguageSelector;
