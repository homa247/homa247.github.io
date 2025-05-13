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
      } else if (permission === 'denied') {
        this.error2 = 'دسترسی به اعلان رد شده است.';
      }
    });
  }

  sendTestNotification() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready
        .then(registration => {
          registration.showNotification('اعلان تستی!', {
            body: 'این یک اعلان آزمایشی از PWA است.',
            icon: 'assets/icons/icon-192x192.png',
            badge: 'assets/icons/icon-72x72.png',
            // vibrate: [100, 50, 100],
            data: { dateOfArrival: Date.now(), primaryKey: 1 }
          });
        })
        .catch(error => {
          this.error2 = 'مشکل در دسترسی به Service Worker: ' + error;
          console.error('ServiceWorker error:', error);
        });
    } else {
      this.error2 = 'Service Worker در این مرورگر پشتیبانی نمی‌شود.';
    }
  }














  // requestPermission() {
  //   if (!('Notification' in window)) {
  //     alert('مرورگر شما از اعلان پشتیبانی نمی‌کند.');
  //     return;
  //   }

  //   Notification.requestPermission().then(permission => {
  //     this.permissionStatus = permission;

  //     if (permission === 'granted') {
  //       this.sendTestNotification();
  //     }
  //   });
  // }

  // sendTestNotification() {
  //   try {
  //     new Notification('اعلان تستی!', {
  //       body: 'این یک اعلان آزمایشی از PWA است.',
  //       icon: 'assets/icons/icon-192x192.png'
  //     });

  //   } catch (error) {
  //     this.error2 = error;
  //     console.error("اجازه نمایش نوتیفیکیشن داده نشد!");
  //   }
  // }
}
