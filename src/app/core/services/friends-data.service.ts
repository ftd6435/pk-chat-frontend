import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Friend, FriendStats } from '../../shared/models/friend.model';
import { OnlineFriend } from '../../shared/models/online-friend.model';

@Injectable({
  providedIn: 'root'
})
export class FriendsDataService {
  
  private mockFriends: Friend[] = [
    {
      id: '1',
      name: 'Sophie Martin',
      avatar: 'https://i.pravatar.cc/150?img=1',
      isOnline: true,
      mutualFriendsCount: 5,
      lastActive: 'online'
    },
    {
      id: '2',
      name: 'Thomas Dubois',
      avatar: 'https://i.pravatar.cc/150?img=12',
      isOnline: false,
      mutualFriendsCount: 8,
      lastActive: 'yesterday'
    },
    {
      id: '3',
      name: 'Claire Rousseau',
      avatar: 'https://i.pravatar.cc/150?img=5',
      isOnline: true,
      mutualFriendsCount: 12,
      lastActive: 'online'
    },
    {
      id: '4',
      name: 'Antoine Moreau',
      avatar: 'https://i.pravatar.cc/150?img=13',
      isOnline: false,
      mutualFriendsCount: 3,
      lastActive: '1 week'
    },
    {
      id: '5',
      name: 'Julie Lambert',
      avatar: 'https://i.pravatar.cc/150?img=9',
      isOnline: true,
      mutualFriendsCount: 7,
      lastActive: 'online'
    },
    {
      id: '6',
      name: 'Maxime Durand',
      avatar: 'https://i.pravatar.cc/150?img=14',
      isOnline: false,
      mutualFriendsCount: 2,
      lastActive: '3 days'
    },
    {
      id: '7',
      name: 'Marie Bernard',
      avatar: 'https://i.pravatar.cc/150?img=10',
      isOnline: true,
      mutualFriendsCount: 6,
      lastActive: 'online'
    },
    {
      id: '8',
      name: 'Lucas Petit',
      avatar: 'https://i.pravatar.cc/150?img=15',
      isOnline: false,
      mutualFriendsCount: 4,
      lastActive: '2h'
    },
    {
      id: '9',
      name: 'Emma Roux',
      avatar: 'https://i.pravatar.cc/150?img=24',
      isOnline: true,
      mutualFriendsCount: 9,
      lastActive: 'online'
    },
    {
      id: '10',
      name: 'Hugo Blanc',
      avatar: 'https://i.pravatar.cc/150?img=33',
      isOnline: false,
      mutualFriendsCount: 5,
      lastActive: '5 days'
    },
    {
      id: '11',
      name: 'Léa Fontaine',
      avatar: 'https://i.pravatar.cc/150?img=26',
      isOnline: true,
      mutualFriendsCount: 11,
      lastActive: 'online'
    },
    {
      id: '12',
      name: 'Nathan Girard',
      avatar: 'https://i.pravatar.cc/150?img=52',
      isOnline: false,
      mutualFriendsCount: 3,
      lastActive: '1 days'
    },
    {
      id: '13',
      name: 'Chloé Mercier',
      avatar: 'https://i.pravatar.cc/150?img=29',
      isOnline: true,
      mutualFriendsCount: 8,
      lastActive: 'online'
    },
    {
      id: '14',
      name: 'Alexandre Leroy',
      avatar: 'https://i.pravatar.cc/150?img=59',
      isOnline: false,
      mutualFriendsCount: 6,
      lastActive: '4h'
    },
    {
      id: '15',
      name: 'Camille Garnier',
      avatar: 'https://i.pravatar.cc/150?img=32',
      isOnline: true,
      mutualFriendsCount: 10,
      lastActive: 'online'
    },
    {
      id: '16',
      name: 'Pierre Faure',
      avatar: 'https://i.pravatar.cc/150?img=68',
      isOnline: false,
      mutualFriendsCount: 7,
      lastActive: '2 days'
    },
    {
      id: '17',
      name: 'Sarah Morel',
      avatar: 'https://i.pravatar.cc/150?img=45',
      isOnline: true,
      mutualFriendsCount: 4,
      lastActive: 'online'
    },
    {
      id: '18',
      name: 'Julien Fournier',
      avatar: 'https://i.pravatar.cc/150?img=70',
      isOnline: false,
      mutualFriendsCount: 9,
      lastActive: '1 week'
    }
  ];

  getFriends(page: number = 1, pageSize: number = 6): Observable<Friend[]> {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return of(this.mockFriends.slice(startIndex, endIndex));
  }

  getTotalFriendsCount(): number {
    return this.mockFriends.length;
  }
  
  getFriendStats(): Observable<FriendStats> {
    const totalCount = this.mockFriends.length;
    const onlineCount = this.mockFriends.filter(f => f.isOnline).length;
    
    return of({
      totalFriends: totalCount,
      onlineFriends: onlineCount,
      pendingRequests: 4 // This would come from a separate requests endpoint
    });
  }
  
  getOnlineFriends(): Observable<OnlineFriend[]> {
    return of([
      {
        id: '101',
        name: 'Claire Petit',
        avatar: 'https://i.pravatar.cc/150?img=20',
        isOnline: true
      },
      {
        id: '102',
        name: 'Paul Girard',
        avatar: 'https://i.pravatar.cc/150?img=11',
        isOnline: true
      },
      {
        id: '103',
        name: 'Sarah Lambert',
        avatar: 'https://i.pravatar.cc/150?img=47',
        isOnline: true
      },
      {
        id: '104',
        name: 'Maxime Durand',
        avatar: 'https://i.pravatar.cc/150?img=60',
        isOnline: true
      }
    ]);
  }
  
  searchFriends(query: string): Observable<Friend[]> {
    const filtered = this.mockFriends.filter(friend => 
      friend.name.toLowerCase().includes(query.toLowerCase())
    );
    return of(filtered);
  }
  
  sortFriends(friends: Friend[], sortBy: string): Friend[] {
    switch (sortBy) {
      case 'recent':
        return [...friends]; // Already in recent order
      case 'alphabetical':
        return [...friends].sort((a, b) => a.name.localeCompare(b.name));
      case 'online-first':
        return [...friends].sort((a, b) => {
          if (a.isOnline && !b.isOnline) return -1;
          if (!a.isOnline && b.isOnline) return 1;
          return 0;
        });
      default:
        return friends;
    }
  }
}
