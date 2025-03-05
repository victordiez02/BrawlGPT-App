
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
    image: 'https://cdn.brawlify.com/map/Hard-Rock-Mine.png'
  },
  {
    id: 2,
    name: 'Undermine',
    mode: 'Gem Grab',
    image: 'https://cdn.brawlify.com/map/Undermine.png'
  },
  {
    id: 3,
    name: 'Crystal Arcade',
    mode: 'Gem Grab',
    image: 'https://cdn.brawlify.com/map/Crystal-Arcade.png'
  },
  {
    id: 4,
    name: 'Minecart Madness',
    mode: 'Gem Grab',
    image: 'https://cdn.brawlify.com/map/Minecart-Madness.png'
  },
  {
    id: 5,
    name: 'Backyard Bowl',
    mode: 'Brawl Ball',
    image: 'https://cdn.brawlify.com/map/Backyard-Bowl.png'
  },
  {
    id: 6,
    name: 'Super Stadium',
    mode: 'Brawl Ball',
    image: 'https://cdn.brawlify.com/map/Super-Stadium.png'
  },
  {
    id: 7,
    name: 'Pinhole Punt',
    mode: 'Brawl Ball',
    image: 'https://cdn.brawlify.com/map/Pinhole-Punt.png'
  },
  {
    id: 8,
    name: 'Field Goal',
    mode: 'Brawl Ball',
    image: 'https://cdn.brawlify.com/map/Field-Goal.png'
  },
  {
    id: 9,
    name: 'Safe Zone',
    mode: 'Heist',
    image: 'https://cdn.brawlify.com/map/Safe-Zone.png'
  },
  {
    id: 10,
    name: 'G.G. Mortuary',
    mode: 'Heist',
    image: 'https://cdn.brawlify.com/map/G-G-Mortuary.png'
  },
  {
    id: 11,
    name: 'Kaboom Canyon',
    mode: 'Heist',
    image: 'https://cdn.brawlify.com/map/Kaboom-Canyon.png'
  },
  {
    id: 12,
    name: 'Hot Potato',
    mode: 'Hot Zone',
    image: 'https://cdn.brawlify.com/map/Hot-Potato.png'
  },
  {
    id: 13,
    name: 'Split',
    mode: 'Hot Zone',
    image: 'https://cdn.brawlify.com/map/Split.png'
  },
  {
    id: 14,
    name: 'Dueling Beetles',
    mode: 'Hot Zone',
    image: 'https://cdn.brawlify.com/map/Dueling-Beetles.png'
  },
  {
    id: 15,
    name: 'Snake Prairie',
    mode: 'Bounty',
    image: 'https://cdn.brawlify.com/map/Snake-Prairie.png'
  },
  {
    id: 16,
    name: 'Shooting Star',
    mode: 'Bounty',
    image: 'https://cdn.brawlify.com/map/Shooting-Star.png'
  }
];
