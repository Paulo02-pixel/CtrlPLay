import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Game {
  id: number;
  title: string;
  genre: string;
  image: string;
  progress: number;
  lastPlayed: string;
  hoursPlayed: number;
  status: 'installed' | 'not-installed' | 'updating';
  size: string;
  achievements: {
    earned: number;
    total: number;
  };
}

interface GameCollection {
  name: string;
  games: Game[];
  icon: string;
}

@Component({
  selector: 'app-library',
  standalone: false,
  templateUrl: './library.component.html',
  styleUrl: './library.component.css'
})
export class LibraryComponent implements OnInit {

  games: Game[] = [
    {
      id: 1,
      title: 'Cyberpunk 2077',
      genre: 'RPG',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=200&fit=crop',
      progress: 65,
      lastPlayed: '2 hours ago',
      hoursPlayed: 45,
      status: 'installed',
      size: '70.3 GB',
      achievements: { earned: 12, total: 44 }
    },
    {
      id: 2,
      title: 'The Witcher 3',
      genre: 'RPG',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=200&fit=crop',
      progress: 100,
      lastPlayed: '1 day ago',
      hoursPlayed: 150,
      status: 'installed',
      size: '35.7 GB',
      achievements: { earned: 78, total: 78 }
    },
    {
      id: 3,
      title: 'Call of Duty: Modern Warfare',
      genre: 'FPS',
      image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=200&fit=crop',
      progress: 30,
      lastPlayed: '3 days ago',
      hoursPlayed: 25,
      status: 'not-installed',
      size: '231.0 GB',
      achievements: { earned: 8, total: 50 }
    },
    {
      id: 4,
      title: 'Minecraft',
      genre: 'Sandbox',
      image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=200&fit=crop',
      progress: 0,
      lastPlayed: '1 week ago',
      hoursPlayed: 200,
      status: 'updating',
      size: '1.2 GB',
      achievements: { earned: 45, total: 100 }
    },
    {
      id: 5,
      title: 'Grand Theft Auto V',
      genre: 'Action',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=200&fit=crop',
      progress: 85,
      lastPlayed: '5 days ago',
      hoursPlayed: 120,
      status: 'installed',
      size: '95.2 GB',
      achievements: { earned: 42, total: 78 }
    },
    {
      id: 6,
      title: 'Fortnite',
      genre: 'Battle Royale',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=200&fit=crop',
      progress: 0,
      lastPlayed: '2 weeks ago',
      hoursPlayed: 80,
      status: 'installed',
      size: '26.4 GB',
      achievements: { earned: 15, total: 30 }
    }
  ];

  collections: GameCollection[] = [
    {
      name: 'Recently Played',
      games: [],
      icon: 'pi pi-clock'
    },
    {
      name: 'Favorites',
      games: [],
      icon: 'pi pi-heart'
    },
    {
      name: 'Completed',
      games: [],
      icon: 'pi pi-check-circle'
    }
  ];

  filteredGames: Game[] = [];
  searchTerm: string = '';
  selectedFilter: string = 'all';
  selectedSort: string = 'recent';
  viewMode: 'grid' | 'list' = 'grid';

  filterOptions = [
    { label: 'All Games', value: 'all' },
    { label: 'Installed', value: 'installed' },
    { label: 'Not Installed', value: 'not-installed' },
    { label: 'Updating', value: 'updating' }
  ];

  sortOptions = [
    { label: 'Recently Played', value: 'recent' },
    { label: 'Name (A-Z)', value: 'name-asc' },
    { label: 'Name (Z-A)', value: 'name-desc' },
    { label: 'Hours Played', value: 'hours' }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.filterGames();
    this.initializeCollections();
  }

  initializeCollections() {
    this.collections[0].games = this.games.filter(g =>
      ['2 hours ago', '1 day ago', '3 days ago'].includes(g.lastPlayed)
    );
    this.collections[1].games = this.games.slice(0, 3); // Mock favorites
    this.collections[2].games = this.games.filter(g => g.progress === 100);
  }

  filterGames() {
    let filtered = [...this.games];

    // Apply search filter
    if (this.searchTerm) {
      filtered = filtered.filter(game =>
        game.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        game.genre.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (this.selectedFilter !== 'all') {
      filtered = filtered.filter(game => game.status === this.selectedFilter);
    }

    // Apply sort
    filtered.sort((a, b) => {
      switch (this.selectedSort) {
        case 'name-asc':
          return a.title.localeCompare(b.title);
        case 'name-desc':
          return b.title.localeCompare(a.title);
        case 'hours':
          return b.hoursPlayed - a.hoursPlayed;
        case 'recent':
        default:
          return this.getLastPlayedValue(a.lastPlayed) - this.getLastPlayedValue(b.lastPlayed);
      }
    });

    this.filteredGames = filtered;
  }

  getLastPlayedValue(lastPlayed: string): number {
    if (lastPlayed.includes('hours ago')) return 1;
    if (lastPlayed.includes('day ago')) return 2;
    if (lastPlayed.includes('days ago')) return 3;
    if (lastPlayed.includes('week ago')) return 7;
    if (lastPlayed.includes('weeks ago')) return 14;
    return 30;
  }

  onSearchChange() {
    this.filterGames();
  }

  onFilterChange() {
    this.filterGames();
  }

  onSortChange() {
    this.filterGames();
  }

  playGame(game: Game) {
    if (game.status === 'installed') {
      console.log(`Playing ${game.title}`);
      // Aquí iría la lógica para lanzar el juego
    } else if (game.status === 'not-installed') {
      this.installGame(game);
    }
  }

  installGame(game: Game) {
    console.log(`Installing ${game.title}`);
    game.status = 'updating';
    // Aquí iría la lógica para instalar el juego
    setTimeout(() => {
      game.status = 'installed';
    }, 3000);
  }

  uninstallGame(game: Game) {
    console.log(`Uninstalling ${game.title}`);
    game.status = 'not-installed';
    // Aquí iría la lógica para desinstalar el juego
  }

  viewGameDetails(gameId: number) {
    this.router.navigate(['/game', gameId]);
  }

  toggleViewMode() {
    this.viewMode = this.viewMode === 'grid' ? 'list' : 'grid';
  }

  getProgressColor(progress: number): string {
    if (progress === 100) return 'var(--green-500)';
    if (progress >= 50) return 'var(--blue-500)';
    return 'var(--orange-500)';
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'installed': return 'pi pi-check-circle';
      case 'not-installed': return 'pi pi-download';
      case 'updating': return 'pi pi-spinner pi-spin';
      default: return 'pi pi-question-circle';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'installed': return 'Installed';
      case 'not-installed': return 'Not Installed';
      case 'updating': return 'Updating...';
      default: return 'Unknown';
    }
  }
}
