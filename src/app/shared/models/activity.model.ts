export interface Activity {
  id: string;
  type: 'message' | 'community' | 'friend' | 'post';
  icon: string;
  text: string;
  timestamp: Date | string;
}
