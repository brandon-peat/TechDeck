import { Reply } from "./reply";

export interface Post {
  id: number;
  personId: number;
  dateCreated: Date;
  text: string;
  authorName: string;
  replies: Reply[];
  imageUrls: string[];
}