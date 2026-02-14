import { Injectable } from '@angular/core';
import { PasswordStrength } from '../../shared/models/password-strength.model';

@Injectable({
  providedIn: 'root'
})
export class PasswordStrengthService {
  
  calculateStrength(password: string): PasswordStrength {
    if (!password) {
      return {
        score: 0,
        level: 'weak',
        bars: 0,
        color: '#F87171',
        label: { fr: 'Faible', en: 'Weak' }
      };
    }
    
    let score = 0;
    
    // Criteria 1: Length (≥8 characters)
    if (password.length >= 8) score++;
    
    // Criteria 2: Has uppercase letter
    if (/[A-Z]/.test(password)) score++;
    
    // Criteria 3: Has lowercase letter
    if (/[a-z]/.test(password)) score++;
    
    // Criteria 4: Has number
    if (/\d/.test(password)) score++;
    
    // Criteria 5: Has special character
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score++;
    
    // Determine level and bars
    let level: 'weak' | 'medium' | 'strong' | 'very-strong';
    let bars: number;
    let color: string;
    let label: { fr: string; en: string };
    
    if (score <= 1) {
      level = 'weak';
      bars = 1;
      color = '#F87171'; // red
      label = { fr: 'Faible', en: 'Weak' };
    } else if (score === 2) {
      level = 'medium';
      bars = 2;
      color = '#FB923C'; // orange
      label = { fr: 'Moyen', en: 'Medium' };
    } else if (score === 3) {
      level = 'strong';
      bars = 3;
      color = '#FBBF24'; // yellow
      label = { fr: 'Fort', en: 'Strong' };
    } else {
      level = 'very-strong';
      bars = 4;
      color = '#10B981'; // green
      label = { fr: 'Très fort', en: 'Very Strong' };
    }
    
    return { score, level, bars, color, label };
  }
}
