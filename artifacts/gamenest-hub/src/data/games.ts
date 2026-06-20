export interface Game {
  id: string;
  title: string;
  genre: string;
  category: string;
  rating: number;
  description: string;
  fullDescription: string;
  developer: string;
  releaseDate: string;
  platform: string[];
  multiplayer: boolean;
  gameSize: string;
  minSpecs: { os: string; cpu: string; ram: string; gpu: string; storage: string };
  recSpecs: { os: string; cpu: string; ram: string; gpu: string; storage: string };
  features: string[];
  installationGuide: string[];
  coverImage: string;
  screenshots: string[];
  tags: string[];
  cardHeight: "small" | "medium" | "large";
}

export const games: Game[] = [
  {
    id: "cyberpunk-2077",
    title: "Cyberpunk 2077",
    genre: "RPG",
    category: "Trending",
    rating: 8.5,
    description: "An open-world, action-adventure story set in Night City.",
    fullDescription: "Cyberpunk 2077 is an open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification. You play as V, a mercenary outlaw going after a one-of-a-kind implant that is the key to immortality.",
    developer: "CD PROJEKT RED",
    releaseDate: "Dec 10, 2020",
    platform: ["PC", "PS5", "Xbox Series X"],
    multiplayer: false,
    gameSize: "70 GB",
    minSpecs: { os: "Windows 10", cpu: "Intel Core i5-3570K", ram: "8 GB", gpu: "GTX 780", storage: "70 GB" },
    recSpecs: { os: "Windows 10", cpu: "Intel Core i7-4790", ram: "12 GB", gpu: "GTX 1060", storage: "70 GB SSD" },
    features: ["Open World", "Sci-Fi", "Choices Matter", "First-Person"],
    installationGuide: ["Download installer", "Run setup", "Enjoy"],
    coverImage: "https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=600&auto=format&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1621252179027-94459d278660?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop"
    ],
    tags: ["Cyberpunk", "Futuristic", "Action"],
    cardHeight: "large"
  },
  {
    id: "elden-ring",
    title: "Elden Ring",
    genre: "RPG",
    category: "Trending",
    rating: 9.8,
    description: "Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring.",
    fullDescription: "THE NEW FANTASY ACTION RPG. Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.",
    developer: "FromSoftware Inc.",
    releaseDate: "Feb 24, 2022",
    platform: ["PC", "PS5", "Xbox Series X"],
    multiplayer: true,
    gameSize: "60 GB",
    minSpecs: { os: "Windows 10", cpu: "Intel Core i5-8400", ram: "12 GB", gpu: "GTX 1060", storage: "60 GB" },
    recSpecs: { os: "Windows 11", cpu: "Intel Core i7-8700K", ram: "16 GB", gpu: "GTX 1070", storage: "60 GB SSD" },
    features: ["Souls-like", "Dark Fantasy", "Difficult", "Exploration"],
    installationGuide: ["Download installer", "Run setup", "Enjoy"],
    coverImage: "https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?q=80&w=600&auto=format&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=1200&auto=format&fit=crop"
    ],
    tags: ["Fantasy", "Action RPG", "Hardcore"],
    cardHeight: "medium"
  },
  {
    id: "god-of-war",
    title: "God of War",
    genre: "Action",
    category: "Trending",
    rating: 9.5,
    description: "His vengeance against the Gods of Olympus years behind him, Kratos now lives as a man.",
    fullDescription: "His vengeance against the Gods of Olympus years behind him, Kratos now lives as a man in the realm of Norse Gods and monsters. It is in this harsh, unforgiving world that he must fight to survive... And teach his son to do the same.",
    developer: "Santa Monica Studio",
    releaseDate: "Jan 14, 2022",
    platform: ["PC", "PS5"],
    multiplayer: false,
    gameSize: "70 GB",
    minSpecs: { os: "Windows 10", cpu: "Intel Core i5-2500K", ram: "8 GB", gpu: "GTX 960", storage: "70 GB" },
    recSpecs: { os: "Windows 10", cpu: "Intel Core i5-6600K", ram: "8 GB", gpu: "GTX 1060", storage: "70 GB SSD" },
    features: ["Action", "Mythology", "Story Rich", "Hack and Slash"],
    installationGuide: ["Download installer", "Run setup", "Enjoy"],
    coverImage: "https://images.unsplash.com/photo-1605901302636-6e3e1509fa88?q=80&w=600&auto=format&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop"
    ],
    tags: ["Mythology", "Action", "Singleplayer"],
    cardHeight: "large"
  },
  {
    id: "spider-man",
    title: "Marvel's Spider-Man Remastered",
    genre: "Action",
    category: "Popular",
    rating: 9.0,
    description: "In Marvel’s Spider-Man Remastered, the worlds of Peter Parker and Spider-Man collide.",
    fullDescription: "Developed by Insomniac Games in collaboration with Marvel, and optimized for PC by Nixxes Software, Marvel's Spider-Man Remastered on PC introduces an experienced Peter Parker who's fighting big crime and iconic villains in Marvel's New York.",
    developer: "Insomniac Games",
    releaseDate: "Aug 12, 2022",
    platform: ["PC", "PS5"],
    multiplayer: false,
    gameSize: "75 GB",
    minSpecs: { os: "Windows 10", cpu: "Intel Core i3-4160", ram: "8 GB", gpu: "GTX 950", storage: "75 GB" },
    recSpecs: { os: "Windows 10", cpu: "Intel Core i5-4670", ram: "16 GB", gpu: "GTX 1060", storage: "75 GB SSD" },
    features: ["Action", "Superhero", "Open World", "Parkour"],
    installationGuide: ["Download installer", "Run setup", "Enjoy"],
    coverImage: "https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=600&auto=format&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=1200&auto=format&fit=crop"
    ],
    tags: ["Superhero", "Action", "Open World"],
    cardHeight: "small"
  },
  {
    id: "halo-infinite",
    title: "Halo Infinite",
    genre: "FPS",
    category: "Multiplayer",
    rating: 8.0,
    description: "The legendary Halo series returns with the most expansive Master Chief campaign yet.",
    fullDescription: "When all hope is lost and humanity’s fate hangs in the balance, the Master Chief is ready to confront the most ruthless foe he’s ever faced.",
    developer: "343 Industries",
    releaseDate: "Dec 8, 2021",
    platform: ["PC", "Xbox Series X"],
    multiplayer: true,
    gameSize: "50 GB",
    minSpecs: { os: "Windows 10", cpu: "AMD Ryzen 5 1600", ram: "8 GB", gpu: "RX 570", storage: "50 GB" },
    recSpecs: { os: "Windows 10", cpu: "AMD Ryzen 7 3700X", ram: "16 GB", gpu: "RTX 2070", storage: "50 GB SSD" },
    features: ["FPS", "Multiplayer", "Sci-Fi", "Shooter"],
    installationGuide: ["Download installer", "Run setup", "Enjoy"],
    coverImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop"
    ],
    tags: ["Sci-Fi", "FPS", "Multiplayer"],
    cardHeight: "medium"
  },
  {
    id: "baldurs-gate-3",
    title: "Baldur's Gate 3",
    genre: "RPG",
    category: "Trending",
    rating: 9.9,
    description: "Gather your party and return to the Forgotten Realms in a tale of fellowship and betrayal.",
    fullDescription: "Gather your party and return to the Forgotten Realms in a tale of fellowship and betrayal, sacrifice and survival, and the lure of absolute power. Mysterious abilities are awakening inside you, drawn from a mind flayer parasite planted in your brain.",
    developer: "Larian Studios",
    releaseDate: "Aug 3, 2023",
    platform: ["PC", "PS5", "Xbox Series X"],
    multiplayer: true,
    gameSize: "150 GB",
    minSpecs: { os: "Windows 10", cpu: "Intel Core i5-4690", ram: "8 GB", gpu: "GTX 970", storage: "150 GB SSD" },
    recSpecs: { os: "Windows 10", cpu: "Intel Core i7-8700K", ram: "16 GB", gpu: "RTX 2060 Super", storage: "150 GB SSD" },
    features: ["CRPG", "Story Rich", "Turn-Based Combat", "Choices Matter"],
    installationGuide: ["Download installer", "Run setup", "Enjoy"],
    coverImage: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=600&auto=format&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=1200&auto=format&fit=crop"
    ],
    tags: ["D&D", "RPG", "Story Rich"],
    cardHeight: "large"
  },
  {
    id: "witcher-3",
    title: "The Witcher 3: Wild Hunt",
    genre: "RPG",
    category: "Classics",
    rating: 9.7,
    description: "As war rages on throughout the Northern Realms, you take on the greatest contract of your life.",
    fullDescription: "You are Geralt of Rivia, mercenary monster slayer. Before you stands a war-torn, monster-infested continent you can explore at will. Your current contract? Tracking down Ciri — the Child of Prophecy, a living weapon that can alter the shape of the world.",
    developer: "CD PROJEKT RED",
    releaseDate: "May 18, 2015",
    platform: ["PC", "PS5", "Xbox Series X", "Switch"],
    multiplayer: false,
    gameSize: "50 GB",
    minSpecs: { os: "Windows 7/8/10", cpu: "Intel Core i5-2500K", ram: "6 GB", gpu: "GTX 660", storage: "50 GB" },
    recSpecs: { os: "Windows 7/8/10", cpu: "Intel Core i7-3770", ram: "8 GB", gpu: "GTX 770", storage: "50 GB" },
    features: ["Open World", "RPG", "Story Rich", "Atmospheric"],
    installationGuide: ["Download installer", "Run setup", "Enjoy"],
    coverImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop"
    ],
    tags: ["Fantasy", "RPG", "Masterpiece"],
    cardHeight: "medium"
  },
  {
    id: "rdr-2",
    title: "Red Dead Redemption 2",
    genre: "Action",
    category: "Trending",
    rating: 9.6,
    description: "Arthur Morgan and the Van der Linde gang are outlaws on the run.",
    fullDescription: "Winner of over 175 Game of the Year Awards and recipient of over 250 perfect scores, RDR2 is the epic tale of outlaw Arthur Morgan and the infamous Van der Linde gang, on the run across America at the dawn of the modern age.",
    developer: "Rockstar Games",
    releaseDate: "Dec 5, 2019",
    platform: ["PC", "PS4", "Xbox One"],
    multiplayer: true,
    gameSize: "150 GB",
    minSpecs: { os: "Windows 10", cpu: "Intel Core i5-2500K", ram: "8 GB", gpu: "GTX 770 2GB", storage: "150 GB" },
    recSpecs: { os: "Windows 10", cpu: "Intel Core i7-4770K", ram: "12 GB", gpu: "GTX 1060 6GB", storage: "150 GB" },
    features: ["Open World", "Story Rich", "Western", "Action"],
    installationGuide: ["Download installer", "Run setup", "Enjoy"],
    coverImage: "https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=600&auto=format&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=1200&auto=format&fit=crop"
    ],
    tags: ["Western", "Open World", "Story"],
    cardHeight: "large"
  },
  {
    id: "forza-horizon-5",
    title: "Forza Horizon 5",
    genre: "Racing",
    category: "Popular",
    rating: 8.8,
    description: "Explore the vibrant and ever-evolving open world landscapes of Mexico.",
    fullDescription: "Your Ultimate Horizon Adventure awaits! Explore the vibrant and ever-evolving open world landscapes of Mexico with limitless, fun driving action in hundreds of the world’s greatest cars.",
    developer: "Playground Games",
    releaseDate: "Nov 9, 2021",
    platform: ["PC", "Xbox Series X"],
    multiplayer: true,
    gameSize: "110 GB",
    minSpecs: { os: "Windows 10", cpu: "Intel i5-4460", ram: "8 GB", gpu: "GTX 970", storage: "110 GB" },
    recSpecs: { os: "Windows 10", cpu: "Intel i5-8400", ram: "16 GB", gpu: "GTX 1070", storage: "110 GB" },
    features: ["Racing", "Open World", "Multiplayer", "Driving"],
    installationGuide: ["Download installer", "Run setup", "Enjoy"],
    coverImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600&auto=format&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=1200&auto=format&fit=crop"
    ],
    tags: ["Racing", "Open World", "Cars"],
    cardHeight: "small"
  },
  {
    id: "resident-evil-4",
    title: "Resident Evil 4",
    genre: "Horror",
    category: "Trending",
    rating: 9.3,
    description: "Survival is just the beginning. Six years have passed since the biological disaster in Raccoon City.",
    fullDescription: "Survival is just the beginning. Six years have passed since the biological disaster in Raccoon City. Agent Leon S. Kennedy, one of the survivors of the incident, has been sent to rescue the president's kidnapped daughter.",
    developer: "CAPCOM Co., Ltd.",
    releaseDate: "Mar 23, 2023",
    platform: ["PC", "PS5", "Xbox Series X"],
    multiplayer: false,
    gameSize: "70 GB",
    minSpecs: { os: "Windows 10", cpu: "AMD Ryzen 3 1200", ram: "8 GB", gpu: "RX 560", storage: "70 GB" },
    recSpecs: { os: "Windows 10", cpu: "AMD Ryzen 5 3600", ram: "16 GB", gpu: "RX 5700", storage: "70 GB" },
    features: ["Action", "Horror", "Survival", "Zombies"],
    installationGuide: ["Download installer", "Run setup", "Enjoy"],
    coverImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=1200&auto=format&fit=crop"
    ],
    tags: ["Horror", "Survival", "Remake"],
    cardHeight: "medium"
  }
];
