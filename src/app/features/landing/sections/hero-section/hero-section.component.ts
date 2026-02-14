import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { TranslationService } from '../../../../core/services/translation.service';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatRippleModule],
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss']
})
export class HeroSectionComponent implements OnInit {
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
      headline: this.translationService.translate('hero.headline'),
      description: this.translationService.translate('hero.description'),
      primaryCta: this.translationService.translate('hero.cta.primary'),
      secondaryCta: this.translationService.translate('hero.cta.secondary')
    };
  }

  onPrimaryClick(): void {
    // Handle primary CTA click
    console.log('Primary CTA clicked');
  }

  onSecondaryClick(): void {
    // Handle secondary CTA click
    console.log('Secondary CTA clicked');
  }
}
