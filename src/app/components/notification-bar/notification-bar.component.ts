import {Component, OnInit} from '@angular/core';
import {NotificationComponent} from "./notification/notification.component";
import {NotificationService} from "../../services/notification.service";
import {NotificationInterface} from "../../interfaces/NotificationInterface";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-notification-bar',
  standalone: true,
  imports: [
    NotificationComponent,
    NgForOf
  ],
  templateUrl: './notification-bar.component.html',
  styleUrl: './notification-bar.component.css'
})
export class NotificationBarComponent implements OnInit{
  notifications: NotificationInterface[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.notifications$.subscribe((notification) => {
      this.notifications.push(notification);
    });
  }

  removeNotification(id: number) {
    console.log('Removing notification with id: ' + id + ' notification-bar.removeNotification()');
    this.notifications = this.notifications.filter((notification) => notification.id !== id);
  }
}
