import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslationService } from '../../../../core/services/translation.service';

interface TrustIndicator {
  icon: string;
  text: string;
}

@Component({
  selector: 'app-cta-section',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatRippleModule],
  templateUrl: './cta-section.component.html',
  styleUrls: ['./cta-section.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CtaSectionComponent implements OnInit {
  translations: any = {};
  trustIndicators: TrustIndicator[] = [];

  private iconMap = ['lucide:users', 'lucide:shield-check', 'lucide:smartphone'];

  constructor(private translationService: TranslationService) {}

  ngOnInit(): void {
    this.loadTranslations();
    this.translationService.getCurrentLanguage().subscribe(() => {
      this.loadTranslations();
    });
  }

  private loadTranslations(): void {
    this.translations = {
      title: this.translationService.translate('cta.title'),
      description: this.translationService.translate('cta.description'),
      button: this.translationService.translate('cta.button')
    };

    this.trustIndicators = [
      {
        icon: this.iconMap[0],
        text: this.translationService.translate('cta.trust.users')
      },
      {
        icon: this.iconMap[1],
        text: this.translationService.translate('cta.trust.security')
      },
      {
        icon: this.iconMap[2],
        text: this.translationService.translate('cta.trust.responsive')
      }
    ];
  }

  onCtaClick(): void {
    // Handle CTA click
    console.log('CTA button clicked');
  }
}
