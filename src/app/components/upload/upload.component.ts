import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})

export class UploadComponent {
  selectedFile: File | null = null;
  imageUrl: string = '';

  constructor(private http: HttpClient) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onUpload(): void {
    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);

      this.http.post<any>('http://localhost:3000/upload', formData).subscribe(response => {
        this.imageUrl = response.imageUrl;
      });
    }
  }
}
