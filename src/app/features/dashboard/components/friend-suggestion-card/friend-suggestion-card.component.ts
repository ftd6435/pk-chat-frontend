import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FriendSuggestion } from '../../../../shared/models/friend-suggestion.model';
import { TranslationService } from '../../../../core/services/translation.service';

@Component({
  selector: 'app-friend-suggestion-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './friend-suggestion-card.component.html',
  styleUrls: ['./friend-suggestion-card.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FriendSuggestionCardComponent {
  @Input() suggestion!: FriendSuggestion;

  constructor(public translationService: TranslationService) {}

  getMutualFriendsText(): string {
    const count = this.suggestion.mutualFriendsCount;
    const key = count === 1 
      ? 'dashboard.friendSuggestions.mutualFriends.one' 
      : 'dashboard.friendSuggestions.mutualFriends.other';
    const text = this.translationService.translate(key);
    return text.replace('{{count}}', count.toString());
  }
}
