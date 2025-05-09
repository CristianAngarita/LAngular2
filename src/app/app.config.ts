import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './services/token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    // Optimiza la detección de cambios para mejorar el rendimiento.
    provideZoneChangeDetection({ eventCoalescing: true }),
    // Registra el enrutamiento de la aplicación usando las rutas definidas previamente.
    provideRouter(routes),
    // Configura el HttpClient para que use interceptores. Aquí se inyecta tu interceptor de tokens.
    provideHttpClient(withInterceptors([tokenInterceptor])),
  ],
};
