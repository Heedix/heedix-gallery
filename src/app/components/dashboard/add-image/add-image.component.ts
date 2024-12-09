import {Component, ElementRef, ViewChild} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-add-image',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ReactiveFormsModule,
    FormsModule,
    NgIf
  ],
  templateUrl: './add-image.component.html',
  styleUrl: './add-image.component.css'
})
export class AddImageComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  selectedFile: File | null = null;

  name = '';
  visibility = 'not-listed';
  width = 0;
  make = '';
  height = 0;
  model = '';
  size = 0;
  lensModel = '';
  uploadDate =  new Date().toISOString().slice(0, 16);
  exposureTime = '';
  creationDate: Date | undefined;
  iso = '';
  bitsPerPixel = 0;
  aperture = '';
  colorSpace = '';
  focalLength = '';
  whiteBalance = '';
  focalLengthEquivalent = '';
  previewSrc: string | ArrayBuffer | null | undefined = null;

  draggedOver = false;

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.draggedOver = true;
  }

  onDragLeave() {
    this.draggedOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.draggedOver = false;

    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      this.processFile(event.dataTransfer.files[0]);
    }
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click(); // Öffne den Dateiauswahl-Dialog
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.processFile(input.files[0]);
    }
  }

  processFile(file: File) {
    if (file.type.startsWith('image/')) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewSrc = e.target?.result; // Vorschau setzen
      };
      reader.readAsDataURL(file);
    } else {
      alert('Bitte nur Bilddateien auswählen.');
    }
  }

}
