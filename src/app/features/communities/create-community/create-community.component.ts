import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardHeaderComponent } from '../../dashboard/components/dashboard-header/dashboard-header.component';
import { DashboardSidebarComponent } from '../../dashboard/components/dashboard-sidebar/dashboard-sidebar.component';
import { TranslationService } from '../../../core/services/translation.service';
import { CommunityType } from '../../../shared/models/community.model';

@Component({
  selector: 'app-create-community',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    DashboardHeaderComponent,
    DashboardSidebarComponent
  ],
  templateUrl: './create-community.component.html',
  styleUrls: ['./create-community.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CreateCommunityComponent implements OnInit {
  currentStep = 1;
  totalSteps = 2;
  iconPreview: string | null = null;
  tagInput = '';
  tags: string[] = [];

  communityForm!: FormGroup;

  categories = [
    'Technologie',
    'Art & Créativité',
    'Sport',
    'Cuisine',
    'Culture',
    'Business',
    'Éducation',
    'Voyage',
    'Santé & Bien-être',
    'Musique',
    'Jeux',
    'Autre'
  ];

  communityTypes: { value: CommunityType; labelKey: string; descKey: string; icon: string }[] = [
    { value: 'public', labelKey: 'communities.create.types.public.label', descKey: 'communities.create.types.public.desc', icon: 'lucide:globe' },
    { value: 'private', labelKey: 'communities.create.types.private.label', descKey: 'communities.create.types.private.desc', icon: 'lucide:lock' },
    { value: 'secret', labelKey: 'communities.create.types.secret.label', descKey: 'communities.create.types.secret.desc', icon: 'lucide:eye-off' }
  ];

  constructor(
    private fb: FormBuilder,
    public translationService: TranslationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.communityForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      type: ['public', Validators.required],
      category: ['', Validators.required]
    });
  }

  onIconFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.iconPreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  removeIcon(): void {
    this.iconPreview = null;
  }

  addTag(): void {
    const trimmed = this.tagInput.trim();
    if (trimmed && !this.tags.includes(trimmed) && this.tags.length < 10) {
      this.tags.push(trimmed);
      this.tagInput = '';
    }
  }

  removeTag(tag: string): void {
    this.tags = this.tags.filter(t => t !== tag);
  }

  onTagKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.addTag();
    }
  }

  isStepValid(): boolean {
    if (this.currentStep === 1) {
      const name = this.communityForm.get('name');
      const description = this.communityForm.get('description');
      return !!(name?.valid && description?.valid);
    }
    if (this.currentStep === 2) {
      const type = this.communityForm.get('type');
      const category = this.communityForm.get('category');
      return !!(type?.valid && category?.valid);
    }
    return false;
  }

  nextStep(): void {
    if (this.currentStep < this.totalSteps && this.isStepValid()) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  onSubmit(): void {
    if (this.communityForm.valid) {
      // Future: call service to create community
      this.router.navigate(['/communautes']);
    }
  }

  cancel(): void {
    this.router.navigate(['/communautes']);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.communityForm.get(fieldName);
    return !!(field?.invalid && field?.touched);
  }
}
