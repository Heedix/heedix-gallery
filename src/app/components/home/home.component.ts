import {Component, OnInit} from '@angular/core';
import {ImageInterface} from "../../interfaces/ImageInterface";
import {ImageService} from "../../services/image.service";
import {ImagesComponent} from "./images/images.component";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {NavbarComponent} from "../navbar/navbar.component";
import {SidebarComponent} from "../sidebar/sidebar.component";
import {UploadComponent} from "../upload/upload.component";
import {AccountSidebarComponent} from "../account-sidebar/account-sidebar.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ImagesComponent,
    NgForOf,
    NavbarComponent,
    NgOptimizedImage,
    SidebarComponent,
    UploadComponent,
    AccountSidebarComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {

  imageInterfaceList: ImageInterface[] = [];

  constructor(private imageService:ImageService) {}

  ngOnInit() {
    this.imageService.getImages().subscribe((imageInterfaceList) => {
      this.imageInterfaceList = imageInterfaceList.map((item: any) => ({
        imageId: item.imageid,
        source: item.source,
        downloads: item.downloads,
        width: item.width,
        height: item.height,
        size: parseInt(item.size),
        visibility: item.visibility
      }));
      console.log(this.imageInterfaceList)
    })
  }
}
