import {Component, Output, EventEmitter} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [
    FormsModule,
    NgOptimizedImage
  ],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css'
})
export class SearchbarComponent {
  searchQuery: string = '';

  @Output() searchChange = new EventEmitter<string>();

  /**
   * Emits the search query when the search is performed
   */
  onSearch() {
    this.searchChange.emit(this.searchQuery);
  }

  /**
   * Resets the search query and emits an empty string
   */
  resetSearch() {
    this.searchQuery = '';
    this.searchChange.emit(this.searchQuery);
  }
}
