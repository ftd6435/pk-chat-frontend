import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FriendSuggestion, PersonSuggestion, SearchFilters } from '../../shared/models/friend-suggestion.model';

@Injectable({
  providedIn: 'root'
})
export class FriendDiscoveryService {
  
  getSuggestedFriends(): Observable<FriendSuggestion[]> {
    return of([
      {
        id: '1',
        name: 'Marie Dubois',
        avatar: 'https://ui-avatars.com/api/?name=Marie+Dubois&background=C9A961&color=fff&size=200',
        mutualFriendsCount: 8,
        mutualFriends: [
          { id: 'm1', name: 'Paul', avatar: 'https://ui-avatars.com/api/?name=Paul&background=1A2B4A&color=fff&size=80' },
          { id: 'm2', name: 'Sophie', avatar: 'https://ui-avatars.com/api/?name=Sophie&background=1A2B4A&color=fff&size=80' },
          { id: 'm3', name: 'Lucas', avatar: 'https://ui-avatars.com/api/?name=Lucas&background=1A2B4A&color=fff&size=80' }
        ],
        sharedInterests: ['Musique', 'Voyage']
      },
      {
        id: '2',
        name: 'Lucas Martin',
        avatar: 'https://ui-avatars.com/api/?name=Lucas+Martin&background=6B9FA3&color=fff&size=200',
        mutualFriendsCount: 5,
        mutualFriends: [
          { id: 'm4', name: 'Emma', avatar: 'https://ui-avatars.com/api/?name=Emma&background=1A2B4A&color=fff&size=80' },
          { id: 'm5', name: 'Thomas', avatar: 'https://ui-avatars.com/api/?name=Thomas&background=1A2B4A&color=fff&size=80' }
        ],
        sharedInterests: ['Tech', 'Sport']
      },
      {
        id: '3',
        name: 'Emma Rousseau',
        avatar: 'https://ui-avatars.com/api/?name=Emma+Rousseau&background=8B8478&color=fff&size=200',
        mutualFriendsCount: 12,
        mutualFriends: [
          { id: 'm6', name: 'Claire', avatar: 'https://ui-avatars.com/api/?name=Claire&background=1A2B4A&color=fff&size=80' },
          { id: 'm7', name: 'Antoine', avatar: 'https://ui-avatars.com/api/?name=Antoine&background=1A2B4A&color=fff&size=80' },
          { id: 'm8', name: 'Julie', avatar: 'https://ui-avatars.com/api/?name=Julie&background=1A2B4A&color=fff&size=80' },
          { id: 'm9', name: 'Maxime', avatar: 'https://ui-avatars.com/api/?name=Maxime&background=1A2B4A&color=fff&size=80' }
        ],
        sharedInterests: ['Art', 'Photographie']
      }
    ]);
  }
  
  getPeopleYouMayKnow(): Observable<PersonSuggestion[]> {
    return of([
      {
        id: 'p1',
        name: 'Antoine Moreau',
        avatar: 'https://ui-avatars.com/api/?name=Antoine+Moreau&background=C9A961&color=fff&size=150',
        context: 'Travaille chez TechCorp',
        contextType: 'work',
        inviteStatus: 'none'
      },
      {
        id: 'p2',
        name: 'Sophie Lambert',
        avatar: 'https://ui-avatars.com/api/?name=Sophie+Lambert&background=6B9FA3&color=fff&size=150',
        context: 'Dans votre région',
        contextType: 'location',
        inviteStatus: 'none'
      },
      {
        id: 'p3',
        name: 'Paul Girard',
        avatar: 'https://ui-avatars.com/api/?name=Paul+Girard&background=8B8478&color=fff&size=150',
        context: 'Université de Lyon',
        contextType: 'university',
        inviteStatus: 'pending'
      },
      {
        id: 'p4',
        name: 'Claire Petit',
        avatar: 'https://ui-avatars.com/api/?name=Claire+Petit&background=1A2B4A&color=fff&size=150',
        context: 'Centres d\'intérêt similaires',
        contextType: 'interests',
        inviteStatus: 'none'
      }
    ]);
  }
  
  searchFriends(query: string, filters: SearchFilters): Observable<FriendSuggestion[]> {
    // In a real application, this would be an API call with server-side filtering
    // For now, return the same mock data
    return this.getSuggestedFriends();
  }
  
  sendFriendRequest(userId: string): Observable<boolean> {
    // In a real application, this would be an API call
    // Simulate success
    return of(true);
  }
}
