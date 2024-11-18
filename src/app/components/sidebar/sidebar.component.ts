import { Component } from '@angular/core';
import {NgClass, NgOptimizedImage} from "@angular/common";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    NgClass,
    RouterOutlet,
    NgOptimizedImage
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isSidebarCollapsed = true

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
