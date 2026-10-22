import {TestBed} from '@angular/core/testing';
import {provideRouter} from '@angular/router';
import {of, Subject, throwError} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {SiteSettings, SiteStatusService} from '../../services/site-status.service';
import {AdminComponent} from './admin.component';
import {signal, WritableSignal} from '@angular/core';

describe('AdminComponent', () => {
  const saved: SiteSettings = {loginEnabled: true, maintenanceMode: false,
    maintenanceMessage: 'Bald zurück.', updatedAt: '2026-10-22T10:00:00Z'};
  let status: {settings: WritableSignal<SiteSettings>; getAdminSettings: jasmine.Spy;
    saveSettings: jasmine.Spy; accept: jasmine.Spy};

  beforeEach(async () => {
    status = {settings: signal(saved), getAdminSettings: jasmine.createSpy().and.returnValue(of(saved)),
      saveSettings: jasmine.createSpy(), accept: jasmine.createSpy()};
    await TestBed.configureTestingModule({imports: [AdminComponent], providers: [provideRouter([]),
      {provide: AuthService, useValue: {logout: jasmine.createSpy()}},
      {provide: SiteStatusService, useValue: status}]}).compileComponents();
  });

  it('keeps switch changes as a draft until saving and supports discarding', () => {
    const fixture = TestBed.createComponent(AdminComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    component.draft.loginEnabled = false;
    expect(component.dirty).toBeTrue();
    expect(status.saveSettings).not.toHaveBeenCalled();
    component.reset();
    expect(component.draft.loginEnabled).toBeTrue();
    expect(component.dirty).toBeFalse();
  });

  it('disables duplicate saves and shows success only after the API confirms', () => {
    const fixture = TestBed.createComponent(AdminComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    const response = new Subject<SiteSettings>();
    status.saveSettings.and.returnValue(response);
    component.draft.maintenanceMode = true;
    component.save();
    component.save();
    expect(status.saveSettings).toHaveBeenCalledTimes(1);
    expect(component.saving).toBeTrue();
    expect(component.success).toBe('');
    response.next({...saved, maintenanceMode: true});
    response.complete();
    expect(component.saving).toBeFalse();
    expect(component.dirty).toBeFalse();
    expect(component.success).toContain('saved');
  });

  it('retains unsaved changes and displays an error when saving fails', () => {
    const fixture = TestBed.createComponent(AdminComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    status.saveSettings.and.returnValue(throwError(() => ({status: 503})));
    component.draft.maintenanceMode = true;
    component.save();
    expect(component.saved?.maintenanceMode).toBeFalse();
    expect(component.draft.maintenanceMode).toBeTrue();
    expect(component.dirty).toBeTrue();
    expect(component.error).toBeTruthy();
    expect(component.saving).toBeFalse();
  });
});
