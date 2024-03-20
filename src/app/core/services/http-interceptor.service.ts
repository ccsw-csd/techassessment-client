import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';


export const httpInterceptorService: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {


  const auth = inject(AuthService)
  const router = inject(Router)

  let token: string | null = auth.getSSOToken();

  if (token != null) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token),
    });
    return next(cloned).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage;
        switch (error.status) {

          case 400:
            errorMessage = 'Error de usuario: ' + error.error;
            break;
          case 401:
            auth.logout();
            errorMessage = 'Token expirado.';
            break;
          case 404:
            errorMessage = 'Recurso no encontrado.';
            break;
          case 415:
            errorMessage = 'No se ha enviado un elemento válido.';
            break;
          case 422:
            errorMessage = 'No se puede procesar el elemento enviado.';
            break;
          case 500:
            errorMessage = 'Se ha producido un error del servidor. Por favor, póngase en contacto con un administrador. Disculpe las molestias.';
            break;
          default:
            if (error.error.message == null) {
              errorMessage = 'Se ha producido un error. Por favor, inténtelo de nuevo.';
            }
            else {
              errorMessage = error.error.message
            }
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  return next(req);

}
