export interface Message {
  id: number;
  senderId: number;
  recipientId: number;
  dateTimeSent: Date;
  text: string;
  isRead: boolean;
}