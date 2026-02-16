import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { OnlineFriend } from '../../../../shared/models/online-friend.model';

@Component({
  selector: 'app-online-friend-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './online-friend-item.component.html',
  styleUrls: ['./online-friend-item.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OnlineFriendItemComponent {
  @Input() friend!: OnlineFriend;
}
