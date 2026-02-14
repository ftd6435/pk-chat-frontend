import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslationService } from '../../../../core/services/translation.service';

interface Feature {
  icon: string;
  iconColor: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-features-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './features-section.component.html',
  styleUrls: ['./features-section.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FeaturesSectionComponent implements OnInit {
  translations: any = {};
  features: Feature[] = [];

  private iconMap = [
    { icon: 'lucide:user-plus', color: '#1A2B4A' },
    { icon: 'lucide:message-circle', color: '#6B9FA3' },
    { icon: 'lucide:users-round', color: '#C9A961' },
    { icon: 'lucide:file-image', color: '#8B8478' }
  ];

  constructor(private translationService: TranslationService) {}

  ngOnInit(): void {
    this.loadTranslations();
    this.translationService.getCurrentLanguage().subscribe(() => {
      this.loadTranslations();
    });
  }

  private loadTranslations(): void {
    this.translations = {
      title: this.translationService.translate('features.title'),
      description: this.translationService.translate('features.description')
    };

    const items = this.translationService.translate('features.items');
    if (Array.isArray(items)) {
      this.features = items.map((item: any, index: number) => ({
        icon: this.iconMap[index].icon,
        iconColor: this.iconMap[index].color,
        title: item.title,
        description: item.description
      }));
    }
  }
}
