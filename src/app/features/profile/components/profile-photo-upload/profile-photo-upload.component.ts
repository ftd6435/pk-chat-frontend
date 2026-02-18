import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../../../core/services/translation.service';

@Component({
  selector: 'app-profile-photo-upload',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './profile-photo-upload.component.html',
  styleUrls: ['./profile-photo-upload.component.scss']
})
export class ProfilePhotoUploadComponent {
  @Input() currentPhoto?: string;
  @Output() photoSelected = new EventEmitter<File>();
  
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
        this.photoSelected.emit(file);
      } else {
        alert('Please select a valid image file (JPG, PNG, or WEBP)');
      }
    }
  }

  private isValidImageType(file: File): boolean {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    return allowedTypes.includes(file.type);
  }
}
