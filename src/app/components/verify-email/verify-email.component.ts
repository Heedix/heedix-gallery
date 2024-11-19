import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from '@angular/common/http';
import {NgClass} from "@angular/common";
import { Router } from '@angular/router';
import {FormGroupName} from "@angular/forms";

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.css'
})
export class VerifyEmailComponent implements OnInit {
  token: string | null = null;
  infoMessage: string = 'Verification in progress...';
  infoType: string = 'neutral';

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}


  notification(message: string, type: string = 'info'): void {
    this.infoMessage = message;
    this.infoType = type;
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.token = params.get('token');
      if (this.token) {
        this.http.get('http://localhost:3000/verify?token=' + this.token).subscribe( //TODO: Change to your server
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