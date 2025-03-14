/** @jsxImportSource react */
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center text-sm text-gray-400 mt-8 mb-4 px-4 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-brawl-blue to-brawl-purple opacity-10 blur-2xl" />

      <motion.p whileHover={{ scale: 1.05, transition: { duration: 0.3 } }} className="relative z-10">
        {t('footer_copyright')}
      </motion.p>
      <motion.p
        whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
        className="relative z-10"
        dangerouslySetInnerHTML={{ __html: t('footer_developer') }}
      />
      <motion.p whileHover={{ scale: 1.05 }} className="relative z-10">
        📧 {t('footer_contact')}{' '}
        <a
          href="mailto:victordiezrecio@gmail.com"
          className="text-brawl-blue hover:underline transition-colors duration-300"
        >
          victordiezrecio@gmail.com
        </a>
      </motion.p>
      {/*
      <motion.p whileHover={{ scale: 1.05 }} className="relative z-10">
        🔗 {t('footer_source_code')}{' '}
        <a
          href="https://github.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brawl-blue hover:underline transition-colors duration-300"
        >
          {t('footer_github')}
        </a>
      </motion.p>
      */}
      <motion.p
        whileHover={{ scale: 1.05 }}
        className="italic relative z-10 text-gray-300"
      >
        ⚠️ {t('footer_disclaimer')}
      </motion.p>
    </motion.footer>
  );
};

export default Footer;
