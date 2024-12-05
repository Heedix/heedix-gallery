import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-add-image',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './add-image.component.html',
  styleUrl: './add-image.component.css'
})
export class AddImageComponent {
  name = '';
  width = 0;
  height = 0;
  size = 0;
  uploadDate =  new Date();
  creationDate: Date | undefined;
  bitsPerPixel = 0;
  colorSpace = '';
  whiteBalance = '';
  visibility = 'not-listed';
  make = '';
  model = '';
  lensModel = '';
  exposureTime = '';
  iso = '';
  aperture = '';
  focalLength = '';
  focalLengthEquivalent = '';
}
