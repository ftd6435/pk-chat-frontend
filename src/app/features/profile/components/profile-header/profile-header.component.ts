import { Component, Input, Output, EventEmitter, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../../../core/services/translation.service';
import { UserProfile } from '../../../../shared/models/user-profile.model';

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfileHeaderComponent {
  @Input() profile!: UserProfile;
  @Output() editProfile = new EventEmitter<void>();
  @Output() openSettings = new EventEmitter<void>();

  constructor(public translationService: TranslationService) {}

  getMemberSinceText(): string {
    if (!this.profile?.memberSince) return '';
    
    const date = new Date(this.profile.memberSince);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
    const formattedDate = date.toLocaleDateString('fr-FR', options);
    
    return this.translationService.translate('profile.meta.memberSince')
      .replace('{{date}}', formattedDate);
  }

  onEditProfile(): void {
    this.editProfile.emit();
  }

  onOpenSettings(): void {
    this.openSettings.emit();
  }
}
