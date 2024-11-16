import {Component, OnInit} from '@angular/core';
import {FolderCardComponent} from "./folder-card/folder-card.component";
import {NgForOf, NgIf} from "@angular/common";
import {SearchbarComponent} from "../searchbar/searchbar.component";
import {folderOrImageInterface} from "../../interfaces/folderOrImageInterface";
import {ImageService} from "../../services/image.service";
import {FolderService} from "../../services/folder.service";
import {ImageCardComponent} from "./image-card/image-card.component";
import {AccountContentFilterComponent} from "./account-content-filter/account-content-filter.component";

@Component({
  selector: 'app-account-content-view',
  standalone: true,
  imports: [
    FolderCardComponent,
    NgForOf,
    SearchbarComponent,
    NgIf,
    ImageCardComponent,
    AccountContentFilterComponent
  ],
  templateUrl: './account-content-view.component.html',
  styleUrl: './account-content-view.component.css'
})
export class AccountContentViewComponent implements OnInit {
  items: folderOrImageInterface[] = [];
  prefilteredItems: folderOrImageInterface[] = [];
  filteredItems: folderOrImageInterface[] = [];
  folderViewShown = true;

  query = '';
  filter = {
    visibility: '',
    type: ''
  }

  folders: folderOrImageInterface[] = [];

  images: folderOrImageInterface[] = [];

  constructor(private imageService: ImageService, private folderService: FolderService) {
  }

  onSearch(query: string) {
    this.query = query;
    this.searchFilter()
  }

  setFilter(filter: any) {
    this.filter = filter;
    this.applyFilter();
  }

  applyFilter() {
    if (this.items) {
      switch (this.filter.visibility) {
        case '':
          this.prefilteredItems = this.items
          break
        case 'public':
          this.prefilteredItems = this.items.filter(item => item.visibility === 'Public');
          break;
        case 'not-listed':
          this.prefilteredItems = this.items.filter(item => item.visibility === 'Not-Listed');
          break;
        case 'private':
          this.prefilteredItems = this.items.filter(item => item.visibility === 'Private');
          break;
        case 'owned':
          this.prefilteredItems = this.items.filter(item => item.username === localStorage.getItem('username'));
          break;
      }
    }
    this.searchFilter()
  }

  searchFilter() {
    if (this.items) {
      this.filteredItems = this.prefilteredItems.filter(item =>
        item.name.toLowerCase().includes(this.query.toLowerCase()) ||
        item.username.toLowerCase().includes(this.query.toLowerCase())
      );
    }
  }

  onToggleFolderImage() {
    this.folderViewShown = !this.folderViewShown;
    if (this.folderViewShown) {
      this.items = this.folders;
      this.applyFilter()
    } else {
      this.items = this.images;
      this.applyFilter()
    }
  }

  async ngOnInit() {
    this.folders = await this.folderService.getAccountFolders();
    this.images = await this.imageService.getAccountImages();
    this.items = this.folders;
    this.prefilteredItems = this.folders;
    this.onSearch(this.query);
  }
}
