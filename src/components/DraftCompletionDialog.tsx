
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { brawlers } from '@/lib/brawlers';
import { Sparkle, Trophy } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface DraftCompletionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedBrawlers: (number | null)[];
}

const DraftCompletionDialog: React.FC<DraftCompletionDialogProps> = ({ 
  isOpen, 
  onClose, 
  selectedBrawlers 
}) => {
  const { t } = useTranslation();

  // Función para obtener la información de un brawler por su ID
  const getBrawler = (id: number | null) => {
    if (id === null) return null;
    return brawlers.find(b => b.id === id);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-panel max-w-3xl w-[90vw] animate-scale-in border-2 border-brawl-purple/50 bg-gradient-to-b from-gray-900/90 to-gray-800/90 shadow-lg shadow-brawl-purple/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold font-brawl text-center flex items-center justify-center">
            <Trophy className="text-yellow-400 mr-2" />
            <span className="bg-gradient-to-r from-brawl-blue to-brawl-purple bg-clip-text text-transparent">
              {t('draft_completed')}
            </span>
            <Trophy className="text-yellow-400 ml-2" />
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-6">
          <div className="text-center mb-6">
            <p className="text-lg opacity-90">{t('draft_completion_message')}</p>
            <div className="mt-2 flex justify-center">
              <div className="inline-block bg-gray-700/30 px-4 py-1 rounded-full">
                <Sparkle className="inline-block text-yellow-400 mr-1" size={18} />
                <span className="text-sm font-semibold">{t('good_luck')}</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {/* Blue Team */}
            <div>
              <div className="bg-brawl-blue/80 p-2 rounded-t-lg text-center text-white font-bold">
                {t('blue_team')}
              </div>
              <div className="bg-white/10 p-4 rounded-b-lg flex flex-col space-y-2">
                {selectedBrawlers.slice(0, 3).map((id, idx) => {
                  const brawler = getBrawler(id);
                  return brawler ? (
                    <div key={idx} className="flex items-center space-x-2 p-2 bg-gray-800/40 rounded-lg transition-all duration-300 hover:bg-gray-800/60">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-brawl-blue">
                        <img 
                          src={brawler.image} 
                          alt={brawler.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="font-medium">{brawler.name}</span>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
            
            {/* Red Team */}
            <div>
              <div className="bg-brawl-red/80 p-2 rounded-t-lg text-center text-white font-bold">
                {t('red_team')}
              </div>
              <div className="bg-white/10 p-4 rounded-b-lg flex flex-col space-y-2">
                {selectedBrawlers.slice(3, 6).map((id, idx) => {
                  const brawler = getBrawler(id);
                  return brawler ? (
                    <div key={idx} className="flex items-center space-x-2 p-2 bg-gray-800/40 rounded-lg transition-all duration-300 hover:bg-gray-800/60">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-brawl-red">
                        <img 
                          src={brawler.image} 
                          alt={brawler.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="font-medium">{brawler.name}</span>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            onClick={onClose} 
            className="w-full bg-gradient-to-r from-brawl-blue to-brawl-purple hover:brightness-110 transition-all duration-300"
          >
            {t('close')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DraftCompletionDialog;
