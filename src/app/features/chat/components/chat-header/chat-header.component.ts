import { Component, Input, Output, EventEmitter, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ChatParticipant } from '../../../../shared/models/chat-participant.model';
import { TranslationService } from '../../../../core/services/translation.service';

@Component({
  selector: 'app-chat-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChatHeaderComponent {
  @Input() participant!: ChatParticipant;
  @Output() phoneCall = new EventEmitter<void>();
  @Output() videoCall = new EventEmitter<void>();
  @Output() search = new EventEmitter<void>();
  @Output() moreOptions = new EventEmitter<void>();

  constructor(
    private router: Router,
    public translationService: TranslationService
  ) {}

  goBack(): void {
    this.router.navigate(['/tableau-de-bord']);
  }

  onPhoneCall(): void {
    this.phoneCall.emit();
  }

  onVideoCall(): void {
    this.videoCall.emit();
  }

  onSearch(): void {
    this.search.emit();
  }

  onMoreOptions(): void {
    this.moreOptions.emit();
  }

  get statusText(): string {
    if (this.participant.isOnline) {
      return this.translationService.translate('chat.header.online');
    }
    return this.translationService.translate('chat.header.offline');
  }
}
