import { Component } from '@angular/core';
import {FolderCardComponent} from "./folder-card/folder-card.component";

@Component({
  selector: 'app-folders',
  standalone: true,
  imports: [
    FolderCardComponent
  ],
  templateUrl: './folders.component.html',
  styleUrl: './folders.component.css'
})
export class FoldersComponent {

}
