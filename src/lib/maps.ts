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
    banner: 'https://static.wikia.nocookie.net/brawlstars/images/4/4b/Brawl_Ball_Arena-Environment.png/revision/latest/scale-to-width-down/535'
  },
  {
    name: 'Brawl Hockey',
    translatedName: 'Hockey Brawl',
    banner: 'https://static.wikia.nocookie.net/brawlstars/images/7/78/Ice_Rink-Environment.png/revision/latest/scale-to-width-down/536'
  },
  {
    name: 'Gem Grab',
    translatedName: 'Atrapagemas',
    banner: 'https://static.wikia.nocookie.net/brawlstars/images/0/09/Mine-Environment.png/revision/latest/scale-to-width-down/536'
  },
  {
    name: 'Hot Zone',
    translatedName: 'Zona Restringida',
    banner: 'https://static.wikia.nocookie.net/brawlstars/images/1/1c/Skatepark-Environment.png/revision/latest/scale-to-width-down/536'
  },
  {
    name: 'Knockout',
    translatedName: 'Noqueo',
    banner: 'https://cdn-fankit.brawlify.com/banner_map_23.png'
  },
  {
    name: 'Heist',
    translatedName: 'Atraco',
    banner: 'https://cdn.brawlify.com/placeholder.png'
  },
  {
    name: 'Bounty',
    translatedName: 'Caza Estelar',
    banner: 'https://cdn.brawlify.com/placeholder.png'
  }
];

export const gameMaps: GameMap[] = [
  // Brawl Ball maps
  {
    id: 1,
    name: 'Center Stage',
    translatedName: 'Escenario Central',
    mode: 'Brawl Ball',
    image: 'https://static.wikia.nocookie.net/brawlstars/images/8/82/Center_Stage-Map.png/revision/latest'
  },
  {
    id: 2,
    name: 'Pinball Dreams',
    translatedName: 'Sueños de Pinball',
    mode: 'Brawl Ball',
    image: 'https://static.wikia.nocookie.net/brawlstars/images/e/e9/Pinball_Dreams-Map.png/revision/latest'
  },
  {
    id: 3,
    name: 'Sneaky Fields',
    translatedName: 'Campos Sigilosos',
    mode: 'Brawl Ball',
    image: 'https://static.wikia.nocookie.net/brawlstars/images/1/10/Sneaky_Fields-Map.png/revision/latest'
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
  
  // Hockey Brawl maps
  {
    id: 6,
    name: 'Below Zero',
    translatedName: 'Bajo Cero',
    mode: 'Brawl Hockey',
    image: 'https://static.wikia.nocookie.net/brawlstars/images/d/d6/Below_Zero-Map.png/revision/latest'
  },
  {
    id: 7,
    name: 'Cool Box',
    translatedName: 'Caja Fría',
    mode: 'Brawl Hockey',
    image: 'https://static.wikia.nocookie.net/brawlstars/images/5/5f/Cool_Box-Map.png/revision/latest'
  },
  {
    id: 8,
    name: 'Super Center',
    translatedName: 'Super Centro',
    mode: 'Brawl Hockey',
    image: 'https://static.wikia.nocookie.net/brawlstars/images/2/21/Super_Center-Map.png/revision/latest'
  },
  {
    id: 9,
    name: 'Ice Fort',
    translatedName: 'Fuerte de Hielo',
    mode: 'Brawl Hockey',
    image: 'https://cdn.brawlify.com/placeholder.png'
  },
  
  // Gem Grab maps
  {
    id: 10,
    name: 'Double Swoosh',
    translatedName: 'Doble Barrido',
    mode: 'Gem Grab',
    image: 'https://static.wikia.nocookie.net/brawlstars/images/3/3e/Double_Swoosh-Map.png/revision/latest'
  },
  {
    id: 11,
    name: 'Hard Rock Mine',
    translatedName: 'Mina Rocosa',
    mode: 'Gem Grab',
    image: 'https://static.wikia.nocookie.net/brawlstars/images/b/bf/Hard_Rock_Mine-Map.png/revision/latest'
  },
  {
    id: 12,
    name: 'Undermine',
    translatedName: 'Bajo Tierra',
    mode: 'Gem Grab',
    image: 'https://static.wikia.nocookie.net/brawlstars/images/2/2b/Undermine-Map.png/revision/latest'
  },
  {
    id: 13,
    name: 'Crystal Arcade',
    translatedName: 'Sala de Juegos',
    mode: 'Gem Grab',
    image: 'https://cdn.brawlify.com/maps/regular/15000014.png'
  },
  {
    id: 14,
    name: 'Minecart Madness',
    translatedName: 'Locura en las Vías',
    mode: 'Gem Grab',
    image: 'https://cdn.brawlify.com/maps/regular/15000099.png'
  },
  
  // Hot Zone maps
  {
    id: 15,
    name: 'Dueling Beetles',
    translatedName: 'Escarabajos en Duelo',
    mode: 'Hot Zone',
    image: 'https://static.wikia.nocookie.net/brawlstars/images/5/51/Dueling_Beetles-Map.png/revision/latest'
  },
  {
    id: 16,
    name: 'Open Business',
    translatedName: 'Negocio Abierto',
    mode: 'Hot Zone',
    image: 'https://static.wikia.nocookie.net/brawlstars/images/2/22/Open_Business-Map.png/revision/latest'
  },
  {
    id: 17,
    name: 'Parallel Plays',
    translatedName: 'Jugadas Paralelas',
    mode: 'Hot Zone',
    image: 'https://static.wikia.nocookie.net/brawlstars/images/9/94/Parallel_Plays-Map.png/revision/latest'
  },
  {
    id: 18,
    name: 'Hot Potato',
    translatedName: 'Patata Caliente',
    mode: 'Hot Zone',
    image: 'https://cdn.brawlify.com/maps/regular/15000254.png'
  },
  {
    id: 19,
    name: 'Split',
    translatedName: 'División',
    mode: 'Hot Zone',
    image: 'https://cdn.brawlify.com/maps/regular/15000231.png'
  },
  
  // Knockout maps
  {
    id: 20,
    name: "Belle's Rock",
    translatedName: 'Roca de Belle',
    mode: 'Knockout',
    image: 'https://static.wikia.nocookie.net/brawlstars/images/b/b5/Belle%27s_Rock-Map.png/revision/latest'
  },
  {
    id: 21,
    name: 'Flaring Phoenix',
    translatedName: 'Fénix Ardiente',
    mode: 'Knockout',
    image: 'https://static.wikia.nocookie.net/brawlstars/images/c/cf/Flaring_Phoenix-Map.png/revision/latest'
  },
  {
    id: 22,
    name: 'Out in the Open',
    translatedName: 'A Campo Abierto',
    mode: 'Knockout',
    image: 'https://static.wikia.nocookie.net/brawlstars/images/8/8c/Out_in_the_Open-Map.png/revision/latest'
  },
  {
    id: 23,
    name: 'Deep End',
    translatedName: 'Fin Profundo',
    mode: 'Knockout',
    image: 'https://cdn.brawlify.com/placeholder.png'
  },
  
  // Keep the existing maps for other modes
  {
    id: 24,
    name: 'Safe Zone',
    translatedName: 'Zona Segura',
    mode: 'Heist',
    image: 'https://cdn.brawlify.com/maps/regular/15000023.png'
  },
  {
    id: 25,
    name: 'G.G. Mortuary',
    translatedName: 'Funeraria G.G.',
    mode: 'Heist',
    image: 'https://cdn.brawlify.com/maps/regular/15000022.png'
  },
  {
    id: 26,
    name: 'Kaboom Canyon',
    translatedName: 'Cañón Kaboom',
    mode: 'Heist',
    image: 'https://cdn.brawlify.com/maps/regular/15000019.png'
  },
  {
    id: 27,
    name: 'Snake Prairie',
    translatedName: 'Pradera de Serpientes',
    mode: 'Bounty',
    image: 'https://cdn.brawlify.com/maps/regular/15000008.png'
  },
  {
    id: 28,
    name: 'Shooting Star',
    translatedName: 'Estrella Fugaz',
    mode: 'Bounty',
    image: 'https://cdn.brawlify.com/maps/regular/15000012.png'
  }
];
