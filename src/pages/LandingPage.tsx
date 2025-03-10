/** @jsxImportSource react */
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Map, Ban, Target, Cpu, SparkleIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '@/components/LanguageSelector';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';

const LandingPage = () => {
  const { t } = useTranslation();
  const [isFrikiTalking, setIsFrikiTalking] = React.useState(false);
  const [isPensacionThinking, setIsPensacionThinking] = React.useState(false);
  
  return (
    <div className="min-h-screen flex flex-col relative bg-cybernetic text-white">
      <div className="absolute top-6 right-6 z-10 scale-75 md:scale-100 origin-top-right">
        <LanguageSelector />
      </div>
      
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-4 py-12 md:py-24 relative z-10 overflow-hidden">
        <div className="w-full max-w-6xl">
          <div className="mb-16 text-center relative">
            <div className="absolute inset-0 flex justify-center items-center opacity-30 transform scale-150 pointer-events-none z-0">
              <img src="/lovable-uploads/73ba99c9-265c-40aa-92f7-016afd79fabb.png" alt="Brawl Stars Logo Background" className="w-96 h-96" />
            </div>
            
            <div 
              className="flex justify-center mb-3 relative z-10 animate-fade-in cursor-pointer"
            >
              <img 
                src="/lovable-uploads/Logo.png" 
                alt="BrawlGPT Logo" 
                className="w-auto h-80 md:h-56 transition-all duration-500 hover:scale-110 hover:drop-shadow-[0_0_15px_rgba(0,229,255,0.6)] animate-float" 
                onClick={() => {
                  const audio = new Audio('/lovable-uploads/73ba99c9-265c-40aa-92f7-016afd79fabb.png');
                  audio.volume = 0.5;
                  audio.play().catch(e => console.log('Audio autoplay prevented by browser'));
                }}
              />
            </div>
            
            <h2 className="text-4xl font-bold font-brawl mb-3 relative z-10 animate-fade-in md:text-3xl bg-gradient-to-r from-brawl-blue to-brawl-red bg-clip-text text-transparent">
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
              
              <div className="space-y-8 relative">
                {/* Interactive Friki Face and Hand - Left side of the button */}
                <div className="absolute left-[-80px] top-[50%] transform -translate-y-1/2 flex items-center z-20 pointer-events-none md:pointer-events-auto hidden md:flex">
                  <div 
                    className="mr-[-25px] transform transition-transform duration-200 hover:rotate-6"
                    onMouseEnter={() => setIsFrikiTalking(true)}
                    onMouseLeave={() => setIsFrikiTalking(false)}
                  >
                    <img 
                      src="/lovable-uploads/friki_mano.png" 
                      alt="Hand" 
                      className={`w-16 h-auto select-none ${isFrikiTalking ? 'animate-sway' : ''}`}
                    />
                  </div>
                  <div 
                    className={`transform transition-all duration-200 ${isFrikiTalking ? 'animate-sway' : ''}`}
                    onMouseEnter={() => setIsFrikiTalking(true)}
                    onMouseLeave={() => setIsFrikiTalking(false)}
                  >
                    <img 
                      src="/lovable-uploads/friki_cara.png" 
                      alt="Face with glasses" 
                      className={`w-24 h-auto select-none ${isFrikiTalking ? 'animate-talking' : ''}`}
                    />
                  </div>
                </div>
                
                {/* Interactive Thinking Face and Hand - Right side of the button */}
                <div className="absolute right-[-80px] top-[50%] transform -translate-y-1/2 flex items-center z-20 pointer-events-none md:pointer-events-auto hidden md:flex">
                  <div 
                    className={`transform transition-all duration-200 ${isPensacionThinking ? 'animate-thinking' : ''}`}
                    onMouseEnter={() => setIsPensacionThinking(true)}
                    onMouseLeave={() => setIsPensacionThinking(false)}
                  >
                    <img 
                      src="/lovable-uploads/pensacion_cara.png" 
                      alt="Thinking face" 
                      className={`w-24 h-auto select-none ${isPensacionThinking ? 'animate-thinking-head' : ''}`}
                    />
                  </div>
                  <div 
                    className="ml-[-35px] transform transition-transform duration-200"
                    onMouseEnter={() => setIsPensacionThinking(true)}
                    onMouseLeave={() => setIsPensacionThinking(false)}
                  >
                    <img 
                      src="/lovable-uploads/pensacion_mano.png" 
                      alt="Thinking hand" 
                      className={`w-16 h-auto select-none ${isPensacionThinking ? 'animate-thinking-hand' : ''}`}
                    />
                  </div>
                </div>
                
                <Link to="/simulator" className="inline-block relative">
                  <Button variant="ai" size="lg" className="group relative px-12 py-8 text-xl font-medium font-brawl rounded-xl transition-all hover:scale-105 mx-auto">
                    <div className="absolute inset-0 bg-[#00E5FF] rounded-xl opacity-100"></div>
                    
                    <div className="circuit-node top-0 left-1/2 -translate-x-1/2 -translate-y-full"></div>
                    <div className="circuit-line h-1 w-8 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="circuit-node top-0 left-1/4 -translate-y-full"></div>
                    <div className="circuit-line h-1 w-8 top-0 left-1/4 -translate-y-1/2"></div>
                    <div className="circuit-node top-0 right-1/4 -translate-y-full"></div>
                    <div className="circuit-line h-1 w-8 top-0 right-1/4 -translate-y-1/2"></div>
                    
                    <div className="circuit-node bottom-0 left-1/2 -translate-x-1/2 translate-y-full"></div>
                    <div className="circuit-line h-1 w-8 bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"></div>
                    <div className="circuit-node bottom-0 left-1/4 translate-y-full"></div>
                    <div className="circuit-line h-1 w-8 bottom-0 left-1/4 translate-y-1/2"></div>
                    <div className="circuit-node bottom-0 right-1/4 translate-y-full"></div>
                    <div className="circuit-line h-1 w-8 bottom-0 right-1/4 translate-y-1/2"></div>
                    
                    <div className="circuit-node left-0 top-1/2 -translate-x-full -translate-y-1/2"></div>
                    <div className="circuit-line w-1 h-8 left-0 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="circuit-node left-0 top-1/4 -translate-x-full"></div>
                    <div className="circuit-line w-1 h-8 left-0 top-1/4 -translate-x-1/2"></div>
                    <div className="circuit-node left-0 bottom-1/4 -translate-x-full"></div>
                    <div className="circuit-line w-1 h-8 left-0 bottom-1/4 -translate-x-1/2"></div>
                    
                    <div className="circuit-node right-0 top-1/2 translate-x-full -translate-y-1/2"></div>
                    <div className="circuit-line w-1 h-8 right-0 top-1/2 translate-x-1/2 -translate-y-1/2"></div>
                    <div className="circuit-node right-0 top-1/4 translate-x-full"></div>
                    <div className="circuit-line w-1 h-8 right-0 top-1/4 translate-x-1/2"></div>
                    <div className="circuit-node right-0 bottom-1/4 translate-x-full"></div>
                    <div className="circuit-line w-1 h-8 right-0 bottom-1/4 translate-x-1/2"></div>
                    
                    <div className="flex items-center relative z-10">
                      <Cpu size={24} className="mr-2 animate-spin-slow" />
                      <SparkleIcon size={16} className="absolute -top-2 -left-1 text-[#00E5FF] animate-pulse" />
                      {t('cta_button')}
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
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
      
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 rounded-full filter blur-[120px] opacity-20"></div>
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-red-600 rounded-full filter blur-[120px] opacity-20"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-purple-600 rounded-full filter blur-[120px] opacity-20"></div>
      </div>
      
      <Footer />
    </div>
  );
};

export default LandingPage;
