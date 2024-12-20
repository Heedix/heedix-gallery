import { Component } from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {AccountSidebarComponent} from "../account-sidebar/account-sidebar.component";
import {NotificationBarComponent} from "../notification-bar/notification-bar.component";
import {SidebarComponent} from "../sidebar/sidebar.component";

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [
    NavbarComponent,
    AccountSidebarComponent,
    NotificationBarComponent,
    SidebarComponent
  ],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {

}
