import {Component, inject, OnInit} from '@angular/core';
import {ImageInterface} from "../../interfaces/ImageInterface";
import {NavbarComponent} from "../navbar/navbar.component";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {ImageService} from "../../services/image.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-single-image',
  standalone: true,
  imports: [
    NavbarComponent,
    NgOptimizedImage,
    NgIf
  ],
  templateUrl: './single-image.component.html',
  styleUrl: './single-image.component.css'
})
export class SingleImageComponent implements OnInit{


  private route = inject(ActivatedRoute);

  imageInterfaces: ImageInterface[] = [];

  singleImage: ImageInterface | undefined;

  constructor(private imageService:ImageService, private router: Router) {};

  async ngOnInit() {
    const imageId = Number(this.route.snapshot.paramMap.get('id'));

    console.log("Hallo ich bin die id " + imageId);

    if(isNaN(imageId) || imageId === undefined) {
      await this.router.navigate(['**'])
      return;
    }

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
      this.singleImage = this.imageInterfaces[0];
      if (this.singleImage == undefined) {
        this.router.navigate(['**'])
      }
    }
  )

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
