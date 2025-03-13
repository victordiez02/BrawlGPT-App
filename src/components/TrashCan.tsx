
/** @jsxImportSource react */
import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { useTranslation } from 'react-i18next';

// Actualizamos las rutas de las imágenes de la papelera
const trashIcon = '/resources/trashIcon.png';
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

  // Escuchar eventos de arrastre de brawlers
  useEffect(() => {
    const handleDragStart = () => setIsDraggingBrawler(true);
    const handleDragEnd = () => setIsDraggingBrawler(false);
    
    document.addEventListener('brawlerDragStart', handleDragStart);
    document.addEventListener('brawlerDragEnd', handleDragEnd);
    
    return () => {
      document.removeEventListener('brawlerDragStart', handleDragStart);
      document.removeEventListener('brawlerDragEnd', handleDragEnd);
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

  const handleClick = () => {
    // Limpiar tambien las recomendaciones de la IA
    // Enviamos un evento personalizado para que el componente DraftSimulator pueda escucharlo
    const event = new CustomEvent('resetAIRecommendations');
    document.dispatchEvent(event);
    
    // Llamamos a la función original para resetear el draft
    onResetDraft();
  };

  return (
    <div 
      ref={drop}
      className={`flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${isActive ? 'scale-110' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      title={t('reset')}
    >
      <div className={`
        p-3 rounded-full 
        ${isActive ? 'bg-red-500/20 animate-pulse-soft' : 'bg-transparent'} 
        transition-all duration-300
      `}>
        <img 
          src={imageError ? fallbackTrashIcon : trashIcon} 
          alt={t('reset')} 
          className="w-12 h-12"
          style={{ 
            transition: 'all 0.3s ease',
            filter: isActive 
              ? 'brightness(1.3) drop-shadow(0 0 8px rgba(239, 68, 68, 0.7))' 
              : 'brightness(1) drop-shadow(0 0 2px rgba(0, 0, 0, 0.3))',
            transform: isOver ? 'rotate(-10deg)' : isActive ? 'rotate(-5deg)' : 'rotate(0)'
          }}
          onError={handleImageError}
        />
      </div>
    </div>
  );
};

export default TrashCan;
