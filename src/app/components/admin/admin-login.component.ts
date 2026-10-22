import {Component} from '@angular/core';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {finalize} from 'rxjs';
import {SidebarComponent} from '../sidebar/sidebar.component';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule, NgIf, RouterLink, SidebarComponent],
  templateUrl: './admin-login.component.html',
  styleUrls: ['./gallery-controls.css', './admin-login.component.css']
})
export class AdminLoginComponent {
  username = '';
  password = '';
  submitting = false;
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  login(): void {
    if (this.submitting || !this.username.trim() || !this.password) return;
    this.submitting = true;
    this.error = '';
    this.auth.adminLogin(this.username.trim(), this.password).pipe(
      finalize(() => this.submitting = false)
    ).subscribe({
      next: response => {
        this.auth.storeSession(response);
        this.router.navigate(['/admin']);
      },
      error: error => {
        this.error = error.status === 403 ? 'This account does not have administrator permissions.'
          : error.error?.errorCode === 'CREDENTIALS_INVALID' ? 'Username or password is incorrect.'
          : 'Unable to log in right now. Please try again.';
      }
    });
  }
}
