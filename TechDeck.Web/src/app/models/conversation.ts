export interface Conversation {
  id: number;
  personId: number;
  dateTimeSent: Date;
  text: string;
  isLastMessageFromMe: boolean;
  unreadMessagesCount: number;
  forename: string;
  surname: string;
  fullName: string;
  isRead: boolean;
}