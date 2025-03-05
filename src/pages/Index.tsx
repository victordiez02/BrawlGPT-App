
import React from 'react';
import Header from '@/components/Header';
import DraftSimulator from '@/components/DraftSimulator';

const Index = () => {
  return (
    <div className="min-h-screen pb-12">
      <Header />
      <main className="container mx-auto pb-20">
        <DraftSimulator />
      </main>
    </div>
  );
};

export default Index;
