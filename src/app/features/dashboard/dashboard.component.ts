import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardHeaderComponent } from './components/dashboard-header/dashboard-header.component';
import { DashboardSidebarComponent } from './components/dashboard-sidebar/dashboard-sidebar.component';
import { ConversationCardComponent } from './components/conversation-card/conversation-card.component';
import { CommunityUpdateCardComponent } from './components/community-update-card/community-update-card.component';
import { UserProfileCardComponent } from './components/user-profile-card/user-profile-card.component';
import { FriendSuggestionCardComponent } from './components/friend-suggestion-card/friend-suggestion-card.component';
import { OnlineFriendItemComponent } from './components/online-friend-item/online-friend-item.component';
import { DashboardDataService } from '../../core/services/dashboard-data.service';
import { TranslationService } from '../../core/services/translation.service';
import { Conversation } from '../../shared/models/conversation.model';
import { CommunityUpdate } from '../../shared/models/community-update.model';
import { FriendSuggestion } from '../../shared/models/friend-suggestion.model';
import { OnlineFriend } from '../../shared/models/online-friend.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    DashboardHeaderComponent,
    DashboardSidebarComponent,
    ConversationCardComponent,
    CommunityUpdateCardComponent,
    UserProfileCardComponent,
    FriendSuggestionCardComponent,
    OnlineFriendItemComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  conversations: Conversation[] = [];
  communityUpdates: CommunityUpdate[] = [];
  friendSuggestions: FriendSuggestion[] = [];
  onlineFriends: OnlineFriend[] = [];
  currentUser: { name: string; bio: string; avatar: string } = { name: '', bio: '', avatar: '' };

  constructor(
    private dashboardDataService: DashboardDataService,
    public translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.conversations = this.dashboardDataService.getConversations();
    this.communityUpdates = this.dashboardDataService.getCommunityUpdates();
    this.friendSuggestions = this.dashboardDataService.getFriendSuggestions();
    this.onlineFriends = this.dashboardDataService.getOnlineFriends();
    this.currentUser = this.dashboardDataService.getCurrentUser();
  }

  getUserFirstName(): string {
    return this.currentUser.name.split(' ')[0];
  }

  trackByConversation(index: number, conversation: Conversation): string {
    return conversation.id;
  }

  trackByCommunityUpdate(index: number, update: CommunityUpdate): string {
    return update.id;
  }

  trackByFriendSuggestion(index: number, suggestion: FriendSuggestion): string {
    return suggestion.id;
  }

  trackByOnlineFriend(index: number, friend: OnlineFriend): string {
    return friend.id;
  }
}
