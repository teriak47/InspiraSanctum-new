import { useState } from 'react';
import { IdeaType, SortOption } from '../../types';
import { filterIdeasByType, filterIdeasByTags } from '../filtering';
import { sortIdeas } from '../sorting';

export function useIdeaFilters(ideas: any[]) {
  const [sortOption, setSortOption] = useState<SortOption>('date-desc');
  const [selectedType, setSelectedType] = useState<IdeaType | 'all'>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filteredByType = filterIdeasByType(ideas, selectedType);
  const filteredByTags = filterIdeasByTags(filteredByType, selectedTags);
  const sortedIdeas = sortIdeas(filteredByTags, sortOption);

  const handleToggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return {
    sortOption,
    setSortOption,
    selectedType,
    setSelectedType,
    selectedTags,
    handleToggleTag,
    filteredIdeas: sortedIdeas,
  };
}