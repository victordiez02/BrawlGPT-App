
import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { i18n } = useTranslation();
  const isSpanish = i18n.language === 'es';
  
  return (
    <footer className="py-8 border-t border-white/10 mt-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center text-sm text-white/70">
          {isSpanish ? (
            <>
              <p className="mb-1">© 2025 BrawlGPT - Herramienta sin fines comerciales, creada por fans.</p>
              <p className="mb-1">Desarrollado por <strong>Víctor Díez</strong></p>
              <p className="mb-1">📧 Contacto: <a href="mailto:victordiezrecio@gmail.com" className="underline hover:text-white">victordiezrecio@gmail.com</a></p>
              <p className="mb-1">🔗 Código fuente: <a href="#" target="_blank" className="underline hover:text-white">Disponible en GitHub</a></p>
              <p className="mt-3 text-xs italic">⚠️ BrawlGPT no es una herramienta oficial de Supercell ni está afiliada con ellos de ninguna manera.</p>
            </>
          ) : (
            <>
              <p className="mb-1">© 2025 BrawlGPT - Non-commercial tool, created by fans.</p>
              <p className="mb-1">Developed by <strong>Víctor Díez</strong></p>
              <p className="mb-1">📧 Contact: <a href="mailto:victordiezrecio@gmail.com" className="underline hover:text-white">victordiezrecio@gmail.com</a></p>
              <p className="mb-1">🔗 Source code: <a href="#" target="_blank" className="underline hover:text-white">Available on GitHub</a></p>
              <p className="mt-3 text-xs italic">⚠️ BrawlGPT is not an official Supercell tool and is not affiliated with them in any way.</p>
            </>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
