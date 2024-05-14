import {Component, Input, Output} from '@angular/core';
import {ImageInterface} from "../../../interfaces/ImageInterface";
import {NgOptimizedImage} from "@angular/common";
import {MatSlideToggleChange, MatSlideToggleModule} from '@angular/material/slide-toggle';
import {ThemePalette} from "@angular/material/core";
import EventEmitter from "node:events";

@Component({
  selector: 'app-image-edit-card',
  standalone: true,
  imports: [
    NgOptimizedImage,
    MatSlideToggleModule
  ],
  templateUrl: './image-edit-card.component.html',
  styleUrl: './image-edit-card.component.css'
})
export class ImageEditCardComponent {
  @Input() imageInterface!: ImageInterface;
  color: ThemePalette = 'primary';

  public toggle(event: MatSlideToggleChange) {
    console.log('toggle', event.checked);
  }
}
