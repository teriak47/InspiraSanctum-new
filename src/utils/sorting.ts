import { Idea, SortOption } from '../types';

export const sortIdeas = (ideas: Idea[], sortOption: SortOption): Idea[] => {
  const sortedIdeas = [...ideas];

  switch (sortOption) {
    case 'date-desc':
      return sortedIdeas.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    case 'date-asc':
      return sortedIdeas.sort((a, b) => 
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    case 'title-asc':
      return sortedIdeas.sort((a, b) => 
        a.title.localeCompare(b.title, 'fr', { sensitivity: 'base' })
      );
    case 'title-desc':
      return sortedIdeas.sort((a, b) => 
        b.title.localeCompare(a.title, 'fr', { sensitivity: 'base' })
      );
    case 'type':
      return sortedIdeas.sort((a, b) => 
        a.type.localeCompare(b.type, 'fr', { sensitivity: 'base' })
      );
    default:
      return sortedIdeas;
  }
};