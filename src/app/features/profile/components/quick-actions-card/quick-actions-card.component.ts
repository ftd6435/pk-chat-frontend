import { Component, Output, EventEmitter, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../../../core/services/translation.service';

interface QuickAction {
  id: string;
  icon: string;
  translationKey: string;
}

@Component({
  selector: 'app-quick-actions-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quick-actions-card.component.html',
  styleUrls: ['./quick-actions-card.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QuickActionsCardComponent {
  @Output() actionClick = new EventEmitter<string>();

  quickActions: QuickAction[] = [
    { id: 'view-public', icon: 'lucide:eye', translationKey: 'profile.quickActions.viewPublic' },
    { id: 'edit-profile', icon: 'lucide:edit', translationKey: 'profile.quickActions.editProfile' },
    { id: 'account-settings', icon: 'lucide:settings', translationKey: 'profile.quickActions.accountSettings' },
    { id: 'privacy', icon: 'lucide:shield', translationKey: 'profile.quickActions.privacy' }
  ];

  constructor(public translationService: TranslationService) {}

  onActionClick(actionId: string): void {
    this.actionClick.emit(actionId);
  }
}
