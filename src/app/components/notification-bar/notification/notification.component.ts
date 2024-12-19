import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgClass, NgIf, NgOptimizedImage} from "@angular/common";
import {NotificationInterface} from "../../../interfaces/NotificationInterface";

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
export class NotificationComponent implements OnInit {
  @Input() notification: NotificationInterface = {id: 0, type: '', expirationTime: -1, content: ''}
  @Output() deleteNotificationEvent = new EventEmitter<number>()

  formatedExpirationTime: string = '';

  deleteNotification() {
    const element = document.getElementById('notification');
    element?.classList.add('slide-out');
    setTimeout(() => this.deleteNotificationEvent.emit(this.notification.id), 500);
  }

  formatExpirationTime(timeLeft: number) {
    return timeLeft > 9 ? '0:' + timeLeft : '0:0' + timeLeft;
  }

  countDown(i: number) {
    this.formatedExpirationTime = this.formatExpirationTime(i);
    if (i == 0) {
      this.deleteNotification()
      return;
    } else {
      setTimeout(() =>  this.countDown(--i), 1000);
    }
  }

  ngOnInit() {
    if (this.notification.expirationTime >= 0) {
      this.countDown(this.notification.expirationTime);
      setTimeout(() => this.deleteNotification(), this.notification.expirationTime * 1000);
    }
  }
}
