
import React from 'react';
import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface BrawlerSearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  placeholder?: string;
}

const BrawlerSearch: React.FC<BrawlerSearchProps> = ({ 
  searchTerm, 
  onSearchChange,
  placeholder
}) => {
  const { t } = useTranslation();
  
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search size={16} className="text-gray-400" />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md leading-5 bg-white/10 backdrop-blur-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        placeholder={placeholder || t('search_brawlers')}
      />
    </div>
  );
};

export default BrawlerSearch;
