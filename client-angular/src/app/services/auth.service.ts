import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, tap } from 'rxjs';
import { User } from './models';
import { environment } from '../../environments/environment';

interface AuthResult {
  access_token?: string;
  user?: User;
  expiresAt: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private readonly authResultKey = 'auth_result';
  private readonly authUrl = `${environment.apiUrl}/auth`;
  private $user = new BehaviorSubject<User | undefined>(undefined);

  getAccessToken() {
    const authResult = this.getAuthResult();
    return authResult.access_token;
  }

  getUser() {
    if (this.isLoggedIn()) {
      const authResult = this.getAuthResult();
      this.$user.next(authResult.user);
    }
    return this.$user;
  }

  login(username: string, password: string) {
    return this.http
      .post<AuthResult>(this.authUrl, { username, password })
      .pipe(
        tap((result) => this.setAuthResult(result)),
        catchError((err) => {
          if (err.status === 401) {
            throw Error('Invalid username or password');
          }
          throw err;
        })
      );
  }

  isLoggedIn() {
    const authResult = this.getAuthResult();
    const expiration = authResult.expiresAt * 1000; // covert to ms
    if (expiration) {
      const isExpired = Date.now() > expiration;
      if (isExpired) {
        this.logout();
        return false;
      }
      return true;
    }
    return false;
  }

  isLoggedOut() {
    return !!this.isLoggedIn();
  }

  logout() {
    localStorage.removeItem(this.authResultKey);
    this.$user.next(undefined);
  }

  private getAuthResult() {
    const authResult = JSON.parse(
      localStorage.getItem(this.authResultKey) || `{"expiresAt": 0}`
    ) as AuthResult;
    return authResult;
  }

  private setAuthResult(authResult: AuthResult) {
    localStorage.setItem(this.authResultKey, JSON.stringify(authResult));
    this.$user.next(authResult.user);
  }
}
