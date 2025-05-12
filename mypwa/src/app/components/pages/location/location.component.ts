import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [MatButtonModule, NgClass],

  templateUrl: './location.component.html',
  styleUrl: './location.component.scss'
})
export class LocationComponent {

  latitude: number | null = null;
  longitude: number | null = null;
  errorMessage: string | null = null;

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;

        },
        (error) => {

          switch (error.code) {
            case error.PERMISSION_DENIED:
              alert('لطفاً اجازه دسترسی به موقعیت جغرافیایی را بدهید.');
              break;
            case error.POSITION_UNAVAILABLE:
              alert('لطفاً GPS دستگاه خود را روشن کنید و دوباره تلاش کنید.');
              break;
            case error.TIMEOUT:
              alert('درخواست موقعیت جغرافیایی به پایان رسید.');
              break;
            default:
              alert('یک خطای ناشناخته رخ داده است.');
          }
        },
        {
          enableHighAccuracy: true, // درخواست دقت بالا
          timeout: 10000,          // مهلت درخواست (بر حسب میلی‌ثانیه)
          maximumAge: 0            // جلوگیری از کش شدن اطلاعات
        }
      );
    } else {
      alert('مرورگر شما از موقعیت جغرافیایی پشتیبانی نمی‌کند.');
    }
  }
}
