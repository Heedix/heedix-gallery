import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-add-image-folder-card',
  standalone: true,
  imports: [],
  templateUrl: './add-image-folder-card.component.html',
  styleUrl: './add-image-folder-card.component.css'
})
export class AddImageFolderCardComponent {
  @Input() itemType: string | undefined;
}
