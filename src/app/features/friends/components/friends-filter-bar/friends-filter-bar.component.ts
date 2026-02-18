import { Component, Input, Output, EventEmitter, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslationService } from '../../../../core/services/translation.service';

@Component({
  selector: 'app-friends-filter-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './friends-filter-bar.component.html',
  styleUrls: ['./friends-filter-bar.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FriendsFilterBarComponent {
  @Input() searchQuery: string = '';
  @Input() sortBy: string = 'recent';
  @Input() mutualFriendsOnly: boolean = false;

  @Output() searchChanged = new EventEmitter<string>();
  @Output() sortChanged = new EventEmitter<string>();
  @Output() mutualFriendsToggled = new EventEmitter<boolean>();

  sortDropdownOpen = false;

  constructor(public translationService: TranslationService) {}

  onSearchChange(): void {
    this.searchChanged.emit(this.searchQuery);
  }

  onToggleChange(): void {
    this.mutualFriendsToggled.emit(this.mutualFriendsOnly);
  }

  getSortLabel(): string {
    return this.translationService.translate('friends.filter.sortBy');
  }

  toggleSortDropdown(): void {
    this.sortDropdownOpen = !this.sortDropdownOpen;
  }

  selectSort(sortOption: string): void {
    this.sortBy = sortOption;
    this.sortDropdownOpen = false;
    this.sortChanged.emit(sortOption);
  }
}
