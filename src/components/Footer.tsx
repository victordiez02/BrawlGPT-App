/** @jsxImportSource react */
import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="text-center text-sm text-gray-400 mt-8 mb-4 px-4">
      <p>{t('footer_copyright')}</p>
      <p dangerouslySetInnerHTML={{ __html: t('footer_developer') }} />
      <p>
        📧 {t('footer_contact')}{' '}
        <a href="mailto:victordiezrecio@gmail.com" className="text-brawl-blue hover:underline">
          victordiezrecio@gmail.com
        </a>
      </p>
      <p>
        🔗 {t('footer_source_code')}{' '}
        <a 
          href="https://github.com/your-repo-url" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-brawl-blue hover:underline"
        >
          {t('footer_github')}
        </a>
      </p>
      <p className="italic">⚠️ {t('footer_disclaimer')}</p>
    </footer>
  );
};

export default Footer;
