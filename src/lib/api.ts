
import { toast } from 'sonner';
import { brawlers } from './brawlers';
import { GameMap } from './maps';

export interface DraftData {
  map: {
    id: number;
    name: string;
    mode: string;
  };
  userTeam: 'blue' | 'red';
  blueTeam: (number | null)[];
  redTeam: (number | null)[];
  banned: number[];
}

export interface ApiResponse {
  suggestedBrawlers: {
    id: number;
    name: string;
    reason: string;
  }[];
  counterPicks: {
    id: number;
    name: string;
    counters: number[];
  }[];
}

export interface GeminiSuggestion {
  brawlers: string[] | string;
  probability: number;
  explanationUSA?: string;
  explanationESP?: string;
}

export interface GeminiResponse {
  gemini_response: {
    gemini_suggestions: GeminiSuggestion[];
  };
}

// Nueva función para realizar la solicitud a la API de BrawlGPT
export const getAIRecommendation = async (
  phase: number,
  selectedMap: GameMap | null,
  bannedBrawlers: number[],
  firstPick: 'blue' | 'red',
  selectedBrawlers: (number | null)[]
): Promise<GeminiResponse> => {
  if (!selectedMap) {
    throw new Error('No map selected');
  }

  // Convertir IDs de brawlers a sus nombres en inglés
  const bannedBrawlersNames = bannedBrawlers.map(id => {
    const brawler = brawlers.find(b => b.id === id);
    return brawler ? brawler.name : '';
  }).filter(name => name !== '');

  // Definir el orden de los picks según quién empieza primero
  const pickOrder = firstPick === 'blue' 
    ? [0, 3, 4, 1, 2, 5] // Blue first: Blue picks 1st, 4th, 5th; Red picks 2nd, 3rd, 6th
    : [3, 0, 1, 4, 5, 2]; // Red first: Red picks 1st, 4th, 5th; Blue picks 2nd, 3rd, 6th
  
  // Reorganizar los brawlers seleccionados según el orden de picks
  const orderedBrawlers: (number | null)[] = new Array(6).fill(null);
  pickOrder.forEach((newIndex, originalIndex) => {
    orderedBrawlers[originalIndex] = selectedBrawlers[newIndex];
  });
  
  // Filtrar brawlers seleccionados no nulos y convertir a nombres, ya en el orden correcto
  const pickedBrawlersNames = orderedBrawlers
    .filter(id => id !== null)
    .map(id => {
      const brawler = brawlers.find(b => b.id === id);
      return brawler ? brawler.name : '';
    })
    .filter(name => name !== '');

  // Preparar datos para la solicitud
  const requestData = {
    phase: phase,
    selected_map: selectedMap.name,
    banned_brawlers: bannedBrawlersNames,
    team: firstPick,
    picks: pickedBrawlersNames
  };

  console.log('Sending request to BrawlGPT API:', requestData);

  try {
    const apiKey = import.meta.env.VITE_BRAWLGPT_API_KEY;
    const response = await fetch('https://brawlgpt-api.onrender.com/draft', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey
      },
      body: JSON.stringify(requestData)
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Received response from BrawlGPT API:', data);
    return data;
  } catch (error) {
    console.error('Error fetching AI recommendation:', error);
    throw error;
  }
};
