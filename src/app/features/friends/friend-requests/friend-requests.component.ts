import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardSidebarComponent } from '../../dashboard/components/dashboard-sidebar/dashboard-sidebar.component';
import { TranslationService } from '../../../core/services/translation.service';

export interface FriendRequest {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
    isOnline: boolean;
  };
  mutualFriends: {
    count: number;
    avatars: string[];
  };
  requestedAt: Date;
  status: 'pending' | 'accepted' | 'declined';
  direction: 'received' | 'sent';
}

@Component({
  selector: 'app-friend-requests',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DashboardSidebarComponent
  ],
  templateUrl: './friend-requests.component.html',
  styleUrls: ['./friend-requests.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FriendRequestsComponent implements OnInit {
  activeTab: 'received' | 'sent' = 'received';

  friendRequests: FriendRequest[] = [
    {
      id: '1',
      user: { id: 'u1', name: 'Marie Dubois', avatar: 'https://i.pravatar.cc/150?img=1', isOnline: true },
      mutualFriends: { count: 3, avatars: ['https://i.pravatar.cc/40?img=10', 'https://i.pravatar.cc/40?img=11', 'https://i.pravatar.cc/40?img=12'] },
      requestedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      status: 'pending',
      direction: 'received'
    },
    {
      id: '2',
      user: { id: 'u2', name: 'Thomas Martin', avatar: 'https://i.pravatar.cc/150?img=3', isOnline: false },
      mutualFriends: { count: 5, avatars: ['https://i.pravatar.cc/40?img=13', 'https://i.pravatar.cc/40?img=14', 'https://i.pravatar.cc/40?img=15'] },
      requestedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      status: 'pending',
      direction: 'received'
    },
    {
      id: '3',
      user: { id: 'u3', name: 'Sophie Bernard', avatar: 'https://i.pravatar.cc/150?img=5', isOnline: true },
      mutualFriends: { count: 2, avatars: ['https://i.pravatar.cc/40?img=16', 'https://i.pravatar.cc/40?img=17', 'https://i.pravatar.cc/40?img=18'] },
      requestedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      status: 'pending',
      direction: 'received'
    },
    {
      id: '4',
      user: { id: 'u4', name: 'Lucas Petit', avatar: 'https://i.pravatar.cc/150?img=7', isOnline: false },
      mutualFriends: { count: 8, avatars: ['https://i.pravatar.cc/40?img=19', 'https://i.pravatar.cc/40?img=20', 'https://i.pravatar.cc/40?img=21'] },
      requestedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
      status: 'pending',
      direction: 'received'
    },
    {
      id: '5',
      user: { id: 'u5', name: 'Claire Fontaine', avatar: 'https://i.pravatar.cc/150?img=9', isOnline: true },
      mutualFriends: { count: 4, avatars: ['https://i.pravatar.cc/40?img=22', 'https://i.pravatar.cc/40?img=23', 'https://i.pravatar.cc/40?img=24'] },
      requestedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      status: 'pending',
      direction: 'sent'
    },
    {
      id: '6',
      user: { id: 'u6', name: 'Antoine Moreau', avatar: 'https://i.pravatar.cc/150?img=11', isOnline: false },
      mutualFriends: { count: 1, avatars: ['https://i.pravatar.cc/40?img=25', 'https://i.pravatar.cc/40?img=26', 'https://i.pravatar.cc/40?img=27'] },
      requestedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      status: 'pending',
      direction: 'sent'
    }
  ];

  constructor(public translationService: TranslationService) {}

  ngOnInit(): void {}

  get receivedRequests(): FriendRequest[] {
    return this.friendRequests.filter(r => r.direction === 'received' && r.status === 'pending');
  }

  get sentRequests(): FriendRequest[] {
    return this.friendRequests.filter(r => r.direction === 'sent' && r.status === 'pending');
  }

  setActiveTab(tab: 'received' | 'sent'): void {
    this.activeTab = tab;
  }

  acceptFriendRequest(requestId: string): void {
    const request = this.friendRequests.find(r => r.id === requestId);
    if (request) {
      request.status = 'accepted';
    }
  }

  declineFriendRequest(requestId: string): void {
    const request = this.friendRequests.find(r => r.id === requestId);
    if (request) {
      request.status = 'declined';
    }
  }

  getTimeAgo(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffDays / 7);

    if (diffHours < 24) {
      return this.translationService.translate('friends.requests.time.hours').replace('{{count}}', String(diffHours));
    } else if (diffDays < 7) {
      const key = diffDays === 1 ? 'friends.requests.time.day' : 'friends.requests.time.days';
      return this.translationService.translate(key).replace('{{count}}', String(diffDays));
    } else {
      const key = diffWeeks === 1 ? 'friends.requests.time.week' : 'friends.requests.time.weeks';
      return this.translationService.translate(key).replace('{{count}}', String(diffWeeks));
    }
  }

  getMutualFriendsText(count: number): string {
    return this.translationService.translate('friends.requests.mutualFriends').replace('{{count}}', String(count));
  }

  trackByRequestId(index: number, request: FriendRequest): string {
    return request.id;
  }
}
