import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../../../core/services/translation.service';

@Component({
  selector: 'app-cover-photo-upload',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './cover-photo-upload.component.html',
  styleUrls: ['./cover-photo-upload.component.scss']
})
export class CoverPhotoUploadComponent {
  @Input() currentCover?: string;
  @Output() coverSelected = new EventEmitter<File>();
  @Output() uploadError = new EventEmitter<string>();
  
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(public translationService: TranslationService) {}

  triggerFileSelect(): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      
      // Validate file type
      if (this.isValidImageType(file)) {
        this.coverSelected.emit(file);
      } else {
        this.uploadError.emit('Please select a valid image file (JPG, PNG, or WEBP)');
      }
    }
  }

  private isValidImageType(file: File): boolean {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    return allowedTypes.includes(file.type);
  }
}
