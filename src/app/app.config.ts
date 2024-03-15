import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(), provideHttpClient(), JwtHelperService, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }],
};
