// auth.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.endsWith('/api/login') && req.method === 'POST') {
      const { email, password } = req.body;
      // Simular la autenticación
      if (email === 'user@demo.com' && password === '123456') {
        return of(new HttpResponse({ status: 200, body: { success: true } })).pipe(delay(500));
      } else {
        return of(new HttpResponse({ status: 401, body: { success: false, message: 'Credenciales incorrectas' } })).pipe(delay(500));
      }
    }

    return next.handle(req);
  }
}
