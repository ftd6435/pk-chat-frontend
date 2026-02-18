import { Component, Input, Output, EventEmitter, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonSuggestion } from '../../../../shared/models/friend-suggestion.model';
import { TranslationService } from '../../../../core/services/translation.service';

@Component({
  selector: 'app-people-you-may-know-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './people-you-may-know-card.component.html',
  styleUrls: ['./people-you-may-know-card.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PeopleYouMayKnowCardComponent {
  @Input() person!: PersonSuggestion;
  @Output() inviteClicked = new EventEmitter<string>();

  constructor(public translationService: TranslationService) {}

  onInviteClick(): void {
    this.inviteClicked.emit(this.person.id);
  }
}
