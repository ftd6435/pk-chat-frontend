import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef, OnDestroy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ChatHeaderComponent } from '../components/chat-header/chat-header.component';
import { MessageBubbleComponent } from '../components/message-bubble/message-bubble.component';
import { VoiceMessageComponent } from '../components/voice-message/voice-message.component';
import { FileAttachmentComponent } from '../components/file-attachment/file-attachment.component';
import { TypingIndicatorComponent } from '../components/typing-indicator/typing-indicator.component';
import { MessageInputComponent } from '../components/message-input/message-input.component';
import { Message, MessageType, MessageStatus } from '../../../shared/models/message.model';
import { ChatParticipant } from '../../../shared/models/chat-participant.model';
import { ChatDataService } from '../../../core/services/chat-data.service';
import { TranslationService } from '../../../core/services/translation.service';
import { DashboardHeaderComponent } from '../../dashboard/components/dashboard-header/dashboard-header.component';

interface MessageGroup {
  date: Date;
  dateLabel: string;
  messages: Message[];
}

@Component({
  selector: 'app-private-chat',
  standalone: true,
  imports: [
    CommonModule,
    DashboardHeaderComponent,
    ChatHeaderComponent,
    MessageBubbleComponent,
    VoiceMessageComponent,
    FileAttachmentComponent,
    TypingIndicatorComponent,
    MessageInputComponent
  ],
  templateUrl: './private-chat.component.html',
  styleUrls: ['./private-chat.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrivateChatComponent implements OnInit, AfterViewChecked, OnDestroy {
  @ViewChild('messageThread') messageThread!: ElementRef<HTMLDivElement>;

  userId: string = '';
  participant!: ChatParticipant;
  messages: Message[] = [];
  messageGroups: MessageGroup[] = [];
  currentUserId: string = 'current-user';
  
  private shouldScrollToBottom: boolean = false;
  private isUserScrolledUp: boolean = false;

  MessageType = MessageType;

  constructor(
    private route: ActivatedRoute,
    private chatDataService: ChatDataService,
    public translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      this.loadChatData();
    });
  }

  ngAfterViewChecked(): void {
    if (this.shouldScrollToBottom && !this.isUserScrolledUp) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  loadChatData(): void {
    this.participant = this.chatDataService.getChatParticipant(this.userId);
    this.messages = this.chatDataService.getMessages(this.userId);
    this.groupMessagesByDate();
    this.shouldScrollToBottom = true;
  }

  groupMessagesByDate(): void {
    const groups = new Map<string, MessageGroup>();

    this.messages.forEach(message => {
      const dateKey = this.getDateKey(message.timestamp);
      
      if (!groups.has(dateKey)) {
        groups.set(dateKey, {
          date: message.timestamp,
          dateLabel: this.getDateLabel(message.timestamp),
          messages: []
        });
      }
      
      groups.get(dateKey)!.messages.push(message);
    });

    this.messageGroups = Array.from(groups.values());
  }

  getDateKey(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  getDateLabel(date: Date): string {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const messageDate = new Date(date);
    
    if (this.isSameDay(messageDate, today)) {
      return this.translationService.translate('chat.messages.today');
    } else if (this.isSameDay(messageDate, yesterday)) {
      return this.translationService.translate('chat.messages.yesterday');
    } else {
      return messageDate.toLocaleDateString();
    }
  }

  isSameDay(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }

  shouldShowAvatar(message: Message, index: number, groupMessages: Message[]): boolean {
    // Show avatar on first message or when sender changes
    if (index === 0) return true;
    const prevMessage = groupMessages[index - 1];
    return prevMessage.senderId !== message.senderId;
  }

  shouldShowTimestamp(message: Message, index: number, groupMessages: Message[]): boolean {
    // Show timestamp on last message or when sender changes
    if (index === groupMessages.length - 1) return true;
    const nextMessage = groupMessages[index + 1];
    return nextMessage.senderId !== message.senderId;
  }

  isOwnMessage(message: Message): boolean {
    return message.senderId === this.currentUserId;
  }

  onSendMessage(text: string): void {
    const newMessage: Partial<Message> = {
      senderId: this.currentUserId,
      receiverId: this.userId,
      content: text,
      type: MessageType.TEXT,
      status: MessageStatus.SENDING
    };

    this.chatDataService.sendMessage(newMessage).subscribe(message => {
      this.messages.push(message);
      this.groupMessagesByDate();
      this.shouldScrollToBottom = true;
    });
  }

  onAttachFile(): void {
    console.log('Attach file clicked');
    // TODO: Implement file attachment
  }

  onSendVoice(): void {
    console.log('Send voice clicked');
    // TODO: Implement voice recording
  }

  onOpenEmoji(): void {
    console.log('Open emoji clicked');
    // TODO: Implement emoji picker
  }

  onPhoneCall(): void {
    console.log('Phone call clicked');
    // TODO: Implement phone call
  }

  onVideoCall(): void {
    console.log('Video call clicked');
    // TODO: Implement video call
  }

  onSearch(): void {
    console.log('Search clicked');
    // TODO: Implement search in conversation
  }

  onMoreOptions(): void {
    console.log('More options clicked');
    // TODO: Implement more options menu
  }

  private scrollToBottom(): void {
    try {
      const element = this.messageThread.nativeElement;
      element.scrollTop = element.scrollHeight;
    } catch (err) {
      console.error('Error scrolling to bottom:', err);
    }
  }

  onScroll(): void {
    const element = this.messageThread.nativeElement;
    const threshold = 50;
    const atBottom = element.scrollHeight - element.scrollTop - element.clientHeight < threshold;
    this.isUserScrolledUp = !atBottom;
  }

  trackByMessageId(index: number, message: Message): string {
    return message.id;
  }
}
