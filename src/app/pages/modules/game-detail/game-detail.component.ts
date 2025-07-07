import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

interface GameDetail {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  heroImage?: string;
  trailerThumbnail?: string;
  genre: string;
  price?: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  platforms: string[];
  isHot?: boolean;
  isFree?: boolean;
  isInLibrary?: boolean;
  isInWishlist?: boolean;
  releaseDate: string;
  developer: string;
  publisher: string;
  fileSize: string;
  features: string[];
  screenshots: Screenshot[];
  reviews: Review[];
  systemRequirements: {
    minimum: SystemRequirement;
    recommended: SystemRequirement;
  };
}

interface Screenshot {
  id: number;
  thumbnail: string;
  full: string;
}

interface Review {
  id: number;
  username: string;
  avatar: string;
  rating: number;
  content: string;
  date: Date;
}

interface SystemRequirement {
  os: string;
  processor: string;
  memory: string;
  graphics: string;
  storage: string;
}

interface RelatedGame {
  id: number;
  title: string;
  image: string;
  price?: number;
  isFree?: boolean;
}

@Component({
  selector: 'app-game-detail',
  standalone: false,
  templateUrl: './game-detail.component.html',
  styleUrl: './game-detail.component.css'
})
export class GameDetailComponent implements OnInit {

  game: GameDetail | null = null;
  relatedGames: RelatedGame[] = [];
  activeTabIndex: number = 0;
  loading: boolean = false;
  error: boolean = false;

  // Mock data - En producción esto vendría de un servicio
  private mockGames: GameDetail[] = [
    {
      id: 1,
      title: "Baldur's Gate 3",
      description: "Gather your party, and return to the Forgotten Realms in a tale of fellowship and betrayal, sacrifice and survival, and the lure of absolute power.",
      fullDescription: "Baldur's Gate 3 is a story-rich, party-based RPG set in the universe of Dungeons & Dragons, where your choices shape a tale of fellowship and betrayal, survival and sacrifice, and the lure of absolute power. Mysterious abilities are awakening inside you, drawn from a Mind Flayer parasite planted in your brain. Resist, and turn darkness against itself. Or embrace corruption, and become ultimate evil.",
      image: "https://via.placeholder.com/600x300/1e3a8a/ffffff?text=Baldur%27s+Gate+3",
      heroImage: "https://via.placeholder.com/1200x600/1e3a8a/ffffff?text=Baldur%27s+Gate+3+Hero",
      trailerThumbnail: "https://via.placeholder.com/400x225/1e3a8a/ffffff?text=BG3+Trailer",
      genre: "RPG",
      price: 59.99,
      rating: 4.8,
      reviewCount: 15420,
      platforms: ['pc'],
      releaseDate: "August 3, 2023",
      developer: "Larian Studios",
      publisher: "Larian Studios",
      fileSize: "150 GB",
      features: [
        "Choose from 12 classes and 11 races to create your own unique character",
        "Multiplayer for up to 4 players - combine your forces in combat",
        "Over 600 spells and actions to choose from",
        "Romance with your companions and other characters",
        "Explore a world filled with rich lore and detailed environments"
      ],
      screenshots: [
        { id: 1, thumbnail: "https://via.placeholder.com/200x120/1e3a8a/ffffff?text=Screenshot+1", full: "https://via.placeholder.com/1920x1080/1e3a8a/ffffff?text=Screenshot+1" },
        { id: 2, thumbnail: "https://via.placeholder.com/200x120/1e3a8a/ffffff?text=Screenshot+2", full: "https://via.placeholder.com/1920x1080/1e3a8a/ffffff?text=Screenshot+2" },
        { id: 3, thumbnail: "https://via.placeholder.com/200x120/1e3a8a/ffffff?text=Screenshot+3", full: "https://via.placeholder.com/1920x1080/1e3a8a/ffffff?text=Screenshot+3" },
        { id: 4, thumbnail: "https://via.placeholder.com/200x120/1e3a8a/ffffff?text=Screenshot+4", full: "https://via.placeholder.com/1920x1080/1e3a8a/ffffff?text=Screenshot+4" }
      ],
      reviews: [
        {
          id: 1,
          username: "RPGMaster",
          avatar: "https://via.placeholder.com/32x32/3b82f6/ffffff?text=R",
          rating: 5,
          content: "Incredible game! The story is amazing and the characters are so well developed. Best RPG I've played in years.",
          date: new Date('2023-08-15')
        },
        {
          id: 2,
          username: "GamerGirl123",
          avatar: "https://via.placeholder.com/32x32/ec4899/ffffff?text=G",
          rating: 4,
          content: "Great game with lots of choices that matter. The combat system is engaging and the multiplayer is fun.",
          date: new Date('2023-08-20')
        }
      ],
      systemRequirements: {
        minimum: {
          os: "Windows 10 64-bit",
          processor: "Intel i5-4690 / AMD FX 4350",
          memory: "8 GB RAM",
          graphics: "Nvidia GTX 970 / RX 480 (4GB+ of VRAM)",
          storage: "150 GB available space"
        },
        recommended: {
          os: "Windows 10 64-bit",
          processor: "Intel i7-8700K / AMD r5 3600",
          memory: "16 GB RAM",
          graphics: "Nvidia 2060 Super / RX 6700 XT (8GB+ of VRAM)",
          storage: "150 GB available space (SSD)"
        }
      }
    },
    {
      id: 5,
      title: "Horizon: Call of the Mountain",
      description: "Experience the world of Horizon like never before with breathtaking visuals and immersive gameplay.",
      fullDescription: "Horizon Call of the Mountain is an upcoming action-adventure game that brings the beloved Horizon universe to new heights. Set in the post-apocalyptic world where robotic creatures roam the Earth, players will embark on an epic journey filled with discovery, combat, and stunning landscapes.",
      image: "https://via.placeholder.com/600x300/ef4444/ffffff?text=Horizon",
      heroImage: "https://via.placeholder.com/1200x600/ef4444/ffffff?text=Horizon+Hero",
      trailerThumbnail: "https://via.placeholder.com/400x225/ef4444/ffffff?text=Horizon+Trailer",
      genre: "Action-Adventure",
      price: 69.99,
      rating: 4.6,
      reviewCount: 8920,
      platforms: ['pc', 'mobile'],
      isHot: true,
      releaseDate: "February 22, 2023",
      developer: "Guerrilla Games",
      publisher: "Sony Interactive Entertainment",
      fileSize: "85 GB",
      features: [
        "Stunning visuals with advanced lighting and particle effects",
        "Immersive climbing and traversal mechanics",
        "Epic battles against massive robotic creatures",
        "Rich narrative set in the Horizon universe",
        "Breathtaking mountain environments to explore"
      ],
      screenshots: [
        { id: 1, thumbnail: "https://via.placeholder.com/200x120/ef4444/ffffff?text=Screenshot+1", full: "https://via.placeholder.com/1920x1080/ef4444/ffffff?text=Screenshot+1" },
        { id: 2, thumbnail: "https://via.placeholder.com/200x120/ef4444/ffffff?text=Screenshot+2", full: "https://via.placeholder.com/1920x1080/ef4444/ffffff?text=Screenshot+2" },
        { id: 3, thumbnail: "https://via.placeholder.com/200x120/ef4444/ffffff?text=Screenshot+3", full: "https://via.placeholder.com/1920x1080/ef4444/ffffff?text=Screenshot+3" },
        { id: 4, thumbnail: "https://via.placeholder.com/200x120/ef4444/ffffff?text=Screenshot+4", full: "https://via.placeholder.com/1920x1080/ef4444/ffffff?text=Screenshot+4" }
      ],
      reviews: [
        {
          id: 1,
          username: "AdventureSeeker",
          avatar: "https://via.placeholder.com/32x32/10b981/ffffff?text=A",
          rating: 5,
          content: "Absolutely stunning game! The climbing mechanics are incredible and the views are breathtaking.",
          date: new Date('2023-03-01')
        },
        {
          id: 2,
          username: "TechGamer",
          avatar: "https://via.placeholder.com/32x32/f59e0b/ffffff?text=T",
          rating: 4,
          content: "Great graphics and immersive gameplay. Some technical issues but overall a solid experience.",
          date: new Date('2023-03-05')
        }
      ],
      systemRequirements: {
        minimum: {
          os: "Windows 10 64-bit",
          processor: "Intel Core i5-8400 / AMD Ryzen 5 2600",
          memory: "12 GB RAM",
          graphics: "NVIDIA GeForce GTX 1060 6GB / AMD Radeon RX 580 8GB",
          storage: "85 GB available space"
        },
        recommended: {
          os: "Windows 11 64-bit",
          processor: "Intel Core i7-9700K / AMD Ryzen 7 3700X",
          memory: "16 GB RAM",
          graphics: "NVIDIA GeForce RTX 3070 / AMD Radeon RX 6800 XT",
          storage: "85 GB available space (SSD)"
        }
      }
    },
    {
      id: 8,
      title: "Street Fighter 6",
      description: "The legendary fighting game returns with new fighters, enhanced mechanics, and stunning visuals.",
      fullDescription: "Street Fighter 6 marks a bold new era for the legendary fighting game franchise. With cutting-edge graphics powered by the RE Engine, SF6 delivers a visceral and immersive experience that's never been seen before in the series. The game features a robust roster of 18 fighters at launch, including classic World Warriors and exciting new challengers.",
      image: "https://via.placeholder.com/600x300/f97316/ffffff?text=Street+Fighter+6",
      heroImage: "https://via.placeholder.com/1200x600/f97316/ffffff?text=SF6+Hero",
      trailerThumbnail: "https://via.placeholder.com/400x225/f97316/ffffff?text=SF6+Trailer",
      genre: "Fighting",
      rating: 4.7,
      reviewCount: 12350,
      platforms: ['pc', 'mobile'],
      isFree: true,
      releaseDate: "June 2, 2023",
      developer: "Capcom",
      publisher: "Capcom",
      fileSize: "60 GB",
      features: [
        "18 fighters at launch with more coming as DLC",
        "Revolutionary Drive System for enhanced combat",
        "World Tour mode - single-player adventure",
        "Battle Hub for online multiplayer battles",
        "Real-time commentary system"
      ],
      screenshots: [
        { id: 1, thumbnail: "https://via.placeholder.com/200x120/f97316/ffffff?text=Screenshot+1", full: "https://via.placeholder.com/1920x1080/f97316/ffffff?text=Screenshot+1" },
        { id: 2, thumbnail: "https://via.placeholder.com/200x120/f97316/ffffff?text=Screenshot+2", full: "https://via.placeholder.com/1920x1080/f97316/ffffff?text=Screenshot+2" },
        { id: 3, thumbnail: "https://via.placeholder.com/200x120/f97316/ffffff?text=Screenshot+3", full: "https://via.placeholder.com/1920x1080/f97316/ffffff?text=Screenshot+3" },
        { id: 4, thumbnail: "https://via.placeholder.com/200x120/f97316/ffffff?text=Screenshot+4", full: "https://via.placeholder.com/1920x1080/f97316/ffffff?text=Screenshot+4" }
      ],
      reviews: [
        {
          id: 1,
          username: "FightingFan",
          avatar: "https://via.placeholder.com/32x32/dc2626/ffffff?text=F",
          rating: 5,
          content: "Best Street Fighter game in years! The new mechanics are fantastic and the graphics are amazing.",
          date: new Date('2023-06-10')
        },
        {
          id: 2,
          username: "CompetitiveGamer",
          avatar: "https://via.placeholder.com/32x32/7c3aed/ffffff?text=C",
          rating: 4,
          content: "Great comeback for the series. The Drive System adds depth to the combat.",
          date: new Date('2023-06-15')
        }
      ],
      systemRequirements: {
        minimum: {
          os: "Windows 10 64-bit",
          processor: "Intel Core i5-7500 / AMD Ryzen 3 1200",
          memory: "8 GB RAM",
          graphics: "GTX 1060 / Radeon RX 580",
          storage: "60 GB available space"
        },
        recommended: {
          os: "Windows 10 64-bit",
          processor: "Intel Core i7-8700 / AMD Ryzen 5 3600",
          memory: "16 GB RAM",
          graphics: "RTX 2070 / Radeon RX 6700 XT",
          storage: "60 GB available space (SSD)"
        }
      }
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const gameId = +params['id'];
      this.loadGameDetail(gameId);
    });
  }

  loadGameDetail(gameId: number): void {
    this.loading = true;
    this.error = false;

    // Simular llamada a API
    setTimeout(() => {
      const foundGame = this.mockGames.find(game => game.id === gameId);

      if (foundGame) {
        this.game = foundGame;
        this.loadRelatedGames();
        this.error = false;
      } else {
        this.error = true;
        this.game = null;
      }

      this.loading = false;
    }, 1000);
  }

  loadRelatedGames(): void {
    // Simular juegos relacionados
    this.relatedGames = [
      {
        id: 2,
        title: "The Sims 4",
        image: "https://via.placeholder.com/150x80/10b981/ffffff?text=Sims4",
        price: 39.99
      },
      {
        id: 3,
        title: "Seasons",
        image: "https://via.placeholder.com/150x80/f59e0b/ffffff?text=Seasons",
        price: 29.99
      },
      {
        id: 9,
        title: "Diablo IV",
        image: "https://via.placeholder.com/150x80/991b1b/ffffff?text=Diablo",
        isFree: true
      }
    ];
  }

  preOrderGame(): void {
    console.log('Pre-order game:', this.game?.title);
    // Implementar lógica de pre-orden
  }

  playTrailer(): void {
    console.log('Play trailer for:', this.game?.title);
    // Implementar modal de trailer o navegación
  }

  playGame(): void {
    console.log('Play game:', this.game?.title);
    // Implementar lógica para jugar
  }

  addToCart(): void {
    console.log('Add to cart:', this.game?.title);
    // Implementar lógica del carrito
  }

  addToWishlist(): void {
    if (this.game) {
      this.game.isInWishlist = !this.game.isInWishlist;
      console.log('Wishlist status:', this.game.isInWishlist);
      // Implementar lógica de wishlist
    }
  }

  openScreenshot(screenshot: Screenshot): void {
    console.log('Open screenshot:', screenshot.full);
    // Implementar modal de imagen completa
  }

  viewRelatedGame(gameId: number): void {
    this.router.navigate(['/ctrlplay/game', gameId]);
  }

  navigateBack(): void {
    this.location.back();
  }

  getStarArray(rating: number): number[] {
    const stars = Math.floor(rating);
    return Array(stars).fill(0);
  }
}
