import { Idea, IdeaType } from '../types';

export const filterIdeasByType = (ideas: Idea[], type: IdeaType | 'all'): Idea[] => {
  if (type === 'all') return ideas;
  return ideas.filter(idea => idea.type === type);
};

export const filterIdeasByTags = (ideas: Idea[], selectedTags: string[]): Idea[] => {
  if (selectedTags.length === 0) return ideas;
  return ideas.filter(idea => 
    selectedTags.every(tag => idea.tags.includes(tag))
  );
};

export const getIdeasCount = (ideas: Idea[]): Record<IdeaType | 'all', number> => {
  const counts = {
    all: ideas.length,
    note: 0,
    link: 0,
    image: 0,
    media: 0,
  };

  ideas.forEach(idea => {
    counts[idea.type]++;
  });

  return counts;
};

export const getAllUniqueTags = (ideas: Idea[]): string[] => {
  const tagsSet = new Set<string>();
  ideas.forEach(idea => {
    idea.tags.forEach(tag => tagsSet.add(tag));
  });
  return Array.from(tagsSet).sort();
};