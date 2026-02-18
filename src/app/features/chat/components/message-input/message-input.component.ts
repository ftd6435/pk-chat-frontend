import { Component, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslationService } from '../../../../core/services/translation.service';

@Component({
  selector: 'app-message-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MessageInputComponent implements AfterViewInit {
  @Output() sendMessage = new EventEmitter<string>();
  @Output() attachFile = new EventEmitter<void>();
  @Output() sendVoice = new EventEmitter<void>();
  @Output() openEmoji = new EventEmitter<void>();
  
  @ViewChild('messageTextarea') messageTextarea!: ElementRef<HTMLTextAreaElement>;

  messageText: string = '';

  constructor(public translationService: TranslationService) {}

  ngAfterViewInit(): void {
    this.adjustTextareaHeight();
  }

  onInput(): void {
    this.adjustTextareaHeight();
  }

  adjustTextareaHeight(): void {
    const textarea = this.messageTextarea?.nativeElement;
    if (textarea) {
      textarea.style.height = 'auto';
      const newHeight = Math.min(textarea.scrollHeight, 120); // Max 120px
      textarea.style.height = newHeight + 'px';
    }
  }

  onSendMessage(): void {
    if (this.messageText.trim()) {
      this.sendMessage.emit(this.messageText.trim());
      this.messageText = '';
      setTimeout(() => this.adjustTextareaHeight(), 0);
    }
  }

  onAttachFile(): void {
    this.attachFile.emit();
  }

  onSendVoice(): void {
    this.sendVoice.emit();
  }

  onOpenEmoji(): void {
    this.openEmoji.emit();
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.onSendMessage();
    }
  }

  get canSend(): boolean {
    return this.messageText.trim().length > 0;
  }
}
