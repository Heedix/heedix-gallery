import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import CryptoJS from 'crypto-js';
import {environment} from '../environments/environment';
import {Router} from "@angular/router";

const API_URL = environment.apiUrl;

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
        next: (response: any) => {
          setTimeout(() => this.loginStatus.next(true), 100);
        },
        error: (error: any) => {
          console.log('Error received:', error);
          this.loginStatus.next(false);
        }
      })
    );
  }

  async isAuthenticated(): Promise<string | null> {
    const response = await fetch(`${API_URL}/auth/authorize`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + localStorage.getItem('authToken')
      }
    });
    if (response.ok) {
      const data = await response.json();
      return data.userId || null;
    }
    return null;
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
    this.loginStatus.next(false);
    this.router.navigate(['/']).then(r => r);
  }
}
