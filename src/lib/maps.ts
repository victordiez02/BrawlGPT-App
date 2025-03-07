export interface GameMap {
  id: number;
  name: string;
  translatedName?: string; // Spanish translation
  mode: string;
  image: string;
}

export const gameMaps: GameMap[] = [
  {
    id: 1,
    name: 'Hard Rock Mine',
    translatedName: 'Mina Rocosa',
    mode: 'Gem Grab',
    image: 'https://cdn.brawlify.com/maps/regular/15000007.png'
  },
  {
    id: 2,
    name: 'Undermine',
    translatedName: 'Bajo Tierra',
    mode: 'Gem Grab',
    image: 'https://cdn.brawlify.com/maps/regular/15000013.png'
  },
  {
    id: 3,
    name: 'Crystal Arcade',
    translatedName: 'Sala de Juegos',
    mode: 'Gem Grab',
    image: 'https://cdn.brawlify.com/maps/regular/15000014.png'
  },
  {
    id: 4,
    name: 'Minecart Madness',
    translatedName: 'Locura en las Vías',
    mode: 'Gem Grab',
    image: 'https://cdn.brawlify.com/maps/regular/15000099.png'
  },
  {
    id: 5,
    name: 'Backyard Bowl',
    translatedName: 'Patio Trasero',
    mode: 'Brawl Ball',
    image: 'https://cdn.brawlify.com/maps/regular/15000029.png'
  },
  {
    id: 6,
    name: 'Super Stadium',
    translatedName: 'Súper Estadio',
    mode: 'Brawl Ball',
    image: 'https://cdn.brawlify.com/maps/regular/15000027.png'
  },
  {
    id: 7,
    name: 'Pinhole Punt',
    translatedName: 'Patada de Alfiler',
    mode: 'Brawl Ball',
    image: 'https://cdn.brawlify.com/maps/regular/15000171.png'
  },
  {
    id: 8,
    name: 'Field Goal',
    translatedName: 'Gol de Campo',
    mode: 'Brawl Ball',
    image: 'https://cdn.brawlify.com/maps/regular/15000078.png'
  },
  {
    id: 9,
    name: 'Safe Zone',
    translatedName: 'Zona Segura',
    mode: 'Heist',
    image: 'https://cdn.brawlify.com/maps/regular/15000023.png'
  },
  {
    id: 10,
    name: 'G.G. Mortuary',
    translatedName: 'Funeraria G.G.',
    mode: 'Heist',
    image: 'https://cdn.brawlify.com/maps/regular/15000022.png'
  },
  {
    id: 11,
    name: 'Kaboom Canyon',
    translatedName: 'Cañón Kaboom',
    mode: 'Heist',
    image: 'https://cdn.brawlify.com/maps/regular/15000019.png'
  },
  {
    id: 12,
    name: 'Hot Potato',
    translatedName: 'Patata Caliente',
    mode: 'Hot Zone',
    image: 'https://cdn.brawlify.com/maps/regular/15000254.png'
  },
  {
    id: 13,
    name: 'Split',
    translatedName: 'División',
    mode: 'Hot Zone',
    image: 'https://cdn.brawlify.com/maps/regular/15000231.png'
  },
  {
    id: 14,
    name: 'Dueling Beetles',
    translatedName: 'Escarabajos en Duelo',
    mode: 'Hot Zone',
    image: 'https://cdn.brawlify.com/maps/regular/15000255.png'
  },
  {
    id: 15,
    name: 'Snake Prairie',
    translatedName: 'Pradera de Serpientes',
    mode: 'Bounty',
    image: 'https://cdn.brawlify.com/maps/regular/15000008.png'
  },
  {
    id: 16,
    name: 'Shooting Star',
    translatedName: 'Estrella Fugaz',
    mode: 'Bounty',
    image: 'https://cdn.brawlify.com/maps/regular/15000012.png'
  },
  {
    id: 17,
    name: 'Deep End',
    translatedName: 'Fin Profundo',
    mode: 'Knockout',
    image: 'https://cdn.brawlify.com/placeholder.png'
  },
  {
    id: 18,
    name: 'Ice Fort',
    translatedName: 'Fuerte de Hielo',
    mode: 'Brawl Hockey',
    image: 'https://cdn.brawlify.com/placeholder.png'
  }
];
