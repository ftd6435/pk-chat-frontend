import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslationService } from '../../../core/services/translation.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FooterComponent implements OnInit {
  translations: any = {};

  constructor(private translationService: TranslationService) {}

  ngOnInit(): void {
    this.loadTranslations();
    this.translationService.getCurrentLanguage().subscribe(() => {
      this.loadTranslations();
    });
  }

  private loadTranslations(): void {
    this.translations = {
      brand: {
        name: this.translationService.translate('footer.brand.name'),
        description: this.translationService.translate('footer.brand.description')
      },
      quickLinks: {
        title: this.translationService.translate('footer.quickLinks.title'),
        about: this.translationService.translate('footer.quickLinks.about'),
        features: this.translationService.translate('footer.quickLinks.features'),
        pricing: this.translationService.translate('footer.quickLinks.pricing'),
        help: this.translationService.translate('footer.quickLinks.help')
      },
      legal: {
        title: this.translationService.translate('footer.legal.title'),
        privacy: this.translationService.translate('footer.legal.privacy'),
        terms: this.translationService.translate('footer.legal.terms'),
        notice: this.translationService.translate('footer.legal.notice')
      },
      contact: {
        title: this.translationService.translate('footer.contact.title'),
        email: this.translationService.translate('footer.contact.email'),
        phone: this.translationService.translate('footer.contact.phone')
      },
      copyright: this.translationService.translate('footer.copyright')
    };
  }
}
