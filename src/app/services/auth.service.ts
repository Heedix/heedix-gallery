import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import CryptoJS from 'crypto-js';
import {environment} from '../environments/environment';
import {Router} from "@angular/router";

const API_URL = environment.apiUrl;

export interface AuthSession {
  userId: string;
  username: string;
  isAdmin: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {
  }

  private loginStatus = new BehaviorSubject<boolean>(false);
  loginStatus$ = this.loginStatus.asObservable();

  register(email: string, username: string, password: string): Observable<any> {
    const encryptedPassword = CryptoJS.SHA256(password).toString();
    return this.http.post(API_URL + '/register', {email, username, encryptedPassword});
  }

  login(username: string, password: string): Observable<any> {
    const encryptedPassword = CryptoJS.SHA256(password).toString();
    return this.http.post(API_URL + '/auth/login', {username, encryptedPassword}).pipe(
      tap({
        error: (error: any) => {
          console.error('Error received:', error);
          this.loginStatus.next(false);
        }
      })
    );
  }

  adminLogin(username: string, password: string): Observable<any> {
    const encryptedPassword = CryptoJS.SHA256(password).toString();
    return this.http.post(`${API_URL}/admin/login`, {username, encryptedPassword});
  }

  storeSession(response: {token: string; username: string; userId: string}): void {
    localStorage.setItem('authToken', response.token);
    localStorage.setItem('username', response.username);
    localStorage.setItem('userId', response.userId);
    this.loginStatus.next(true);
  }

  async getSession(): Promise<AuthSession | null> {
    if (!localStorage.getItem('authToken')) return null;
    try {
      const response = await fetch(`${API_URL}/auth/authorize`, {
        cache: 'no-store',
        signal: AbortSignal.timeout(10000),
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + localStorage.getItem('authToken')
        }
      });
      if (response.ok) {
        const data = await response.json();
        return data.userId ? data : null;
      }
      return null;
    } catch {
      return null;
    }
  }

  async isAuthenticated(): Promise<string | null> {
    return (await this.getSession())?.userId || null;
  }

  async emailVerified(): Promise<boolean> {
    const response = await fetch(`${API_URL}/auth/email-verified`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + localStorage.getItem('authToken')
      }
    });
    if (response.ok) {
      const data = await response.json();
      return data.verificationStatus;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    this.loginStatus.next(false);
    this.router.navigate(['/']).then(r => r);
  }
}
