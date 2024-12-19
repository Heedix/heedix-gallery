import { Component } from '@angular/core';
import {NotificationComponent} from "./notification/notification.component";

@Component({
  selector: 'app-notification-bar',
  standalone: true,
  imports: [
    NotificationComponent
  ],
  templateUrl: './notification-bar.component.html',
  styleUrl: './notification-bar.component.css'
})
export class NotificationBarComponent {

}
