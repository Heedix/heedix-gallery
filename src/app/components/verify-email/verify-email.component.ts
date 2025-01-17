import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from '@angular/common/http';
import {NgClass} from "@angular/common";
import { Router } from '@angular/router';
import {SidebarComponent} from "../sidebar/sidebar.component";
import {environment} from "../../environments/environment";

const API_URL = environment.apiUrl;

@Component({
  selector: 'app-verify-email',
  standalone: true,
    imports: [
        NgClass,
        SidebarComponent
    ],
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.css'
})
export class VerifyEmailComponent implements OnInit {
  token: string | null = null;
  infoMessage: string = 'Verification in progress...';
  infoType: string = 'neutral';

  /**
   * Constructor to inject services
   * @param {ActivatedRoute} route - The activated route to get query parameters
   * @param {HttpClient} http - The HTTP client for making requests
   * @param {Router} router - The router service for navigation
   */
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  /**
   * Displays a notification message
   * @param {string} message - The message to display
   * @param {string} [type='info'] - The type of the message
   */
  notification(message: string, type: string = 'info'): void {
    this.infoMessage = message;
    this.infoType = type;
  }

  /**
   * OnInit lifecycle hook to verify the email token
   */
  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.token = params.get('token');
      if (this.token) {
        this.http.get(`${API_URL}/verify?token=` + this.token).subscribe(
          () => {
            this.notification('Verification successful!', 'info')
            setTimeout(() => this.router.navigate(['/']), 5000);
          },
          (error) => this.notification('Token invalid try getting a new one' , 'error')
        );
      } else {
        this.notification('No token provided', 'error');
      }
    });
  }
}
