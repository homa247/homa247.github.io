import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideRouter, RouterModule } from '@angular/router';
import { routes } from './app/app.routes';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MAT_MENU_DEFAULT_OPTIONS } from '@angular/material/menu';


bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes),
  importProvidersFrom(MatPaginatorModule, BrowserModule, ScrollingModule,
    FormsModule, ReactiveFormsModule, RouterModule, DragDropModule,

    // JwtModule.forRoot({
    //     jwtOptionsProvider: {
    //         provide: JWT_OPTIONS,
    //         useFactory: jwtOptionsFactory,
    //         deps: [PLATFORM_ID]
    //     }
    // })),
  ),
  // ThemingService,

  // { provide: HTTP_INTERCEPTORS, useClass: HttpErrorHandelerInterceptor, multi: true },
  { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 7000 } },
  // ,  panelClass: 'snackClass'}
  // { provide: MatPaginatorIntl, useValue: getPersianPaginatorIntl() },
  {
    provide: MAT_MENU_DEFAULT_OPTIONS,
    useValue: {
      hasBackdrop: true,
      closeOnNavigation: true,
      overlapTrigger: false,
      backdropClass: 'custom-menu-backdrop',

    }
  },
  { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true, disableClose: false, closeOnNavigation: true, backdropClass: 'backdropBackground' } },
  { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
    // { provide: RECAPTCHA_LANGUAGE, useValue: "fa"},


  ]

})

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('ngsw-worker.js')
    .then(() => console.log('Service Worker registered'))
    .catch(err => console.error('Service Worker registration failed:', err));
}