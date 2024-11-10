import {Component, Input} from '@angular/core';
import {NgClass, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-folder-card',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgClass
  ],
  templateUrl: './folder-card.component.html',
  styleUrl: './folder-card.component.css'
})
export class FolderCardComponent {
  @Input() folder: any;
}
