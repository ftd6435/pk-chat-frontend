import { Component, Input, Output, EventEmitter, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../../../core/services/translation.service';

interface Tab {
  id: string;
  translationKey: string;
}

@Component({
  selector: 'app-profile-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-tabs.component.html',
  styleUrls: ['./profile-tabs.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfileTabsComponent {
  @Input() activeTab: string = 'overview';
  @Output() tabChanged = new EventEmitter<string>();

  tabs: Tab[] = [
    { id: 'overview', translationKey: 'profile.tabs.overview' },
    { id: 'activity', translationKey: 'profile.tabs.activity' },
    { id: 'friends', translationKey: 'profile.tabs.friends' }
  ];

  constructor(public translationService: TranslationService) {}

  selectTab(tabId: string): void {
    this.activeTab = tabId;
    this.tabChanged.emit(tabId);
  }
}
