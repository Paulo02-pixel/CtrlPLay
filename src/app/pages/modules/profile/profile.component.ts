import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface UserProfile {
  id: string;
  username: string;
  email: string;
  avatar: string;
  joinDate: Date;
  gamesOwned: number;
  hoursPlayed: number;
  achievements: number;
  friends: number;
  level: number;
  experiencePoints: number;
  favoriteGenres: string[];
  recentGames: RecentGame[];
  achievements_list: Achievement[];
  friends_list: Friend[];
}

interface RecentGame {
  id: string;
  name: string;
  image: string;
  hoursPlayed: number;
  lastPlayed: Date;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedDate: Date;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface Friend {
  id: string;
  username: string;
  avatar: string;
  status: 'online' | 'offline' | 'away' | 'busy';
  currentGame?: string;
}

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  userProfile: UserProfile = {
    id: '1',
    username: 'paulo_quincho',
    email: 'paulo_quincho@example.com',
    avatar: 'https://via.placeholder.com/150',
    joinDate: new Date('2020-01-15'),
    gamesOwned: 127,
    hoursPlayed: 1250,
    achievements: 89,
    friends: 45,
    level: 23,
    experiencePoints: 15750,
    favoriteGenres: ['Action', 'RPG', 'Strategy'],
    recentGames: [
      {
        id: '1',
        name: 'Baldur\'s Gate 3',
        image: 'https://via.placeholder.com/100x60',
        hoursPlayed: 85,
        lastPlayed: new Date('2024-01-20')
      },
      {
        id: '2',
        name: 'Horizon Call of the Mountain',
        image: 'https://via.placeholder.com/100x60',
        hoursPlayed: 45,
        lastPlayed: new Date('2024-01-18')
      },
      {
        id: '3',
        name: 'Street Fighter 6',
        image: 'https://via.placeholder.com/100x60',
        hoursPlayed: 120,
        lastPlayed: new Date('2024-01-15')
      }
    ],
    achievements_list: [
      {
        id: '1',
        name: 'First Victory',
        description: 'Win your first match',
        icon: 'pi pi-trophy',
        unlockedDate: new Date('2024-01-10'),
        rarity: 'common'
      },
      {
        id: '2',
        name: 'Speed Runner',
        description: 'Complete a game in under 2 hours',
        icon: 'pi pi-clock',
        unlockedDate: new Date('2024-01-15'),
        rarity: 'epic'
      },
      {
        id: '3',
        name: 'Collector',
        description: 'Own 100+ games',
        icon: 'pi pi-star',
        unlockedDate: new Date('2024-01-20'),
        rarity: 'legendary'
      }
    ],
    friends_list: [
      {
        id: '1',
        username: 'PlayerOne',
        avatar: 'https://via.placeholder.com/40',
        status: 'online',
        currentGame: 'Fortnite'
      },
      {
        id: '2',
        username: 'GamerGirl',
        avatar: 'https://via.placeholder.com/40',
        status: 'away'
      },
      {
        id: '3',
        username: 'ProGamer',
        avatar: 'https://via.placeholder.com/40',
        status: 'offline'
      }
    ]
  };

  activeTab: string = 'overview';
  isEditing: boolean = false;
  editForm: any = {};

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    // Aquí conectarías con tu servicio backend
    console.log('Loading user profile...');
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  startEditing(): void {
    this.isEditing = true;
    this.editForm = {
      username: this.userProfile.username,
      email: this.userProfile.email,
      favoriteGenres: [...this.userProfile.favoriteGenres]
    };
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editForm = {};
  }

  saveProfile(): void {
    // Aquí conectarías con tu servicio backend para guardar los cambios
    this.userProfile.username = this.editForm.username;
    this.userProfile.email = this.editForm.email;
    this.userProfile.favoriteGenres = this.editForm.favoriteGenres;
    this.isEditing = false;
    console.log('Profile saved:', this.userProfile);
  }

  viewGame(gameId: string): void {
    this.router.navigate(['/game', gameId]);
  }

  viewFriend(friendId: string): void {
    this.router.navigate(['/profile', friendId]);
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'online': return '#4CAF50';
      case 'away': return '#FF9800';
      case 'busy': return '#F44336';
      default: return '#9E9E9E';
    }
  }

  getRarityColor(rarity: string): string {
    switch (rarity) {
      case 'common': return '#9E9E9E';
      case 'rare': return '#2196F3';
      case 'epic': return '#9C27B0';
      case 'legendary': return '#FF9800';
      default: return '#9E9E9E';
    }
  }

  getExperiencePercentage(): number {
    const currentLevelXP = this.userProfile.level * 1000;
    const nextLevelXP = (this.userProfile.level + 1) * 1000;
    const progress = (this.userProfile.experiencePoints - currentLevelXP) / (nextLevelXP - currentLevelXP);
    return Math.min(Math.max(progress * 100, 0), 100);
  }
}
