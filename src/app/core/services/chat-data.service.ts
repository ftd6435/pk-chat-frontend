import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Message, MessageType, MessageStatus } from '../../shared/models/message.model';
import { ChatParticipant } from '../../shared/models/chat-participant.model';

@Injectable({
  providedIn: 'root'
})
export class ChatDataService {
  
  getChatParticipant(userId: string): ChatParticipant {
    return {
      id: '1',
      name: 'Sophie Dubois',
      avatar: 'https://i.pravatar.cc/150?img=1',
      isOnline: true,
      isTyping: true
    };
  }
  
  getMessages(userId: string): Message[] {
    return [
      {
        id: '1',
        senderId: '1',
        receiverId: 'current-user',
        content: 'Salut ! Comment ça va ?',
        type: MessageType.TEXT,
        timestamp: new Date('2026-02-16T10:30:00'),
        status: MessageStatus.READ
      },
      {
        id: '2',
        senderId: 'current-user',
        receiverId: '1',
        content: 'Ça va super bien ! Et toi ?',
        type: MessageType.TEXT,
        timestamp: new Date('2026-02-16T10:31:00'),
        status: MessageStatus.READ
      },
      {
        id: '3',
        senderId: '1',
        receiverId: 'current-user',
        content: '',
        type: MessageType.VOICE,
        timestamp: new Date('2026-02-16T10:35:00'),
        status: MessageStatus.READ,
        voiceMessage: {
          duration: 45,
          audioUrl: '/assets/audio/voice-message.mp3'
        }
      },
      {
        id: '4',
        senderId: 'current-user',
        receiverId: '1',
        content: '',
        type: MessageType.FILE,
        timestamp: new Date('2026-02-16T10:42:00'),
        status: MessageStatus.READ,
        fileAttachment: {
          fileName: 'Rapport_Projet.pdf',
          fileSize: 2400000, // 2.4 MB in bytes
          fileType: 'application/pdf',
          fileUrl: '/assets/files/rapport.pdf'
        }
      },
      {
        id: '5',
        senderId: '1',
        receiverId: 'current-user',
        content: 'Parfait ! J\'ai hâte de voir les résultats.',
        type: MessageType.TEXT,
        timestamp: new Date('2026-02-16T10:45:00'),
        status: MessageStatus.READ
      }
    ];
  }
  
  sendMessage(message: Partial<Message>): Observable<Message> {
    // Simulate API call
    return of({
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
      status: MessageStatus.SENT
    } as Message).pipe(delay(500));
  }
}
