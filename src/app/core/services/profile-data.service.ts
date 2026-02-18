import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserProfile, ProfileStats } from '../../shared/models/user-profile.model';
import { Activity } from '../../shared/models/activity.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileDataService {
  
  getCurrentUserProfile(): Observable<UserProfile> {
    return of({
      id: 'current-user',
      name: 'Marie Leroy',
      avatar: 'https://i.pravatar.cc/300?img=5',
      coverPhoto: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&h=400&fit=crop',
      bio: 'Développeuse passionnée par les nouvelles technologies et les voyages. Toujours prête à explorer de nouvelles idées et à collaborer sur des projets innovants.',
      fullBio: 'Développeuse full-stack avec 5 ans d\'expérience dans les technologies web modernes. Passionnée par l\'UX/UI et l\'innovation technologique. J\'aime aussi voyager et découvrir de nouvelles cultures.',
      location: 'Paris, France',
      website: 'https://marieleroy.dev',
      birthday: '1995-03-15',
      memberSince: '2023-01-01',
      interests: [
        'Développement Web',
        'Voyages',
        'Photographie',
        'Cuisine',
        'Tech'
      ]
    });
  }
  
  getProfileStats(): Observable<ProfileStats> {
    return of({
      friends: 127,
      communities: 23,
      messages: 1834
    });
  }
  
  getRecentActivities(): Observable<Activity[]> {
    return of([
      {
        id: '1',
        type: 'message',
        icon: 'lucide:message-circle',
        text: 'Nouvelle conversation avec Sophie Dubois',
        timestamp: '2h'
      },
      {
        id: '2',
        type: 'community',
        icon: 'lucide:users-2',
        text: 'Rejoint la communauté "Développeurs React"',
        timestamp: '1 day'
      },
      {
        id: '3',
        type: 'friend',
        icon: 'lucide:user-plus',
        text: 'Nouvelle connexion avec Lucas Bernard',
        timestamp: '3 days'
      }
    ]);
  }
  
  getAccountSecurity(): Observable<any> {
    return of({
      passwordLastChanged: '2024-11-15',
      twoFactorEnabled: true
    });
  }
}
