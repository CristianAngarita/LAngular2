import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = 'http://localhost:8080/auth';

  constructor(private http: HttpClient, private router: Router) {}

  isLoggedIn() {
    return !!localStorage.getItem('auth_token');
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, { username, password })
    .pipe(
      tap((response: any) => {
        console.log('Respuesta del login:', response); // 👈 Agrega este console.log
        this.saveToken(response.token);
      }),
      catchError((error) => {
        console.error('Error real del backend:', error);
        alert('Error en el login: ' + (error.error.message || error.statusText));
        return throwError(() => error);
      })
    );
  }

  private saveToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  getUsername(): string | null {
    const token = this.getToken();
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.sub; // en tu JWT el usuario va en "sub"
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    this.router.navigate(['/login']);
  }
  
}
