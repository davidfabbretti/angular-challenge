// auth.service.ts
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api/login';
  private loggedIn = false;

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post(this.apiUrl, {email, password}).pipe(
      map((result: any) => {
        this.loggedIn = result.success;
        return this.loggedIn;
      }),
    );
  }

  logout() {
    return of(this.loggedIn);
  }

  // Verifica si el usuario está logueado
  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
