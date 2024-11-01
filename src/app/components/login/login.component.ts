import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {SidebarComponent} from "../sidebar/sidebar.component";
import {NgClass, NgIf, NgOptimizedImage} from "@angular/common";
import {repeat} from "rxjs";


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

  email: string = '';
  username: string = '';
  password: string = '';
  repeatPassword: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  toggleRegisterShown(): void {
    this.isRegisterShown = !this.isRegisterShown;
    if(this.isRegisterShown) {
      this.loginRegisterButtonText = this.registerButtonText;
      this.loginRegisterToggleText = this.registerToggleText;
      this.clearPage();
    } else {
      this.loginRegisterButtonText = this.loginButtonText;
      this.loginRegisterToggleText = this.loginToggleText;
      this.clearPage();
    }
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
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
    this.email = this.email.replace(/\s+/g, "");
    this.username = this.username.replace(/\s+/g, "");
    this.password = this.password.replace(/\s+/g, "");
    this.repeatPassword = this.repeatPassword.replace(/\s+/g, "");

    if(this.isRegisterShown) {
      let emailValidity = this.checkEmailValidity(this.email);
      let usernameValidity = this.checkUsernameValidity(this.username);
      let passwordValidity = this.checkPasswordValidity(this.password);
      if(emailValidity === 'valid' && usernameValidity === 'valid' && passwordValidity === 'valid') {
        this.authService.register(this.email, this.username, this.password).subscribe(
          (response) => {
            console.log('result in frontend'+ response);
            this.toggleRegisterShown()
            this.clearPage();
          },
          (error) => {
            switch (error.error.errorCode) {
              case 'EMAIL_TAKEN':
                this.showInfo('This email is already taken.', 'error');
                break;
              case 'USERNAME_TAKEN':
                this.showInfo('This username is already taken.', 'error');
                break;
              default:
                this.showInfo(error.error.message, 'error');
            }
          }
        );
      } else {
        this.showInfo(emailValidity + usernameValidity + passwordValidity, 'error');
      }
    } else {
      this.authService.login(this.username, this.password).subscribe(
        (response) => {
          this.showInfo('login successful', 'info');
          localStorage.setItem('authToken', response.token);
          console.log(response.token)
          //this.router.navigate(['/']).then(r => r);  // Navigiere zu einer sicheren Seite
        },
        (error) => {
          if (error.error.errorCode === 'CREDENTIALS_INVALID') {
            this.showInfo('Username or password is incorrect.', 'error')
          } else {
            this.showInfo('Unexpected error occurred', 'error');
            console.error(error.message)
          }
        }
      );
    }
  }

  showInfo(message: string, type: string) {
    this.infoType = type;
    this.infoMessage = message;
  }

  checkEmailValidity(email: string): string {
    let isEmailValid: boolean = true;
    let result: string = '';

    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/g.test(email)) {
      result += 'Please provide a valid Email-address.\n';
      isEmailValid = false;
    }
    if(isEmailValid) {
      return 'valid';
    } else {
      return result;
    }
  }

  checkUsernameValidity(username: string): string {
    let isUsernameValid: boolean = true;
    let result: string = '';

    if(this.username.length < 3) {
      result += 'Username is too short.\n';
      isUsernameValid = false;
    }
    if(isUsernameValid) {
      return 'valid';
    } else {
      return result;
    }
  }

  checkPasswordValidity(password: string): string {
    let isPasswordValid: boolean = true;
    let result: string = '';

    if(this.password != this.repeatPassword) {
      result += 'Passwords don\'t match.\n';
      isPasswordValid = false;
    } if(this.password.length < 8) {
      result += 'Password is too short.\n';
      isPasswordValid = false;
    } if(!/^.*[a-z]+.*$/g.test(password)) {
      result += 'Your password needs to contain at least one small character.\n';
      isPasswordValid = false;
    } if(!/^.*[A-Z]+.*$/g.test(password)) {
      result += 'Your password needs to contain at least one large character.\n';
      isPasswordValid = false;
    } if(!/^.*\d+.*$/g.test(password)) {
      result += 'Your password needs to contain at least one number.\n';
      isPasswordValid = false;
    } if(!/^.*\W+.*$/g.test(password)) {
      result += 'Your password needs to contain at least one special character.\n';
      isPasswordValid = false;
    }
    if(isPasswordValid) {
      return 'valid';
    } else {
      return result;
    }
  }
/*
  ngOnInit() {
    this.authService.authenticate().subscribe(
      (response) => {
        console.log('Geschützter Inhalt:', response);
      },
      (error) => {
        console.error('Fehler beim Zugriff auf geschützten Inhalt:', error);
      }
    );
  }
*/
  protected readonly repeat = repeat;
}
