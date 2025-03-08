
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Map, Ban, Target, Cpu, SparkleIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '@/components/LanguageSelector';
import { Button } from '@/components/ui/button';

const LandingPage: React.FC = () => {
  const {
    t
  } = useTranslation();
  return <div className="min-h-screen flex flex-col relative bg-cybernetic text-white">
      <LanguageSelector />
      
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-4 py-12 md:py-24 relative z-10 overflow-hidden">
        <div className="w-full max-w-6xl">
          <div className="mb-16 text-center relative">
            {/* Logo Background */}
            <div className="absolute inset-0 flex justify-center items-center opacity-30 transform scale-150 pointer-events-none z-0">
              <img src="/lovable-uploads/73ba99c9-265c-40aa-92f7-016afd79fabb.png" alt="Brawl Stars Logo Background" className="w-96 h-96" />
            </div>
            
            {/* Title with BrawlGPT */}
            <h1 className="text-5xl md:text-7xl font-bold font-brawl text-transparent bg-clip-text bg-gradient-to-r from-brawl-yellow to-brawl-green text-glow animate-fade-in mb-3 relative z-10">
              BrawlGPT
            </h1>
            
            <h2 className="text-4xl md:text-5xl font-bold font-brawl text-transparent bg-clip-text bg-gradient-to-r from-brawl-blue to-brawl-red text-glow animate-fade-in relative z-10">
              {t('landing_title')}
            </h2>
            
            <div className="h-1 w-48 mx-auto bg-gradient-to-r from-brawl-blue to-brawl-red rounded-full mb-8 relative z-10"></div>
            
            <div className="max-w-3xl mx-auto">
              <p className="text-xl md:text-2xl opacity-90 mb-4 animate-fade-in delay-200 font-brawl">
                {t('landing_subtitle_1')}
              </p>
              <p className="text-lg opacity-80 animate-fade-in delay-200 mb-6">
                {t('landing_subtitle_2')}
              </p>
              
              {/* Botón principal con aspecto de IA y ramas neuronales */}
              <div className="space-y-8">
                <Link to="/simulator" className="inline-block relative">
                  <Button 
                    variant="ai" 
                    size="lg" 
                    className="group relative px-12 py-8 text-xl font-medium font-brawl rounded-xl transition-all hover:scale-105 mx-auto animate-pulse-soft"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-brawl-yellow/30 to-brawl-green/30 rounded-xl animate-pulse opacity-50"></div>
                    
                    {/* Neural network branches - top left */}
                    <div className="absolute -top-1 -left-1 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute top-5 left-5 w-1 h-10 bg-brawl-yellow transform rotate-45 origin-top-left scale-0 group-hover:scale-100 transition-transform duration-500 delay-100 rounded-full"></div>
                      <div className="absolute top-5 left-5 w-1 h-6 bg-brawl-green transform rotate-[70deg] origin-top-left scale-0 group-hover:scale-100 transition-transform duration-500 delay-150 rounded-full"></div>
                      <div className="absolute top-5 left-10 w-1 h-8 bg-brawl-yellow transform -rotate-[20deg] origin-top-left scale-0 group-hover:scale-100 transition-transform duration-500 delay-200 rounded-full"></div>
                      <div className="absolute top-2 left-2 w-2 h-2 bg-brawl-green rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 delay-100"></div>
                      <div className="absolute top-8 left-12 w-1.5 h-1.5 bg-brawl-yellow rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 delay-300"></div>
                    </div>
                    
                    {/* Neural network branches - top right */}
                    <div className="absolute -top-1 -right-1 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute top-5 right-5 w-1 h-10 bg-brawl-yellow transform -rotate-45 origin-top-right scale-0 group-hover:scale-100 transition-transform duration-500 delay-100 rounded-full"></div>
                      <div className="absolute top-5 right-5 w-1 h-6 bg-brawl-green transform -rotate-[70deg] origin-top-right scale-0 group-hover:scale-100 transition-transform duration-500 delay-150 rounded-full"></div>
                      <div className="absolute top-5 right-10 w-1 h-8 bg-brawl-yellow transform rotate-[20deg] origin-top-right scale-0 group-hover:scale-100 transition-transform duration-500 delay-200 rounded-full"></div>
                      <div className="absolute top-2 right-2 w-2 h-2 bg-brawl-green rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 delay-100"></div>
                      <div className="absolute top-8 right-12 w-1.5 h-1.5 bg-brawl-yellow rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 delay-300"></div>
                    </div>
                    
                    {/* Neural network branches - bottom left */}
                    <div className="absolute -bottom-1 -left-1 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute bottom-5 left-5 w-1 h-10 bg-brawl-yellow transform -rotate-45 origin-bottom-left scale-0 group-hover:scale-100 transition-transform duration-500 delay-100 rounded-full"></div>
                      <div className="absolute bottom-5 left-5 w-1 h-6 bg-brawl-green transform -rotate-[70deg] origin-bottom-left scale-0 group-hover:scale-100 transition-transform duration-500 delay-150 rounded-full"></div>
                      <div className="absolute bottom-5 left-10 w-1 h-8 bg-brawl-yellow transform rotate-[20deg] origin-bottom-left scale-0 group-hover:scale-100 transition-transform duration-500 delay-200 rounded-full"></div>
                      <div className="absolute bottom-2 left-2 w-2 h-2 bg-brawl-green rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 delay-100"></div>
                      <div className="absolute bottom-8 left-12 w-1.5 h-1.5 bg-brawl-yellow rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 delay-300"></div>
                    </div>
                    
                    {/* Neural network branches - bottom right */}
                    <div className="absolute -bottom-1 -right-1 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute bottom-5 right-5 w-1 h-10 bg-brawl-yellow transform rotate-45 origin-bottom-right scale-0 group-hover:scale-100 transition-transform duration-500 delay-100 rounded-full"></div>
                      <div className="absolute bottom-5 right-5 w-1 h-6 bg-brawl-green transform rotate-[70deg] origin-bottom-right scale-0 group-hover:scale-100 transition-transform duration-500 delay-150 rounded-full"></div>
                      <div className="absolute bottom-5 right-10 w-1 h-8 bg-brawl-yellow transform -rotate-[20deg] origin-bottom-right scale-0 group-hover:scale-100 transition-transform duration-500 delay-200 rounded-full"></div>
                      <div className="absolute bottom-2 right-2 w-2 h-2 bg-brawl-green rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 delay-100"></div>
                      <div className="absolute bottom-8 right-12 w-1.5 h-1.5 bg-brawl-yellow rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 delay-300"></div>
                    </div>
                    
                    <div className="flex items-center relative z-10">
                      <Cpu size={24} className="mr-2 animate-spin-slow" />
                      <SparkleIcon size={16} className="absolute -top-2 -left-1 text-yellow-300 animate-pulse" />
                      {t('cta_button')}
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mr-4">
                  <Map size={24} className="text-blue-400" />
                </div>
                <h3 className="font-bold text-xl font-brawl">{t('step_1_title')}</h3>
              </div>
              <p className="opacity-80">{t('step_1_desc')}</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center mr-4">
                  <Ban size={24} className="text-red-400" />
                </div>
                <h3 className="font-bold text-xl font-brawl">{t('step_2_title')}</h3>
              </div>
              <p className="opacity-80">{t('step_2_desc')}</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mr-4">
                  <Target size={24} className="text-purple-400" />
                </div>
                <h3 className="font-bold text-xl font-brawl">{t('step_3_title')}</h3>
              </div>
              <p className="opacity-80">{t('step_3_desc')}</p>
            </div>
          </div>
          
          {/* Draft Visualization */}
          <div className="glass-panel bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 shadow-xl mb-12">
            <div className="grid grid-cols-6 gap-3 mb-6">
              {[...Array(6)].map((_, i) => <div key={i} className={`aspect-square rounded-xl ${i < 3 ? 'bg-blue-500/30 border-[6px] border-blue-500/50' : 'bg-red-500/30 border-[6px] border-red-500/50'} 
                  ${[0, 3].includes(i) ? 'animate-pulse-soft' : ''}`}>
                  {[0, 3].includes(i) && <div className="w-full h-full flex items-center justify-center">
                      <Zap size={24} className={i === 0 ? 'text-blue-400' : 'text-red-400'} />
                    </div>}
                </div>)}
            </div>
            <p className="text-center opacity-80 font-brawl">{t('draft_visualization_text')}</p>
          </div>
        </div>
      </div>
      
      {/* Abstract background blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 rounded-full filter blur-[120px] opacity-20"></div>
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-red-600 rounded-full filter blur-[120px] opacity-20"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-purple-600 rounded-full filter blur-[120px] opacity-20"></div>
      </div>
      
      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-sm opacity-70 font-brawl">
        &copy; 2025 BrawlGPT - {t('footer_text')}
      </footer>
    </div>;
};
export default LandingPage;
