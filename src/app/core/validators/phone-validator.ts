import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null; // Don't validate empty values (use Validators.required separately)
    }
    
    // Remove all spaces for validation
    const phoneValue = control.value.replace(/\s/g, '');
    
    // Regex: /^\+?[1-9]\d{1,14}$/
    // - Optional plus sign at start
    // - Must start with digit 1-9
    // - Followed by 1-14 more digits
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    
    const valid = phoneRegex.test(phoneValue);
    
    return valid ? null : { invalidPhone: true };
  };
}
