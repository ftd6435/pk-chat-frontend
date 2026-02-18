export interface Friend {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  mutualFriendsCount: number;
  lastActive: Date | string;
}

export interface FriendRequest {
  id: string;
  from: Friend;
  timestamp: Date;
  message?: string;
}

export interface FriendStats {
  totalFriends: number;
  onlineFriends: number;
  pendingRequests: number;
}
