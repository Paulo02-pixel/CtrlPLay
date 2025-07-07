import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  publishDate: Date;
  likes: number;
  comments: number;
  tags: string[];
  featured?: boolean;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  date: Date;
  time: string;
  location: string;
  image: string;
  category: string;
}

export interface Category {
  name: string;
  value: string;
}

@Component({
  selector: 'app-news',
  standalone: false,
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent implements OnInit {
  // News data
  allNews: NewsArticle[] = [];
  filteredNews: NewsArticle[] = [];
  featuredNews: NewsArticle | null = null;
  trendingNews: NewsArticle[] = [];
  upcomingEvents: Event[] = [];

  // Filter and search
  selectedCategory: string = 'all';
  searchQuery: string = '';
  categories: Category[] = [
    { name: 'All', value: 'all' },
    { name: 'Gaming', value: 'gaming' },
    { name: 'Esports', value: 'esports' },
    { name: 'Reviews', value: 'reviews' },
    { name: 'Industry', value: 'industry' },
    { name: 'Updates', value: 'updates' }
  ];

  // Pagination
  currentPage: number = 1;
  pageSize: number = 12;
  hasMoreNews: boolean = true;
  loadingMore: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadNewsData();
    this.loadEventsData();
  }

  private loadNewsData(): void {
    // Simulated news data - replace with actual API calls
    this.allNews = [
      {
        id: 1,
        title: 'Major Gaming Conference Announces Revolutionary VR Technology',
        excerpt: 'The latest breakthrough in virtual reality promises to transform the gaming experience with unprecedented immersion and realism.',
        content: 'Full article content here...',
        image: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=800&h=600&fit=crop',
        category: 'gaming',
        author: 'Sarah Johnson',
        publishDate: new Date('2024-01-15'),
        likes: 245,
        comments: 32,
        tags: ['VR', 'Technology', 'Gaming'],
        featured: true
      },
      {
        id: 2,
        title: 'Esports Tournament Breaks Viewership Records',
        excerpt: 'The championship finals attracted over 50 million viewers worldwide, setting new standards for competitive gaming.',
        content: 'Full article content here...',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop',
        category: 'esports',
        author: 'Mike Chen',
        publishDate: new Date('2024-01-14'),
        likes: 189,
        comments: 45,
        tags: ['Esports', 'Tournament', 'Gaming']
      },
      {
        id: 3,
        title: 'Indie Game Studios Rise to Prominence',
        excerpt: 'Small development teams are creating some of the most innovative and beloved games in recent years.',
        content: 'Full article content here...',
        image: 'https://images.unsplash.com/photo-1556438064-2d7646166914?w=800&h=600&fit=crop',
        category: 'industry',
        author: 'Emma Wilson',
        publishDate: new Date('2024-01-13'),
        likes: 156,
        comments: 28,
        tags: ['Indie', 'Gaming', 'Development']
      },
      {
        id: 4,
        title: 'Latest Game Update Introduces New Features',
        excerpt: 'Players can now enjoy enhanced graphics, new characters, and improved gameplay mechanics.',
        content: 'Full article content here...',
        image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop',
        category: 'updates',
        author: 'David Brown',
        publishDate: new Date('2024-01-12'),
        likes: 203,
        comments: 67,
        tags: ['Update', 'Gaming', 'Features']
      },
      {
        id: 5,
        title: 'Gaming Hardware Review: Next-Gen Consoles',
        excerpt: 'An in-depth look at the latest gaming consoles and their performance capabilities.',
        content: 'Full article content here...',
        image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&h=600&fit=crop',
        category: 'reviews',
        author: 'Lisa Garcia',
        publishDate: new Date('2024-01-11'),
        likes: 178,
        comments: 41,
        tags: ['Review', 'Hardware', 'Console']
      },
      {
        id: 6,
        title: 'Mobile Gaming Market Continues to Grow',
        excerpt: 'Mobile games now account for over 50% of global gaming revenue, reshaping the industry.',
        content: 'Full article content here...',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
        category: 'industry',
        author: 'Tom Anderson',
        publishDate: new Date('2024-01-10'),
        likes: 134,
        comments: 23,
        tags: ['Mobile', 'Gaming', 'Market']
      }
    ];

    this.featuredNews = this.allNews.find(news => news.featured) || this.allNews[0];
    this.trendingNews = this.allNews.slice(1, 4);
    this.filteredNews = this.allNews;
  }

  private loadEventsData(): void {
    // Simulated events data - replace with actual API calls
    this.upcomingEvents = [
      {
        id: 1,
        title: 'Gaming Expo 2024',
        description: 'The biggest gaming convention of the year featuring the latest games and technology.',
        date: new Date('2024-03-15'),
        time: '10:00 AM - 6:00 PM',
        location: 'Convention Center',
        image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=300&fit=crop',
        category: 'expo'
      },
      {
        id: 2,
        title: 'Esports Championship Finals',
        description: 'Watch the best teams compete for the ultimate prize in competitive gaming.',
        date: new Date('2024-02-28'),
        time: '7:00 PM - 11:00 PM',
        location: 'Arena Stadium',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
        category: 'esports'
      },
      {
        id: 3,
        title: 'Indie Game Showcase',
        description: 'Discover innovative games from independent developers around the world.',
        date: new Date('2024-04-10'),
        time: '2:00 PM - 8:00 PM',
        location: 'Tech Hub',
        image: 'https://images.unsplash.com/photo-1556438064-2d7646166914?w=400&h=300&fit=crop',
        category: 'showcase'
      }
    ];
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.applyFilters();
  }

  searchNews(): void {
    this.applyFilters();
  }

  private applyFilters(): void {
    let filtered = this.allNews;

    // Apply category filter
    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(news => news.category === this.selectedCategory);
    }

    // Apply search filter
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(news =>
        news.title.toLowerCase().includes(query) ||
        news.excerpt.toLowerCase().includes(query) ||
        news.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    this.filteredNews = filtered;
  }

  loadMoreNews(): void {
    this.loadingMore = true;

    // Simulate API call delay
    setTimeout(() => {
      // In real implementation, load more news from API
      this.loadingMore = false;
      this.hasMoreNews = false; // Disable if no more news
    }, 2000);
  }

  readArticle(articleId: number): void {
    this.router.navigate(['/news', articleId]);
  }

  viewEvent(eventId: number): void {
    this.router.navigate(['/events', eventId]);
  }

  subscribeNewsletter(): void {
    // Implement newsletter subscription logic
    console.log('Newsletter subscription requested');
  }
}
