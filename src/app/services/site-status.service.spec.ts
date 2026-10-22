import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {provideHttpClient} from '@angular/common/http';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {SiteSettings, SiteStatusService} from './site-status.service';
import {environment} from '../environments/environment';

describe('SiteStatusService', () => {
  let service: SiteStatusService;
  let http: HttpTestingController;
  const settings: SiteSettings = {loginEnabled: true, maintenanceMode: false,
    maintenanceMessage: 'Wir sind bald zurück.', updatedAt: '2026-10-22T10:00:00Z'};

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [provideHttpClient(), provideHttpClientTesting()]});
    service = TestBed.inject(SiteStatusService);
    http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => { http.verify(); localStorage.removeItem('authToken'); });

  it('polls for maintenance changes and recovers after a failed status check', fakeAsync(() => {
    const subscription = service.watch().subscribe();
    tick(0);
    http.expectOne(`${environment.apiUrl}/site-status`).flush(settings);
    expect(service.settings()?.maintenanceMode).toBeFalse();
    tick(15000);
    http.expectOne(`${environment.apiUrl}/site-status`).flush('offline', {status: 503, statusText: 'Unavailable'});
    expect(service.unavailable()).toBeTrue();
    expect(service.refreshing()).toBeFalse();
    tick(15000);
    http.expectOne(`${environment.apiUrl}/site-status`).flush({...settings, maintenanceMode: true});
    expect(service.unavailable()).toBeFalse();
    expect(service.settings()?.maintenanceMode).toBeTrue();
    subscription.unsubscribe();
  }));

  it('retries immediately on request without overlapping an outstanding check', fakeAsync(() => {
    const subscription = service.watch().subscribe();
    tick(0);
    service.refresh();
    http.expectOne(`${environment.apiUrl}/site-status`).flush(settings);
    service.refresh();
    http.expectOne(`${environment.apiUrl}/site-status`).flush({...settings, loginEnabled: false});
    expect(service.settings()?.loginEnabled).toBeFalse();
    subscription.unsubscribe();
  }));

  it('sends the current session token and applies only successfully saved settings', () => {
    service.accept(settings);
    localStorage.setItem('authToken', 'test-session');
    const draft = {loginEnabled: false, maintenanceMode: true, maintenanceMessage: 'Neue Nachricht'};
    service.saveSettings(draft).subscribe();
    const request = http.expectOne(`${environment.apiUrl}/admin/settings`);
    expect(request.request.method).toBe('PUT');
    expect(request.request.headers.get('Authorization')).toBe('Bearer test-session');
    expect(request.request.body).toEqual(draft);
    expect(service.settings()).toEqual(settings);
    request.flush({...draft, updatedAt: settings.updatedAt});
    expect(service.settings()?.maintenanceMode).toBeTrue();
  });

  it('keeps the active settings unchanged when saving fails', () => {
    service.accept(settings);
    service.saveSettings({loginEnabled: false, maintenanceMode: true, maintenanceMessage: 'Text'})
      .subscribe({error: () => {}});
    http.expectOne(`${environment.apiUrl}/admin/settings`).flush('failed', {status: 503, statusText: 'Unavailable'});
    expect(service.settings()).toEqual(settings);
  });
});
