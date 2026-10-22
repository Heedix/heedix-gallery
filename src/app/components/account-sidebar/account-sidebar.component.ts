import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {NgClass, NgIf, NgOptimizedImage} from "@angular/common";
import { AuthService } from '../../services/auth.service';
import { environment } from '../../environments/environment';
import {NotificationService} from "../../services/notification.service";
import {RouterLink} from "@angular/router";
import {SiteStatusService} from '../../services/site-status.service';

const API_URL = environment.apiUrl;

@Component({
  selector: 'app-account-sidebar',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgClass,
    NgIf,
    RouterLink
  ],
  templateUrl: './account-sidebar.component.html',
  styleUrl: './account-sidebar.component.css'
})
export class AccountSidebarComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  constructor(private authService: AuthService, private notificationService: NotificationService,
              public siteStatus: SiteStatusService) {}

  isSidebarCollapsed = true;
  isLoggedIn = false;
  isAdmin = false;
  userId: string | null = null;

  username: string | null = 'Unknown';
  profilePictureUrl = '/assets/icons/question-mark-gray.svg';

  /**
   * Toggles the sidebar collapsed state
   */
  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  /**
   * Logs out the user and adds a notification
   */
  logout() {
    this.authService.logout()
    this.notificationService.addNotification( 'Logged out successfully', 'info', 5);
  }

  /**
   * OnInit lifecycle hook to check authentication and load user data
   */
  async ngOnInit() {
    this.authService.loginStatus$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(async () => {
      await this.loadComponent();
    });
  }

  async loadComponent() {
    const session = await this.authService.getSession();
    this.userId = session?.userId || null;
    this.isAdmin = session?.isAdmin === true;
    this.isLoggedIn = !!this.userId;

    if (this.isLoggedIn) {
      const extensions = ['.jpg', '.png'];
      this.username = localStorage.getItem('username');
      for (const ext of extensions) {
        const url = `${API_URL}/account/profile-picture/${this.userId}${ext}`;
        if (await this.imageExists(url)) {
          this.profilePictureUrl = url;
          break;
        }
      }
    } else {
      this.username = 'Unknown';
      this.profilePictureUrl = '/assets/icons/question-mark-gray.svg';
    }
  }

  /**
   * Checks if an image exists at the given URL
   * @param {string} url - The URL of the image
   * @returns {Promise<boolean>} - True if the image exists, false otherwise
   */
  private async imageExists(url: string): Promise<boolean> {
    try {
      const response = await fetch(url, {method: 'HEAD'});
      return response.ok;
    } catch {
      return false;
    }
  }
}
