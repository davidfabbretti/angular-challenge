import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginComponent } from './login.component';
import {AuthService} from "../services/auth.service";
import {of} from "rxjs";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login method of AuthService on form submission', () => {

    authService.login.and.returnValue(of(true)); // Simula un login exitoso
    component.onSubmit();

    expect(authService.login).toHaveBeenCalledWith('user@demo.com', '123456');
    expect(router.navigate).toHaveBeenCalledWith(['/products']);
  });

  it('should alert when credentials are incorrect', () => {
    spyOn(window, 'alert'); // Espía la función alert
    authService.login.and.returnValue(of(false)); // Simula un login fallido
    component.onSubmit();

    expect(window.alert).toHaveBeenCalledWith('Credenciales incorrectas');
  });
});
