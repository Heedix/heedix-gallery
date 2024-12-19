import {Component, OnInit} from '@angular/core';
import {FolderCardComponent} from "./folder-card/folder-card.component";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {SearchbarComponent} from "../searchbar/searchbar.component";
import {folderOrImageInterface} from "../../interfaces/FolderOrImageInterface";
import {AuthService} from "../../services/auth.service";
import {ImageService} from "../../services/image.service";
import {FolderService} from "../../services/folder.service";
import {ImageCardComponent} from "./image-card/image-card.component";
import {AccountSidebarComponent} from "../account-sidebar/account-sidebar.component";
import {AddImageFolderCardComponent} from "./add-image-folder-card/add-image-folder-card.component";
import {AddImageComponent} from "./add-image/add-image.component";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    FolderCardComponent,
    NgForOf,
    SearchbarComponent,
    NgIf,
    ImageCardComponent,
    AccountSidebarComponent,
    NgClass,
    AddImageFolderCardComponent,
    AddImageComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  addItemClosed = true;
  items: folderOrImageInterface[] = [];
  filteredItems: folderOrImageInterface[] = [];
  folderViewShown = true;
  isEmailVerified = false;
  imageCount = 0;
  query = '';

  folders: folderOrImageInterface[] = []

  images: folderOrImageInterface[] = []

  constructor(private imageService:ImageService, private folderService: FolderService, private authService: AuthService, private notificationService: NotificationService) {}

  onSearch(query: string) {
    if (this.items) {
      this.query = query;
      this.filteredItems = this.items.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.username.toLowerCase().includes(query.toLowerCase()) ||
        item.date.toLowerCase().includes(query.toLowerCase())
      );
    }
    this.updateItemCount();
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

  updateItemCount() {
    this.imageCount = this.filteredItems.length + (this.isEmailVerified ? 1 : 0);
  }

  openAddImage() {
    this.addItemClosed = false;
  }

  addItemShownChange(newState: boolean) {
    this.addItemClosed = newState;
  }

  async reFetchImages() {
    this.images = await this.imageService.getAccountImages();
    this.sendNotification('Image uploaded successfully', 'success', 5);
  }

  async reFetchFolders() {
    this.folders = await this.folderService.getAccountFolders();
  }

  sendNotification(content: string, type: string, expirationTime: number) {
    this.notificationService.addNotification(content, type, expirationTime);
  }

  async ngOnInit() {
    this.folders = await this.folderService.getAccountFolders();
    this.images = await this.imageService.getAccountImages();
    this.items = this.folders;
    this.isEmailVerified = await this.authService.emailVerified();
    if (!this.isEmailVerified) {
      this.sendNotification('Please verify your email to upload images', 'warning', -1);
    }
    this.onSearch(this.query);
  }
}
