import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgOptimizedImage} from "@angular/common";
import {ImagesComponent} from "./components/home/images/images.component";
import {ImageService} from "./services/image.service";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {AccountSidebarComponent} from "./components/account-sidebar/account-sidebar.component";
import {NotificationBarComponent} from "./components/notification-bar/notification-bar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ImagesComponent, NavbarComponent, NgOptimizedImage, AccountSidebarComponent, NotificationBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:  [ ImageService ]
})
export class AppComponent {
  title = 'Heedix Gallery';
}
