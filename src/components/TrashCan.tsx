
import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { useTranslation } from 'react-i18next';

// Importamos las imágenes de la papelera
const closedTrashIcon = '/lovable-uploads/e9ace023-3ed0-422c-935d-e57a74e3c836.png';
const openTrashIcon = '/lovable-uploads/43f1ba95-7071-4421-a01d-bed1fbc96b28.png';

interface TrashCanProps {
  onResetDraft: () => void;
  onRemoveBrawler: (id: number) => void;
}

const TrashCan: React.FC<TrashCanProps> = ({ onResetDraft, onRemoveBrawler }) => {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);

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

  return (
    <div 
      ref={drop}
      className="flex items-center cursor-pointer transition-transform hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onResetDraft}
      title={t('reset')}
    >
      <img 
        src={isHovered || isOver ? openTrashIcon : closedTrashIcon} 
        alt={t('reset')} 
        className={`w-8 h-8 ${isOver ? 'scale-110' : ''}`}
        style={{ transition: 'all 0.2s ease' }}
      />
    </div>
  );
};

export default TrashCan;
