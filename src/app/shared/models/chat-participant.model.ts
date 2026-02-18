export interface ChatParticipant {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  lastSeen?: Date; // If not online
  isTyping?: boolean;
}
