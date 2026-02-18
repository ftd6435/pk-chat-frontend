import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DashboardSidebarComponent } from '../../dashboard/components/dashboard-sidebar/dashboard-sidebar.component';
import { SearchFilterBarComponent } from '../components/search-filter-bar/search-filter-bar.component';
import { SuggestedFriendCardComponent } from '../components/suggested-friend-card/suggested-friend-card.component';
import { PeopleYouMayKnowCardComponent } from '../components/people-you-may-know-card/people-you-may-know-card.component';
import { FriendDiscoveryService } from '../../../core/services/friend-discovery.service';
import { TranslationService } from '../../../core/services/translation.service';
import { FriendSuggestion, PersonSuggestion, SearchFilters } from '../../../shared/models/friend-suggestion.model';

@Component({
  selector: 'app-find-friends',
  standalone: true,
  imports: [
    CommonModule,
    DashboardSidebarComponent,
    SearchFilterBarComponent,
    SuggestedFriendCardComponent,
    PeopleYouMayKnowCardComponent
  ],
  templateUrl: './find-friends.component.html',
  styleUrls: ['./find-friends.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FindFriendsComponent implements OnInit {
  suggestedFriends: FriendSuggestion[] = [];
  peopleYouMayKnow: PersonSuggestion[] = [];
  
  searchQuery = '';
  activeFilters: string[] = [];
  
  isLoading = false;

  constructor(
    private friendDiscoveryService: FriendDiscoveryService,
    public translationService: TranslationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSuggestedFriends();
    this.loadPeopleYouMayKnow();
  }

  loadSuggestedFriends(): void {
    this.isLoading = true;
    this.friendDiscoveryService.getSuggestedFriends()
      .subscribe(friends => {
        this.suggestedFriends = friends;
        this.isLoading = false;
      });
  }

  loadPeopleYouMayKnow(): void {
    this.friendDiscoveryService.getPeopleYouMayKnow()
      .subscribe(people => {
        this.peopleYouMayKnow = people;
      });
  }

  onSearchSubmit(query: string): void {
    this.searchQuery = query;
    if (this.searchQuery.trim()) {
      const filters: SearchFilters = {
        location: this.activeFilters.includes('location'),
        mutualFriendsOnly: this.activeFilters.includes('mutualFriends'),
        sharedInterests: this.activeFilters.includes('interests')
      };
      
      this.friendDiscoveryService.searchFriends(this.searchQuery, filters)
        .subscribe(results => {
          this.suggestedFriends = results;
        });
    }
  }

  toggleFilter(filterType: string): void {
    const index = this.activeFilters.indexOf(filterType);
    if (index > -1) {
      this.activeFilters.splice(index, 1);
    } else {
      this.activeFilters.push(filterType);
    }
  }

  sendFriendRequest(userId: string): void {
    this.friendDiscoveryService.sendFriendRequest(userId)
      .subscribe(success => {
        if (success) {
          // Update UI to show request sent
          const person = this.peopleYouMayKnow.find(p => p.id === userId);
          if (person) {
            person.inviteStatus = 'pending';
          }
        }
      });
  }

  viewProfile(userId: string): void {
    this.router.navigate(['/profil', userId]);
  }

  loadMoreSuggestions(): void {
    // In a real app, this would load more data from the server
    // For now, we can just call the existing method
    this.loadSuggestedFriends();
  }

  trackByFriendId(index: number, friend: FriendSuggestion): string {
    return friend.id;
  }

  trackByPersonId(index: number, person: PersonSuggestion): string {
    return person.id;
  }
}
