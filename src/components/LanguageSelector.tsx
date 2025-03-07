
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
        className={`language-btn rounded-md overflow-hidden w-8 h-6 transition-all hover:scale-110 ${i18n.language === 'en' ? 'ring-2 ring-white scale-110' : 'opacity-70 hover:opacity-100'}`}
        onClick={() => changeLanguage('en')}
        title="English"
      >
        <img 
          src="/lovable-uploads/934fb0e9-1943-41f9-819a-94d7cbbf027d.png" 
          alt="English" 
          className="w-full h-full object-cover"
        />
      </button>
      
      <button
        className={`language-btn rounded-md overflow-hidden w-8 h-6 transition-all hover:scale-110 ${i18n.language === 'es' ? 'ring-2 ring-white scale-110' : 'opacity-70 hover:opacity-100'}`}
        onClick={() => changeLanguage('es')}
        title="Español"
      >
        <img 
          src="/lovable-uploads/1efb5e95-dc69-4eed-8530-c71db784db73.png" 
          alt="Español" 
          className="w-full h-full object-cover"
        />
      </button>
    </div>
  );
};

export default LanguageSelector;
