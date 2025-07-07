import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  searchQuery = '';
  showUserMenu = false;

  constructor(private router: Router) {}

  search(): void {
    if (this.searchQuery.trim()) {
      // Implementar búsqueda
      console.log('Searching for:', this.searchQuery);
    }
  }

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
  }

  navigate(route: string): void {
    this.router.navigate([route]);
  }
}
