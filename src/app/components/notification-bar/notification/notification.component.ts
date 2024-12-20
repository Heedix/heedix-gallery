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

  hover: boolean = false;
  formatedExpirationTime: string = '';

  /**
   * Deletes the notification with a slide-out animation
   */
  deleteNotification() {
    const element = document.getElementById('notification');
    element?.classList.add('slide-out');
    setTimeout(() => this.deleteNotificationEvent.emit(this.notification.id), 500);
  }

  /**
   * Formats the expiration time to a string
   * @param {number} timeLeft - The time left in seconds
   * @returns {string} - The formatted expiration time
   */
  formatExpirationTime(timeLeft: number): string {
    return timeLeft > 9 ? '0:' + timeLeft : '0:0' + timeLeft;
  }

  /**
   * Sets hover state to true
   */
  mouseenter() {
    this.hover = true;
  }

  /**
   * Sets hover state to false
   */
  mouseleave() {
    this.hover = false;
  }

  /**
   * Counts down the expiration time and deletes the notification when time is up
   * @param {number} i - The initial time in seconds
   */
  countDown(i: number) {
    this.formatedExpirationTime = this.formatExpirationTime(i);
    setTimeout(() => {
      if (i == 0) {
        this.deleteNotification()
        return;
      } else if (!this.hover) {
        this.countDown(--i);
      } else {
        this.countDown(i);
      }
    }, 1000);
  }

  /**
   * OnInit lifecycle hook to start the countdown if expiration time is set
   */
  ngOnInit() {
    if (this.notification.expirationTime >= 0) {
      this.countDown(this.notification.expirationTime);
    }
  }
}
