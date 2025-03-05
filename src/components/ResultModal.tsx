
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ApiResponse } from '@/lib/api';
import { brawlers } from '@/lib/brawlers';
import BrawlerCard from './BrawlerCard';
import { X } from 'lucide-react';

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: ApiResponse | null;
}

const ResultModal: React.FC<ResultModalProps> = ({ isOpen, onClose, result }) => {
  if (!result) return null;
  
  // Get brawler by id
  const getBrawler = (id: number) => {
    return brawlers.find(b => b.id === id);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-panel max-w-3xl w-[90vw] max-h-[90vh] overflow-y-auto animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-brawl-blue to-brawl-purple bg-clip-text text-transparent">
            Análisis de Draft
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 my-4">
          <div>
            <h3 className="text-lg font-bold mb-3 flex items-center">
              <span className="w-2 h-6 bg-brawl-green rounded-full mr-2"></span>
              Brawlers Recomendados
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {result.suggestedBrawlers.map(suggestion => {
                const brawler = getBrawler(suggestion.id);
                if (!brawler) return null;
                
                return (
                  <div key={suggestion.id} className="glass-card p-4 flex flex-col items-center">
                    <div className="flex items-center mb-2">
                      <BrawlerCard brawler={brawler} size="md" />
                    </div>
                    <h4 className="font-bold text-center mb-1">{brawler.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                      {suggestion.reason}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-3 flex items-center">
              <span className="w-2 h-6 bg-brawl-red rounded-full mr-2"></span>
              Counter Picks a Evitar
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.counterPicks.map(counter => {
                const brawler = getBrawler(counter.id);
                if (!brawler) return null;
                
                return (
                  <div key={counter.id} className="glass-card p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <BrawlerCard brawler={brawler} size="sm" />
                      <h4 className="font-bold">{brawler.name}</h4>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Counter eficaz contra:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {counter.counters.map(counterId => {
                          const counterBrawler = getBrawler(counterId);
                          if (!counterBrawler) return null;
                          
                          return (
                            <div key={counterId} className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-full px-2 py-1">
                              <img
                                src={counterBrawler.image}
                                alt={counterBrawler.name}
                                className="w-5 h-5 rounded-full"
                              />
                              <span className="text-xs">{counterBrawler.name}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button onClick={onClose} className="w-full">
            <X size={16} className="mr-2" />
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResultModal;
