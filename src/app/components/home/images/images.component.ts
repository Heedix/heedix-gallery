import {Component, Input, Output} from "@angular/core";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {ImageInterface} from "../../../interfaces/ImageInterface";
import {RouterLink, RouterLinkActive} from "@angular/router";

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
export class ImagesComponent {

  @Input() imageInterface!: ImageInterface;

}
