import {Component, EventEmitter, Output} from '@angular/core';
import {NgClass, NgForOf, NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-account-content-filter',
  standalone: true,
  imports: [
    NgClass,
    NgOptimizedImage,
    NgForOf,
    FormsModule
  ],
  templateUrl: './account-content-filter.component.html',
  styleUrl: './account-content-filter.component.css'
})
export class AccountContentFilterComponent {
  isFilterOpen = true;

  selectedVisibility: string = '';
  selectedType: string = '';

  minDownloads: number = 0;
  maxDownloads: number = 99999;


  @Output() filterChanged = new EventEmitter<any>();

  onFilterChange() {
    this.filterChanged.emit({
      visibility: this.selectedVisibility,
      type: this.selectedType
    });
  }

  toggleFilter() {
    this.isFilterOpen = !this.isFilterOpen;
  }
}
