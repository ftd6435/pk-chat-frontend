import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunityUpdate } from '../../../../shared/models/community-update.model';
import { TranslationService } from '../../../../core/services/translation.service';

@Component({
  selector: 'app-community-update-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './community-update-card.component.html',
  styleUrls: ['./community-update-card.component.scss']
})
export class CommunityUpdateCardComponent {
  @Input() update!: CommunityUpdate;

  constructor(public translationService: TranslationService) {}
}
