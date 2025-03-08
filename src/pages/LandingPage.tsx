
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import LanguageSelector from '@/components/LanguageSelector';
import { useTranslation } from 'react-i18next';
import { Zap, CheckCircle2 } from 'lucide-react';
import Footer from '@/components/Footer';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const handleStartSimulating = () => {
    navigate('/simulator');
  };

  return (
    <div className="min-h-screen bg-cybernetic flex flex-col text-white">
      <div className="absolute top-6 right-6 z-10">
        <LanguageSelector />
      </div>
      
      <main className="flex-1 container mx-auto px-4 py-12 flex flex-col items-center justify-center">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-brawl text-white text-shadow mb-6">
            {t('landing_title')}
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            {t('landing_subtitle_1')}
          </p>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mt-2">
            {t('landing_subtitle_2')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full mb-12">
          <div className="glass-panel p-6 rounded-xl animate-fade-in">
            <div className="relative h-14 w-14 bg-brawl-blue/20 text-brawl-blue rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl font-bold font-brawl">1</span>
            </div>
            <h2 className="text-xl font-brawl mb-2">{t('step_1_title')}</h2>
            <p className="text-white/70">{t('step_1_desc')}</p>
          </div>
          
          <div className="glass-panel p-6 rounded-xl animate-fade-in delay-200">
            <div className="relative h-14 w-14 bg-brawl-purple/20 text-brawl-purple rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl font-bold font-brawl">2</span>
            </div>
            <h2 className="text-xl font-brawl mb-2">{t('step_2_title')}</h2>
            <p className="text-white/70">{t('step_2_desc')}</p>
          </div>
          
          <div className="glass-panel p-6 rounded-xl animate-fade-in delay-200">
            <div className="relative h-14 w-14 bg-brawl-red/20 text-brawl-red rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl font-bold font-brawl">3</span>
            </div>
            <h2 className="text-xl font-brawl mb-2">{t('step_3_title')}</h2>
            <p className="text-white/70">{t('step_3_desc')}</p>
          </div>
        </div>
        
        <div className="glass-panel p-6 max-w-6xl w-full mb-12 animate-fade-in">
          <div className="flex flex-col md:flex-row items-center md:space-x-6">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <h3 className="text-2xl font-brawl mb-4">{t('draft_visualization_text')}</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle2 className="text-green-400 mr-2" size={20} />
                  <span>{t('real_time_analysis')}</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="text-green-400 mr-2" size={20} />
                  <span>{t('map_specific_strategies')}</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="text-green-400 mr-2" size={20} />
                  <span>{t('counter_picks')}</span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2 rounded-xl overflow-hidden h-72 bg-gray-800/40 flex items-center justify-center">
              <img 
                src="/lovable-uploads/39d7e2ca-f838-45b3-a243-e1adea00c090.png"  
                alt="Draft Visualization"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        
        <Button 
          variant="ai"
          size="lg"
          onClick={handleStartSimulating}
          className="neural-btn text-lg px-8 py-6 font-brawl mb-6 animate-fade-in circuit-btn"
        >
          <Zap className="mr-2" />
          {t('cta_button')}
          
          {/* Circuit decoration */}
          <div className="circuit-node opacity-0" style={{top: '5px', left: '5px'}}></div>
          <div className="circuit-node opacity-0" style={{top: '5px', right: '5px'}}></div>
          <div className="circuit-node opacity-0" style={{bottom: '5px', left: '5px'}}></div>
          <div className="circuit-node opacity-0" style={{bottom: '5px', right: '5px'}}></div>
          
          <div className="circuit-line opacity-0" style={{height: '2px', top: '9px', left: '15px', right: '15px'}}></div>
          <div className="circuit-line opacity-0" style={{height: '2px', bottom: '9px', left: '15px', right: '15px'}}></div>
          <div className="circuit-line opacity-0" style={{width: '2px', left: '9px', top: '15px', bottom: '15px'}}></div>
          <div className="circuit-line opacity-0" style={{width: '2px', right: '9px', top: '15px', bottom: '15px'}}></div>
        </Button>
      </main>
      
      <Footer />
    </div>
  );
};

export default LandingPage;
