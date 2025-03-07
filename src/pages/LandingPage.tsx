
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-red-600 text-white p-4">
      <div className="max-w-4xl w-full glass-panel bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 shadow-2xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center animate-fade-in">
          Brawl Stars Draft Simulator
        </h1>
        
        <div className="mb-8 text-center space-y-4 animate-fade-in delay-200">
          <p className="text-xl opacity-90">
            Crea estrategias perfectas para tus partidas competitivas.
          </p>
          <p className="text-lg opacity-80">
            Simula el proceso de selección de brawlers, gestiona baneos y obtén recomendaciones de picks para 
            maximizar tus posibilidades de victoria.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 p-4 rounded-xl text-center">
            <h3 className="font-bold text-lg mb-2">Selecciona</h3>
            <p className="text-sm opacity-80">Elige tu mapa y equipo para comenzar el draft.</p>
          </div>
          <div className="bg-white/10 p-4 rounded-xl text-center">
            <h3 className="font-bold text-lg mb-2">Banea</h3>
            <p className="text-sm opacity-80">Elimina hasta 6 brawlers del pool para refinar tus estrategias.</p>
          </div>
          <div className="bg-white/10 p-4 rounded-xl text-center">
            <h3 className="font-bold text-lg mb-2">Optimiza</h3>
            <p className="text-sm opacity-80">Obtén recomendaciones para cada fase del draft.</p>
          </div>
        </div>
        
        <div className="flex justify-center">
          <Link 
            to="/simulator" 
            className="btn-primary group flex items-center px-8 py-3 text-lg font-medium rounded-xl transition-all transform hover:scale-105"
          >
            Comenzar Simulación
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
      
      <footer className="mt-10 text-sm opacity-70">
        © 2023 Brawl Stars Draft Simulator - Herramienta no oficial
      </footer>
    </div>
  );
};

export default LandingPage;
