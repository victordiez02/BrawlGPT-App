
/** @jsxImportSource react */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, SparkleIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const { t } = useTranslation();
  const [isFrikiTalking, setIsFrikiTalking] = useState(false);
  const [isPensacionThinking, setIsPensacionThinking] = useState(false);

  return (
    <div className="mb-16 text-center relative">
      <div className="absolute inset-0 flex justify-center items-center opacity-30 transform scale-150 pointer-events-none z-0">
        <img src="/resources/iconBS.png" alt="Brawl Stars Logo Background" className="w-96 h-96" />
      </div>
      
      <div 
        className="flex justify-center mb-3 relative z-10 animate-fade-in cursor-pointer"
      >
        <img 
          src={`${import.meta.env.BASE_URL}resources/Logo.png`} 
          alt="BrawlGPT Logo" 
          className="w-auto h-80 md:h-56 transition-all duration-500 hover:scale-110 hover:drop-shadow-[0_0_15px_rgba(0,229,255,0.6)] animate-float"
          onClick={() => {
            const audio = new Audio('/resources/iconBS.png');
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
          <div className="absolute left-[-30px] top-[70%] transform -translate-y-1/2 flex items-center z-20 pointer-events-none md:pointer-events-auto hidden md:flex">
            <div 
              className="mr-[-70px] transform transition-transform duration-200 hover:rotate-6"
              onMouseEnter={() => setIsFrikiTalking(true)}
              onMouseLeave={() => setIsFrikiTalking(false)}
            >
              <img 
                src={`${import.meta.env.BASE_URL}resources/friki_mano.png`} 
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
                src={`${import.meta.env.BASE_URL}resources/friki_cara.png`} 
                alt="Face with glasses" 
                className={`w-24 h-auto select-none ${isFrikiTalking ? 'animate-talking' : ''}`}
              />
            </div>
          </div>
          
          {/* Interactive Thinking Face and Hand - Right side of the button */}
          <div className="absolute right-[-40px] top-[30%] transform -translate-y-1/2 flex items-center z-20 pointer-events-none md:pointer-events-auto hidden md:flex">
            <div 
              className={`transform transition-all duration-200 ${isPensacionThinking ? 'animate-thinking' : ''}`}
              onMouseEnter={() => setIsPensacionThinking(true)}
              onMouseLeave={() => setIsPensacionThinking(false)}
            >
              <img 
                src={`${import.meta.env.BASE_URL}resources/pensacion_cara.png`} 
                alt="Thinking face" 
                className={`w-24 h-auto select-none ${isPensacionThinking ? 'animate-thinking-head' : ''}`}
              />
            </div>
            <div 
              className="ml-[-78px] transform transition-transform duration-200"
              onMouseEnter={() => setIsPensacionThinking(true)}
              onMouseLeave={() => setIsPensacionThinking(false)}
            >
              <img 
                src={`${import.meta.env.BASE_URL}resources/pensacion_mano.png`} 
                alt="Thinking hand" 
                className={`w-24 h-auto select-none ${isPensacionThinking ? 'animate-thinking-hand' : ''}`}
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
  );
};

export default HeroSection;
