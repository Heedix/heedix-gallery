import {Component} from "@angular/core";
import {NgOptimizedImage} from "@angular/common";

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

}
