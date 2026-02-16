import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Conversation } from '../../../../shared/models/conversation.model';

@Component({
  selector: 'app-conversation-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './conversation-card.component.html',
  styleUrls: ['./conversation-card.component.scss']
})
export class ConversationCardComponent {
  @Input() conversation!: Conversation;
}
