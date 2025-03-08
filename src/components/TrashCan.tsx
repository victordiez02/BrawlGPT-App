
import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { useTranslation } from 'react-i18next';

// Actualizamos las rutas de las imágenes de la papelera
const trashIcon = 'https://cdn-icons-png.freepik.com/512/802/802085.png';
// Imagen de respaldo en caso de que fallen las principales
const fallbackTrashIcon = 'https://pbs.twimg.com/media/GkaLsRAXoAEltn9.jpg';

interface TrashCanProps {
  onResetDraft: () => void;
  onRemoveBrawler: (id: number) => void;
}

const TrashCan: React.FC<TrashCanProps> = ({ onResetDraft, onRemoveBrawler }) => {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isDraggingBrawler, setIsDraggingBrawler] = useState(false);
  const [draggingBrawlerId, setDraggingBrawlerId] = useState<number | null>(null);

  // Listen for global brawler drag events
  useEffect(() => {
    const handleDragStart = (event: Event) => {
      const customEvent = event as CustomEvent<{id: number}>;
      setIsDraggingBrawler(true);
      setDraggingBrawlerId(customEvent.detail.id);
    };

    const handleDragEnd = () => {
      setIsDraggingBrawler(false);
      setDraggingBrawlerId(null);
    };

    window.addEventListener('brawlerDragStart', handleDragStart);
    window.addEventListener('brawlerDragEnd', handleDragEnd);

    return () => {
      window.removeEventListener('brawlerDragStart', handleDragStart);
      window.removeEventListener('brawlerDragEnd', handleDragEnd);
    };
  }, []);

  // Configuramos el drop target para recibir brawlers arrastrados
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'DRAFT_BRAWLER',
    drop: (item: { id: number | null }) => {
      if (item.id !== null) {
        onRemoveBrawler(item.id);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }), [onRemoveBrawler]);

  const handleImageError = () => {
    console.error('Failed to load trash can image, using fallback');
    setImageError(true);
  };

  // Efectos interactivos mejorados
  const isActive = isOver || isHovered || isDraggingBrawler;

  return (
    <div 
      ref={drop}
      className={`flex items-center justify-center cursor-pointer transition-all duration-300 ${
        isActive ? 'scale-115 z-50' : ''
      } ${isDraggingBrawler ? 'animate-pulse-soft' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onResetDraft}
      title={t('reset')}
    >
      <div className={`
        p-3 rounded-full 
        ${isActive ? 'bg-red-500/30 animate-pulse-soft' : 'bg-transparent'} 
        ${isOver ? 'bg-red-600/50 ring-2 ring-red-400' : ''}
        transition-all duration-300
      `}>
        <img 
          src={imageError ? fallbackTrashIcon : trashIcon} 
          alt={t('reset')} 
          className="w-12 h-12"
          style={{ 
            transition: 'all 0.3s ease',
            filter: isActive 
              ? 'brightness(1.4) drop-shadow(0 0 10px rgba(239, 68, 68, 0.8))' 
              : 'brightness(1) drop-shadow(0 0 2px rgba(0, 0, 0, 0.3))',
            transform: `rotate(${isOver ? '-15deg' : isActive ? '-5deg' : '0'}) ${isOver ? 'scale(1.1)' : ''}`
          }}
          onError={handleImageError}
        />
        {isDraggingBrawler && !isOver && (
          <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
            +
          </div>
        )}
        {isOver && (
          <div className="absolute inset-0 flex items-center justify-center animate-scale-in pointer-events-none">
            <div className="bg-white/20 backdrop-blur-sm p-1 rounded text-xs font-bold text-white">
              {t('delete')}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrashCan;
