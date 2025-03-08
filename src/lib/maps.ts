
export interface GameMap {
  id: number;
  name: string;
  translatedName?: string; // Spanish translation
  mode: string;
  image: string;
}

export interface GameMode {
  name: string;
  translatedName: string;
  banner: string;
}

export const gameModes: GameMode[] = [
  {
    name: 'Brawl Ball',
    translatedName: 'Balón Brawl',
    banner: 'https://static.wikia.nocookie.net/brawlstars/images/4/4b/Brawl_Ball_Arena-Environment.png'
  },
  {
    name: 'Brawl Hockey',
    translatedName: 'Hockey Brawl',
    banner: 'https://static.wikia.nocookie.net/brawlstars/images/7/78/Ice_Rink-Environment.png'
  },
  {
    name: 'Gem Grab',
    translatedName: 'Atrapagemas',
    banner: 'https://static.wikia.nocookie.net/brawlstars/images/0/09/Mine-Environment.png'
  },
  {
    name: 'Hot Zone',
    translatedName: 'Zona Restringida',
    banner: 'https://static.wikia.nocookie.net/brawlstars/images/1/1c/Skatepark-Environment.png'
  },
  {
    name: 'Knockout',
    translatedName: 'Noqueo',
    banner: 'https://cdn-fankit.brawlify.com/banner_map_23.png'
  }
];

export const gameMaps: GameMap[] = [
  // Brawl Ball Maps
  {
    id: 1,
    name: 'Center Stage',
    translatedName: 'Escenario Central',
    mode: 'Brawl Ball',
    image: 'https://static.wikia.nocookie.net/brawlstars/images/8/82/Center_Stage-Map.png'
  },
  {
    id: 2,
    name: 'Pinball Dreams',
    translatedName: 'Sueños de Pinball',
    mode: 'Brawl Ball',
    image: 'https://static.wikia.nocookie.net/brawlstars/images/e/e9/Pinball_Dreams-Map.png'
  },
  {
    id: 3,
    name: 'Sneaky Fields',
    translatedName: 'Campos Sigilosos',
    mode: 'Brawl Ball',
    image: 'https://static.wikia.nocookie.net/brawlstars/images/1/10/Sneaky_Fields-Map.png'
  },
  {
    id: 4,
    name: 'Backyard Bowl',
    translatedName: 'Patio Trasero',
    mode: 'Brawl Ball',
    image: 'https://cdn.brawlify.com/maps/regular/15000029.png'
  },
  {
    id: 5,
    name: 'Super Stadium',
    translatedName: 'Súper Estadio',
    mode: 'Brawl Ball',
    image: 'https://cdn.brawlify.com/maps/regular/15000027.png'
  },
  
  // Hockey Brawl Maps
  {
    id: 6,
    name: 'Below Zero',
    translatedName: 'Bajo Cero',
    mode: 'Brawl Hockey',
    image: 'https://static.wikia.nocookie.net/brawlstars/images/d/d6/Below_Zero-Map.png'
  },
  {
    id: 7,
    name: 'Cool Box',
    translatedName: 'Caja Fría',
    mode: 'Brawl Hockey',
    image: 'https://static.wikia.nocookie.net/brawlstars/images/5/5f/Cool_Box-Map.png'
  },
  {
    id: 8,
    name: 'Super Center',
    translatedName: 'Súper Centro',
    mode: 'Brawl Hockey',
    image: 'https://static.wikia.nocookie.net/brawlstars/images/2/21/Super_Center-Map.png'
  },
  {
    id: 9,
    name: 'Ice Fort',
    translatedName: 'Fuerte de Hielo',
    mode: 'Brawl Hockey',
    image: 'https://cdn.brawlify.com/placeholder.png'
  },
  
  // Gem Grab Maps
  {
    id: 10,
    name: 'Double Swoosh',
    translatedName: 'Doble Curva',
    mode: 'Gem Grab',
    image: 'https://static.wikia.nocookie.net/brawlstars/images/3/3e/Double_Swoosh-Map.png'
  },
  {
    id: 11,
    name: 'Hard Rock Mine',
    translatedName: 'Mina Rocosa',
    mode: 'Gem Grab',
    image: 'https://static.wikia.nocookie.net/brawlstars/images/b/bf/Hard_Rock_Mine-Map.png'
  },
  {
    id: 12,
    name: 'Undermine',
    translatedName: 'Bajo Tierra',
    mode: 'Gem Grab',
    image: 'https://static.wikia.nocookie.net/brawlstars/images/2/2b/Undermine-Map.png'
  },
  {
    id: 13,
    name: 'Crystal Arcade',
    translatedName: 'Sala de Juegos',
    mode: 'Gem Grab',
    image: 'https://cdn.brawlify.com/maps/regular/15000014.png'
  },
  
  // Hot Zone Maps
  {
    id: 14,
    name: 'Dueling Beetles',
    translatedName: 'Escarabajos en Duelo',
    mode: 'Hot Zone',
    image: 'https://static.wikia.nocookie.net/brawlstars/images/5/51/Dueling_Beetles-Map.png'
  },
  {
    id: 15,
    name: 'Open Business',
    translatedName: 'Negocio Abierto',
    mode: 'Hot Zone',
    image: 'https://static.wikia.nocookie.net/brawlstars/images/2/22/Open_Business-Map.png'
  },
  {
    id: 16,
    name: 'Parallel Plays',
    translatedName: 'Jugadas Paralelas',
    mode: 'Hot Zone',
    image: 'https://static.wikia.nocookie.net/brawlstars/images/9/94/Parallel_Plays-Map.png'
  },
  {
    id: 17,
    name: 'Hot Potato',
    translatedName: 'Patata Caliente',
    mode: 'Hot Zone',
    image: 'https://cdn.brawlify.com/maps/regular/15000254.png'
  },
  
  // Knockout Maps
  {
    id: 18,
    name: "Belle's Rock",
    translatedName: 'Roca de Belle',
    mode: 'Knockout',
    image: 'https://static.wikia.nocookie.net/brawlstars/images/b/b5/Belle%27s_Rock-Map.png'
  },
  {
    id: 19,
    name: 'Flaring Phoenix',
    translatedName: 'Fénix Ardiente',
    mode: 'Knockout',
    image: 'https://static.wikia.nocookie.net/brawlstars/images/c/cf/Flaring_Phoenix-Map.png'
  },
  {
    id: 20,
    name: 'Out in the Open',
    translatedName: 'A Campo Abierto',
    mode: 'Knockout',
    image: 'https://static.wikia.nocookie.net/brawlstars/images/8/8c/Out_in_the_Open-Map.png'
  },
  {
    id: 21,
    name: 'Deep End',
    translatedName: 'Fin Profundo',
    mode: 'Knockout',
    image: 'https://cdn.brawlify.com/placeholder.png'
  }
];

// Helper function to get a game mode object by its name
export function getGameModeByName(modeName: string): GameMode | undefined {
  return gameModes.find(mode => mode.name === modeName || mode.translatedName === modeName);
}
