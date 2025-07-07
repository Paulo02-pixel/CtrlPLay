import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Game {
  id: number;
  title: string;
  image: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  genre: string[];
  isFree: boolean;
  isHot?: boolean;
  platforms: string[];
  description: string;
}

interface GameGenre {
  id: string;
  name: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-games',
  standalone: false,
  templateUrl: './games.component.html',
  styleUrl: './games.component.css'
})
export class GamesComponent implements OnInit {

  searchTerm: string = '';
  selectedGenres: string[] = [];
  sortBy: string = 'popularity';
  showFreeOnly: boolean = false;

  sortOptions = [
    { label: 'Popularity', value: 'popularity' },
    { label: 'Rating', value: 'rating' },
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' },
    { label: 'Release Date', value: 'release_date' },
    { label: 'Name A-Z', value: 'name_asc' },
    { label: 'Name Z-A', value: 'name_desc' }
  ];

  gameGenres: GameGenre[] = [
    { id: 'adventure', name: 'Adventure', icon: 'pi-map', color: '#FF6B6B' },
    { id: 'fighting', name: 'Fighting', icon: 'pi-shield', color: '#4ECDC4' },
    { id: 'puzzle', name: 'Puzzle', icon: 'pi-th-large', color: '#45B7D1' },
    { id: 'racing', name: 'Racing', icon: 'pi-car', color: '#96CEB4' },
    { id: 'rpg', name: 'Role-Playing', icon: 'pi-user', color: '#FFEAA7' },
    { id: 'strategy', name: 'Strategy', icon: 'pi-sitemap', color: '#DDA0DD' },
    { id: 'action', name: 'Action', icon: 'pi-flash', color: '#FF7675' },
    { id: 'simulation', name: 'Simulation', icon: 'pi-cog', color: '#74B9FF' },
    { id: 'sports', name: 'Sports', icon: 'pi-trophy', color: '#FD79A8' },
    { id: 'shooter', name: 'Shooter', icon: 'pi-target', color: '#FDCB6E' }
  ];

  games: Game[] = [
    {
      id: 1,
      title: 'Street Fighter 6',
      image: '/assets/games/street-fighter-6.jpg',
      price: 0,
      rating: 4.5,
      genre: ['fighting', 'action'],
      isFree: true,
      platforms: ['pc', 'xbox', 'playstation'],
      description: 'The latest in the legendary fighting game series'
    },
    {
      id: 2,
      title: 'Diablo IV',
      image: '/assets/games/diablo-iv.jpg',
      price: 0,
      rating: 4.2,
      genre: ['rpg', 'action'],
      isFree: true,
      platforms: ['pc', 'xbox', 'playstation'],
      description: 'Return to the world of Sanctuary in this dark fantasy RPG'
    },
    {
      id: 3,
      title: 'Fortnite',
      image: '/assets/games/fortnite.jpg',
      price: 0,
      rating: 4.0,
      genre: ['action', 'shooter'],
      isFree: true,
      isHot: true,
      platforms: ['pc', 'xbox', 'playstation', 'mobile'],
      description: 'Battle royale game with building mechanics'
    },
    {
      id: 4,
      title: 'Final Fantasy XVI',
      image: '/assets/games/final-fantasy-xvi.jpg',
      price: 0,
      rating: 4.8,
      genre: ['rpg', 'adventure'],
      isFree: true,
      platforms: ['pc', 'playstation'],
      description: 'Epic fantasy adventure with stunning visuals'
    },
    {
      id: 5,
      title: 'Baldur\'s Gate 3',
      image: '/assets/games/baldurs-gate-3.jpg',
      price: 59.99,
      rating: 4.9,
      genre: ['rpg', 'adventure'],
      isFree: false,
      isHot: true,
      platforms: ['pc', 'xbox', 'playstation'],
      description: 'Gather your party and return to the Forgotten Realms'
    },
    {
      id: 6,
      title: 'The Sims 4',
      image: '/assets/games/the-sims-4.jpg',
      price: 39.99,
      originalPrice: 49.99,
      discount: 20,
      rating: 4.3,
      genre: ['simulation'],
      isFree: false,
      platforms: ['pc', 'xbox', 'playstation'],
      description: 'Create and control people in a virtual world'
    },
    {
      id: 7,
      title: 'Seasons: A Letter to the Future',
      image: '/assets/games/seasons.jpg',
      price: 29.99,
      rating: 4.1,
      genre: ['adventure', 'puzzle'],
      isFree: false,
      platforms: ['pc', 'playstation'],
      description: 'A atmospheric adventure about recording memories'
    },
    {
      id: 8,
      title: 'The Legend of Zelda: Tears of the Kingdom',
      image: '/assets/games/zelda-tears.jpg',
      price: 69.99,
      rating: 4.7,
      genre: ['adventure', 'action'],
      isFree: false,
      isHot: true,
      platforms: ['nintendo'],
      description: 'An epic adventure across the land and skies of Hyrule'
    },
    {
      id: 9,
      title: 'Horizon: Call of the Mountain',
      image: '/assets/games/horizon-cotm.jpg',
      price: 69.99,
      rating: 4.6,
      genre: ['adventure', 'action'],
      isFree: false,
      isHot: true,
      platforms: ['playstation'],
      description: 'Experience the world of Horizon in virtual reality'
    },
    {
      id: 10,
      title: 'Starfield',
      image: '/assets/games/starfield.jpg',
      price: 89.99,
      rating: 4.8,
      genre: ['rpg', 'adventure'],
      isFree: false,
      isHot: true,
      platforms: ['pc', 'xbox'],
      description: 'Explore the galaxy in this space exploration RPG'
    },
    {
      id: 11,
      title: 'Marvel\'s Spider-Man 2',
      image: '/assets/games/spiderman-2.jpg',
      price: 79.99,
      rating: 4.7,
      genre: ['action', 'adventure'],
      isFree: false,
      isHot: true,
      platforms: ['playstation'],
      description: 'Play as both Peter Parker and Miles Morales'
    },
    {
      id: 12,
      title: 'Call of Duty: Modern Warfare III',
      image: '/assets/games/cod-mw3.jpg',
      price: 69.99,
      rating: 4.2,
      genre: ['action', 'shooter'],
      isFree: false,
      platforms: ['pc', 'xbox', 'playstation'],
      description: 'The latest in the iconic FPS series'
    }
  ];

  filteredGames: Game[] = [];
  featuredGame: Game | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    this.filteredGames = [...this.games];
    this.featuredGame = this.games.find(game => game.id === 5) || null; // Baldur's Gate 3 como featured
    this.applyFilters();
  }

  onSearch() {
    this.applyFilters();
  }

  onGenreToggle(genreId: string) {
    const index = this.selectedGenres.indexOf(genreId);
    if (index > -1) {
      this.selectedGenres.splice(index, 1);
    } else {
      this.selectedGenres.push(genreId);
    }
    this.applyFilters();
  }

  onSortChange() {
    this.applyFilters();
  }

  onFreeToggle() {
    this.showFreeOnly = !this.showFreeOnly;
    this.applyFilters();
  }

  applyFilters() {
    let filtered = [...this.games];

    // Filter by search term
    if (this.searchTerm.trim()) {
      filtered = filtered.filter(game =>
        game.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        game.description.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    // Filter by genres
    if (this.selectedGenres.length > 0) {
      filtered = filtered.filter(game =>
        game.genre.some(genre => this.selectedGenres.includes(genre))
      );
    }

    // Filter by free games only
    if (this.showFreeOnly) {
      filtered = filtered.filter(game => game.isFree);
    }

    // Sort games
    filtered.sort((a, b) => {
      switch (this.sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price_asc':
          return a.price - b.price;
        case 'price_desc':
          return b.price - a.price;
        case 'name_asc':
          return a.title.localeCompare(b.title);
        case 'name_desc':
          return b.title.localeCompare(a.title);
        case 'release_date':
          return b.id - a.id; // Assuming higher ID means newer
        default: // popularity
          return (b.isHot ? 1 : 0) - (a.isHot ? 1 : 0) || b.rating - a.rating;
      }
    });

    this.filteredGames = filtered;
  }

  viewGameDetails(gameId: number) {
    this.router.navigate(['/games', gameId]);
  }


  getPlatformIcon(platform: string): string {
    const platformIcons: { [key: string]: string } = {
      'pc': 'pi-desktop',
      'xbox': 'pi-xbox',
      'playstation': 'pi-playstation',
      'nintendo': 'pi-nintendo',
      'mobile': 'pi-mobile'
    };
    return platformIcons[platform] || 'pi-desktop';
  }

  getGenreName(genreId: string): string {
    const genre = this.gameGenres.find(g => g.id === genreId);
    return genre ? genre.name : genreId;
  }

  getStarsArray(rating: number): any[] {
    return Array(Math.floor(rating));
  }

  getGenreColor(genreId: string): string {
    const genre = this.gameGenres.find(g => g.id === genreId);
    return genre?.color || '#666';
  }

  isGenreSelected(genreId: string): boolean {
    return this.selectedGenres.includes(genreId);
  }
}
