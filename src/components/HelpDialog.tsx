
import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription
} from '@/components/ui/dialog';
import { 
  ArrowRight,
  Brain, 
  Cpu, 
  DraftingCompass, 
  HelpCircle, 
  MousePointerClick, 
  MousePointerSquareDashed,
  Sparkles
} from 'lucide-react';
import { Button } from './ui/button';

const HelpDialog: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isSpanish = i18n.language === 'es';

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full bg-gray-800/50 hover:bg-gray-700/70 transition-all duration-300"
          aria-label={isSpanish ? "Ayuda" : "Help"}
        >
          <HelpCircle className="text-white/80 hover:text-white transition-colors" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto glass-panel border-none">
        <DialogHeader>
          <DialogTitle className="flex items-center font-brawl text-2xl">
            <Sparkles className="mr-2 text-yellow-300" /> 
            {isSpanish ? "¿Cómo funciona BrawlGPT?" : "How does BrawlGPT work?"}
          </DialogTitle>
          <DialogDescription className="text-white/80">
            {isSpanish 
              ? "Una guía completa para utilizar el simulador de draft con IA" 
              : "A complete guide to using the AI-powered draft simulator"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-2">
          {/* Introduction */}
          <div className="bg-gray-800/40 p-4 rounded-lg">
            <h3 className="text-lg font-semibold flex items-center mb-2">
              <Brain className="mr-2 text-blue-400" />
              {isSpanish ? "Inteligencia Artificial Avanzada" : "Advanced Artificial Intelligence"}
            </h3>
            <p className="text-sm leading-relaxed">
              {isSpanish 
                ? "BrawlGPT utiliza un modelo de inteligencia artificial (Google Gemini) para analizar tu draft y generar recomendaciones de picks óptimos en tiempo real. El modelo ha sido entrenado con miles de partidas competitivas para ofrecerte las mejores opciones estratégicas posibles." 
                : "BrawlGPT uses an artificial intelligence model (Google Gemini) to analyze your draft and generate optimal pick recommendations in real-time. The model has been trained on thousands of competitive matches to provide you with the best possible strategic options."}
            </p>
          </div>

          {/* Basic Usage */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <DraftingCompass className="mr-2 text-green-400" />
              {isSpanish ? "Uso Básico" : "Basic Usage"}
            </h3>
            
            <div className="bg-gray-800/40 p-4 rounded-lg">
              <div className="flex items-start">
                <span className="bg-gray-700 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 shrink-0 mt-0.5">1</span>
                <div>
                  <h4 className="font-semibold mb-1">{isSpanish ? "Selecciona un mapa" : "Select a map"}</h4>
                  <p className="text-sm text-white/80">
                    {isSpanish 
                      ? "Comienza seleccionando un mapa de juego. Esto es crucial porque las recomendaciones se basarán en los brawlers más efectivos para ese mapa específico." 
                      : "Start by selecting a game map. This is crucial as recommendations will be based on the most effective brawlers for that specific map."}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800/40 p-4 rounded-lg">
              <div className="flex items-start">
                <span className="bg-gray-700 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 shrink-0 mt-0.5">2</span>
                <div>
                  <h4 className="font-semibold mb-1">{isSpanish ? "Elige quién empieza" : "Choose who picks first"}</h4>
                  <p className="text-sm text-white/80">
                    {isSpanish 
                      ? "Decide si el equipo azul o rojo realizará el primer pick. Esto afecta al orden de selección y a las estrategias recomendadas." 
                      : "Decide whether the blue or red team will make the first pick. This affects the selection order and recommended strategies."}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800/40 p-4 rounded-lg">
              <div className="flex items-start">
                <span className="bg-gray-700 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 shrink-0 mt-0.5">3</span>
                <div>
                  <h4 className="font-semibold mb-1">{isSpanish ? "Banea brawlers (opcional)" : "Ban brawlers (optional)"}</h4>
                  <p className="text-sm text-white/80">
                    {isSpanish 
                      ? "Puedes banear hasta 6 brawlers que no estarán disponibles para la selección, creando un escenario más realista." 
                      : "You can ban up to 6 brawlers that won't be available for selection, creating a more realistic scenario."}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800/40 p-4 rounded-lg">
              <div className="flex items-start">
                <span className="bg-gray-700 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 shrink-0 mt-0.5">4</span>
                <div>
                  <h4 className="font-semibold mb-1">{isSpanish ? "Simula el draft actual" : "Simulate the current draft"}</h4>
                  <p className="text-sm text-white/80">
                    {isSpanish 
                      ? "Selecciona brawlers para ambos equipos siguiendo el orden de draft indicado. Puedes hacerlo en cualquier fase del draft." 
                      : "Select brawlers for both teams following the indicated draft order. You can do this at any phase of the draft."}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800/40 p-4 rounded-lg">
              <div className="flex items-start">
                <span className="bg-gray-700 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 shrink-0 mt-0.5">5</span>
                <div>
                  <h4 className="font-semibold mb-1">{isSpanish ? "Genera recomendaciones" : "Generate recommendations"}</h4>
                  <p className="text-sm text-white/80">
                    {isSpanish 
                      ? "Presiona el botón azul brillante para que la IA analice el draft actual y genere las mejores opciones para la fase actual." 
                      : "Press the bright blue button to have the AI analyze the current draft and generate the best options for the current phase."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Features */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <MousePointerClick className="mr-2 text-purple-400" />
              {isSpanish ? "Controles Interactivos" : "Interactive Controls"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-800/40 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center">
                  <MousePointerClick size={16} className="mr-1 text-blue-300" />
                  {isSpanish ? "Click Izquierdo" : "Left Click"}
                </h4>
                <p className="text-sm text-white/80">
                  {isSpanish 
                    ? "Selecciona un brawler para añadirlo al draft en la posición actual." 
                    : "Select a brawler to add it to the draft in the current position."}
                </p>
              </div>

              <div className="bg-gray-800/40 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center">
                  <MousePointerClick size={16} className="mr-1 text-red-300" />
                  {isSpanish ? "Click Derecho" : "Right Click"}
                </h4>
                <p className="text-sm text-white/80">
                  {isSpanish 
                    ? "Banea un brawler para que no esté disponible en el draft." 
                    : "Ban a brawler so it's not available in the draft."}
                </p>
              </div>

              <div className="bg-gray-800/40 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center">
                  <MousePointerSquareDashed size={16} className="mr-1 text-yellow-300" />
                  {isSpanish ? "Arrastrar y Soltar" : "Drag and Drop"}
                </h4>
                <p className="text-sm text-white/80">
                  {isSpanish 
                    ? "Arrastra brawlers dentro del draft para reorganizarlos o a la papelera para eliminarlos." 
                    : "Drag brawlers within the draft to rearrange them or to the trash can to remove them."}
                </p>
              </div>

              <div className="bg-gray-800/40 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center">
                  <Cpu size={16} className="mr-1 text-cyan-300" />
                  {isSpanish ? "Recomendaciones IA" : "AI Recommendations"}
                </h4>
                <p className="text-sm text-white/80">
                  {isSpanish 
                    ? "El panel de recomendaciones puede contraerse o expandirse con el botón en la esquina superior derecha." 
                    : "The recommendations panel can be collapsed or expanded with the button in the upper right corner."}
                </p>
              </div>
            </div>
          </div>

          {/* Phases */}
          <div className="bg-gray-800/40 p-4 rounded-lg">
            <h3 className="text-lg font-semibold flex items-center mb-3">
              <ArrowRight className="mr-2 text-orange-400" />
              {isSpanish ? "Fases del Draft" : "Draft Phases"}
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="bg-blue-500/20 text-blue-400 rounded-full px-2 py-0.5 text-xs font-semibold mr-2 shrink-0 mt-0.5">1</div>
                <p className="text-sm">
                  {isSpanish 
                    ? "Primera fase: Recomendación para el primer pick (sin selecciones previas)" 
                    : "First phase: Recommendation for the first pick (no previous selections)"}
                </p>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-500/20 text-blue-400 rounded-full px-2 py-0.5 text-xs font-semibold mr-2 shrink-0 mt-0.5">2</div>
                <p className="text-sm">
                  {isSpanish 
                    ? "Segunda fase: Mejores combinaciones para los picks 2 y 3 (con el primer pick ya seleccionado)" 
                    : "Second phase: Best combinations for picks 2 and 3 (with first pick already selected)"}
                </p>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-500/20 text-blue-400 rounded-full px-2 py-0.5 text-xs font-semibold mr-2 shrink-0 mt-0.5">3</div>
                <p className="text-sm">
                  {isSpanish 
                    ? "Tercera fase: Mejores combinaciones para los picks 4 y 5 (con los picks 1, 2 y 3 ya seleccionados)" 
                    : "Third phase: Best combinations for picks 4 and 5 (with picks 1, 2, and 3 already selected)"}
                </p>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-500/20 text-blue-400 rounded-full px-2 py-0.5 text-xs font-semibold mr-2 shrink-0 mt-0.5">4</div>
                <p className="text-sm">
                  {isSpanish 
                    ? "Cuarta fase: Recomendación para el último pick (con 5 picks ya seleccionados)" 
                    : "Fourth phase: Recommendation for the last pick (with 5 picks already selected)"}
                </p>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-gray-900/40 p-4 rounded-lg border border-yellow-500/20">
            <h3 className="text-lg font-semibold flex items-center mb-2 text-yellow-400">
              <Sparkles className="mr-2" />
              {isSpanish ? "Consejos Pro" : "Pro Tips"}
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">•</span>
                {isSpanish 
                  ? "Las recomendaciones de la IA muestran un porcentaje de efectividad basado en el análisis del draft." 
                  : "AI recommendations show an effectiveness percentage based on draft analysis."}
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">•</span>
                {isSpanish 
                  ? "Las medallas de oro, plata y bronce destacan las tres mejores opciones recomendadas." 
                  : "Gold, silver, and bronze medals highlight the top three recommended options."}
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">•</span>
                {isSpanish 
                  ? "Usa la papelera para reiniciar el draft completamente si quieres empezar de nuevo." 
                  : "Use the trash can to reset the draft completely if you want to start over."}
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">•</span>
                {isSpanish 
                  ? "Experimenta con diferentes escenarios para entender mejor las estrategias de contrapiick." 
                  : "Experiment with different scenarios to better understand counterpick strategies."}
              </li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HelpDialog;
