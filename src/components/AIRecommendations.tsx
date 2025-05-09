
/** @jsxImportSource react */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GeminiSuggestion } from '@/lib/api';
import { brawlers } from '@/lib/brawlers';
import { Sparkle, Bot, Info, ChevronUp, ChevronDown, Medal } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';

interface AIRecommendationsProps {
  isLoading: boolean;
  error: Error | null;
  recommendations: GeminiSuggestion[] | null;
  phase: number;
  onSelectRecommendation: (suggestion: GeminiSuggestion, phase: number) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onRecommendationClick?: () => void;
}

const AIRecommendations: React.FC<AIRecommendationsProps> = ({
  isLoading,
  error,
  recommendations,
  phase,
  onSelectRecommendation,
  isOpen,
  setIsOpen,
  onRecommendationClick
}) => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  
  // Si está cargando, mostrar indicador de carga
  if (isLoading) {
    return (
      <div className="glass-panel p-6 mt-6 mb-6 text-center animate-fade-in">
        <div className="flex flex-col items-center justify-center">
          <div className="animate-spin mb-4">
            <Bot size={40} className="text-blue-400" />
          </div>
          <h3 className="text-xl font-bold mb-2 font-brawl">{t('generating_ai_recommendation')}</h3>
          <p className="text-sm opacity-80">{t('this_might_take_a_moment')}</p>
        </div>
      </div>
    );
  }
  
  // Si hay un error, mostrar mensaje de error
  if (error) {
    return (
      <div className="glass-panel p-6 mt-6 mb-6 text-center animate-fade-in">
        <div className="flex flex-col items-center justify-center">
          <div className="bg-red-500/20 p-4 rounded-full mb-4">
            <Bot size={40} className="text-red-500" />
          </div>
          <h3 className="text-xl font-bold mb-2 font-brawl">{t('error_generating_recommendation')}</h3>
          <p className="text-sm opacity-80">{t('please_try_again')}</p>
          <p className="text-xs mt-2 max-w-md mx-auto opacity-60">{error.message}</p>
        </div>
      </div>
    );
  }
  
  // Si no hay recomendaciones, no mostrar nada
  if (!recommendations || recommendations.length === 0) {
    return null;
  }
  
  // Función para obtener la imagen del brawler por su nombre
  const getBrawlerImage = (name: string) => {
    const brawler = brawlers.find(b => b.name === name);
    return brawler ? brawler.image : 'https://pbs.twimg.com/media/GkaLsRAXoAEltn9.jpg';
  };
  
  // Función para determinar el color de fondo basado en la probabilidad
  const getProbabilityColorClass = (probability: number) => {
    if (probability >= 85) return 'bg-green-500';
    if (probability >= 70) return 'bg-emerald-500';
    if (probability >= 60) return 'bg-blue-500';
    if (probability >= 50) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  // Función para obtener el texto de explicación según el idioma actual
  const getExplanationText = (suggestion: GeminiSuggestion) => {
    if (currentLanguage === 'es' && suggestion.explanationESP) {
      return suggestion.explanationESP;
    }
    return suggestion.explanationUSA || '';
  };
  
  // Función para convertir brawlers a un array, independientemente de si es string o array
  const getBrawlersArray = (brawlers: string | string[]): string[] => {
    if (typeof brawlers === 'string') {
      // Si es un string como "Stu + Angelo", dividirlo
      if (brawlers.includes('+')) {
        return brawlers.split('+').map(b => b.trim());
      }
      // Si es solo un nombre como "Janet"
      return [brawlers];
    }
    // Si ya es un array, devolverlo tal cual
    return brawlers;
  };

  // Función para obtener el estilo de medalla basado en el índice
  const getMedalStyle = (index: number) => {
    switch(index) {
      case 0:
        return { 
          borderColor: 'border-yellow-400',
          shadow: 'shadow-yellow-400/30',
          icon: <Medal size={20} className="text-yellow-400 absolute -top-3 -right-3" />
        };
      case 1:
        return { 
          borderColor: 'border-gray-300',
          shadow: 'shadow-gray-300/30',
          icon: <Medal size={20} className="text-gray-300 absolute -top-3 -right-3" />
        };
      case 2:
        return { 
          borderColor: 'border-amber-700',
          shadow: 'shadow-amber-700/30',
          icon: <Medal size={20} className="text-amber-700 absolute -top-3 -right-3" />
        };
      default:
        return { 
          borderColor: '',
          shadow: '',
          icon: null
        };
    }
  };

  // Función para manejar el clic en una recomendación
  const handleSelectRecommendation = (suggestion: GeminiSuggestion) => {
    onSelectRecommendation(suggestion, phase);
    setIsOpen(false); // Minimizar el cuadro
    
    // Ejecutar el callback de desplazamiento si existe
    if (onRecommendationClick) {
      onRecommendationClick();
    }
  };
  
  return (
    <Collapsible 
      open={isOpen} 
      onOpenChange={setIsOpen}
      className="glass-panel mt-6 mb-6 animate-fade-in overflow-hidden transition-all duration-500"
    >
      <div className="flex justify-between items-center p-6 pb-4">
        <h3 className="text-xl font-bold font-brawl flex items-center">
          <Sparkle className="mr-2 text-yellow-400" size={20} />
          {t('ai_recommendations')}
        </h3>
        <div className="flex items-center gap-3">
          <span className="text-xs opacity-70">{phase === 1 || phase === 4 ? t('showing_best_picks') : t('showing_best_pick_pairs')}</span>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full transition-all duration-300 hover:bg-gray-700/30">
              {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </Button>
          </CollapsibleTrigger>
        </div>
      </div>
      
      <CollapsibleContent className="px-6 pb-6 transition-all duration-500">
        <div className="grid grid-cols-1 gap-4">
          {recommendations.map((suggestion, index) => {
            const medalStyle = getMedalStyle(index);
            return (
              <div 
                key={index} 
                className={`relative ${index < 3 ? `border-2 ${medalStyle.borderColor} ${medalStyle.shadow}` : 'border border-gray-700/30'} 
                        bg-gray-800/60 rounded-lg p-4 transition-all duration-300 hover:scale-[1.01] hover:shadow-md cursor-pointer`}
                onClick={() => handleSelectRecommendation(suggestion)}
              >
                {medalStyle.icon}
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="md:w-1/3">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <span className="text-sm font-bold bg-gray-700/70 px-2 py-1 rounded-lg mr-2">#{index + 1}</span>
                        <h4 className="font-bold text-lg">
                          {getBrawlersArray(suggestion.brawlers).length === 1 ? t('best_pick') : t('best_combination')}
                        </h4>
                      </div>
                      <div className={`${getProbabilityColorClass(suggestion.probability)} text-white px-3 py-1 rounded-full text-sm font-bold transition-all duration-300 hover:brightness-110`}>
                        {suggestion.probability}%
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-3 mt-3 justify-center md:justify-start">
                      {getBrawlersArray(suggestion.brawlers).map((brawlerName, idx) => (
                        <div key={idx} className="flex flex-col items-center group">
                          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gray-700 bg-gray-900/50 group-hover:shadow-lg transition-all duration-300">
                            <img 
                              src={getBrawlerImage(brawlerName)} 
                              alt={brawlerName}
                              className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300"
                            />
                          </div>
                          <span className="text-sm mt-1 text-center">{brawlerName}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Explicación */}
                  {(suggestion.explanationUSA || suggestion.explanationESP) && (
                    <div className="md:w-2/3 bg-gray-700/30 p-3 rounded-lg hover:bg-gray-700/40 transition-all duration-300">
                      <div className="flex items-start">
                        <Info size={18} className="text-blue-400 mr-2 mt-1 shrink-0" />
                        <p className="text-sm text-gray-100">
                          {getExplanationText(suggestion)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default AIRecommendations;
