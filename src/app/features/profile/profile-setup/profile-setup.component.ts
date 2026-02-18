import { Component, OnInit, OnDestroy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { TranslationService } from '../../../core/services/translation.service';
import { ImageUploadService } from '../../../core/services/image-upload.service';
import { ProfileSetup } from '../../../shared/models/profile-setup.model';

import { ProfilePhotoUploadComponent } from '../components/profile-photo-upload/profile-photo-upload.component';
import { CoverPhotoUploadComponent } from '../components/cover-photo-upload/cover-photo-upload.component';
import { PersonalDetailsFormComponent } from '../components/personal-details-form/personal-details-form.component';
import { InterestSelectorComponent } from '../components/interest-selector/interest-selector.component';

@Component({
  selector: 'app-profile-setup',
  standalone: true,
  imports: [
    CommonModule,
    ProfilePhotoUploadComponent,
    CoverPhotoUploadComponent,
    PersonalDetailsFormComponent,
    InterestSelectorComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './profile-setup.component.html',
  styleUrls: ['./profile-setup.component.scss']
})
export class ProfileSetupComponent implements OnInit, OnDestroy {
  profileData: ProfileSetup = {
    interests: []
  };

  currentStep = 2;
  totalSteps = 4;

  profilePhotoPreview?: string;
  coverPhotoPreview?: string;

  private destroy$ = new Subject<void>();

  constructor(
    public translationService: TranslationService,
    private imageUploadService: ImageUploadService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSavedData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadSavedData(): void {
    // Load any saved data from localStorage
    const savedData = localStorage.getItem('profileSetupData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        this.profileData = { ...this.profileData, ...parsed };
        this.profilePhotoPreview = parsed.profilePhoto;
        this.coverPhotoPreview = parsed.coverPhoto;
      } catch (error) {
        console.error('Failed to load saved profile data', error);
      }
    }
  }

  private saveData(): void {
    // Save data to localStorage
    const dataToSave = {
      ...this.profileData,
      profilePhoto: this.profilePhotoPreview,
      coverPhoto: this.coverPhotoPreview
    };
    localStorage.setItem('profileSetupData', JSON.stringify(dataToSave));
  }

  onProfilePhotoSelected(file: File): void {
    this.imageUploadService.uploadProfilePhoto(file)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (url) => {
          this.profilePhotoPreview = url;
          this.profileData.profilePhoto = file;
          this.saveData();
        },
        error: (error) => {
          console.error('Failed to upload profile photo', error);
          // TODO: Replace with toast notification service
          this.handleError('Failed to upload profile photo. Please try again.');
        }
      });
  }

  onProfilePhotoError(errorMessage: string): void {
    // TODO: Replace with toast notification service
    this.handleError(errorMessage);
  }

  onCoverPhotoSelected(file: File): void {
    this.imageUploadService.uploadCoverPhoto(file)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (url) => {
          this.coverPhotoPreview = url;
          this.profileData.coverPhoto = file;
          this.saveData();
        },
        error: (error) => {
          console.error('Failed to upload cover photo', error);
          // TODO: Replace with toast notification service
          this.handleError('Failed to upload cover photo. Please try again.');
        }
      });
  }

  onCoverPhotoError(errorMessage: string): void {
    // TODO: Replace with toast notification service
    this.handleError(errorMessage);
  }

  onInterestError(errorMessage: string): void {
    // TODO: Replace with toast notification service
    this.handleError(errorMessage);
  }

  private handleError(message: string): void {
    // Temporary error handling - log to console
    // TODO: Implement toast notification service
    console.error('Profile Setup Error:', message);
    // For now, still use alert but centralized
    alert(message);
  }

  onPersonalDetailsChanged(details: Partial<ProfileSetup>): void {
    this.profileData = { ...this.profileData, ...details };
    this.saveData();
  }

  onInterestsChanged(interests: string[]): void {
    this.profileData.interests = interests;
    this.saveData();
  }

  skipForNow(): void {
    // Clear saved data and navigate to dashboard
    localStorage.removeItem('profileSetupData');
    this.router.navigate(['/tableau-de-bord']);
  }

  completeProfile(): void {
    // Validate that at least some data is filled
    const hasData = this.profilePhotoPreview || 
                    this.coverPhotoPreview || 
                    this.profileData.about || 
                    this.profileData.interests.length > 0;

    if (!hasData) {
      // TODO: Replace with toast notification service
      this.handleError('Please fill in at least some information before completing your profile.');
      return;
    }

    // TODO: Send data to backend
    console.log('Profile setup data:', this.profileData);

    // Clear saved data
    localStorage.removeItem('profileSetupData');

    // Navigate to dashboard
    this.router.navigate(['/tableau-de-bord']);

    // TODO: Show success message
  }

  get stepDots(): boolean[] {
    return Array(this.totalSteps).fill(false).map((_, i) => i < this.currentStep);
  }

  get stepText(): string {
    const template = this.translationService.translate('profileSetup.header.step');
    return template
      .replace('{{current}}', this.currentStep.toString())
      .replace('{{total}}', this.totalSteps.toString());
  }
}
