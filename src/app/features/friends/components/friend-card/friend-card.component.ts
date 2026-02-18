import { Component, Input, Output, EventEmitter, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Friend } from '../../../../shared/models/friend.model';
import { TranslationService } from '../../../../core/services/translation.service';

@Component({
  selector: 'app-friend-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './friend-card.component.html',
  styleUrls: ['./friend-card.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FriendCardComponent {
  @Input() friend!: Friend;
  @Output() messageClicked = new EventEmitter<string>();
  @Output() moreOptionsClicked = new EventEmitter<string>();

  constructor(public translationService: TranslationService) {}

  getMutualFriendsText(): string {
    const count = this.friend.mutualFriendsCount;
    const key = count === 1 ? 'friends.mutualFriends.one' : 'friends.mutualFriends.other';
    return this.translationService.translate(key, { count: count.toString() });
  }

  getLastActiveText(): string {
    const lastActive = this.friend.lastActive;
    
    if (lastActive === 'online') {
      return this.translationService.translate('friends.lastActive.online');
    }
    
    if (typeof lastActive === 'string') {
      // Handle string-based last active times
      if (lastActive === 'yesterday') {
        return this.translationService.translate('friends.lastActive.yesterday');
      }
      
      // Parse time strings like "2h", "3 days", "1 week"
      const match = lastActive.match(/^(\d+)\s*(min|h|days?|weeks?)$/);
      if (match) {
        const [, count, unit] = match;
        
        if (unit === 'min') {
          return this.translationService.translate('friends.lastActive.minutes', { count });
        }
        if (unit === 'h') {
          return this.translationService.translate('friends.lastActive.hours', { count });
        }
        if (unit === 'day' || unit === 'days') {
          return this.translationService.translate('friends.lastActive.days', { count });
        }
        if (unit === 'week' || unit === 'weeks') {
          const key = count === '1' ? 'friends.lastActive.week' : 'friends.lastActive.weeks';
          return this.translationService.translate(key, { count });
        }
      }
    }
    
    return lastActive.toString();
  }

  onMessageClick(): void {
    this.messageClicked.emit(this.friend.id);
  }

  onMoreOptionsClick(): void {
    this.moreOptionsClicked.emit(this.friend.id);
  }
}
