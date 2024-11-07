import {Component, Input, OnInit} from "@angular/core";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {ImageInterface} from "../../../interfaces/ImageInterface";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {ImageService} from "../../../services/image.service";

@Component({
  selector: 'app-images',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgIf,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './images.component.html',
  styleUrl: './images.component.css'
})
export class ImagesComponent implements OnInit {

  @Input() imageInterface!: ImageInterface;

  signedUrl: string | null = null;

  constructor(private imageService: ImageService) {}

  ngOnInit() {
    this.imageService.getSignedImageUrl(this.imageInterface.source).subscribe(response => {
      this.signedUrl = response.signedUrl;
    });
  }
}
