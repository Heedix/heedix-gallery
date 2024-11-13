import {Component, OnInit} from '@angular/core';
import {FolderCardComponent} from "./folder-card/folder-card.component";
import {NgForOf, NgIf} from "@angular/common";
import {SearchbarComponent} from "../searchbar/searchbar.component";
import {folderOrImageInterface} from "../../interfaces/folderOrImageInterface";
import {ImageService} from "../../services/image.service";
import {FolderService} from "../../services/folder.service";

@Component({
  selector: 'app-account-content-view',
  standalone: true,
  imports: [
    FolderCardComponent,
    NgForOf,
    SearchbarComponent,
    NgIf
  ],
  templateUrl: './account-content-view.component.html',
  styleUrl: './account-content-view.component.css'
})
export class AccountContentViewComponent implements OnInit {
  items: folderOrImageInterface[] = [];
  filteredItems: folderOrImageInterface[] = [];
  folderViewShown = true;
  query = '';

  folders: folderOrImageInterface[] = [] /*[
    {
      name: 'Bilder_12.12.2012',
      username: 'Owner23132132',
      images: 30,
      downloads: 331232,
      date: '13.12.2012',
      visibility: 'Private',
      thumbnailSource: 'assets/images/bild3.jpg'
    },
    {
      name: 'Bilder_12.12.2012',
      username: 'Owner23132132',
      images: 30,
      downloads: 331232,
      date: '13.12.2012',
      visibility: 'Private',
      thumbnailSource: 'assets/images/bild3.jpg'
    },
    {
      name: 'Bilder_12.12.2012',
      username: 'fdfsfs',
      images: 30,
      downloads: 331232,
      date: '13.12.2012',
      visibility: 'Private',
      thumbnailSource: 'assets/images/bild3.jpg'
    },
    {
      name: 'fortnite',
      username: 'ewqecds',
      images: 30,
      downloads: 331232,
      date: '13.12.2012',
      visibility: 'Public',
      thumbnailSource: 'assets/images/bild3.jpg'
    },
    {
      name: 'fortnite',
      username: 'Owneewqewqr23132132',
      images: 30,
      downloads: 331232,
      date: '13.12.2012',
      visibility: 'Not-Listed',
      thumbnailSource: 'assets/images/bild3.jpg'
    },
  ];*/

  images: folderOrImageInterface[] = [] /*[
    {
      imageid: 6,
      name: "mainBackgroundImage.jpg",
      downloads: 5,
      width: 5333,
      height: 4000,
      size: "543534",
      public: true,
      date: "2024-10-01T22:00:00.000Z",
      viewers: null,
      username: "zzzzzzzzzzzzzzzzzzzzzzzzz",
      thumbnailSource: 'assets/images/bild3.jpg',
      visibility: 'Private'
    },
    {
      imageid: 8,
      name: "bild1.jpg",
      downloads: 6,
      width: 5586,
      height: 3142,
      size: "354234",
      public: true,
      date: "2024-10-13T22:00:00.000Z",
      viewers: null,
      username: "8b3e8e87-dce3-44b4-8963-9280c5347272",
      thumbnailSource: 'assets/images/bild3.jpg',
      visibility: 'Private'
    },
    {
      imageid: 9,
      name: "mainBackgroundImage.jpg",
      downloads: 1,
      width: 5333,
      height: 4000,
      size: "434213",
      public: true,
      date: "2024-10-14T22:00:00.000Z",
      viewers: null,
      username: "8b3e8e87-dce3-44b4-8963-9280c5347272",
      thumbnailSource: 'assets/images/bild3.jpg',
      visibility: 'Private'
    },
    {
      imageid: 4,
      name: "bild1.jpg",
      downloads: 4,
      width: 5586,
      height: 3142,
      size: "900008",
      public: true,
      date: "2024-10-24T22:00:00.000Z",
      viewers: null,
      username: "8b3e8e87-dce3-44b4-8963-9280c5347272",
      thumbnailSource: 'assets/images/bild3.jpg',
      visibility: 'Private'
    },
    {
      imageid: 1,
      name: "test-image.jpg",
      downloads: 2,
      width: 5586,
      height: 3142,
      size: "900008",
      public: true,
      date: "2024-10-07T22:00:00.000Z",
      viewers: null,
      username: "8b3e8e87-dce3-44b4-8963-9280c5347272",
      thumbnailSource: 'assets/images/bild3.jpg',
      visibility: 'Private'
    }
  ];*/

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
