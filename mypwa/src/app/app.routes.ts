import { Routes } from '@angular/router';
import { CameraComponent } from './components/pages/camera/camera.component';
import { HomeComponent } from './components/home/home.component';
import { LocationComponent } from './components/pages/location/location.component';
import { UsersComponent } from './components/users/users.component';
import { NotificationsComponent } from './components/pages/notifications/notifications.component';
import { ConnectionStatusComponent } from './components/pages/connection-status/connection-status.component';

export const routes: Routes = [
    {
        path: '', component: HomeComponent
    },
    {
        path: 'camera', component: CameraComponent
    },
    {
        path: 'location', component: LocationComponent
    },
    {
        path: 'connection', component: ConnectionStatusComponent
    },
    {
        path: 'users', component: UsersComponent
    },
    {
        path: 'notification', component: NotificationsComponent
    },
];