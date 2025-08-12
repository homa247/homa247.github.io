import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-connection-status',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './connection-status.component.html',
  styleUrl: './connection-status.component.scss'
})
export class ConnectionStatusComponent {
  connectionStatus: string = '';
  isOnline: boolean = false;

  checkConnection() {
    this.isOnline = window.navigator.onLine;
    this.connectionStatus = this.isOnline
      ? '✅ شما آنلاین هستید'
      : '❌ شما آفلاین هستید';
  }
}
