import { Component, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Message, MessageStatus } from '../../../../shared/models/message.model';

@Component({
  selector: 'app-message-bubble',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-bubble.component.html',
  styleUrls: ['./message-bubble.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MessageBubbleComponent {
  @Input() message!: Message;
  @Input() isOwnMessage: boolean = false;
  @Input() showAvatar: boolean = true;
  @Input() showTimestamp: boolean = true;
  @Input() avatarUrl: string = '';

  MessageStatus = MessageStatus;

  formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  get isRead(): boolean {
    return this.message.status === MessageStatus.READ;
  }

  get isDelivered(): boolean {
    return this.message.status === MessageStatus.DELIVERED;
  }
}
