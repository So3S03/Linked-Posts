import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { headerInterceptor } from './core/interceptors/header.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withInMemoryScrolling({scrollPositionRestoration: "top"})),
    provideHttpClient(withFetch(), withInterceptors([headerInterceptor, loadingInterceptor])),
    importProvidersFrom([NgxSpinnerModule.forRoot({type: "ball-atom"}), BrowserAnimationsModule])
  ]
};
