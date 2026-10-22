import {Injectable, signal} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, EMPTY, exhaustMap, finalize, merge, Observable, Subject, tap, timeout, timer} from 'rxjs';
import {environment} from '../environments/environment';

export interface SiteSettings {
  loginEnabled: boolean;
  maintenanceMode: boolean;
  maintenanceMessage: string;
  updatedAt: string;
}

export type SiteSettingsUpdate = Omit<SiteSettings, 'updatedAt'>;

@Injectable({providedIn: 'root'})
export class SiteStatusService {
  private readonly currentSettings = signal<SiteSettings | null>(null);
  readonly settings = this.currentSettings.asReadonly();
  readonly unavailable = signal(false);
  readonly refreshing = signal(false);
  private readonly refreshRequests = new Subject<void>();

  constructor(private http: HttpClient) {}

  watch(): Observable<SiteSettings> {
    return merge(timer(0, 15000), this.refreshRequests).pipe(
      exhaustMap(() => {
        this.refreshing.set(true);
        return this.http.get<SiteSettings>(`${environment.apiUrl}/site-status`).pipe(
          timeout(10000),
          tap(settings => this.accept(settings)),
          catchError(() => {
            this.unavailable.set(true);
            return EMPTY;
          }),
          finalize(() => this.refreshing.set(false))
        );
      })
    );
  }

  refresh(): void {
    this.refreshRequests.next();
  }

  accept(settings: SiteSettings): void {
    this.currentSettings.set(settings);
    this.unavailable.set(false);
  }

  getAdminSettings(): Observable<SiteSettings> {
    return this.http.get<SiteSettings>(`${environment.apiUrl}/admin/settings`, {headers: this.authHeaders()});
  }

  saveSettings(settings: SiteSettingsUpdate): Observable<SiteSettings> {
    return this.http.put<SiteSettings>(`${environment.apiUrl}/admin/settings`, settings,
      {headers: this.authHeaders()}).pipe(tap(saved => this.accept(saved)));
  }

  private authHeaders(): HttpHeaders {
    return new HttpHeaders({Authorization: `Bearer ${localStorage.getItem('authToken') || ''}`});
  }
}
