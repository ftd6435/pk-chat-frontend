import { Component, Input, Output, EventEmitter, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendSuggestion } from '../../../../shared/models/friend-suggestion.model';
import { MutualFriendsAvatarsComponent } from '../mutual-friends-avatars/mutual-friends-avatars.component';
import { TranslationService } from '../../../../core/services/translation.service';

@Component({
  selector: 'app-suggested-friend-card',
  standalone: true,
  imports: [CommonModule, MutualFriendsAvatarsComponent],
  templateUrl: './suggested-friend-card.component.html',
  styleUrls: ['./suggested-friend-card.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SuggestedFriendCardComponent {
  @Input() friend!: FriendSuggestion;
  @Output() inviteClicked = new EventEmitter<string>();
  @Output() viewProfileClicked = new EventEmitter<string>();

  constructor(public translationService: TranslationService) {}

  onInviteClick(): void {
    this.inviteClicked.emit(this.friend.id);
  }

  onViewProfileClick(): void {
    this.viewProfileClicked.emit(this.friend.id);
  }

  getMutualFriendsText(): string {
    const count = this.friend.mutualFriendsCount;
    const key = count === 1 ? 'findFriends.mutualFriends.one' : 'findFriends.mutualFriends.other';
    return this.translationService.translate(key, { count: count.toString() });
  }
}
