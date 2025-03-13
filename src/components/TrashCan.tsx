
import React, { useState } from 'react';
import { UseDraggableArguments, UseDragLayerArguments, useDrag, useDragLayer, useDrop } from 'react-dnd';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface TrashCanProps {
  onResetDraft: () => void;
  onRemoveBrawler: (brawlerId: number) => void;
}

const TrashCan: React.FC<TrashCanProps> = ({ onResetDraft, onRemoveBrawler }) => {
  const { t } = useTranslation();
  const [isHovering, setIsHovering] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  
  // Drop handling for the trash can
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'BRAWLER_ICON',
    drop: (item: { id: number }) => {
      onRemoveBrawler(item.id);
      
      // Trigger an animation or something to indicate the brawler was dropped in the trash
      const audio = new Audio('/resources/trash-sound.mp3');
      audio.volume = 0.3;
      
      try {
        audio.play().catch(error => console.error("Error playing sound:", error));
      } catch (e) {
        console.error("Error playing sound:", e);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  
  // Get drag item preview for showing animation
  const { isDragging, item } = useDragLayer((monitor) => ({
    isDragging: monitor.isDragging(),
    item: monitor.getItem(),
  }));
  
  // Handle reset with confirmation
  const handleResetClick = () => {
    setConfirmOpen(true);
  };
  
  const handleConfirmReset = () => {
    onResetDraft();
    
    // Also reset AI recommendations by triggering a custom event
    const resetEvent = new CustomEvent('resetAIRecommendations');
    document.dispatchEvent(resetEvent);
    
    setConfirmOpen(false);
  };
  
  return (
    <>
      <div
        ref={drop}
        className={`relative p-2 rounded-lg transition-all duration-300 ${
          isOver 
            ? 'bg-red-500/60 scale-110'
            : isHovering
              ? 'bg-red-500/30'
              : 'bg-gray-700/50 hover:bg-red-500/20'
        }`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={handleResetClick}
      >
        <div className="flex items-center justify-center relative group cursor-pointer">
          <Trash2 
            size={24} 
            className={`${
              isOver 
                ? 'text-white animate-bounce'
                : isHovering
                  ? 'text-red-400' 
                  : 'text-gray-400 group-hover:text-red-400'
            } transition-all duration-300`} 
          />
          
          {isHovering && !isOver && (
            <div className="absolute -bottom-2 transform translate-y-full w-24 text-center text-xs bg-gray-900/80 text-white rounded px-2 py-1 shadow pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {t('reset')}
            </div>
          )}
        </div>
        
        {/* Glowing effect when dragging over */}
        {isOver && (
          <div className="absolute inset-0 rounded-lg animate-pulse ring-4 ring-red-500 pointer-events-none"></div>
        )}
      </div>
      
      <AlertDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
      >
        <AlertDialogContent className="glass-panel">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-brawl text-lg text-red-500">
              {t('confirm_reset_draft')}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {t('confirm_reset_message')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border border-gray-700 hover:bg-gray-700/30 hover:text-white transition-all duration-300">
              {t('cancel')}
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmReset}
              className="bg-red-500 hover:bg-red-600 transition-all duration-300"
            >
              {t('reset')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default TrashCan;
