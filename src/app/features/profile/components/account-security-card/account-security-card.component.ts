import { Component, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../../../core/services/translation.service';

@Component({
  selector: 'app-account-security-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './account-security-card.component.html',
  styleUrls: ['./account-security-card.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AccountSecurityCardComponent {
  @Input() passwordLastChanged: string = '';
  @Input() is2FAEnabled: boolean = false;

  constructor(public translationService: TranslationService) {}

  getPasswordChangeDate(): string {
    if (!this.passwordLastChanged) return '';
    
    const date = new Date(this.passwordLastChanged);
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('fr-FR', options);
    
    return this.translationService.translate('profile.security.passwordChanged')
      .replace('{{date}}', formattedDate);
  }

  get2FAStatus(): string {
    return this.is2FAEnabled 
      ? this.translationService.translate('profile.security.enabled')
      : this.translationService.translate('profile.security.disabled');
  }
}
