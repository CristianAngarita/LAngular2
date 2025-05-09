import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

// Se exporta una función interceptor que implementa el tipo HttpInterceptorFn (nuevo en Angular 16+ standalone).
export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  const auth = inject(AuthService); // Inyecta manualmente el AuthService usando la función inject (reemplazo del constructor para funciones standalone)
  //Este servicio contiene el método getToken() para obtener el token JWT desde localStorage.
  const token = auth.getToken(); // Intenta recuperar el token de autenticación. Si no existe, el usuario no está logueado.
  const authReq = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req; // Si hay un token, clona la solicitud original y le agrega un encabezado Authorization con el formato "Bearer {token}".
  // Si no hay token, simplemente pasa la solicitud sin modificar.
  return next(authReq); // Envía la solicitud (modificada o no) al siguiente interceptor o al backend.
};
