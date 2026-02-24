export interface Community {
  id: string;
  name: string;
  description: string;
  icon: string;
  membersCount: number;
  category: string;
  isJoined: boolean;
  activityLevel: 'high' | 'medium' | 'low';
  lastActivity?: Date;
}

export type CommunityType = 'public' | 'private' | 'secret';

export interface CreateCommunityForm {
  icon?: File;
  iconPreview?: string;
  name: string;
  description: string;
  type: CommunityType;
  category: string;
  tags: string[];
}
