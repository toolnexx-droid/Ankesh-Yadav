
export enum MessageStatus {
  PENDING = 'PENDING',
  SENT = 'SENT',
  FAILED = 'FAILED',
  SCHEDULED = 'SCHEDULED'
}

export interface VirtualNumber {
  id: string;
  number: string;
  name?: string;
  country: string;
  status: 'ACTIVE' | 'BANNED' | 'VERIFYING';
  source: 'GENERATED' | 'MANUAL' | 'UPLOAD';
  expiresAt: string;
}

export interface Campaign {
  id: string;
  name: string;
  message: string;
  recipientCount: number;
  status: MessageStatus;
  scheduledDate?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  credits: number;
}
