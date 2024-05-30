import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000'; // Encuentra la ruta que dirige el Back-End al iniciarla
  private usernameSubject: BehaviorSubject<string | null>;
  public username$: Observable<string | null>;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    const savedUsername = localStorage.getItem('username');
    this.usernameSubject = new BehaviorSubject<string | null>(savedUsername);
    this.username$ = this.usernameSubject.asObservable();
  }


  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.usernameSubject.next(null); 
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return token != null && !this.jwtHelper.isTokenExpired(token);
  }

  getUsername(): Observable<string | null> {
    return this.username$;
  }









  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, { username, password }).pipe(
      map(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('username', response.username); 
          this.usernameSubject.next(response.username); 
        }
        return response;
      })
    );
  }
}
