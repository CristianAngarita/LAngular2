import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
// Esto hace que el guard esté disponible globalmente sin necesidad de declararlo en un módulo.
@Injectable({ providedIn: 'root' })
// Este guard implementa la interfaz CanActivate, que decide si se puede activar una ruta.
export class AuthGuard implements CanActivate {
  
  /*
  Inyecta AuthService para saber si esta autenticado e inyecta Router para redirigir si no lo esta.
  */ 
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean { //Este método se ejecuta cada vez que se intenta acceder a una ruta protegida
    const isLoggedIn = this.authService.isLoggedIn(); // Método que revisa si hay un token
    if (!isLoggedIn) {
      this.router.navigate(['/login']); // Si no está logueado, redirige a login
      return false;
    }
    return true; // Si está logueado, permite el acceso
  }
}
