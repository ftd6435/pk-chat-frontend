import { Component, Input, Output, EventEmitter, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../../../core/services/translation.service';

interface Tab {
  id: string;
  label: string;
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
    { id: 'overview', label: 'Aperçu', translationKey: 'profile.tabs.overview' },
    { id: 'activity', label: 'Activité', translationKey: 'profile.tabs.activity' },
    { id: 'friends', label: 'Amis', translationKey: 'profile.tabs.friends' }
  ];

  constructor(public translationService: TranslationService) {}

  selectTab(tabId: string): void {
    this.activeTab = tabId;
    this.tabChanged.emit(tabId);
  }
}
