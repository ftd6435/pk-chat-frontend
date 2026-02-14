import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { Language } from '../models/language.model';
import { DEFAULT_LANGUAGE } from '../constants/translations.constant';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLanguage$ = new BehaviorSubject<Language>(DEFAULT_LANGUAGE);
  private translations: { [key: string]: any } = {};
  private translationsLoaded = false;

  constructor(private http: HttpClient) {}

  async initialize(): Promise<void> {
    await this.loadTranslations(DEFAULT_LANGUAGE);
    this.translationsLoaded = true;
  }

  getCurrentLanguage(): Observable<Language> {
    return this.currentLanguage$.asObservable();
  }

  getCurrentLanguageValue(): Language {
    return this.currentLanguage$.value;
  }

  async setLanguage(language: Language): Promise<void> {
    if (language !== this.currentLanguage$.value) {
      await this.loadTranslations(language);
      this.currentLanguage$.next(language);
    }
  }

  translate(key: string): string {
    const keys = key.split('.');
    let result: any = this.translations;

    for (const k of keys) {
      if (result && result[k]) {
        result = result[k];
      } else {
        return key; // Return key if translation not found
      }
    }

    return result;
  }

  getTranslation(key: string): Observable<string> {
    return this.currentLanguage$.pipe(
      map(() => this.translate(key))
    );
  }

  private async loadTranslations(language: Language): Promise<void> {
    try {
      this.translations = await firstValueFrom(
        this.http.get(`/assets/i18n/${language}.json`)
      );
    } catch (error) {
      console.error(`Failed to load translations for language: ${language}`, error);
    }
  }
}
