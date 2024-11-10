import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {SidebarComponent} from "../sidebar/sidebar.component";
import {NgClass, NgIf, NgOptimizedImage} from "@angular/common";
//import {repeat} from "rxjs";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    SidebarComponent,
    NgClass,
    NgIf,
    NgOptimizedImage
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  loginButtonText: string = 'Login';
  registerButtonText: string = 'Register';

  loginToggleText: string = 'not registered yet?';
  registerToggleText: string = 'already have an account?';

  infoType: string = '';
  infoMessage: string = '';

  isRegisterShown = false;
  loginRegisterToggleText: string = this.loginToggleText;
  loginRegisterButtonText: string = this.loginButtonText;

  isPasswordVisible: boolean = false;
  togglePasswordVisibilityIconSrc: string = 'assets/icons/closed-eye-gray.svg'

  email: string = '';
  username: string = '';
  password: string = '';
  repeatPassword: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  toggleRegisterShown(): void {
    this.isRegisterShown = !this.isRegisterShown;
    this.loginRegisterButtonText = this.isRegisterShown ? this.registerButtonText : this.loginButtonText;
    this.loginRegisterToggleText = this.isRegisterShown ? this.registerToggleText : this.loginToggleText;
    this.clearPage();
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
    this.togglePasswordVisibilityIconSrc = this.isPasswordVisible ? 'assets/icons/opened-eye-gray.svg' : 'assets/icons/closed-eye-gray.svg';
  }

  clearPage() {
    this.email = '';
    this.username = '';
    this.password = '';
    this.repeatPassword = '';
    this.infoType = '';
    this.infoMessage = '';
  }

  onSubmit() {
    this.email = this.email.trim();
    this.username = this.username.trim();
    this.password = this.password.trim();
    this.repeatPassword = this.repeatPassword.trim();

    if (this.isRegisterShown) {
      const emailValidity = this.checkEmailValidity(this.email);
      const usernameValidity = this.checkUsernameValidity(this.username);
      const passwordValidity = this.checkPasswordValidity(this.password);

      if (emailValidity === 'valid' && usernameValidity === 'valid' && passwordValidity === 'valid') {
        this.authService.register(this.email, this.username, this.password).subscribe(
          () => {
            this.toggleRegisterShown();
            this.clearPage();
          },
          (error) => this.handleError(error)
        );
      } else {
        this.showInfo((emailValidity !== 'valid' ? emailValidity : '') +
          (usernameValidity !== 'valid' ? usernameValidity : '') +
          (passwordValidity !== 'valid' ? passwordValidity : ''), 'error');
      }
    } else {
      this.authService.login(this.username, this.password).subscribe(
        (response) => {
          this.showInfo('login successful', 'info');
          localStorage.setItem('authToken', response.token);
          setTimeout(() => this.router.navigate(['/account']), 1000);
        },
        (error) => this.handleError(error)
      );
    }
  }

  handleError(error: any) {
    switch (error.error.errorCode) {
      case 'EMAIL_TAKEN':
        this.showInfo('This email is already taken.', 'error');
        break;
      case 'USERNAME_TAKEN':
        this.showInfo('This username is already taken.', 'error');
        break;
      case 'CREDENTIALS_INVALID':
        this.showInfo('Username or password is incorrect.', 'error');
        break;
      default:
        this.showInfo('Unexpected error occurred', 'error');
        console.error(error.message);
    }
  }

  showInfo(message: string, type: string) {
    this.infoType = type;
    this.infoMessage = message;
  }

  checkEmailValidity(email: string): string {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/g.test(email)) {
      return 'Please provide a valid Email-address.\n';
    }
    return 'valid';
  }

  checkUsernameValidity(username: string): string {
    let result: string = '';
    if(username.length < 3) {
      result += 'Username is too short.\n';
    }
    return result || 'valid';
  }

  checkPasswordValidity(password: string): string {
    let result = '';
    if (password !== this.repeatPassword) {
      result += 'Passwords don\'t match.\n';
    }
    if (password.length < 8) {
      result += 'Password is too short.\n';
    }
    if (!/[a-z]/.test(password)) {
      result += 'Your password needs to contain at least one small character.\n';
    }
    if (!/[A-Z]/.test(password)) {
      result += 'Your password needs to contain at least one large character.\n';
    }
    if (!/\d/.test(password)) {
      result += 'Your password needs to contain at least one number.\n';
    }
    if (!/\W/.test(password)) {
      result += 'Your password needs to contain at least one special character.\n';
    }
    return result || 'valid';
  }
/*
  ngOnInit() {
    this.authService.authenticate().subscribe(
      (response) => {
        console.log('Secured Content:', response);
      },
      (error) => {
        console.error('Failed to access secured content:', error);
      }
    );
  }
*/
 // protected readonly repeat = repeat;
}
