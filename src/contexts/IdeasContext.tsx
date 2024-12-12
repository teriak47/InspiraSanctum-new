import React, { createContext, useContext, useState } from 'react';
import { Idea, IdeaFormData } from '../types';
import { saveIdea, deleteIdeaFromStorage, getAllIdeas, getIdeasByType } from '../services/storage';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

interface IdeasContextType {
  ideas: Idea[];
  addIdea: (formData: IdeaFormData) => void;
  updateIdea: (id: string, formData: IdeaFormData) => void;
  deleteIdea: (id: string) => void;
}

const IdeasContext = createContext<IdeasContextType | null>(null);

export function IdeasProvider({ children }: { children: React.ReactNode }) {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  
  React.useEffect(() => {
    getAllIdeas()
      .then(loadedIdeas => {
        setIdeas(loadedIdeas);
        setIsInitialized(true);
      })
      .catch(error => {
        console.error('Failed to load ideas:', error);
        setIsInitialized(true);
      });
  }, []);

  const addIdea = async (formData: IdeaFormData) => {
    const newIdea: Idea = {
      id: crypto.randomUUID(),
      ...formData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      await saveIdea(newIdea);
      setIdeas(prev => [newIdea, ...prev]);
    } catch (error) {
      console.error('Failed to save idea:', error);
      throw error;
    }
  };

  const updateIdea = async (id: string, formData: IdeaFormData) => {
    const ideaToUpdate = ideas.find(idea => idea.id === id);
    if (!ideaToUpdate) return;

    const updatedIdea: Idea = {
      ...ideaToUpdate,
      ...formData,
      updatedAt: new Date().toISOString(),
    };

    try {
      await saveIdea(updatedIdea);
      setIdeas(prev => prev.map(idea => idea.id === id ? updatedIdea : idea));
    } catch (error) {
      console.error('Failed to update idea:', error);
      throw error;
    }
  };

  const deleteIdea = async (id: string) => {
    const ideaToDelete = ideas.find(idea => idea.id === id);
    if (!ideaToDelete) return;

    try {
      await deleteIdeaFromStorage(id, ideaToDelete.type);
      setIdeas(prev => prev.filter(idea => idea.id !== id));
    } catch (error) {
      console.error('Failed to delete idea:', error);
      throw error;
    }
  };

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-[#0A0F1C] flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  return (
    <IdeasContext.Provider value={{ ideas, addIdea, updateIdea, deleteIdea }}>
      {children}
    </IdeasContext.Provider>
  );
}

export function useIdeas() {
  const context = useContext(IdeasContext);
  if (!context) {
    throw new Error('useIdeas must be used within an IdeasProvider');
  }
  return context;
}