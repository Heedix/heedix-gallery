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
  visibility = 'not-listed';
  width = 0;
  make = '';
  height = 0;
  model = '';
  size = 0;
  lensModel = '';
  uploadDate =  new Date().toISOString().slice(0, 16);
  exposureTime = '';
  creationDate: Date | undefined;
  iso = '';
  bitsPerPixel = 0;
  aperture = '';
  colorSpace = '';
  focalLength = '';
  whiteBalance = '';
  focalLengthEquivalent = '';


}
