import { useState } from 'react';
import { Idea, IdeaFormData } from '../types';

export function useIdeas() {
  const [ideas, setIdeas] = useState<Idea[]>([]);

  const addIdea = (formData: IdeaFormData) => {
    const newIdea: Idea = {
      id: crypto.randomUUID(),
      ...formData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setIdeas(prev => [newIdea, ...prev]);
  };

  const deleteIdea = (id: string) => {
    setIdeas(prev => prev.filter(idea => idea.id !== id));
  };

  return {
    ideas,
    addIdea,
    deleteIdea,
  };
}