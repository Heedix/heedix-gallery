import {Component, OnInit} from '@angular/core';
import {ImageInterface} from "../../interfaces/ImageInterface";
import {ImageService} from "../../services/image.service";
import {NavbarComponent} from "../navbar/navbar.component";
import {ImageEditCardComponent} from "./image-edit-card/image-edit-card.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    NavbarComponent,
    ImageEditCardComponent,
    NgForOf
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit{

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
