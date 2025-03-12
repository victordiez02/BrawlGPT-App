
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
    name: 'Gem Grab',
    translatedName: 'Atrapagemas',
    banner: 'https://static.wikia.nocookie.net/brawlstars/images/0/09/Mine-Environment.png'
  },
  {
    name: 'Brawl Ball',
    translatedName: 'Balón Brawl',
    banner: 'https://static.wikia.nocookie.net/brawlstars/images/4/4b/Brawl_Ball_Arena-Environment.png'
  },
  {
    name: 'Bounty',
    translatedName: 'Caza Estelar',
    banner: 'https://static.wikia.nocookie.net/brawlstars/images/9/9e/Canyon-Environment.png'
  },
  {
    name: 'Brawl Hockey',
    translatedName: 'Hockey Brawl',
    banner: 'https://static.wikia.nocookie.net/brawlstars/images/7/78/Ice_Rink-Environment.png'
  },
  {
    name: 'Knockout',
    translatedName: 'Noqueo',
    banner: 'https://cdn-fankit.brawlify.com/banner_map_23.png'
  },
  {
    name: 'Hot Zone',
    translatedName: 'Zona Restringida',
    banner: 'https://static.wikia.nocookie.net/brawlstars/images/1/1c/Skatepark-Environment.png'
  }
];

// This is the master list of all available maps
export const allGameMaps: GameMap[] = [
  // Gem Grab (1xx)
  {
    id: 100,
    name: "Double Swoosh",
    translatedName: "Brrrum Brrrum",
    mode: "Gem Grab",
    image: "https://static.wikia.nocookie.net/brawlstars/images/3/3e/Double_Swoosh-Map.png"
  },
  {
    id: 102,
    name: "Gem Fort",
    translatedName: "Fuerte de gemas",
    mode: "Gem Grab",
    image: "https://static.wikia.nocookie.net/brawlstars/images/9/95/Gem_Fort-Map.png"
  },
  {
    id: 103,  
    name: "Hard Rock Mine",
    translatedName: "Mina Rocosa",
    mode: "Gem Grab",
    image: "https://static.wikia.nocookie.net/brawlstars/images/b/bf/Hard_Rock_Mine-Map.png"
  },
  {
    id: 104,
    name: "Undermine",
    translatedName: "Cueva subterránea",
    mode: "Gem Grab",
    image: "https://static.wikia.nocookie.net/brawlstars/images/2/2b/Undermine-Map.png"
  },
  {
    id: 105,
    name: "Last Stop",
    translatedName: "Última parada",
    mode: "Gem Grab",
    image: "https://static.wikia.nocookie.net/brawlstars/images/e/ea/Last_Stop-Map.png"
  },
  {
    id: 106,
    name: "Crystal Arcade",
    translatedName: "Arcade de cristal",
    mode: "Gem Grab",
    image: "https://static.wikia.nocookie.net/brawlstars/images/0/06/Crystal_Arcade-Map.png"
  },

  // Brawl Ball (2xx)
  {
    id: 201,
    name: "Sneaky Fields",
    translatedName: "Campos furtivos",
    mode: "Brawl Ball",
    image: "https://static.wikia.nocookie.net/brawlstars/images/1/10/Sneaky_Fields-Map.png"
  },
  {
    id: 202,
    name: "Center Stage",
    translatedName: "Palco central",
    mode: "Brawl Ball",
    image: "https://static.wikia.nocookie.net/brawlstars/images/8/82/Center_Stage-Map.png"
  },
  {
    id: 203,
    name: "Pinball Dreams",
    translatedName: "Pinball",
    mode: "Brawl Ball",
    image: "https://static.wikia.nocookie.net/brawlstars/images/e/e9/Pinball_Dreams-Map.png"
  },
  {
    id: 204,
    name: "Triple Dribble",
    translatedName: "Triple drible",
    mode: "Brawl Ball",
    image: "https://static.wikia.nocookie.net/brawlstars/images/e/e9/Triple_Dribble-Map.png"
  },

  // Bounty (3xx)
  {
    id: 301,
    name: "Layer Cake",
    translatedName: "Crimen Organizado",
    mode: "Bounty",
    image: "https://static.wikia.nocookie.net/brawlstars/images/a/af/Layer_Cake-Map.png"
  },
  {
    id: 302,
    name: "Hideout",
    translatedName: "Escondite",
    mode: "Bounty",
    image: "https://static.wikia.nocookie.net/brawlstars/images/9/9d/Hideout-Map.png"
  },
  {
    id: 303,
    name: "Dry Season",
    translatedName: "Sequía Sanguinaria",
    mode: "Bounty",
    image: "https://static.wikia.nocookie.net/brawlstars/images/3/3c/Dry_Season-Map.png"
  },
  {
    id: 304,
    name: "Shooting Star",
    translatedName: "Tiroteo Estelar",
    mode: "Bounty",
    image: "https://static.wikia.nocookie.net/brawlstars/images/5/51/Shooting_Star-Map.png"
  },

  // Brawl Hockey (4xx)
  {
    id: 401,
    name: "Cool Box",
    translatedName: "Caja Confidencial",
    mode: "Brawl Hockey",
    image: "https://static.wikia.nocookie.net/brawlstars/images/5/5f/Cool_Box-Map.png"
  },
  {
    id: 402,
    name: "Super Center",
    translatedName: "Centro Congelado",
    mode: "Brawl Hockey",
    image: "https://static.wikia.nocookie.net/brawlstars/images/2/21/Super_Center-Map.png"
  },
  {
    id: 403,
    name: "Sendero Starr",
    translatedName: "Sendero Starr",
    mode: "Brawl Hockey",
    image: "https://static.wikia.nocookie.net/brawlstars/images/c/cb/Starr_Garden-Map.png"
  },
  {
    id: 404,
    name: "Below Zero",
    translatedName: "Temperatura Tumultuosa",
    mode: "Brawl Hockey",
    image: "https://static.wikia.nocookie.net/brawlstars/images/d/d6/Below_Zero-Map.png"
  },

  // Knockout (5xx)
  {
    id: 501,
    name: "Out in the Open",
    translatedName: "A la intemperie",
    mode: "Knockout",
    image: "https://static.wikia.nocookie.net/brawlstars/images/8/8c/Out_in_the_Open-Map.png"
  },
  {
    id: 502,
    name: "Flaring Phoenix",
    translatedName: "Fénix en llamas",
    mode: "Knockout",
    image: "https://static.wikia.nocookie.net/brawlstars/images/c/cf/Flaring_Phoenix-Map.png"
  },
  {
    id: 503,
    name: "New Horizons",
    translatedName: "Nuevos horizontes",
    mode: "Knockout",
    image: "https://static.wikia.nocookie.net/brawlstars/images/5/5d/New_Horizons-Map.png"
  },
  {
    id: 504,
    name: "Belle's Rock",
    translatedName: "Roca de Belle",
    mode: "Knockout",
    image: "https://static.wikia.nocookie.net/brawlstars/images/b/b5/Belle%27s_Rock-Map.png"
  },

  // Hot Zone (6xx)
  {
    id: 601,
    name: "Ring of Fire",
    translatedName: "Pista ardiente",
    mode: "Hot Zone",
    image: "https://static.wikia.nocookie.net/brawlstars/images/7/7a/Ring_of_Fire-Map.png"
  },
  {
    id: 602,
    name: "Open Business",
    translatedName: "Campo Abierto",
    mode: "Hot Zone",
    image: "https://static.wikia.nocookie.net/brawlstars/images/2/22/Open_Business-Map.png"
  },
  {
    id: 603,
    name: "Dueling Beetles",
    translatedName: "Duelo de Escarabajos",
    mode: "Hot Zone",
    image: "https://static.wikia.nocookie.net/brawlstars/images/5/51/Dueling_Beetles-Map.png"
  },
  {
    id: 604,
    name: "Parallel Plays",
    translatedName: "Estrategias Paralelas",
    mode: "Hot Zone",
    image: "https://media.brawltime.ninja/maps/15000293.webp"
  }
];

// List of map IDs that should be excluded from the map selection UI
const excludedMapIds = [106];

// Filtered list of maps that will be shown in the UI
export const gameMaps: GameMap[] = allGameMaps.filter(map => !excludedMapIds.includes(map.id));

// Helper function to get a game mode object by its name
export function getGameModeByName(modeName: string): GameMode | undefined {
  return gameModes.find(mode => mode.name === modeName || mode.translatedName === modeName);
}
