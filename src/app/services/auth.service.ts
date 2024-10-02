// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api/login';
  private loggedIn = false;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    this.loggedIn = true;
    return this.http.post(this.apiUrl, { email, password });
  }

  logout() {
    return of(this.loggedIn);
  }

  // Verifica si el usuario está logueado
  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
