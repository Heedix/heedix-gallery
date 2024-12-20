import {Component, Input, OnInit} from '@angular/core';
import {NgClass, NgIf, NgOptimizedImage} from "@angular/common";
import {FolderService} from "../../../services/folder.service";
import {ImageService} from "../../../services/image.service";
import {AccountSidebarComponent} from "../../account-sidebar/account-sidebar.component";
import {NotificationBarComponent} from "../../notification-bar/notification-bar.component";

@Component({
  selector: 'app-folder-card',
  standalone: true,
    imports: [
        NgOptimizedImage,
        NgClass,
        NgIf,
        AccountSidebarComponent,
        NotificationBarComponent
    ],
  templateUrl: './folder-card.component.html',
  styleUrl: './folder-card.component.css'
})
export class FolderCardComponent implements OnInit{
  @Input() folder: any;

  signedUrl: string | null = null;

  formatedDate: string | null = null;

  constructor(private imageService: ImageService) {}

  /**
   * OnInit lifecycle hook to get signed image URL and format the date
   */
  ngOnInit() {
    this.imageService.getSignedImageUrl(this.folder.source).subscribe(response => {
      this.signedUrl = response.signedUrl;
      let date = new Date(this.folder.date);
      this.formatedDate = date.toLocaleDateString("de-DE", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    });
  }
}
