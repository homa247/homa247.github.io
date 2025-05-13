import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [MatButtonModule, NgClass],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent {
  permissionStatus: NotificationPermission = Notification.permission;
  error2: any;

  requestPermission() {
    if (!('Notification' in window)) {
      alert('مرورگر شما از اعلان پشتیبانی نمی‌کند.');
      return;
    }

    Notification.requestPermission().then(permission => {
      this.permissionStatus = permission;

      if (permission === 'granted') {
        this.sendTestNotification();
      }
    });
  }

  sendTestNotification() {
    try {
      new Notification('اعلان تستی!', {
        body: 'این یک اعلان آزمایشی از PWA است.',
        icon: 'assets/icons/icon-192x192.png'
      });

    } catch (error) {
      this.error2 = error;
      console.error("اجازه نمایش نوتیفیکیشن داده نشد!");
    }
  }
}
