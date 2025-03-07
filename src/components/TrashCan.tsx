
import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { useTranslation } from 'react-i18next';

// Actualizamos las rutas de las imágenes de la papelera
const closedTrashIcon = '/lovable-uploads/9e53a253-1bbc-45f2-a646-89f8b516246c.png';
const openTrashIcon = '/lovable-uploads/02a39218-4cc4-4a22-8974-ca0ce2251f99.png';
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
        src={imageError 
          ? fallbackTrashIcon 
          : (isHovered || isOver ? openTrashIcon : closedTrashIcon)
        } 
        alt={t('reset')} 
        className={`w-12 h-12 ${isOver ? 'scale-115' : ''}`}
        style={{ transition: 'all 0.2s ease' }}
        onError={handleImageError}
      />
    </div>
  );
};

export default TrashCan;
