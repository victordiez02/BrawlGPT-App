
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
        className={`language-btn rounded-md overflow-hidden w-8 h-6 transition-all ${i18n.language === 'en' ? 'ring-2 ring-white scale-110' : 'opacity-70 hover:opacity-100'}`}
        onClick={() => changeLanguage('en')}
        title="English"
      >
        <img 
          src="/lovable-uploads/71d02d95-ba68-4665-8e5e-680bfaf6b070.png" 
          alt="English" 
          className="w-full h-full object-cover"
        />
      </button>
      
      <button
        className={`language-btn rounded-md overflow-hidden w-8 h-6 transition-all ${i18n.language === 'es' ? 'ring-2 ring-white scale-110' : 'opacity-70 hover:opacity-100'}`}
        onClick={() => changeLanguage('es')}
        title="Español"
      >
        <img 
          src="/lovable-uploads/d78dfdeb-2713-4d1e-bce6-f6595ff3b4d6.png" 
          alt="Español" 
          className="w-full h-full object-cover"
        />
      </button>
    </div>
  );
};

export default LanguageSelector;
