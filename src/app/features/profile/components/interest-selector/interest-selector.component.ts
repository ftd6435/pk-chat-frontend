import { Component, Input, Output, EventEmitter, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../../../core/services/translation.service';

@Component({
  selector: 'app-interest-selector',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './interest-selector.component.html',
  styleUrls: ['./interest-selector.component.scss']
})
export class InterestSelectorComponent {
  @Input() selectedInterests: string[] = [];
  @Output() interestsChanged = new EventEmitter<string[]>();
  @Output() interestError = new EventEmitter<string>();

  showCustomInput = false;
  customInterestValue = '';

  get interests(): string[] {
    return [
      this.translationService.translate('profileSetup.interests.defaults.technology'),
      this.translationService.translate('profileSetup.interests.defaults.travel'),
      this.translationService.translate('profileSetup.interests.defaults.photography'),
      this.translationService.translate('profileSetup.interests.defaults.cooking'),
      this.translationService.translate('profileSetup.interests.defaults.sports'),
      this.translationService.translate('profileSetup.interests.defaults.reading'),
      this.translationService.translate('profileSetup.interests.defaults.music'),
      this.translationService.translate('profileSetup.interests.defaults.art'),
      this.translationService.translate('profileSetup.interests.defaults.gaming'),
      this.translationService.translate('profileSetup.interests.defaults.fitness')
    ];
  }

  constructor(public translationService: TranslationService) {}

  isSelected(interest: string): boolean {
    return this.selectedInterests.includes(interest);
  }

  toggleInterest(interest: string): void {
    const index = this.selectedInterests.indexOf(interest);
    let updatedInterests: string[];
    
    if (index > -1) {
      // Remove interest
      updatedInterests = this.selectedInterests.filter(i => i !== interest);
    } else {
      // Add interest (max 10)
      if (this.selectedInterests.length < 10) {
        updatedInterests = [...this.selectedInterests, interest];
      } else {
        this.interestError.emit('Maximum 10 interests allowed');
        return;
      }
    }
    
    this.interestsChanged.emit(updatedInterests);
  }

  openAddDialog(): void {
    // For now, still using prompt, but emit error instead of alert
    // TODO: Replace with proper modal dialog component
    const customInterest = prompt('Enter your custom interest:');
    if (customInterest && customInterest.trim()) {
      const trimmedInterest = customInterest.trim();
      if (!this.selectedInterests.includes(trimmedInterest)) {
        if (this.selectedInterests.length < 10) {
          const updatedInterests = [...this.selectedInterests, trimmedInterest];
          this.interestsChanged.emit(updatedInterests);
        } else {
          this.interestError.emit('Maximum 10 interests allowed');
        }
      }
    }
  }
}
