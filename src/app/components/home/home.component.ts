import {Component, OnInit} from '@angular/core';
import {ImageInterface} from "../../interfaces/ImageInterface";
import {ImageService} from "../../services/image.service";
import {ImagesComponent} from "./images/images.component";
import {NgForOf} from "@angular/common";
import {NavbarComponent} from "../navbar/navbar.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ImagesComponent,
    NgForOf,
    NavbarComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  imageInterfaceList: ImageInterface[] = [];

  constructor(private imageService:ImageService) {}

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
        visible: item.visible
      }));
      console.log(this.imageInterfaceList)
    })
  }
}
