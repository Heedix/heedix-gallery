import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {SidebarComponent} from "../sidebar/sidebar.component";
import {NgClass, NgIf, NgOptimizedImage} from "@angular/common";
import {repeat} from "rxjs";
import {response} from "express";
import {error} from "@angular/compiler-cli/src/transformers/util";

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
      this.loginRegisterToggleText = this.registerToggleText
    } else {
      this.loginRegisterButtonText = this.loginButtonText;
      this.loginRegisterToggleText = this.loginToggleText;
    }
  }

  clearPage() {
    this.email = '';
    this.username = '';
    this.password = '';
    this.repeatPassword = '';
  }

  onSubmit() {
    if(this.isRegisterShown) {
      if(this.password != this.repeatPassword) {
        console.error('Passwords don\'t match.')
      } else {
        this.authService.register(this.email, this.username, this.password).subscribe(
          (res) => {
            console.log(res);
            this.toggleRegisterShown()
            this.clearPage();
          },
          (err) => {
            console.error('Registration failed', err)
          }
        );
      }
    } else {
      this.authService.login(this.username, this.password).subscribe(
        (response) => {
          // Erfolgreiches Login
          this.router.navigate(['/']).then(r => r);  // Navigiere zu einer sicheren Seite
        },
        (error) => {
          // Fehler beim Login
          console.error('Login fehlgeschlagen', error);
        }
      );
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
