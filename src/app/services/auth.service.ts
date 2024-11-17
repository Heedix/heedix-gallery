import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {
  }

  register(email: string, username: string, password: string): Observable<any> {
    const encryptedPassword = CryptoJS.SHA256(password).toString();
    return this.http.post(this.apiUrl + '/register', {email, username, encryptedPassword});
  }

  login(username: string, password: string): Observable<any> {
    const encryptedPassword = CryptoJS.SHA256(password).toString();
    return this.http.post(this.apiUrl + '/auth/login', {username, encryptedPassword});
  }

  async isAuthenticated(): Promise<string | null> {
    const response = await fetch(`${this.apiUrl}/auth/authorize`, {
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

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
  }

  /*
  authenticate(): Observable<any> {
    const token = localStorage.getItem('authToken');
    return this.http.get(this.apiUrl + '/protected', {
      headers: {
        Authorization: `Bearer ${token}` // Token im Header senden
      }
    });
  }*/
}
