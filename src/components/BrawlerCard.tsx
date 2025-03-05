
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
    lg: 'w-24 h-24'
  };
  
  const statusClass = banned 
    ? 'brawler-card-banned' 
    : disabled 
      ? 'brawler-card-disabled' 
      : 'hover:scale-105 hover:shadow-xl cursor-pointer';
      
  const teamBorderClass = team 
    ? team === 'blue' 
      ? 'ring-2 ring-brawl-blue' 
      : 'ring-2 ring-brawl-red'
    : '';

  return (
    <div 
      className={`brawler-card ${sizeClasses[size]} ${statusClass} ${teamBorderClass} animate-scale-in`}
      onClick={!disabled && !banned ? onClick : undefined}
    >
      <div className="relative w-full h-full overflow-hidden rounded-xl">
        <img 
          src={brawler.image} 
          alt={brawler.name}
          className="w-full h-full object-cover transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            console.error(`Failed to load image for ${brawler.name}:`, brawler.image);
            e.currentTarget.src = `https://cdn.brawlify.com/brawler-thumbs/${brawler.name.toLowerCase().replace(/\s+/g, '-')}.png`;
          }}
        />
        
        {banned && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-1 bg-red-500 rotate-45 transform origin-center"></div>
            <div className="w-full h-1 bg-red-500 -rotate-45 transform origin-center"></div>
          </div>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-1">
          <p className="text-xs text-white font-semibold text-center truncate">
            {brawler.name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BrawlerCard;
