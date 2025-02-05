import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import ExifReader from 'exifreader';
import {environment} from "../../../environments/environment";
import {FolderService} from "../../../services/folder.service";
import {NotificationService} from "../../../services/notification.service";

const API_URL = environment.apiUrl;

@Component({
  selector: 'app-add-image',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ReactiveFormsModule,
    FormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './add-image.component.html',
  styleUrl: './add-image.component.css'
})
export class AddImageComponent {
  @Input() componentClosed = true;
  @Output() stateChanged = new EventEmitter<boolean>()
  @Output() imageAdded = new EventEmitter;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  selectedFile: File | null = null;

  folders:{folderId: string, deletable: boolean, name: string}[] = [];

  name: string | undefined;
  visibility = "Not-Listed";
  width: number | undefined;
  make: string | undefined;
  height: number | undefined;
  model: string | undefined;
  size: number | undefined;
  lensModel: string | undefined;
  uploadDate =  new Date().toISOString().slice(0, 16);
  exposureTime: string | undefined;
  creationDate: string | undefined;
  iso: string | undefined;
  bitsPerSample = 0;
  fNumber: string | undefined;
  colorSpace: string | undefined;
  focalLength: string | undefined;
  whiteBalance: string | undefined;
  focalLengthEquivalent: string | undefined;
  folder: string | undefined;
  previewSrc: string | ArrayBuffer | null | undefined = null;

  draggedOver = false;

  constructor(private folderService: FolderService, private notificationService: NotificationService) {}

  /**
   * Handles the drag over event
   * @param {DragEvent} event - The drag event
   */
  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.draggedOver = true;
  }

  /**
   * Handles the drag leave event
   */
  onDragLeave() {
    this.draggedOver = false;
  }

  /**
   * Handles the drop event
   * @param {DragEvent} event - The drop event
   */
  onDrop(event: DragEvent) {
    event.preventDefault();
    this.draggedOver = false;

    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      this.processFile(event.dataTransfer.files[0]);
    }
  }

  /**
   * Triggers the file input click event
   */
  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  /**
   * Handles the file selected event
   * @param {Event} event - The file input change event
   */
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.processFile(input.files[0]);
    }
    this.folderService.getEditableFolders().then((folders: {folderId: string, deletable: boolean, name: string, owner: string}[]) => {
      this.folders = folders;
      console.log(folders);
      this.folder = folders.filter((folder) => !folder.deletable && folder.owner === localStorage.getItem('userId'))[0].folderId;
      console.log(this.folder);
    });
  }

  /**
   * Processes the selected file
   * @param {File} file - The selected file
   */
  processFile(file: File) {
    const ext = this.getFileExtension(file.name);
    if ((ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') || !file.type.startsWith('image/')) {
      alert('Please select a valid image file (Valid file types: .jpg, .jpeg, .png)');
    } else if (file.size > 5242880) {
      alert('Please select a file smaller than 5MB');
    } else {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewSrc = e.target?.result;
      };
      reader.readAsDataURL(file);
      this.getFileMetaData(file);
    }
  }

  /**
   * Gets the file extension
   * @param {string} filename - The file name
   * @returns {string} - The file extension
   */
  getFileExtension = (filename: string): string => {
    const dotIndex = filename.lastIndexOf('.');
    return dotIndex !== -1 ? filename.slice(dotIndex) : '';
  };

  /**
   * Gets the metadata of the file
   * @param {File} file - The selected file
   */
  async getFileMetaData(file: File) {

    let requestData = [
      {key: 'height', tag: 'Image Height', method: 'value'},
      {key: 'width', tag: 'Image Width', method: 'value'},
      {key: 'creationDate', tag: 'CreateDate', method: 'description'},
      {key: 'bitsPerSample', tag: 'Bits Per Sample', method: 'description'},
      {key: 'make', tag: 'Make', method: 'description'},
      {key: 'model', tag: 'Model', method: 'description'},
      {key: 'exposureTime', tag: 'ExposureTime', method: 'description'},
      {key: 'fNumber', tag: 'FNumber', method: 'description'},
      {key: 'isoSpeedRatings', tag: 'ISOSpeedRatings', method: 'description'},
      {key: 'colorSpace', tag: 'ColorSpace', method: 'description'},
      {key: 'whiteBalance', tag: 'WhiteBalance', method: 'description'},
      {key: 'focalLength', tag: 'FocalLength', method: 'description'},
      {key: 'focalLengthIn35mmFilm', tag: 'FocalLengthIn35mmFilm', method: 'description'},
      {key: 'lensModel', tag: 'LensModel', method: 'description'}
    ];
    let tags;

    let extractedData: Record<string, any> = {};
    extractedData['fileExt'] = this.getFileExtension(file.name);
    extractedData['fileName'] = file.name;

    extractedData['fileSize'] = file.size;
    try {
      tags = await ExifReader.load(file);
      for (const key of requestData) {
        try {
          extractedData[key.key] = (tags as any)?.[key.tag]?.[key.method] ?? null;
        } catch (error) {
          extractedData[key.key] = null;
        }
      }
    } catch (error) {
    }

    this.name = file.name;
    this.height = extractedData['height'] || undefined;
    this.width = extractedData['width'] || undefined;
    this.size = extractedData['fileSize'] || undefined;
    this.creationDate = extractedData['creationDate'] ? new Date(extractedData['creationDate']).toISOString().slice(0, 19) : undefined;
    this.bitsPerSample = extractedData['bitsPerSample'] || undefined;
    this.make = extractedData['make'] || undefined;
    this.model = extractedData['model'] || undefined;
    this.exposureTime = extractedData['exposureTime'] || undefined;
    this.fNumber = extractedData['fNumber'] || undefined;
    this.iso = extractedData['isoSpeedRatings'] || undefined;
    this.colorSpace = extractedData['colorSpace'] || undefined;
    this.whiteBalance = extractedData['whiteBalance'] || undefined;
    this.focalLength = extractedData['focalLength'] || undefined;
    this.focalLengthEquivalent = extractedData['focalLengthIn35mmFilm'] || undefined;
    this.lensModel = extractedData['lensModel'] || undefined;
  }

  /**
   * Disables the drag event
   * @param {DragEvent} event - The drag event
   */
  disableDrag(event: DragEvent): void {
    event.preventDefault();
  }

  /**
   * Closes the component
   */
  closeComponent() {
    this.componentClosed = true;
    this.stateChanged.emit(this.componentClosed);
    this.selectedFile = null;
  }

  sendNotification(content: string, type: string, expirationTime: number) {
    this.notificationService.addNotification(content, type, expirationTime);
  }

  /**
   * Submits the form data
   */
  onSubmit() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile);
      formData.append('name', this.name || '');
      formData.append('visibility', this.visibility);
      formData.append('width', this.width?.toString() || '');
      formData.append('height', this.height?.toString() || '');
      formData.append('make', this.make || '');
      formData.append('model', this.model || '');
      formData.append('size', this.size?.toString() || '');
      formData.append('lensModel', this.lensModel || '');
      formData.append('uploadDate', this.uploadDate);
      formData.append('exposureTime', this.exposureTime || '');
      formData.append('creationDate', this.creationDate || '');
      formData.append('iso', this.iso || '');
      formData.append('bitsPerSample', this.bitsPerSample?.toString() || '');
      formData.append('fNumber', this.fNumber || '');
      formData.append('colorSpace', this.colorSpace || '');
      formData.append('focalLength', this.focalLength || '');
      formData.append('whiteBalance', this.whiteBalance || '');
      formData.append('focalLengthEquivalent', this.focalLengthEquivalent || '');
      formData.append('folder', this.folder || '');

      fetch(`${API_URL}/upload`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('authToken')
        },
        body: formData
      }).then(response => {
        if (response.status === 200) {
          this.closeComponent();
          this.imageAdded.emit();
        } else {
          this.sendNotification(response.statusText, 'error', -1);
        }
      });
    }
  }
}
