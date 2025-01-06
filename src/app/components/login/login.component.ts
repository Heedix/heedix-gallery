import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {SidebarComponent} from "../sidebar/sidebar.component";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {NotificationService} from "../../services/notification.service";
import {AccountSidebarComponent} from "../account-sidebar/account-sidebar.component";

@Component({
  selector: 'app-login',
  standalone: true,
    imports: [
        FormsModule,
        SidebarComponent,
        NgIf,
        NgOptimizedImage,
        AccountSidebarComponent
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  loginButtonText: string = 'Login';
  registerButtonText: string = 'Register';

  loginToggleText: string = 'not registered yet?';
  registerToggleText: string = 'already have an account?';

  isRegisterShown = false;
  loginRegisterToggleText: string = this.loginToggleText;
  loginRegisterButtonText: string = this.loginButtonText;

  isPasswordVisible: boolean = false;
  togglePasswordVisibilityIconSrc: string = 'assets/icons/closed-eye-gray.svg'

  email: string = '';
  username: string = '';
  password: string = '';
  repeatPassword: string = '';

  /**
   * Constructor to inject services
   * @param {AuthService} authService - The authentication service
   * @param {Router} router - The router service for navigation
   * @param {NotificationService} notificationService - The notification service
   */
  constructor(private authService: AuthService, private router: Router, private notificationService: NotificationService) {}

  /**
   * Toggles registration visibility
   */
  toggleRegisterShown(): void {
    this.isRegisterShown = !this.isRegisterShown;
    this.loginRegisterButtonText = this.isRegisterShown ? this.registerButtonText : this.loginButtonText;
    this.loginRegisterToggleText = this.isRegisterShown ? this.registerToggleText : this.loginToggleText;
    this.clearPage();
  }

  /**
   * Toggles the password visibility
   */
  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
    this.togglePasswordVisibilityIconSrc = this.isPasswordVisible ? 'assets/icons/opened-eye-gray.svg' : 'assets/icons/closed-eye-gray.svg';
  }

  /**
   * Clears the form fields
   */
  clearPage() {
    this.email = '';
    this.username = '';
    this.password = '';
    this.repeatPassword = '';
  }

  /**
   * Checks if the form is valid
   * @returns {boolean} - True if the form is valid, false otherwise
   */
  isFormValid(): boolean {
    if (this.isRegisterShown) {
      return this.email.trim() !== '' && this.username.trim() !== '' && this.password.trim() !== '' && this.repeatPassword.trim() !== '';
    } else {
      return this.username.trim() !== '' && this.password.trim() !== '';
    }
  }

  /**
   * Handles the form submission for login or registration
   */
  onSubmit() {
    this.email = this.email.trim();
    this.username = this.username.trim();
    this.password = this.password.trim();
    this.repeatPassword = this.repeatPassword.trim();

    if (this.isRegisterShown) {
      const emailValidity = this.checkEmailValidity(this.email);
      const usernameValidity = this.checkUsernameValidity(this.username);
      const passwordValidity = this.checkPasswordValidity(this.password);

      if (emailValidity && usernameValidity && passwordValidity) {
        this.authService.register(this.email, this.username, this.password).subscribe(
          () => {
            this.toggleRegisterShown();
            this.clearPage();
            this.sendNotification('Registration successful', 'success', 5);
            this.sendNotification('Please verify your email address', 'info', -1);
          },
          (error) => this.handleError(error)
        );
      }
    } else {
      this.authService.login(this.username, this.password).subscribe(
        (response) => {
          this.sendNotification('login successful', 'success', 5);
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('username', response.username);
          localStorage.setItem('userId', response.userId);
          setTimeout(() => this.router.navigate(['/dashboard']), 1000);
        },
        (error) => this.handleError(error)
      );
    }
  }

  /**
   * Handles errors during login or registration
   * @param {any} error - The error object
   */
  handleError(error: any) {
    switch (error.error.errorCode) {
      case 'EMAIL_TAKEN':
        this.sendNotification('This email is already taken.', 'error', 5);
        break;
      case 'USERNAME_TAKEN':
        this.sendNotification('This username is already taken.', 'error', 5);
        break;
      case 'CREDENTIALS_INVALID':
        this.sendNotification('Username or password is incorrect.', 'error', 5);
        break;
      default:
        this.sendNotification('Unexpected error occurred', 'error', 5);
        console.error(error.message);
    }
  }

  /**
   * Sends a notification
   * @param {string} content - The content of the notification
   * @param {string} type - The type of the notification
   * @param {number} expirationTime - The expiration time of the notification
   */
  sendNotification(content: string, type: string, expirationTime: number) {
    this.notificationService.addNotification(content, type, expirationTime);
  }

  /**
   * Checks the validity of the email
   * @param {string} email - The email to check
   * @returns {boolean} - True if the email is valid, false otherwise
   */
  checkEmailValidity(email: string): boolean {
    let result = true;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/g.test(email)) {
      this.sendNotification('Please provide a valid Email-address.', 'error', 5);
      result = false;
    }
    return result;
  }

  /**
   * Checks the validity of the username
   * @param {string} username - The username to check
   * @returns {boolean} - True if the username is valid, false otherwise
   */
  checkUsernameValidity(username: string): boolean {
    let result = true;
    if(username.length < 3) {
      this.sendNotification('Username is too short.', 'error', 5);
      result = false;
    }
    return result
  }

  /**
   * Checks the validity of the password
   * @param {string} password - The password to check
   * @returns {boolean} - True if the password is valid, false otherwise
   */
  checkPasswordValidity(password: string):boolean{
    let result = true;
    if (password !== this.repeatPassword) {
      this.sendNotification('Passwords don\'t match.', 'error', 5);
      result = false;
    }
    if (password.length < 8) {
      this.sendNotification('Password is too short.', 'error', 5);
      result = false;
    }
    if (!/[a-z]/.test(password)) {
      this.sendNotification('Your password needs to contain at least one small character.', 'error', 5);
      result = false;
    }
    if (!/[A-Z]/.test(password)) {
      this.sendNotification('Your password needs to contain at least one large character.', 'error', 5);
      result = false;
    }
    if (!/\d/.test(password)) {
      this.sendNotification('Your password needs to contain at least one number.', 'error', 5);
      result = false;
    }
    if (!/\W/.test(password)) {
      this.sendNotification('Your password needs to contain at least one special character.', 'error', 5);
      result = false;
    }
    return result;
  }
}
