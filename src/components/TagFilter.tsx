import React from 'react';
import { Tag } from 'lucide-react';

interface TagFilterProps {
  availableTags: string[];
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
}

export function TagFilter({ availableTags, selectedTags, onToggleTag }: TagFilterProps) {
  if (availableTags.length === 0) return null;

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-silver/70">Filtrer par tags</h3>
      <div className="flex flex-wrap gap-2">
        {availableTags.map((tag) => (
          <button
            key={tag}
            onClick={() => onToggleTag(tag)}
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
              selectedTags.includes(tag)
                ? 'bg-gold/10 text-gold'
                : 'bg-[#151923] text-silver/70 hover:bg-[#1E2330] hover:text-silver/90'
            }`}
          >
            <Tag className="w-3 h-3 mr-1" />
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}