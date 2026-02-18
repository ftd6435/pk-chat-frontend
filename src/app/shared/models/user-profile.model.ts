export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  coverPhoto: string;
  bio: string;
  fullBio: string;
  location: string;
  website: string;
  birthday: Date | string;
  memberSince: Date | string;
  interests: string[];
}

export interface ProfileStats {
  friends: number;
  communities: number;
  messages: number;
}
