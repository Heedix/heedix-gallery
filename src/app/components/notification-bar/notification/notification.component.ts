import { Component } from '@angular/core';
import {NgClass, NgIf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgIf,
    NgClass
  ],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {
  notificationType = 'info';
  expirationTime = 1;
  notificationContent = 'Username or Password incorrect'
}
