import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../../../core/services/translation.service';

@Component({
  selector: 'app-typing-indicator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './typing-indicator.component.html',
  styleUrls: ['./typing-indicator.component.scss']
})
export class TypingIndicatorComponent {
  @Input() userName: string = '';

  constructor(public translationService: TranslationService) {}

  getTypingText(): string {
    const key = 'chat.messages.typingIndicator';
    const template = this.translationService.translate(key);
    return template.replace('{{name}}', this.userName);
  }
}
