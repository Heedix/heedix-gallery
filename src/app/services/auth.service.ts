import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
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
    this.isAuthenticated().then(r => r);
    return this.http.post(API_URL + '/auth/login', {username, encryptedPassword});
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
      this.loginStatus.next(true)
      return data.userId || null;
    }
    this.loginStatus.next(false);
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
    this.isAuthenticated().then(r => r);
    this.router.navigate(['/']).then(r => r);
  }
}
