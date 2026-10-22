import {TestBed} from '@angular/core/testing';
import {ActivatedRouteSnapshot, provideRouter, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {adminGuard} from './admin.guard';

describe('adminGuard', () => {
  const getSession = jasmine.createSpy('getSession');
  beforeEach(() => {
    getSession.calls.reset();
    TestBed.configureTestingModule({providers: [provideRouter([]), {provide: AuthService, useValue: {getSession}}]});
  });

  for (const session of [null, {userId: 'member', isAdmin: false}, {userId: 'member'}]) {
    it(`redirects sessions without verified admin rights: ${JSON.stringify(session)}`, async () => {
      getSession.and.resolveTo(session);
      const result = await TestBed.runInInjectionContext(() => adminGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot));
      expect(result).toEqual(TestBed.inject(Router).parseUrl('/admin/login'));
    });
  }

  it('allows an administrator verified by the API', async () => {
    getSession.and.resolveTo({userId: 'admin', isAdmin: true});
    const result = await TestBed.runInInjectionContext(() => adminGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot));
    expect(result).toBeTrue();
  });
});
