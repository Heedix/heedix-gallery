import {Component, inject, Input, OnInit} from '@angular/core';
import {ImageInterface} from "../../interfaces/ImageInterface";
import {NavbarComponent} from "../navbar/navbar.component";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {ImageService} from "../../services/image.service";
import * as ExifReader from 'exifreader';
import {readFile} from "node:fs";
import {Router} from "@angular/router";

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

  constructor(private imageService:ImageService, private router: Router) {};

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
      if(this.imageInterfaces[0] == null) {
        this.router.navigate(['']) //TODO ** Rout einfügen
      }
    })

    //const file = this.imageInterfaces[0].source;
    /*const tags = await ExifReader.load('../assets/images/bild2.jpg');
    // @ts-ignore
    const imageDate = tags['DateTimeOriginal'].description;
    // @ts-ignore
    const unprocessedTagValue = tags['DateTimeOriginal'].value;

    console.log(imageDate + unprocessedTagValue + 'fdsfsd');*/

  }

  copyLink = () => {
    let link = "http://heedix.de/image/" + this.imageInterfaces[0].imageId;
    navigator.clipboard.writeText(link).then(r => r);
  }
}
