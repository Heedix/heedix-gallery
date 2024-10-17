import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth/login';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, { username, password });
  }

  logout() {
    // Ausloggen, evtl. Token löschen
    localStorage.removeItem('authToken');
  }

  isAuthenticated(): boolean {
    // Überprüfe, ob der Benutzer angemeldet ist (z.B. Token in localStorage prüfen)
    return !!localStorage.getItem('authToken');
  }
}
