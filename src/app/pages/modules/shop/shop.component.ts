import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Game {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  description: string;
  rating: number;
  reviews: number;
  tags: string[];
  isOnSale?: boolean;
  isFree?: boolean;
  releaseDate: string;
  publisher: string;
  platforms: string[];
}

interface GameCategory {
  id: string;
  name: string;
  icon: string;
  games: Game[];
}

@Component({
  selector: 'app-shop',
  standalone: false,
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit {
  searchQuery: string = '';
  selectedCategory: string = 'all';
  selectedPriceRange: string = 'all';
  selectedPlatform: string = 'all';
  sortBy: string = 'popular';

  priceRanges = [
    { label: 'All Prices', value: 'all' },
    { label: 'Free', value: 'free' },
    { label: 'Under $20', value: 'under20' },
    { label: '$20 - $40', value: '20-40' },
    { label: '$40 - $60', value: '40-60' },
    { label: 'Over $60', value: 'over60' }
  ];

  platforms = [
    { label: 'All Platforms', value: 'all' },
    { label: 'Windows', value: 'windows' },
    { label: 'Mac', value: 'mac' },
    { label: 'Linux', value: 'linux' }
  ];

  sortOptions = [
    { label: 'Most Popular', value: 'popular' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Newest', value: 'newest' },
    { label: 'Best Rated', value: 'rating' }
  ];

  categories: GameCategory[] = [
    {
      id: 'featured',
      name: 'Featured Games',
      icon: 'pi-star',
      games: [
        {
          id: 1,
          title: "Baldur's Gate 3",
          price: 59.99,
          image: '/assets/images/games/baldurs-gate-3.jpg',
          description: 'An epic RPG adventure with turn-based combat and deep storytelling.',
          rating: 4.8,
          reviews: 15420,
          tags: ['RPG', 'Strategy', 'Adventure'],
          releaseDate: '2023-08-03',
          publisher: 'Larian Studios',
          platforms: ['windows', 'mac', 'linux']
        },
        {
          id: 2,
          title: "Horizon Call of the Mountain",
          price: 69.99,
          image: '/assets/images/games/horizon-call.jpg',
          description: 'Experience the world of Horizon like never before in VR.',
          rating: 4.6,
          reviews: 8934,
          tags: ['VR', 'Action', 'Adventure'],
          releaseDate: '2023-02-22',
          publisher: 'Sony Interactive',
          platforms: ['windows']
        }
      ]
    },
    {
      id: 'action',
      name: 'Action Games',
      icon: 'pi-bolt',
      games: [
        {
          id: 3,
          title: "Street Fighter 6",
          price: 49.99,
          originalPrice: 59.99,
          discount: 17,
          image: '/assets/images/games/street-fighter-6.jpg',
          description: 'The legendary fighting game returns with new mechanics and fighters.',
          rating: 4.7,
          reviews: 12456,
          tags: ['Fighting', 'Multiplayer', 'Action'],
          isOnSale: true,
          releaseDate: '2023-06-02',
          publisher: 'Capcom',
          platforms: ['windows', 'mac']
        },
        {
          id: 4,
          title: "Marvel's Spider-Man 2",
          price: 89.99,
          image: '/assets/images/games/spiderman-2.jpg',
          description: 'Swing through New York as both Peter Parker and Miles Morales.',
          rating: 4.9,
          reviews: 21543,
          tags: ['Action', 'Adventure', 'Superhero'],
          releaseDate: '2023-10-20',
          publisher: 'Sony Interactive',
          platforms: ['windows']
        }
      ]
    },
    {
      id: 'free',
      name: 'Free to Play',
      icon: 'pi-gift',
      games: [
        {
          id: 5,
          title: "Fortnite",
          price: 0,
          image: '/assets/images/games/fortnite.jpg',
          description: 'Battle royale game with building mechanics and constant updates.',
          rating: 4.2,
          reviews: 89234,
          tags: ['Battle Royale', 'Free to Play', 'Shooter'],
          isFree: true,
          releaseDate: '2017-07-25',
          publisher: 'Epic Games',
          platforms: ['windows', 'mac']
        },
        {
          id: 6,
          title: "Diablo IV",
          price: 0,
          image: '/assets/images/games/diablo-4.jpg',
          description: 'Free trial version of the acclaimed action RPG.',
          rating: 4.4,
          reviews: 34567,
          tags: ['RPG', 'Action', 'Free Trial'],
          isFree: true,
          releaseDate: '2023-06-06',
          publisher: 'Blizzard Entertainment',
          platforms: ['windows', 'mac']
        }
      ]
    }
  ];

  filteredGames: Game[] = [];
  allGames: Game[] = [];
  loading: boolean = false;
  cartItems: number = 0;
  categoriesDropdownSafe: { label: string; value: string }[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadCategoriesDropdownSafe();
    this.loadGames();
  }

  loadCategoriesDropdownSafe(): void {
    this.categoriesDropdownSafe = [
      { label: 'All Categories', value: 'all' },
      ...this.categories.map((c) => ({ label: c.name, value: c.id }))
    ];
  }

  getPlatformIconClass(platform: string): string {
    switch (platform) {
      case 'windows': return 'pi pi-microsoft';
      case 'mac': return 'pi pi-apple';
      case 'linux': return 'pi pi-linux';
      default: return 'pi pi-desktop';
    }
  }

  loadGames(): void {
    this.loading = true;
    // Simular carga de datos
    setTimeout(() => {
      this.allGames = this.categories.flatMap(category => category.games);
      this.applyFilters();
      this.loading = false;
    }, 1000);
  }

  applyFilters(): void {
    let filtered = [...this.allGames];

    // Filtrar por búsqueda
    if (this.searchQuery) {
      filtered = filtered.filter(game =>
        game.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        game.tags.some(tag => tag.toLowerCase().includes(this.searchQuery.toLowerCase()))
      );
    }

    // Filtrar por categoría
    if (this.selectedCategory !== 'all') {
      const category = this.categories.find(c => c.id === this.selectedCategory);
      if (category) {
        filtered = filtered.filter(game => category.games.some(g => g.id === game.id));
      }
    }

    // Filtrar por rango de precio
    if (this.selectedPriceRange !== 'all') {
      switch (this.selectedPriceRange) {
        case 'free':
          filtered = filtered.filter(game => game.price === 0);
          break;
        case 'under20':
          filtered = filtered.filter(game => game.price < 20);
          break;
        case '20-40':
          filtered = filtered.filter(game => game.price >= 20 && game.price <= 40);
          break;
        case '40-60':
          filtered = filtered.filter(game => game.price >= 40 && game.price <= 60);
          break;
        case 'over60':
          filtered = filtered.filter(game => game.price > 60);
          break;
      }
    }

    // Filtrar por plataforma
    if (this.selectedPlatform !== 'all') {
      filtered = filtered.filter(game =>
        game.platforms.includes(this.selectedPlatform)
      );
    }

    // Ordenar
    switch (this.sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
        break;
      default:
        filtered.sort((a, b) => b.reviews - a.reviews);
    }

    this.filteredGames = filtered;
  }

  onSearch(): void {
    this.applyFilters();
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  viewGameDetails(gameId: number): void {
    this.router.navigate(['/game', gameId]);
  }

  addToCart(game: Game): void {
    // Implementar lógica de carrito
    this.cartItems++;
    console.log(`Added ${game.title} to cart`);
  }

  addToWishlist(game: Game): void {
    // Implementar lógica de lista de deseos
    console.log(`Added ${game.title} to wishlist`);
  }

  buyNow(game: Game): void {
    // Implementar lógica de compra directa
    console.log(`Buying ${game.title} now`);
  }

  getDiscountedPrice(game: Game): number {
    if (game.discount && game.originalPrice) {
      return game.originalPrice - (game.originalPrice * game.discount / 100);
    }
    return game.price;
  }

  formatPrice(price: number): string {
    return price === 0 ? 'Free' : `$${price.toFixed(2)}`;
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.selectedCategory = 'all';
    this.selectedPriceRange = 'all';
    this.selectedPlatform = 'all';
    this.sortBy = 'popular';
    this.applyFilters();
  }
}
