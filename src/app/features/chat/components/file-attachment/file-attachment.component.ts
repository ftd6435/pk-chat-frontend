import { Component, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileAttachment } from '../../../../shared/models/message.model';
import { TranslationService } from '../../../../core/services/translation.service';

@Component({
  selector: 'app-file-attachment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-attachment.component.html',
  styleUrls: ['./file-attachment.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FileAttachmentComponent {
  @Input() file!: FileAttachment;
  @Input() isOwnMessage: boolean = false;

  constructor(public translationService: TranslationService) {}

  getFileIcon(): string {
    const mimeType = this.file.fileType.toLowerCase();
    
    if (mimeType.includes('pdf')) return 'lucide:file-text';
    if (mimeType.includes('image')) return 'lucide:image';
    if (mimeType.includes('video')) return 'lucide:video';
    if (mimeType.includes('audio')) return 'lucide:music';
    if (mimeType.includes('zip') || mimeType.includes('archive')) return 'lucide:archive';
    
    return 'lucide:file';
  }

  formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  downloadFile(): void {
    // In a real implementation, this would trigger file download
    window.open(this.file.fileUrl, '_blank');
  }
}
