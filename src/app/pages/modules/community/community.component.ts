import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-community',
  standalone: false,
  templateUrl: './community.component.html',
  styleUrl: './community.component.css'
})
export class CommunityComponent implements OnInit {
  selectedFilter = 'all';

  // Datos de ejemplo para la comunidad
  featuredGroups = [
    {
      id: 1,
      name: 'RPG Masters',
      description: 'Discussion about RPG games and strategies',
      members: 15420,
      image: 'assets/images/groups/rpg-masters.jpg',
      isJoined: true
    },
    {
      id: 2,
      name: 'FPS Champions',
      description: 'Competitive FPS gaming community',
      members: 8930,
      image: 'assets/images/groups/fps-champions.jpg',
      isJoined: false
    },
    {
      id: 3,
      name: 'Indie Game Lovers',
      description: 'Discovering amazing indie games together',
      members: 12050,
      image: 'assets/images/groups/indie-lovers.jpg',
      isJoined: true
    },
    {
      id: 4,
      name: 'Speedrun Community',
      description: 'Share your best speedrun times',
      members: 6780,
      image: 'assets/images/groups/speedrun.jpg',
      isJoined: false
    }
  ];

  recentPosts = [
    {
      id: 1,
      author: 'GameMaster23',
      avatar: 'assets/images/avatars/user1.jpg',
      group: 'RPG Masters',
      title: 'Best RPG of 2024 - What\'s your pick?',
      content: 'I\'ve been playing through some amazing RPGs this year. What has been your favorite so far?',
      timestamp: '2 hours ago',
      likes: 45,
      comments: 12,
      isLiked: false
    },
    {
      id: 2,
      author: 'SpeedDemon',
      avatar: 'assets/images/avatars/user2.jpg',
      group: 'Speedrun Community',
      title: 'New personal record on Celeste!',
      content: 'Just beat my previous time by 3 seconds! The grind continues...',
      timestamp: '4 hours ago',
      likes: 23,
      comments: 8,
      isLiked: true
    },
    {
      id: 3,
      author: 'IndieExplorer',
      avatar: 'assets/images/avatars/user3.jpg',
      group: 'Indie Game Lovers',
      title: 'Hidden gem alert: Moonstone Island',
      content: 'Found this amazing indie game that combines life sim with creature collection. Highly recommend!',
      timestamp: '6 hours ago',
      likes: 67,
      comments: 15,
      isLiked: false
    }
  ];

  onlineUsers = [
    { id: 1, name: 'AlexGamer', avatar: 'assets/images/avatars/user4.jpg', status: 'Playing Baldur\'s Gate 3' },
    { id: 2, name: 'Sarah_RPG', avatar: 'assets/images/avatars/user5.jpg', status: 'Streaming Diablo IV' },
    { id: 3, name: 'ProGamer99', avatar: 'assets/images/avatars/user6.jpg', status: 'Online' },
    { id: 4, name: 'CasualPlayer', avatar: 'assets/images/avatars/user7.jpg', status: 'Away' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  joinGroup(groupId: number): void {
    const group = this.featuredGroups.find(g => g.id === groupId);
    if (group) {
      group.isJoined = !group.isJoined;
      if (group.isJoined) {
        group.members++;
      } else {
        group.members--;
      }
    }
  }

  likePost(postId: number): void {
    const post = this.recentPosts.find(p => p.id === postId);
    if (post) {
      post.isLiked = !post.isLiked;
      if (post.isLiked) {
        post.likes++;
      } else {
        post.likes--;
      }
    }
  }

  createPost(): void {
    // Lógica para crear un nuevo post
    console.log('Creating new post...');
  }

  viewGroup(groupId: number): void {
    // Navegar a la página del grupo
    console.log('Viewing group:', groupId);
  }

  viewProfile(userId: number): void {
    // Navegar al perfil del usuario
    console.log('Viewing profile:', userId);
  }
}
