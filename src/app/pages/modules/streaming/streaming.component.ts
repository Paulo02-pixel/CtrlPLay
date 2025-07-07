import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface StreamCategory {
  id: string;
  name: string;
  icon: string;
  count: number;
}

interface StreamChannel {
  id: string;
  title: string;
  streamer: string;
  game: string;
  viewers: number;
  thumbnail: string;
  avatar: string;
  isLive: boolean;
  category: string;
}

interface FeaturedStream {
  id: string;
  title: string;
  streamer: string;
  game: string;
  viewers: number;
  thumbnail: string;
  avatar: string;
  description: string;
}

@Component({
  selector: 'app-streaming',
  standalone: false,
  templateUrl: './streaming.component.html',
  styleUrl: './streaming.component.css'
})
export class StreamingComponent implements OnInit {

  searchTerm: string = '';
  selectedCategory: string = 'all';

  streamCategories: StreamCategory[] = [
    { id: 'all', name: 'All', icon: 'pi-th-large', count: 245 },
    { id: 'gaming', name: 'Gaming', icon: 'pi-gamepad-2', count: 150 },
    { id: 'music', name: 'Music', icon: 'pi-volume-up', count: 45 },
    { id: 'art', name: 'Art & Creative', icon: 'pi-palette', count: 25 },
    { id: 'talk', name: 'Talk Shows', icon: 'pi-microphone', count: 15 },
    { id: 'sports', name: 'Sports', icon: 'pi-trophy', count: 10 }
  ];

  featuredStream: FeaturedStream = {
    id: '1',
    title: 'World Championship Finals - Epic Battle!',
    streamer: 'ProGamer2024',
    game: 'League of Legends',
    viewers: 125000,
    thumbnail: 'https://via.placeholder.com/800x400/1a1a2e/ffffff?text=Featured+Stream',
    avatar: 'https://via.placeholder.com/50x50/4a90e2/ffffff?text=PG',
    description: 'Watch the most anticipated finals of the year! Two legendary teams clash in an epic showdown.'
  };

  liveStreams: StreamChannel[] = [
    {
      id: '1',
      title: 'Speedrun Challenge - New World Record Attempt',
      streamer: 'SpeedMaster',
      game: 'Super Mario Bros',
      viewers: 15420,
      thumbnail: 'https://via.placeholder.com/300x200/ff6b6b/ffffff?text=Mario+Speedrun',
      avatar: 'https://via.placeholder.com/40x40/ff6b6b/ffffff?text=SM',
      isLive: true,
      category: 'gaming'
    },
    {
      id: '2',
      title: 'Chill Music Session - Lo-Fi Beats',
      streamer: 'MusicVibes',
      game: 'Music',
      viewers: 8750,
      thumbnail: 'https://via.placeholder.com/300x200/4ecdc4/ffffff?text=Lo-Fi+Music',
      avatar: 'https://via.placeholder.com/40x40/4ecdc4/ffffff?text=MV',
      isLive: true,
      category: 'music'
    },
    {
      id: '3',
      title: 'Digital Art Creation - Fantasy Character',
      streamer: 'ArtistPro',
      game: 'Photoshop',
      viewers: 3200,
      thumbnail: 'https://via.placeholder.com/300x200/45b7d1/ffffff?text=Digital+Art',
      avatar: 'https://via.placeholder.com/40x40/45b7d1/ffffff?text=AP',
      isLive: true,
      category: 'art'
    },
    {
      id: '4',
      title: 'Fortnite Victory Royale Hunt',
      streamer: 'BattleKing',
      game: 'Fortnite',
      viewers: 22100,
      thumbnail: 'https://via.placeholder.com/300x200/f7b731/ffffff?text=Fortnite',
      avatar: 'https://via.placeholder.com/40x40/f7b731/ffffff?text=BK',
      isLive: true,
      category: 'gaming'
    },
    {
      id: '5',
      title: 'Minecraft City Building Project',
      streamer: 'BuilderMaster',
      game: 'Minecraft',
      viewers: 5600,
      thumbnail: 'https://via.placeholder.com/300x200/5f27cd/ffffff?text=Minecraft',
      avatar: 'https://via.placeholder.com/40x40/5f27cd/ffffff?text=BM',
      isLive: true,
      category: 'gaming'
    },
    {
      id: '6',
      title: 'Talk About Gaming Industry',
      streamer: 'GameTalkShow',
      game: 'Talk Show',
      viewers: 1800,
      thumbnail: 'https://via.placeholder.com/300x200/fd79a8/ffffff?text=Talk+Show',
      avatar: 'https://via.placeholder.com/40x40/fd79a8/ffffff?text=GT',
      isLive: true,
      category: 'talk'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onSearch(): void {
    console.log('Searching for:', this.searchTerm);
    // Implement search logic here
  }

  selectCategory(categoryId: string): void {
    this.selectedCategory = categoryId;
    console.log('Selected category:', categoryId);
    // Implement category filtering logic here
  }

  watchStream(streamId: string): void {
    console.log('Watching stream:', streamId);
    this.router.navigate(['/streaming', streamId]);
  }

  followStreamer(streamerId: string): void {
    console.log('Following streamer:', streamerId);
    // Implement follow logic here
  }

  formatViewers(viewers: number): string {
    if (viewers >= 1000000) {
      return (viewers / 1000000).toFixed(1) + 'M';
    } else if (viewers >= 1000) {
      return (viewers / 1000).toFixed(1) + 'K';
    }
    return viewers.toString();
  }

  getFilteredStreams(): StreamChannel[] {
    let filtered = this.liveStreams;

    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(stream => stream.category === this.selectedCategory);
    }

    if (this.searchTerm) {
      filtered = filtered.filter(stream =>
        stream.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        stream.streamer.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        stream.game.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    return filtered;
  }
}
