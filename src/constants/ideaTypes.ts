import { FileText, Link2, Image, Film } from 'lucide-react';
import { IdeaType } from '../types';

export const IDEA_TYPES = [
  { type: 'note' as IdeaType, icon: FileText, label: 'Note' },
  { type: 'link' as IdeaType, icon: Link2, label: 'Lien' },
  { type: 'image' as IdeaType, icon: Image, label: 'Image' },
  { type: 'media' as IdeaType, icon: Film, label: 'Média' },
] as const;