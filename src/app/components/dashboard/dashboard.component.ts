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
import {NotificationBarComponent} from "../notification-bar/notification-bar.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
    imports: [
        FolderCardComponent,
        NgForOf,
        SearchbarComponent,
        NgIf,
        ImageCardComponent,
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

  /**
   * Filters items based on the search query
   * @param {string} query - The search query
   */
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

  /**
   * Toggles between folder and image view
   */
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

  /**
   * Updates the item count based on the filtered items and email verification status
   */
  updateItemCount() {
    this.imageCount = this.filteredItems.length + (this.isEmailVerified ? 1 : 0);
  }

  /**
   * Opens the add image component
   */
  openAddImage() {
    this.addItemClosed = false;
  }

  /**
   * Handles the change in add item component state
   * @param {boolean} newState - The new state of the add item component
   */
  addItemShownChange(newState: boolean) {
    this.addItemClosed = newState;
  }

  /**
   * Re-fetches the images and sends a notification
   */
  async reFetchImages() {
    this.images = await this.imageService.getAccountImages();
    if(!this.folderViewShown) {
      this.items = this.images;
      this.onSearch(this.query);
    }
    this.sendNotification('Image uploaded successfully', 'success', 5);
  }

  /**
   * Re-fetches the folders
   */
  async reFetchFolders() {
    this.folders = await this.folderService.getAccountFolders();
    if(this.folderViewShown) {
      this.items = this.folders;
      this.onSearch(this.query);
    }
    this.sendNotification('Folder created successfully', 'success', 5);
  }

  /**
   * Sends a notification
   * @param {string} content - The content of the notification
   * @param {string} type - The type of the notification
   * @param {number} expirationTime - The expiration time of the notification
   */
  sendNotification(content: string, type: string, expirationTime: number) {
    this.notificationService.addNotification(content, type, expirationTime);
  }

  /**
   * OnInit lifecycle hook to fetch folders, images, and check email verification
   */
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
