import { Component, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../../../core/services/translation.service';
import { UserProfile } from '../../../../shared/models/user-profile.model';

@Component({
  selector: 'app-profile-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-about.component.html',
  styleUrls: ['./profile-about.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfileAboutComponent {
  @Input() profile!: UserProfile;

  constructor(public translationService: TranslationService) {}

  getBirthdayFormatted(): string {
    if (!this.profile?.birthday) return '';
    
    const date = new Date(this.profile.birthday);
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
  }
}
