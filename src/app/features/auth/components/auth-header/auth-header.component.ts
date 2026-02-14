import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../../../core/services/translation.service';

@Component({
  selector: 'app-auth-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './auth-header.component.html',
  styleUrls: ['./auth-header.component.scss']
})
export class AuthHeaderComponent {
  @Input() pageType: 'signup' | 'login' = 'signup';

  constructor(public translationService: TranslationService) {}
}
