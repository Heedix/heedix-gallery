import {Component, OnInit} from '@angular/core';
import {NgClass, NgIf, NgOptimizedImage} from "@angular/common";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-account-sidebar',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgClass,
    NgIf
  ],
  templateUrl: './account-sidebar.component.html',
  styleUrl: './account-sidebar.component.css'
})
export class AccountSidebarComponent implements OnInit {
  constructor(private authService: AuthService) {
  }
  baseUrl = 'http://localhost:3000/api/account/profile-picture/'; //TODO: Change to production URL

  isSidebarCollapsed = true;
  isLoggedIn = false;
  userId: string | null = null;

  username: string | null = 'Unknown';
  profilePictureUrl = '/assets/icons/question-mark-gray.svg';

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  logout() {
    this.authService.logout()
  }

  async ngOnInit() {
    this.userId = await this.authService.isAuthenticated();
    this.isLoggedIn = !!this.userId;
    if (this.isLoggedIn) {
      const extensions = ['.jpg', '.png'];
      this.username = localStorage.getItem('username');
      for (const ext of extensions) {
        const url = `${this.baseUrl}${this.userId}${ext}`;
        if (await this.imageExists(url)) {
          this.profilePictureUrl = url;
          break;
        }
      }
    }
  }

  private async imageExists(url: string): Promise<boolean> {
    try {
      const response = await fetch(url, {method: 'HEAD'});
      return response.ok;
    } catch {
      return false;
    }
  }
}
