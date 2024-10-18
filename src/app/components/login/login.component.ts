import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {SidebarComponent} from "../sidebar/sidebar.component";
import {NgClass, NgIf} from "@angular/common";
import {repeat} from "rxjs";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    SidebarComponent,
    NgClass,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  isRegisterShown = false;

  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  toggleRegisterShown(): void {
    this.isRegisterShown = !this.isRegisterShown;
  }

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        // Erfolgreiches Login
        this.router.navigate(['/']);  // Navigiere zu einer sicheren Seite
      },
      (error) => {
        // Fehler beim Login
        console.error('Login fehlgeschlagen', error);
      }
    );
  }

  protected readonly repeat = repeat;
}
