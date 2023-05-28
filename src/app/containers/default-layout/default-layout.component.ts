import { Component, OnInit } from '@angular/core';
import { navItems } from './_nav';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { AuthenticationService } from '../../core/services/authentication.service';

const NAV_ITEMS_KEY = 'navItems'; // Key for storing navItems in local storage

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent implements OnInit {
  public navItems = [];

  public role: string;
  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };
  private roleSubs: Subscription;

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
    // @ts-ignore
    this.navItems = this.getStoredNavItems(); // Retrieve navItems from local storage

    this.roleSubs = this.authService.getRole().subscribe({
      next: (role) => {
        this.role = role;
        if (this.role === 'ADMIN') {
          const techniciensButton = {
            name: 'Techniciens',
            url: '/admin/techniciens',
            iconComponent: { name: 'cil-puzzle' },
          };

          const existingButtonIndex = this.navItems.findIndex(
            // @ts-ignore
            (item) => item.name === techniciensButton.name
          );
          if (existingButtonIndex === -1) {
            // @ts-ignore
            this.navItems.push(techniciensButton);
            this.storeNavItems(); // Store updated navItems in local storage
          }
        }
      },
      error: () => {
        this.role = '';
      },
    });
  }

  private getStoredNavItems(): any[] {
    const storedNavItems = localStorage.getItem(NAV_ITEMS_KEY);
    return storedNavItems ? JSON.parse(storedNavItems) : navItems;
  }

  private storeNavItems(): void {
    localStorage.setItem(NAV_ITEMS_KEY, JSON.stringify(this.navItems));
  }
}
