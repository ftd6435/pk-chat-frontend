import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DashboardHeaderComponent } from '../../dashboard/components/dashboard-header/dashboard-header.component';
import { DashboardSidebarComponent } from '../../dashboard/components/dashboard-sidebar/dashboard-sidebar.component';
import { CommunityCardComponent } from './community-card/community-card.component';
import { TranslationService } from '../../../core/services/translation.service';
import { Community } from '../../../shared/models/community.model';

@Component({
  selector: 'app-communities-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    DashboardHeaderComponent,
    DashboardSidebarComponent,
    CommunityCardComponent
  ],
  templateUrl: './communities-page.component.html',
  styleUrls: ['./communities-page.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CommunitiesPageComponent implements OnInit {
  searchQuery = '';
  sortBy = 'recent';

  communities: Community[] = [
    {
      id: '1',
      name: 'Développeurs Angular',
      description: 'Une communauté pour les passionnés d\'Angular et du développement front-end.',
      icon: 'lucide:code-2',
      membersCount: 1240,
      category: 'Technologie',
      isJoined: true,
      activityLevel: 'high'
    },
    {
      id: '2',
      name: 'Photographes Amateurs',
      description: 'Partagez vos plus belles photos et apprenez les techniques de photographie.',
      icon: 'lucide:camera',
      membersCount: 856,
      category: 'Art & Créativité',
      isJoined: true,
      activityLevel: 'medium'
    },
    {
      id: '3',
      name: 'Running & Fitness',
      description: 'Motivez-vous ensemble pour atteindre vos objectifs sportifs.',
      icon: 'lucide:activity',
      membersCount: 2100,
      category: 'Sport',
      isJoined: false,
      activityLevel: 'high'
    },
    {
      id: '4',
      name: 'Cuisine du Monde',
      description: 'Découvrez et partagez des recettes de toutes les cultures.',
      icon: 'lucide:chef-hat',
      membersCount: 673,
      category: 'Cuisine',
      isJoined: false,
      activityLevel: 'medium'
    },
    {
      id: '5',
      name: 'Lectures et Littérature',
      description: 'Un espace pour les amoureux des livres et de la lecture.',
      icon: 'lucide:book-open',
      membersCount: 420,
      category: 'Culture',
      isJoined: true,
      activityLevel: 'low'
    },
    {
      id: '6',
      name: 'Entrepreneuriat & Startups',
      description: 'Échangez avec des entrepreneurs et construisez votre réseau professionnel.',
      icon: 'lucide:briefcase',
      membersCount: 1890,
      category: 'Business',
      isJoined: false,
      activityLevel: 'high'
    }
  ];

  sortOptions = [
    { value: 'recent', labelKey: 'communities.sort.recent' },
    { value: 'members', labelKey: 'communities.sort.members' },
    { value: 'activity', labelKey: 'communities.sort.activity' },
    { value: 'name', labelKey: 'communities.sort.name' }
  ];

  constructor(public translationService: TranslationService) {}

  ngOnInit(): void {}

  get filteredCommunities(): Community[] {
    let result = [...this.communities];
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      result = result.filter(c =>
        c.name.toLowerCase().includes(query) ||
        c.description.toLowerCase().includes(query) ||
        c.category.toLowerCase().includes(query)
      );
    }
    switch (this.sortBy) {
      case 'members':
        result.sort((a, b) => b.membersCount - a.membersCount);
        break;
      case 'activity':
        const levelOrder = { high: 0, medium: 1, low: 2 };
        result.sort((a, b) => levelOrder[a.activityLevel] - levelOrder[b.activityLevel]);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    return result;
  }

  onJoinCommunity(communityId: string): void {
    const community = this.communities.find(c => c.id === communityId);
    if (community) {
      community.isJoined = true;
      community.membersCount++;
    }
  }

  onViewCommunity(communityId: string): void {
    // Future: navigate to community detail page
  }

  trackByCommunityId(index: number, community: Community): string {
    return community.id;
  }
}
