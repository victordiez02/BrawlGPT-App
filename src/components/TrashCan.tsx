
import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { useTranslation } from 'react-i18next';

// Actualizamos las rutas de las imágenes de la papelera
const trashIcon = 'https://cdn-icons-png.freepik.com/512/16/16367.png';
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

  return (
    <div 
      ref={drop}
      className="flex items-center justify-center cursor-pointer transition-transform hover:scale-110"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onResetDraft}
      title={t('reset')}
    >
      <img 
        src={imageError ? fallbackTrashIcon : trashIcon} 
        alt={t('reset')} 
        className={`w-12 h-12 ${isOver || isHovered ? 'scale-115' : ''}`}
        style={{ 
          transition: 'all 0.2s ease',
          filter: isOver || isHovered ? 'brightness(1.2) drop-shadow(0 0 4px #ffffff)' : 'none'
        }}
        onError={handleImageError}
      />
    </div>
  );
};

export default TrashCan;
