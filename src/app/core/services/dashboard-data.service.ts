import { Injectable } from '@angular/core';
import { Conversation } from '../../shared/models/conversation.model';
import { CommunityUpdate } from '../../shared/models/community-update.model';
import { FriendSuggestion } from '../../shared/models/friend-suggestion.model';
import { OnlineFriend } from '../../shared/models/online-friend.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardDataService {
  
  getConversations(): Conversation[] {
    return [
      {
        id: '1',
        name: 'Sophie Dubois',
        avatar: 'https://i.pravatar.cc/150?img=1',
        lastMessage: 'Salut ! Tu es libre pour déjeuner demain ?',
        timestamp: '5 min',
        isOnline: true,
        isGroup: false,
        unreadCount: 2
      },
      {
        id: '2',
        name: 'Équipe Marketing',
        avatar: 'https://i.pravatar.cc/150?img=20',
        lastMessage: 'Pierre: Le projet avance bien, on se voit lundi ?',
        timestamp: '2h',
        isOnline: false,
        isGroup: true,
        unreadCount: 5
      },
      {
        id: '3',
        name: 'Thomas Martin',
        avatar: 'https://i.pravatar.cc/150?img=12',
        lastMessage: 'Merci pour ton aide sur le projet !',
        timestamp: 'Hier',
        isOnline: false,
        isGroup: false
      },
      {
        id: '4',
        name: 'Club Photo',
        avatar: 'https://i.pravatar.cc/150?img=25',
        lastMessage: 'Emma: Les photos de la sortie sont en ligne !',
        timestamp: '3j',
        isOnline: false,
        isGroup: true,
        unreadCount: 1
      }
    ];
  }
  
  getCommunityUpdates(): CommunityUpdate[] {
    return [
      {
        id: '1',
        communityName: 'Développeurs Paris',
        communityIcon: 'https://i.pravatar.cc/150?img=30',
        updateText: '3 nouveaux messages dans la discussion \'React vs Vue\'',
        timestamp: '1h'
      },
      {
        id: '2',
        communityName: 'Randonnée IDF',
        communityIcon: 'https://i.pravatar.cc/150?img=31',
        updateText: 'Nouvelle sortie organisée pour ce weekend en forêt de Fontainebleau',
        timestamp: '4h'
      },
      {
        id: '3',
        communityName: 'Cuisine du monde',
        communityIcon: 'https://i.pravatar.cc/150?img=32',
        updateText: 'Julie a partagé sa recette de curry thaï, 12 likes !',
        timestamp: 'Hier'
      }
    ];
  }
  
  getFriendSuggestions(): FriendSuggestion[] {
    return [
      {
        id: '1',
        name: 'Lucas Bernard',
        avatar: 'https://i.pravatar.cc/150?img=33',
        mutualFriendsCount: 2
      },
      {
        id: '2',
        name: 'Amélie Rousseau',
        avatar: 'https://i.pravatar.cc/150?img=34',
        mutualFriendsCount: 5
      },
      {
        id: '3',
        name: 'Antoine Moreau',
        avatar: 'https://i.pravatar.cc/150?img=35',
        mutualFriendsCount: 1
      }
    ];
  }
  
  getOnlineFriends(): OnlineFriend[] {
    return [
      {
        id: '1',
        name: 'Claire Petit',
        avatar: 'https://i.pravatar.cc/150?img=40',
        isOnline: true
      },
      {
        id: '2',
        name: 'Paul Girard',
        avatar: 'https://i.pravatar.cc/150?img=41',
        isOnline: true
      },
      {
        id: '3',
        name: 'Sarah Lambert',
        avatar: 'https://i.pravatar.cc/150?img=42',
        isOnline: true
      },
      {
        id: '4',
        name: 'Maxime Durand',
        avatar: 'https://i.pravatar.cc/150?img=43',
        isOnline: true
      }
    ];
  }
  
  getCurrentUser(): { name: string; bio: string; avatar: string } {
    return {
      name: 'Marie Leroy',
      bio: 'Développeuse passionnée par les nouvelles technologies et les voyages',
      avatar: 'https://i.pravatar.cc/150?img=5'
    };
  }
}
