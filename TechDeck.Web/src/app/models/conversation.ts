export interface Conversation {
  id: number;
  personId: number;
  dateTimeSent: Date;
  text: string;
  isRead: boolean;
  isLastMessageFromMe: boolean;
  forename: string;
  surname: string;
  fullName: string;
}