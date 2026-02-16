import { Component, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoiceMessage } from '../../../../shared/models/message.model';
import { TranslationService } from '../../../../core/services/translation.service';

@Component({
  selector: 'app-voice-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './voice-message.component.html',
  styleUrls: ['./voice-message.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VoiceMessageComponent {
  @Input() voiceMessage!: VoiceMessage;
  @Input() isOwnMessage: boolean = false;

  isPlaying: boolean = false;
  progress: number = 0;

  constructor(public translationService: TranslationService) {}

  togglePlayPause(): void {
    this.isPlaying = !this.isPlaying;
    // In a real implementation, this would control audio playback
    if (this.isPlaying) {
      // Simulate progress for demo
      this.progress = 33.33;
    }
  }

  formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  }
}
