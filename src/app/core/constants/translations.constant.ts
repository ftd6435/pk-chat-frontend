import { Language } from '../models/language.model';

export const LANGUAGES = {
  FR: 'fr' as Language,
  EN: 'en' as Language
};

export const DEFAULT_LANGUAGE = LANGUAGES.FR;

export const LANGUAGE_OPTIONS = [
  { code: LANGUAGES.FR, label: 'FR' },
  { code: LANGUAGES.EN, label: 'EN' }
];
