export interface Reply {
  id: number;
  postId: number;
  personId: number;
  dateCreated: Date;
  text: string;
  authorName: string;
}