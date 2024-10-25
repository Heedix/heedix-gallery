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

  errorOccurred: boolean = false;
  errorMessage: string = '';

  isRegisterShown = false;
  loginRegisterToggleText: string = this.loginToggleText;
  loginRegisterButtonText: string = this.loginButtonText;

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

  clearPage() {
    this.email = '';
    this.username = '';
    this.password = '';
    this.repeatPassword = '';
    this.errorOccurred = false;
    this.errorMessage = '';
  }

  onSubmit() {
    if(this.isRegisterShown) {
      if(this.password != this.repeatPassword) {
        this.showError('Passwords don\'t match.');
      } else {
        this.authService.register(this.email, this.username, this.password).subscribe(
          (response) => {
            console.log('result in frontend'+ response);
            this.toggleRegisterShown()
            this.clearPage();
          },
          (error) => {
            if (error.error.errorCode === 'USERNAME_TAKEN') {
              this.showError('This username is already taken.');
            } else if (error.error.errorCode === 'EMAIL_TAKEN') {
              this.showError('This email-address is already taken.');
            } else {
              this.showError(error.error.message);
            }
          }
        );
      }
    } else {
      this.authService.login(this.username, this.password).subscribe(
        (response) => {
          // Erfolgreiches Login
          console.log(response)
          //this.router.navigate(['/']).then(r => r);  // Navigiere zu einer sicheren Seite
        },
        (error) => {
          if (error.status === 400) {
            console.log(error.error.message)
          } else {
            // Allgemeiner Fehler
            console.error('Ein unerwarteter Fehler ist aufgetreten', error.message);
          }
        }
      );
    }
  }

  showError(message: string) {
    this.errorOccurred = true;
    this.errorMessage = message;
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
