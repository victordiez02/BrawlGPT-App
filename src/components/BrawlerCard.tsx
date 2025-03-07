
import React from 'react';
import { Brawler } from '@/lib/brawlers';

interface BrawlerCardProps {
  brawler: Brawler;
  disabled?: boolean;
  banned?: boolean;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  team?: 'blue' | 'red' | null;
}

const BrawlerCard: React.FC<BrawlerCardProps> = ({ 
  brawler, 
  disabled = false, 
  banned = false, 
  onClick, 
  size = 'md',
  team = null 
}) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-20 h-20',
    lg: 'w-full h-full' // Fill the container
  };
  
  const statusClass = banned 
    ? 'brawler-card-banned' 
    : disabled 
      ? 'brawler-card-disabled' 
      : 'hover:scale-105 hover:shadow-xl cursor-pointer';
      
  const teamBorderClass = team 
    ? team === 'blue' 
      ? 'ring-4 ring-brawl-blue shadow-md shadow-blue-500/30' 
      : 'ring-4 ring-brawl-red shadow-md shadow-red-500/30'
    : '';

  // Imagen de respaldo en caso de que falle la principal
  const fallbackImage = 'https://pbs.twimg.com/media/GkaLsRAXoAEltn9.jpg';
  const [imgSrc, setImgSrc] = React.useState(brawler.image);

  const handleImageError = () => {
    console.error(`Failed to load image for ${brawler.name}:`, brawler.image);
    
    // Intenta primero con la imagen de brawlify
    const fallbackId = brawler.id.toString().padStart(8, '0');
    const brawlifyUrl = `https://cdn.brawlify.com/brawler-thumbs/${fallbackId}.png`;
    
    // Si ya estamos usando la URL de brawlify y falló, usa la imagen de respaldo general
    if (imgSrc.includes('brawlify.com')) {
      setImgSrc(fallbackImage);
    } else {
      setImgSrc(brawlifyUrl);
    }
  };

  return (
    <div 
      className={`brawler-card ${sizeClasses[size]} ${statusClass} ${teamBorderClass} animate-scale-in`}
      onClick={!disabled && !banned ? onClick : undefined}
    >
      <div className="relative w-full h-full overflow-hidden rounded-xl">
        <img 
          src={imgSrc} 
          alt={brawler.name}
          className="w-full h-full object-cover transition-transform duration-300"
          loading="lazy"
          onError={handleImageError}
        />
        
        {banned && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-1.5 bg-red-500 rotate-45 transform origin-center"></div>
            <div className="w-full h-1.5 bg-red-500 -rotate-45 transform origin-center"></div>
          </div>
        )}
        
        {size === 'lg' ? (
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 py-2 px-2">
            <p className="text-white font-brawl text-center uppercase tracking-wider">
              {brawler.name}
            </p>
          </div>
        ) : (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-1">
            <p className="text-xs text-white font-brawl text-center truncate">
              {brawler.name}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrawlerCard;
