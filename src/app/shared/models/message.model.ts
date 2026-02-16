export enum MessageType {
  TEXT = 'text',
  VOICE = 'voice',
  FILE = 'file',
  IMAGE = 'image',
  VIDEO = 'video'
}

export enum MessageStatus {
  SENDING = 'sending',
  SENT = 'sent',
  DELIVERED = 'delivered',
  READ = 'read',
  FAILED = 'failed'
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  type: MessageType;
  timestamp: Date;
  status: MessageStatus;
  
  // Optional fields
  voiceMessage?: VoiceMessage;
  fileAttachment?: FileAttachment;
  replyTo?: string; // Message ID being replied to
}

export interface VoiceMessage {
  duration: number; // in seconds
  audioUrl: string;
  waveformData?: number[]; // Optional: for visual waveform
}

export interface FileAttachment {
  fileName: string;
  fileSize: number; // in bytes
  fileType: string; // MIME type
  fileUrl: string;
  thumbnailUrl?: string; // Optional: for images/videos
}
