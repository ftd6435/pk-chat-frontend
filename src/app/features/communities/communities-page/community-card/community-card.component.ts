import { Component, Input, Output, EventEmitter, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Community } from '../../../../shared/models/community.model';
import { TranslationService } from '../../../../core/services/translation.service';

@Component({
  selector: 'app-community-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './community-card.component.html',
  styleUrls: ['./community-card.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CommunityCardComponent {
  @Input() community!: Community;
  @Output() joinClicked = new EventEmitter<string>();
  @Output() viewClicked = new EventEmitter<string>();

  constructor(public translationService: TranslationService) {}

  onJoinClick(): void {
    this.joinClicked.emit(this.community.id);
  }

  onViewClick(): void {
    this.viewClicked.emit(this.community.id);
  }

  getMembersText(): string {
    return this.translationService.translate('communities.card.members')
      .replace('{{count}}', String(this.community.membersCount));
  }

  getActivityClass(): string {
    return `activity-${this.community.activityLevel}`;
  }
}
