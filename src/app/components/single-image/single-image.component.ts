import {Component, inject, Input, OnInit} from '@angular/core';
import {ImageInterface} from "../../interfaces/ImageInterface";
import {NavbarComponent} from "../navbar/navbar.component";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {ImageService} from "../../services/image.service";
import * as ExifReader from 'exifreader';
import {readFile} from "node:fs";

@Component({
  selector: 'app-single-image',
  standalone: true,
  imports: [
    NavbarComponent,
    NgOptimizedImage,
    NgForOf
  ],
  templateUrl: './single-image.component.html',
  styleUrl: './single-image.component.css'
})
export class SingleImageComponent implements OnInit{


  private route = inject(ActivatedRoute);

  imageInterfaces: ImageInterface[] = [];

  constructor(private imageService:ImageService) {}

  async ngOnInit() {
    const imageId = Number(this.route.snapshot.paramMap.get('id'))

    this.imageService.getImageById(imageId).subscribe((imageInterface) => {
      this.imageInterfaces = imageInterface.map((item: any) => ({
        imageId: item.imageid,
        source: item.source,
        downloads: item.downloads,
        width: item.width,
        height: item.height,
        size: parseInt(item.size),
        visible: item.visible
      }));
      console.log(this.imageInterfaces)

    })

    //const file = this.imageInterfaces[0].source;
    const tags = await ExifReader.load('../assets/images/bild2.jpg');
    // @ts-ignore
    const imageDate = tags['DateTimeOriginal'].description;
    // @ts-ignore
    const unprocessedTagValue = tags['DateTimeOriginal'].value;

    console.log(imageDate + unprocessedTagValue + 'fdsfsd')

  }
}
