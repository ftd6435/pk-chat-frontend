import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../../../core/services/translation.service';

@Component({
  selector: 'app-user-profile-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile-card.component.html',
  styleUrls: ['./user-profile-card.component.scss']
})
export class UserProfileCardComponent {
  @Input() user!: { name: string; bio: string; avatar: string };

  constructor(public translationService: TranslationService) {}
}
