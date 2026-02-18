import { Component, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../../../core/services/translation.service';
import { Activity } from '../../../../shared/models/activity.model';

@Component({
  selector: 'app-activity-feed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activity-feed.component.html',
  styleUrls: ['./activity-feed.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ActivityFeedComponent {
  @Input() activities: Activity[] = [];

  constructor(public translationService: TranslationService) {}

  trackById(index: number, activity: Activity): string {
    return activity.id;
  }
}
