export type IdeaType = 'link' | 'image' | 'note' | 'media';

export type SortOption = 'date-desc' | 'date-asc' | 'title-asc' | 'title-desc' | 'type';

export interface Idea {
  id: string;
  type: IdeaType;
  title: string;
  content: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IdeaFormData {
  title: string;
  type: IdeaType;
  content: string;
  tags: string[];
}