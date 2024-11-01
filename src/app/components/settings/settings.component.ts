import {Component, OnInit} from '@angular/core';
import {ImageInterface} from "../../interfaces/ImageInterface";
import {ImageService} from "../../services/image.service";
import {NavbarComponent} from "../navbar/navbar.component";
import {ImageEditCardComponent} from "./image-edit-card/image-edit-card.component";
import {NgForOf, NgIf} from "@angular/common";
import {SidebarComponent} from "../sidebar/sidebar.component";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    NavbarComponent,
    ImageEditCardComponent,
    NgForOf,
    SidebarComponent,
    NgIf
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit{

  imageInterfaceList: ImageInterface[] = [];

  constructor(private imageService:ImageService, private authService: AuthService) {}

  isAuthenticated: boolean = this.authService.isAuthenticated();

  ngOnInit() {
    this.imageService.getImages();
    this.imageService.getImages().subscribe((imageInterfaceList) => {
      this.imageInterfaceList = imageInterfaceList.map((item: any) => ({
        imageId: item.imageid,
        source: item.source,
        downloads: item.downloads,
        width: item.width,
        height: item.height,
        size: parseInt(item.size),
        public: item.public
      }));
      console.log(this.imageInterfaceList)
    })
  }
}
