
export interface GameMap {
  id: number;
  name: string;
  mode: string;
  image: string;
}

export const gameMaps: GameMap[] = [
  {
    id: 1,
    name: 'Hard Rock Mine',
    mode: 'Gem Grab',
    image: 'https://cdn.brawlify.com/maps/regular/15000007.png'
  },
  {
    id: 2,
    name: 'Undermine',
    mode: 'Gem Grab',
    image: 'https://cdn.brawlify.com/maps/regular/15000013.png'
  },
  {
    id: 3,
    name: 'Crystal Arcade',
    mode: 'Gem Grab',
    image: 'https://cdn.brawlify.com/maps/regular/15000014.png'
  },
  {
    id: 4,
    name: 'Minecart Madness',
    mode: 'Gem Grab',
    image: 'https://cdn.brawlify.com/maps/regular/15000099.png'
  },
  {
    id: 5,
    name: 'Backyard Bowl',
    mode: 'Brawl Ball',
    image: 'https://cdn.brawlify.com/maps/regular/15000029.png'
  },
  {
    id: 6,
    name: 'Super Stadium',
    mode: 'Brawl Ball',
    image: 'https://cdn.brawlify.com/maps/regular/15000027.png'
  },
  {
    id: 7,
    name: 'Pinhole Punt',
    mode: 'Brawl Ball',
    image: 'https://cdn.brawlify.com/maps/regular/15000171.png'
  },
  {
    id: 8,
    name: 'Field Goal',
    mode: 'Brawl Ball',
    image: 'https://cdn.brawlify.com/maps/regular/15000078.png'
  },
  {
    id: 9,
    name: 'Safe Zone',
    mode: 'Heist',
    image: 'https://cdn.brawlify.com/maps/regular/15000023.png'
  },
  {
    id: 10,
    name: 'G.G. Mortuary',
    mode: 'Heist',
    image: 'https://cdn.brawlify.com/maps/regular/15000022.png'
  },
  {
    id: 11,
    name: 'Kaboom Canyon',
    mode: 'Heist',
    image: 'https://cdn.brawlify.com/maps/regular/15000019.png'
  },
  {
    id: 12,
    name: 'Hot Potato',
    mode: 'Hot Zone',
    image: 'https://cdn.brawlify.com/maps/regular/15000254.png'
  },
  {
    id: 13,
    name: 'Split',
    mode: 'Hot Zone',
    image: 'https://cdn.brawlify.com/maps/regular/15000231.png'
  },
  {
    id: 14,
    name: 'Dueling Beetles',
    mode: 'Hot Zone',
    image: 'https://cdn.brawlify.com/maps/regular/15000255.png'
  },
  {
    id: 15,
    name: 'Snake Prairie',
    mode: 'Bounty',
    image: 'https://cdn.brawlify.com/maps/regular/15000008.png'
  },
  {
    id: 16,
    name: 'Shooting Star',
    mode: 'Bounty',
    image: 'https://cdn.brawlify.com/maps/regular/15000012.png'
  }
];
