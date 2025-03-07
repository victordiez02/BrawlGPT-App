
import React from 'react';
import Header from '@/components/Header';
import DraftSimulator from '@/components/DraftSimulator';
import LanguageSelector from '@/components/LanguageSelector';

const SimulatorPage: React.FC = () => {
  return (
    <div className="min-h-screen pb-12 bg-cybernetic text-white">
      <Header />
      <main className="container mx-auto pb-20">
        <DraftSimulator />
      </main>
    </div>
  );
};

export default SimulatorPage;
