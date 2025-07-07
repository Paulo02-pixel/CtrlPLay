import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Game {
  id: number;
  title: string;
  image: string;
  genre?: string;
  price?: number;
  originalPrice?: number;
  discount?: number;
  rating?: number;
  platforms: string[];
  isHot?: boolean;
  isFree?: boolean;
}

interface Genre {
  id: string;
  name: string;
  icon: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  quickGames: Game[] = [
    {
      id: 1,
      title: "Baldur's Gate 3",
      image: "https://via.placeholder.com/150x80/1e3a8a/ffffff?text=BG3",
      genre: "RPG",
      platforms: ['pc']
    },
    {
      id: 2,
      title: "The Sims 4",
      image: "https://via.placeholder.com/150x80/10b981/ffffff?text=Sims4",
      genre: "Simulation",
      platforms: ['pc']
    },
    {
      id: 3,
      title: "Seasons",
      image: "https://via.placeholder.com/150x80/f59e0b/ffffff?text=Seasons",
      genre: "Adventure",
      platforms: ['pc']
    },
    {
      id: 4,
      title: "The Legend of Zelda",
      image: "https://via.placeholder.com/150x80/8b5cf6/ffffff?text=Zelda",
      genre: "Adventure",
      platforms: ['pc']
    }
  ];

  hotGames: Game[] = [
    {
      id: 5,
      title: "Horizon: Call of the Mountain",
      image: "https://via.placeholder.com/250x140/ef4444/ffffff?text=Horizon",
      price: 69,
      rating: 4.8,
      platforms: ['pc', 'mobile'],
      isHot: true
    },
    {
      id: 6,
      title: "StarField",
      image: "https://via.placeholder.com/250x140/3b82f6/ffffff?text=StarField",
      price: 89,
      rating: 4.6,
      platforms: ['pc'],
      isHot: true
    },
    {
      id: 7,
      title: "Marvel's Spider-Man 2",
      image: "https://via.placeholder.com/250x140/dc2626/ffffff?text=SpiderMan",
      price: 59,
      originalPrice: 79,
      discount: 25,
      rating: 4.9,
      platforms: ['pc'],
      isHot: true
    }
  ];

  freeGames: Game[] = [
    {
      id: 8,
      title: "Street Fighter 6",
      image: "https://via.placeholder.com/200x120/f97316/ffffff?text=SF6",
      platforms: ['pc', 'mobile'],
      isFree: true
    },
    {
      id: 9,
      title: "Diablo IV",
      image: "https://via.placeholder.com/200x120/991b1b/ffffff?text=Diablo",
      platforms: ['pc'],
      isFree: true
    },
    {
      id: 10,
      title: "Fortnite",
      image: "https://via.placeholder.com/200x120/0ea5e9/ffffff?text=Fortnite",
      platforms: ['pc', 'mobile'],
      isFree: true
    },
    {
      id: 11,
      title: "Final Fantasy XVI",
      image: "https://via.placeholder.com/200x120/7c3aed/ffffff?text=FFXVI",
      platforms: ['pc'],
      isFree: true
    },
    {
      id: 12,
      title: "APEX Legends",
      image: "https://via.placeholder.com/200x120/059669/ffffff?text=APEX",
      platforms: ['pc', 'mobile'],
      isFree: true
    },
    {
      id: 13,
      title: "Cyberpunk 2077",
      image: "https://via.placeholder.com/200x120/facc15/ffffff?text=Cyber",
      platforms: ['pc'],
      isFree: true
    }
  ];

  genres: Genre[] = [
    { id: 'adventure', name: 'Adventure', icon: 'pi pi-compass' },
    { id: 'fighting', name: 'Fighting', icon: 'pi pi-shield' },
    { id: 'puzzle', name: 'Puzzle', icon: 'pi pi-th-large' },
    { id: 'racing', name: 'Racing', icon: 'pi pi-car' },
    { id: 'role-playing', name: 'Role-Playing', icon: 'pi pi-users' },
    { id: 'strategy', name: 'Strategy', icon: 'pi pi-sitemap' },
    { id: 'sports', name: 'Sports', icon: 'pi pi-globe' },
    { id: 'simulation', name: 'Simulation', icon: 'pi pi-cog' }
  ];

  selectedGenre: string = 'adventure';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  preOrderGame(): void {
    // Navegar a la página de pre-orden o mostrar modal
    console.log('Pre-order game');
  }

  playTrailer(): void {
    // Abrir modal de trailer o navegar a página de trailer
    console.log('Play trailer');
  }

  viewGameDetail(gameId: number): void {
    // Navegación corregida para usar la nueva ruta
    this.router.navigate(['/ctrlplay/game', gameId]);
  }

  selectGenre(genreId: string): void {
    this.selectedGenre = genreId;
    // Aquí puedes implementar la lógica para filtrar juegos por género
    console.log('Selected genre:', genreId);
  }

  navigateToSection(section: string): void {
    switch(section) {
      case 'hot':
        this.router.navigate(['/ctrlplay/games'], { queryParams: { category: 'hot' } });
        break;
      case 'free':
        this.router.navigate(['/ctrlplay/games'], { queryParams: { category: 'free' } });
        break;
      default:
        this.router.navigate(['/ctrlplay/games']);
    }
  }
}
