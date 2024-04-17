import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {ImagesComponent} from "./images.component";
import {ImageInterface} from "../ImageInterface";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgOptimizedImage, ImagesComponent, NgForOf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Heedix Gallery';

  imageInterfaceList: ImageInterface[] = [{
      _id: 0,
      _source: 'assets/images/bild1.jpg',
      _downloads: 10,
      _width: 5586,
      _height: 3142,
      _size: 800000,
      _visible: true
    },
    {
      _id: 1,
      _source: "assets/images/bild2.jpg",
      _downloads: 0,
      _width: 300,
      _height: 500,
      _size: 0,
      _visible: true
    },
    {
      _id: 2,
      _source: "assets/images/bild3.jpg",
      _downloads: 0,
      _width: 300,
      _height: 500,
      _size: 0,
      _visible: true
    },
    {
      _id: 3,
      _source: "assets/images/bild1.jpg",
      _downloads: 0,
      _width: 300,
      _height: 500,
      _size: 0,
      _visible: true
    },
    {
      _id: 4,
      _source: "assets/images/bild2.jpg",
      _downloads: 0,
      _width: 300,
      _height: 500,
      _size: 0,
      _visible: true
    },
    {
      _id: 5,
      _source: "assets/images/bild3.jpg",
      _downloads: 0,
      _width: 300,
      _height: 500,
      _size: 0,
      _visible: true
    }
  ]
}
