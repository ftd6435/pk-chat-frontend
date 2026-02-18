export interface ProfileSetup {
  // Photos
  profilePhoto?: File | string;
  coverPhoto?: File | string;
  
  // Personal details
  about?: string;
  location?: string;
  website?: string;
  dateOfBirth?: Date;
  gender?: 'homme' | 'femme' | 'autre' | 'non-specifie';
  
  // Social links
  linkedinUrl?: string;
  twitterUrl?: string;
  
  // Interests
  interests: string[];
}

export interface ProfileSetupStep {
  step: number;
  totalSteps: number;
  title: string;
  description: string;
}
