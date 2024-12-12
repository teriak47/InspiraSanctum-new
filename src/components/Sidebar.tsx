import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TypeFilter } from './TypeFilter';
import { TagFilter } from './TagFilter';
import { IdeaType } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  selectedType: IdeaType | 'all';
  onTypeChange: (type: IdeaType | 'all') => void;
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
  availableTags: string[];
  typeCount: Record<IdeaType | 'all', number>;
}

export function Sidebar({
  isOpen,
  onToggle,
  selectedType,
  onTypeChange,
  selectedTags,
  onToggleTag,
  availableTags,
  typeCount,
}: SidebarProps) {
  return (
    <>
      <div
        className={`fixed left-0 top-[73px] h-[calc(100vh-73px)] w-64 bg-[#0A0F1C]/95 backdrop-blur-sm border-r border-[#1E2330] transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full overflow-y-auto p-6">
          <div className="space-y-8">
            <div>
              <h2 className="text-lg font-semibold text-gold/90 font-primary mb-4">
                Catégories
              </h2>
              <TypeFilter
                selectedType={selectedType}
                onChange={onTypeChange}
                count={typeCount}
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gold/90 font-primary mb-4">
                Tags
              </h2>
              <TagFilter
                availableTags={availableTags}
                selectedTags={selectedTags}
                onToggleTag={onToggleTag}
              />
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={onToggle}
        className={`fixed z-50 top-[85px] p-2 bg-[#151923] border border-[#1E2330] rounded-lg text-silver/70 hover:text-gold transition-colors ${
          isOpen ? 'left-64' : 'left-0'
        }`}
        aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
      >
        {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>
    </>
  );
}