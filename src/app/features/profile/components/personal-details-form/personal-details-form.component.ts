import { Component, Input, Output, EventEmitter, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslationService } from '../../../../core/services/translation.service';
import { ProfileSetup } from '../../../../shared/models/profile-setup.model';

@Component({
  selector: 'app-personal-details-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './personal-details-form.component.html',
  styleUrls: ['./personal-details-form.component.scss']
})
export class PersonalDetailsFormComponent implements OnInit {
  @Input() profileData: Partial<ProfileSetup> = {};
  @Output() dataChanged = new EventEmitter<Partial<ProfileSetup>>();
  
  detailsForm!: FormGroup;
  aboutCharCount = 0;
  maxAboutLength = 500;

  constructor(
    private fb: FormBuilder,
    public translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.watchFormChanges();
  }

  private initForm(): void {
    this.detailsForm = this.fb.group({
      about: [this.profileData.about || '', [Validators.maxLength(this.maxAboutLength)]],
      location: [this.profileData.location || ''],
      website: [this.profileData.website || '', [Validators.pattern(/^https?:\/\/.+/)]],
      dateOfBirth: [this.profileData.dateOfBirth || ''],
      gender: [this.profileData.gender || ''],
      linkedinUrl: [this.profileData.linkedinUrl || '', [Validators.pattern(/^https?:\/\/.+/)]],
      twitterUrl: [this.profileData.twitterUrl || '', [Validators.pattern(/^https?:\/\/.+/)]]
    });

    // Set initial character count
    this.aboutCharCount = (this.profileData.about || '').length;
  }

  private watchFormChanges(): void {
    this.detailsForm.valueChanges.subscribe(values => {
      this.dataChanged.emit(values);
    });

    this.detailsForm.get('about')?.valueChanges.subscribe(value => {
      this.aboutCharCount = (value || '').length;
    });
  }

  get aboutControl() {
    return this.detailsForm.get('about');
  }

  get websiteControl() {
    return this.detailsForm.get('website');
  }

  get linkedinControl() {
    return this.detailsForm.get('linkedinUrl');
  }

  get twitterControl() {
    return this.detailsForm.get('twitterUrl');
  }
}
