import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslationService } from '../../../core/services/translation.service';
import { LANGUAGE_OPTIONS } from '../../../core/constants/translations.constant';
import { Language } from '../../../core/models/language.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HeaderComponent implements OnInit {
  currentLanguage: Language = 'fr';
  languageOptions = LANGUAGE_OPTIONS;
  translations: any = {};
  isMobileMenuOpen = false;

  constructor(private translationService: TranslationService) {}

  ngOnInit(): void {
    this.loadTranslations();
    this.translationService.getCurrentLanguage().subscribe(lang => {
      this.currentLanguage = lang;
      this.loadTranslations();
    });
  }

  private loadTranslations(): void {
    this.translations = {
      brand: this.translationService.translate('header.brand'),
      features: this.translationService.translate('header.nav.features'),
      about: this.translationService.translate('header.nav.about'),
      pricing: this.translationService.translate('header.nav.pricing'),
      login: this.translationService.translate('header.cta.login'),
      signup: this.translationService.translate('header.cta.signup')
    };
  }

  switchLanguage(language: Language): void {
    this.translationService.setLanguage(language);
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }
}
