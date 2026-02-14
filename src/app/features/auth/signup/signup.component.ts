import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { TranslationService } from '../../../core/services/translation.service';
import { PasswordStrengthService } from '../../../core/services/password-strength.service';
import { PasswordStrength } from '../../../shared/models/password-strength.model';
import { phoneValidator } from '../../../core/validators/phone-validator';
import { AuthHeaderComponent } from '../components/auth-header/auth-header.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, AuthHeaderComponent],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  signupForm!: FormGroup;
  passwordStrength: PasswordStrength | null = null;
  showPassword = false;
  showConfirmPassword = false;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public translationService: TranslationService,
    private passwordStrengthService: PasswordStrengthService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.watchPasswordChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initForm(): void {
    this.signupForm = this.fb.group({
      fullName: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(/^[a-zA-ZÀ-ÿ\s-]+$/)
      ]],
      username: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^[a-zA-Z0-9_-]{3,20}$/)
      ]],
      phone: ['', [
        Validators.required,
        phoneValidator()
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8)
      ]],
      confirmPassword: ['', [
        Validators.required
      ]],
      acceptTerms: [false, [
        Validators.requiredTrue
      ]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    
    if (!password || !confirmPassword) {
      return null;
    }
    
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  private watchPasswordChanges(): void {
    this.signupForm.get('password')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((password: string) => {
        this.passwordStrength = this.passwordStrengthService.calculateStrength(password);
      });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  getPasswordStrengthBars(): number[] {
    return Array(4).fill(0).map((_, i) => i);
  }

  isBarActive(index: number): boolean {
    return this.passwordStrength ? index < this.passwordStrength.bars : false;
  }

  getBarColor(index: number): string {
    if (this.isBarActive(index) && this.passwordStrength) {
      return this.passwordStrength.color;
    }
    return 'hsla(35, 15%, 94%, 1)';
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;
      console.log('Sign up form submitted:', formData);
      // TODO: Implement actual sign up logic
      // For now, just navigate to login
      this.router.navigate(['/connexion']);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.signupForm.controls).forEach(key => {
        this.signupForm.get(key)?.markAsTouched();
      });
    }
  }

  // Helper methods for template
  isFieldInvalid(fieldName: string): boolean {
    const field = this.signupForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string | null {
    const field = this.signupForm.get(fieldName);
    if (!field || !field.errors || !this.isFieldInvalid(fieldName)) {
      return null;
    }

    const errors = field.errors;

    // Map error types to translation keys
    if (errors['required']) {
      return this.translationService.translate(`auth.signup.fields.${fieldName}.errors.required`);
    }
    if (errors['minlength']) {
      return this.translationService.translate(`auth.signup.fields.${fieldName}.errors.minlength`);
    }
    if (errors['maxlength']) {
      return this.translationService.translate(`auth.signup.fields.${fieldName}.errors.maxlength`);
    }
    if (errors['pattern']) {
      return this.translationService.translate(`auth.signup.fields.${fieldName}.errors.pattern`);
    }
    if (errors['invalidPhone']) {
      return this.translationService.translate('auth.signup.fields.phone.errors.invalidPhone');
    }
    
    // Check form-level password mismatch error for confirmPassword field
    if (fieldName === 'confirmPassword' && this.signupForm.errors?.['passwordMismatch']) {
      return this.translationService.translate('auth.signup.fields.confirmPassword.errors.mismatch');
    }

    return null;
  }

  get currentLang(): string {
    return this.translationService.getCurrentLanguageValue();
  }

  getTermsLabelHtml(): string {
    const label = this.translationService.translate('auth.signup.fields.terms.label');
    const termsText = this.translationService.translate('auth.signup.fields.terms.termsText');
    const privacyText = this.translationService.translate('auth.signup.fields.terms.privacyText');
    
    return label
      .replace('{{termsLink}}', `<a href="/terms" class="link">${termsText}</a>`)
      .replace('{{privacyLink}}', `<a href="/privacy" class="link">${privacyText}</a>`);
  }
}
