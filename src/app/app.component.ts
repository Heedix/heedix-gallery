import {Component, DestroyRef, inject} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {SiteStatusService} from './services/site-status.service';
import {MaintenanceComponent} from './components/maintenance/maintenance.component';
import {ImagesComponent} from "./components/home/images/images.component";
import {ImageService} from "./services/image.service";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {AccountSidebarComponent} from "./components/account-sidebar/account-sidebar.component";
import {NotificationBarComponent} from "./components/notification-bar/notification-bar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgIf, ImagesComponent, NavbarComponent, NgOptimizedImage, AccountSidebarComponent, NotificationBarComponent, MaintenanceComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:  [ ImageService ]
})
export class AppComponent {
  title = 'Heedix Gallery';
  private readonly destroyRef = inject(DestroyRef);

  constructor(public siteStatus: SiteStatusService, private router: Router) {
    this.siteStatus.watch().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }

  get isAdminPage(): boolean {
    return /^\/admin(?:\/|\?|#|$)/.test(this.router.url);
  }
}
