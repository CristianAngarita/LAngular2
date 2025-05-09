import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';
// Esto hace que AuthService esté disponible en toda la aplicación sin necesidad de importarlo en un módulo específico.
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Define la URL base para las peticiones de autenticación a tu backend Spring boot
  private readonly API_URL = 'http://localhost:8080/auth';

  constructor(private http: HttpClient, private router: Router) {}
  /*
   Verifica si el token existe en localStorage. Devuelve true si existe, false si no.
  Es útil para proteger rutas (como en el AuthGuard).
  */
  isLoggedIn() {
    return !!localStorage.getItem('auth_token');
  }

  login(username: string, password: string): Observable<any> { //Metodo login que devielbe un Obsevable que emite la respuesta del servidor
    return this.http.post(`${this.API_URL}/login`, { username, password })// Envía una petición POST al endpoint de login del backend.
    .pipe(// Usa pipe para encadenar operadores que procesan la respuesta del Observable.
      tap((response: any) => { // tap permite ejecutar efectos secundarios cuando llega una respuesta sin alterar los datos que fluyen.
        console.log('Respuesta del login:', response); // 👈 Agrega este console.log
        this.saveToken(response.token); // Guarda el token JWT recibido en localStorage. Mantiene la sesión del usuario.
      }),
      catchError((error) => {   // Si ocurre un error en la petición, entra aquí.
        console.error('Error real del backend:', error);
        alert('Error en el login: ' + (error.error.message || error.statusText));
        return throwError(() => error);
      })
    );
  }

  // Método privado que guarda el token JWT en el almacenamiento local del navegador.
  private saveToken(token: string): void {
    // localStorage.setItem guarda un valor con una clave específic
    localStorage.setItem('auth_token', token);
    // Guarda el token bajo la clave 'auth_token'. Este valor se mantiene incluso si el usuario recarga la página.
  }
  // Intenta recuperar el valor asociado a la clave 'auth_token'.
  getToken(): string | null {
    return localStorage.getItem('auth_token');
    //Si existe, devuelve el token como string.
    // Si no existe (por ejemplo, si el usuario no ha iniciado sesión o ya cerró sesión), devuelve null.
  }
  // Método público que intenta extraer el nombre de usuario desde el token JWT
  getUsername(): string | null {
    // Obtiene el token almacenado en localStorage usando el método anterior.
    const token = this.getToken(); 
    if (!token) return null; //Si no hay token (el usuario no ha iniciado sesión), retorna null.

    /*
      Los JWT (JSON Web Token) están compuestos por tres partes separadas por puntos: header.payload.signature
      Aquí se toma la segunda parte (el "payload"), que contiene los datos codificados en base64
      atob decodifica base64 → string, y luego JSON.parse convierte ese string en un objeto JavaScript.
    */
    const payload = JSON.parse(atob(token.split('.')[1])); 
    // Se retorna el valor del campo "sub" (de "subject"), que por convención contiene el nombre de usuario o ID del usuario.
    return payload.sub; // en tu JWT el usuario va en "sub"
  }

  // Método público que permite cerrar la sesión del usuario
  logout(): void {
    // Elimina el token JWT del almacenamiento local del navegador.
    localStorage.removeItem('auth_token');
    // Redirige al usuario a la pantalla de inicio de sesión.
    this.router.navigate(['/login']);
  }
  
}
