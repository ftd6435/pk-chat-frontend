import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MutualFriend } from '../../../../shared/models/friend-suggestion.model';

@Component({
  selector: 'app-mutual-friends-avatars',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mutual-friends-avatars.component.html',
  styleUrls: ['./mutual-friends-avatars.component.scss']
})
export class MutualFriendsAvatarsComponent {
  @Input() friends: MutualFriend[] = [];
  @Input() count: number = 0;
  @Input() maxDisplay: number = 3;

  get displayedFriends(): MutualFriend[] {
    return this.friends.slice(0, this.maxDisplay);
  }
}
