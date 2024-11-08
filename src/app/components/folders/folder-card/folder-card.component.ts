import { Component } from '@angular/core';
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
  folderName = 'Bilder_12.12.2012';
  folderOwner = 'Owner23132132';
  folderImages = 30;
  folderDownloads = 331232
  folderDate = '13.12.2012'
  visibility = 'Private'
  thumbnailSource = 'assets/images/bild3.jpg'

}
