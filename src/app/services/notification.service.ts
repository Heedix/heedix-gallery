import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {NotificationInterface} from "../interfaces/NotificationInterface";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notificationIndex = 0;

  private notifications = new Subject<NotificationInterface>();
  notifications$ = this.notifications.asObservable();

  addNotification(content: string, type: string, expirationTime: number) {
    let notification: NotificationInterface = {id: this.notificationIndex++, content: content, type: type, expirationTime: expirationTime};
    this.notifications.next(notification);
  }
}
