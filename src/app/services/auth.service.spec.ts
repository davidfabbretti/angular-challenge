import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login with correct credentials', () => {
    const result = service.login('user@demo.com', '123456');
    expect(result).toBeTrue();
    expect(service.isLoggedIn()).toBeTrue();
  });

  it('should not login with incorrect credentials', () => {
    const result = service.login('wrong@demo.com', '123456');
    expect(result).toBeFalse();
    expect(service.isLoggedIn()).toBeFalse();
  });

  it('should logout', () => {
    service.login('user@demo.com', '123456');
    service.logout();
    expect(service.isLoggedIn()).toBeFalse();
  });

  it('should not login with empty email or password', () => {
    const result = service.login('', '');
    expect(result).toBeFalse();
    expect(service.isLoggedIn()).toBeFalse();
  });
});
