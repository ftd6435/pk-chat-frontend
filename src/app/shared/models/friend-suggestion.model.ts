export interface FriendSuggestion {
  id: string;
  name: string;
  avatar: string;
  mutualFriendsCount: number;
  mutualFriends: MutualFriend[];
  sharedInterests: string[];
}

export interface MutualFriend {
  id: string;
  name: string;
  avatar: string;
}

export interface PersonSuggestion {
  id: string;
  name: string;
  avatar: string;
  context: string; // e.g., "Travaille chez TechCorp", "Dans votre région"
  contextType: 'work' | 'location' | 'university' | 'interests';
  inviteStatus: 'none' | 'pending';
}

export interface SearchFilters {
  location?: boolean;
  mutualFriendsOnly?: boolean;
  sharedInterests?: boolean;
}
