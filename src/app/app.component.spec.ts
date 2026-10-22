import {Component, signal, WritableSignal} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {provideRouter, Router} from '@angular/router';
import {EMPTY} from 'rxjs';
import {AppComponent} from './app.component';
import {AccountSidebarComponent} from './components/account-sidebar/account-sidebar.component';
import {SiteSettings, SiteStatusService} from './services/site-status.service';

@Component({standalone: true, template: '<p>Gallery content</p>'})
class GalleryStubComponent {}

@Component({standalone: true, template: '<p>Admin login content</p>'})
class AdminStubComponent {}

@Component({standalone: true, selector: 'app-account-sidebar', template: ''})
class AccountStubComponent {}

describe('AppComponent site availability', () => {
  const settings: SiteSettings = {loginEnabled: true, maintenanceMode: false,
    maintenanceMessage: 'Eine kleine Pause.', updatedAt: '2026-10-22T10:00:00Z'};
  let status: {settings: WritableSignal<SiteSettings | null>; unavailable: WritableSignal<boolean>;
    refreshing: WritableSignal<boolean>; watch: () => typeof EMPTY; refresh: jasmine.Spy};

  beforeEach(async () => {
    status = {settings: signal<SiteSettings | null>(null), unavailable: signal(false), refreshing: signal(false),
      watch: () => EMPTY, refresh: jasmine.createSpy()};
    await TestBed.configureTestingModule({imports: [AppComponent], providers: [
      provideRouter([{path: '', component: GalleryStubComponent},
        {path: 'image/123', component: GalleryStubComponent}, {path: 'admin/login', component: AdminStubComponent}]),
      {provide: SiteStatusService, useValue: status}
    ]}).overrideComponent(AppComponent, {remove: {imports: [AccountSidebarComponent]},
      add: {imports: [AccountStubComponent]}}).compileComponents();
  });

  it('waits for the initial status before rendering gallery content', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    await TestBed.inject(Router).navigateByUrl('/');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Loading Heedix Gallery');
    expect(fixture.nativeElement.textContent).not.toContain('Gallery content');
    status.settings.set(settings);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Gallery content');
  });

  it('replaces deep-linked content during maintenance and restores it when maintenance ends', async () => {
    status.settings.set(settings);
    const fixture = TestBed.createComponent(AppComponent);
    await TestBed.inject(Router).navigateByUrl('/image/123');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Gallery content');
    status.settings.set({...settings, maintenanceMode: true});
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Eine kleine Pause.');
    expect(fixture.nativeElement.textContent).not.toContain('Gallery content');
    status.settings.set(settings);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Gallery content');
  });

  it('keeps admin routes accessible during maintenance and a public status outage', async () => {
    status.settings.set({...settings, maintenanceMode: true});
    status.unavailable.set(true);
    const fixture = TestBed.createComponent(AppComponent);
    await TestBed.inject(Router).navigateByUrl('/admin/login');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Admin login content');
    expect(fixture.nativeElement.querySelector('app-maintenance')).toBeNull();
  });

  it('hides an open gallery if the status check becomes unavailable', async () => {
    status.settings.set(settings);
    const fixture = TestBed.createComponent(AppComponent);
    await TestBed.inject(Router).navigateByUrl('/');
    fixture.detectChanges();
    status.unavailable.set(true);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Currently unavailable');
    expect(fixture.nativeElement.textContent).not.toContain('Gallery content');
  });
});
