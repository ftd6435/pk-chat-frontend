import { Component, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendStats } from '../../../../shared/models/friend.model';
import { TranslationService } from '../../../../core/services/translation.service';

@Component({
  selector: 'app-friends-stats-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './friends-stats-card.component.html',
  styleUrls: ['./friends-stats-card.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FriendsStatsCardComponent {
  @Input() stats: FriendStats = { totalFriends: 0, onlineFriends: 0, pendingRequests: 0 };

  constructor(public translationService: TranslationService) {}
}
