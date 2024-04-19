import {Component, Input} from "@angular/core";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {ImageInterface} from "../../../interfaces/ImageInterface";

@Component({
  selector: 'app-images',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgIf
  ],
  templateUrl: './images.component.html',
  styleUrl: './images.component.css'
})
export class ImagesComponent {

  @Input() imageInterface!: ImageInterface;

}
