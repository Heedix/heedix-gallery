import { Component } from '@angular/core';
import {NgClass, NgIf, NgOptimizedImage} from "@angular/common";
import {SiteStatusService} from '../../services/site-status.service';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    RouterOutlet,
    NgOptimizedImage
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(public siteStatus: SiteStatusService) {}
  isSidebarCollapsed = true

  /**
   * Toggles the sidebar collapsed state
   */
  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
