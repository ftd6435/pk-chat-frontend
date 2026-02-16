import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslationService } from '../../../../core/services/translation.service';

@Component({
  selector: 'app-dashboard-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['./dashboard-sidebar.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardSidebarComponent {
  activeItem = 'dashboard';

  navItems = [
    { id: 'dashboard', icon: 'lucide:layout-dashboard', translationKey: 'dashboard.sidebar.dashboard' },
    { id: 'friends', icon: 'lucide:users', translationKey: 'dashboard.sidebar.friends' },
    { id: 'communities', icon: 'lucide:users-2', translationKey: 'dashboard.sidebar.communities' },
    { id: 'messages', icon: 'lucide:message-circle', translationKey: 'dashboard.sidebar.messages' },
    { id: 'profile', icon: 'lucide:user', translationKey: 'dashboard.sidebar.profile' }
  ];

  constructor(public translationService: TranslationService) {}

  setActive(itemId: string): void {
    this.activeItem = itemId;
  }
}
