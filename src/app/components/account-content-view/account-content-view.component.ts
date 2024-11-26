import {Component, OnInit} from '@angular/core';
import {FolderCardComponent} from "./folder-card/folder-card.component";
import {NgForOf, NgIf} from "@angular/common";
import {SearchbarComponent} from "../searchbar/searchbar.component";
import {folderOrImageInterface} from "../../interfaces/folderOrImageInterface";
import {ImageService} from "../../services/image.service";
import {FolderService} from "../../services/folder.service";
import {ImageCardComponent} from "./image-card/image-card.component";
import {AccountSidebarComponent} from "../account-sidebar/account-sidebar.component";

@Component({
  selector: 'app-account-content-view',
  standalone: true,
  imports: [
    FolderCardComponent,
    NgForOf,
    SearchbarComponent,
    NgIf,
    ImageCardComponent,
    AccountSidebarComponent
  ],
  templateUrl: './account-content-view.component.html',
  styleUrl: './account-content-view.component.css'
})
export class AccountContentViewComponent implements OnInit {
  items: folderOrImageInterface[] = [];
  filteredItems: folderOrImageInterface[] = [];
  folderViewShown = true;
  query = '';

  folders: folderOrImageInterface[] = []

  images: folderOrImageInterface[] = []

  constructor(private imageService:ImageService, private folderService: FolderService) {}

  onSearch(query: string) {
    if (this.items) {
      this.query = query;
      this.filteredItems = this.items.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.username.toLowerCase().includes(query.toLowerCase()) ||
        item.date.toLowerCase().includes(query.toLowerCase())
      );
    }
  }

  onToggleFolderImage() {
    this.folderViewShown = !this.folderViewShown;
    if (this.folderViewShown) {
      this.items = this.folders;
      this.onSearch(this.query);
    } else {
      this.items = this.images;
      this.onSearch(this.query);
    }
  }

  async ngOnInit() {
    this.folders = await this.folderService.getAccountFolders();
    this.images = await this.imageService.getAccountImages();
    this.items = this.folders;
    this.onSearch(this.query);
  }
}
