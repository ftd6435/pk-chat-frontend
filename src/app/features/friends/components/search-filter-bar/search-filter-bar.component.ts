import { Component, Input, Output, EventEmitter, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslationService } from '../../../../core/services/translation.service';

@Component({
  selector: 'app-search-filter-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-filter-bar.component.html',
  styleUrls: ['./search-filter-bar.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SearchFilterBarComponent {
  @Input() searchQuery: string = '';
  @Input() activeFilters: string[] = [];

  @Output() searchChanged = new EventEmitter<string>();
  @Output() searchSubmitted = new EventEmitter<string>();
  @Output() filterToggled = new EventEmitter<string>();

  constructor(public translationService: TranslationService) {}

  onSearchSubmit(): void {
    this.searchSubmitted.emit(this.searchQuery);
  }

  toggleFilter(filterType: string): void {
    this.filterToggled.emit(filterType);
  }

  isFilterActive(filterType: string): boolean {
    return this.activeFilters.includes(filterType);
  }
}
