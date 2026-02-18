import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardHeaderComponent } from '../../dashboard/components/dashboard-header/dashboard-header.component';
import { DashboardSidebarComponent } from '../../dashboard/components/dashboard-sidebar/dashboard-sidebar.component';
import { FriendCardComponent } from '../components/friend-card/friend-card.component';
import { FriendsFilterBarComponent } from '../components/friends-filter-bar/friends-filter-bar.component';
import { FriendsStatsCardComponent } from '../components/friends-stats-card/friends-stats-card.component';
import { QuickActionCardComponent } from '../components/quick-action-card/quick-action-card.component';
import { OnlineFriendItemComponent } from '../../dashboard/components/online-friend-item/online-friend-item.component';
import { FriendsDataService } from '../../../core/services/friends-data.service';
import { TranslationService } from '../../../core/services/translation.service';
import { Friend, FriendStats } from '../../../shared/models/friend.model';
import { OnlineFriend } from '../../../shared/models/online-friend.model';

interface Tab {
  id: string;
  label: string;
  badge?: number;
}

@Component({
  selector: 'app-friends-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DashboardHeaderComponent,
    DashboardSidebarComponent,
    FriendCardComponent,
    FriendsFilterBarComponent,
    FriendsStatsCardComponent,
    QuickActionCardComponent,
    OnlineFriendItemComponent
  ],
  templateUrl: './friends-page.component.html',
  styleUrls: ['./friends-page.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FriendsPageComponent implements OnInit {
  activeTab: 'tous' | 'requests' | 'discover' = 'tous';
  
  friends: Friend[] = [];
  allFriends: Friend[] = [];
  onlineFriends: OnlineFriend[] = [];
  stats: FriendStats = { totalFriends: 0, onlineFriends: 0, pendingRequests: 0 };
  
  searchQuery = '';
  sortBy = 'recent';
  mutualFriendsOnly = false;
  
  currentPage = 1;
  pageSize = 6;
  totalPages = 1;

  tabs: Tab[] = [];

  constructor(
    private friendsService: FriendsDataService,
    public translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.initializeTabs();
    this.loadStats();
    this.loadOnlineFriends();
    this.loadFriends();
  }

  initializeTabs(): void {
    this.tabs = [
      { 
        id: 'tous', 
        label: this.translationService.translate('friends.tabs.all')
      },
      { 
        id: 'requests', 
        label: this.translationService.translate('friends.tabs.requests'),
        badge: 4
      },
      { 
        id: 'discover', 
        label: this.translationService.translate('friends.tabs.discover')
      }
    ];
  }

  loadFriends(): void {
    this.friendsService.getFriends(this.currentPage, this.pageSize)
      .subscribe(friends => {
        this.friends = friends;
        this.allFriends = friends;
        this.applyFilters();
        this.calculateTotalPages();
      });
  }

  loadStats(): void {
    this.friendsService.getFriendStats()
      .subscribe(stats => {
        this.stats = stats;
      });
  }

  loadOnlineFriends(): void {
    this.friendsService.getOnlineFriends()
      .subscribe(friends => {
        this.onlineFriends = friends;
      });
  }

  calculateTotalPages(): void {
    const totalCount = this.friendsService.getTotalFriendsCount();
    this.totalPages = Math.ceil(totalCount / this.pageSize);
  }

  applyFilters(): void {
    let filtered = [...this.allFriends];

    // Apply search filter
    if (this.searchQuery.trim()) {
      filtered = filtered.filter(friend => 
        friend.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    // Apply mutual friends filter
    if (this.mutualFriendsOnly) {
      filtered = filtered.filter(friend => friend.mutualFriendsCount > 0);
    }

    // Apply sort
    filtered = this.friendsService.sortFriends(filtered, this.sortBy);

    this.friends = filtered;
  }

  onSearchChange(query: string): void {
    this.searchQuery = query;
    this.currentPage = 1;
    this.loadFriends();
  }

  onSortChange(sortBy: string): void {
    this.sortBy = sortBy;
    this.applyFilters();
  }

  onMutualFriendsToggle(enabled: boolean): void {
    this.mutualFriendsOnly = enabled;
    this.applyFilters();
  }

  setActiveTab(tabId: string): void {
    this.activeTab = tabId as any;
    // Load different data based on tab (implement later for requests and discover)
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadFriends();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxPagesToShow = 3;
    
    let startPage = Math.max(1, this.currentPage - 1);
    let endPage = Math.min(this.totalPages, startPage + maxPagesToShow - 1);
    
    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  }

  onFriendMessage(friendId: string): void {
    console.log('Message friend:', friendId);
    // Navigate to chat with this friend
  }

  onFriendMoreOptions(friendId: string): void {
    console.log('More options for friend:', friendId);
    // Show options menu
  }

  onQuickActionClick(action: string): void {
    console.log('Quick action:', action);
    // Handle quick action
  }

  onOnlineFriendMessage(friendId: string): void {
    console.log('Message online friend:', friendId);
    // Navigate to chat with this friend
  }

  trackByFriend(index: number, friend: Friend): string {
    return friend.id;
  }

  trackByOnlineFriend(index: number, friend: OnlineFriend): string {
    return friend.id;
  }

  trackByPage(index: number, page: number): number {
    return page;
  }
}
