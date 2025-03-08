
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface BrawlerSearchProps {
  onSearch: (term: string) => void;
}

const BrawlerSearch: React.FC<BrawlerSearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { t } = useTranslation();
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };
  
  return (
    <div className="relative mb-4">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search size={16} className="text-gray-400" />
      </div>
      <input
        type="text"
        className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-brawl-blue"
        placeholder={t('search')}
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};

export default BrawlerSearch;
