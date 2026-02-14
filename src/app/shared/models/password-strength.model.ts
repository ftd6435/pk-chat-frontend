export interface PasswordStrength {
  score: number; // 0-5
  level: 'weak' | 'medium' | 'strong' | 'very-strong';
  bars: number; // Number of bars to fill (0-4)
  color: string;
  label: {
    fr: string;
    en: string;
  };
}
