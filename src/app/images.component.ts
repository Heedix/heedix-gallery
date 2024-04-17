import {Component, Input} from "@angular/core";
import {NgOptimizedImage} from "@angular/common";
import {ImageInterface} from "../ImageInterface";

@Component({
  selector: 'image',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './images.component.html',
  styleUrl: './images.component.css'
})
export class ImagesComponent {
  @Input() imageInterface!: ImageInterface;
  
}
