import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { IdeaCard } from '../components/IdeaCard';
import { EmptyState } from '../components/EmptyState';
import { Sidebar } from '../components/Sidebar';
import { SortSelector } from '../components/SortSelector';
import { BentoGrid, BentoGridItem } from '../components/ui/bento-grid';
import { useIdeas } from '../contexts/IdeasContext';
import { getIdeasCount, getAllUniqueTags } from '../utils/filtering';
import { useIdeaFilters } from '../utils/hooks/useIdeaFilters';
import { useSidebar } from '../utils/hooks/useSidebar';

export function HomePage() {
  const { ideas, deleteIdea } = useIdeas();
  const { isOpen, toggle } = useSidebar();
  const {
    sortOption,
    setSortOption,
    selectedType,
    setSelectedType,
    selectedTags,
    handleToggleTag,
    filteredIdeas,
  } = useIdeaFilters(ideas);
  
  const ideasCount = getIdeasCount(ideas);
  const availableTags = getAllUniqueTags(ideas);
  const isEmpty = filteredIdeas.length === 0;

  return (
    <main className={`min-h-screen transition-all duration-300 ease-in-out text-[#c0c0c0] ${isOpen ? 'ml-64' : 'ml-0'} px-4 sm:px-6 lg:px-8 py-8`}>
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#d4af37] font-primary">
          Mes idées ({filteredIdeas.length})
        </h1>
        <Link to="/add" className="group relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white transition-all duration-300">
          <div className="absolute inset-0 bg-scarlet/90 rounded-md group-hover:bg-scarlet/80 transition-colors"></div>
          <div className="absolute inset-0 bg-gold/20 rounded-md blur-md group-hover:blur-lg opacity-0 group-hover:opacity-100 transition-all"></div>
          <Plus className="relative z-10 h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
          <span className="relative z-10">Nouvelle idée</span>
        </Link>
      </div>

      <Sidebar
        isOpen={isOpen}
        onToggle={toggle}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        selectedTags={selectedTags}
        onToggleTag={handleToggleTag}
        availableTags={availableTags}
        typeCount={ideasCount}
      />

      <div className="mb-8 flex justify-end">
          <SortSelector value={sortOption} onChange={setSortOption} />
      </div>
      <div className="mt-8 pb-8">
        {isEmpty ? (
          <EmptyState />
        ) : (
          <BentoGrid>
            {filteredIdeas.map(idea => (
              <BentoGridItem
                key={idea.id}
                variant={
                  idea.type === 'media' ? 'wide' :
                  idea.type === 'image' ? 'tall' : 'default'
                }
                className="h-full min-h-[200px]"
              >
                <IdeaCard
                  idea={idea}
                  onDelete={deleteIdea}
                />
              </BentoGridItem>
            ))}
          </BentoGrid>
        )}
      </div>
    </main>
  );
}