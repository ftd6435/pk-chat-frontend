import { Component, Input, Output, EventEmitter, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quick-action-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quick-action-card.component.html',
  styleUrls: ['./quick-action-card.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QuickActionCardComponent {
  @Input() icon: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() iconBgColor: 'primary' | 'accent' = 'primary';
  @Output() clicked = new EventEmitter<void>();

  onClick(): void {
    this.clicked.emit();
  }
}
