import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { TranslationService } from '../../../core/services/translation.service';
import { AuthHeaderComponent } from '../components/auth-header/auth-header.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, AuthHeaderComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      identifier: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      password: ['', [
        Validators.required
      ]],
      rememberMe: [false]
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      console.log('Login form submitted:', formData);
      // TODO: Implement actual login logic
      // For now, just navigate to home
      this.router.navigate(['/']);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.markAsTouched();
      });
    }
  }

  // Helper methods for template
  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string | null {
    const field = this.loginForm.get(fieldName);
    if (!field || !field.errors || !this.isFieldInvalid(fieldName)) {
      return null;
    }

    const errors = field.errors;

    // Map error types to translation keys
    if (errors['required']) {
      return this.translationService.translate(`auth.login.fields.${fieldName}.errors.required`);
    }
    if (errors['minlength']) {
      return this.translationService.translate(`auth.login.fields.${fieldName}.errors.minlength`);
    }

    return this.translationService.translate(`auth.login.fields.${fieldName}.errors.invalid`);
  }
}
