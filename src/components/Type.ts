export interface Quote {
  quoteId: number;
  text: string;
}
  
export interface Tag {
  tagId: number;
  text: string;
  type: TagType;
}


export enum TagType {
  Other = 0,
  Author = 1,
  Language = 2,
  Category = 3
}