import {Component, Input, OnInit} from '@angular/core';
import {NgClass, NgOptimizedImage} from "@angular/common";
import {ImageService} from "../../../services/image.service";

@Component({
  selector: 'app-image-card',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgClass
  ],
  templateUrl: './image-card.component.html',
  styleUrl: './image-card.component.css'
})
export class ImageCardComponent implements OnInit{
  @Input() image: any;

  signedUrl: string | null = null;

  formatedDate: string | null = null;

  constructor(private imageService: ImageService) {}

  ngOnInit() {
    this.imageService.getSignedImageUrl(this.image.source).subscribe(response => {
      this.signedUrl = response.signedUrl;
      let date = new Date(this.image.date);
      this.formatedDate = date.toLocaleDateString("de-DE", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    });
  }
}
