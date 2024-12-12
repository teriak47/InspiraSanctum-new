import React from 'react';
import { Tag } from 'lucide-react';

interface TagListProps {
  tags: string[];
  onDelete?: (index: number) => void;
  className?: string;
}

export function TagList({ tags, onDelete, className = '' }: TagListProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tag, index) => (
        <span
          key={index}
          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gold/10 text-gold/90 hover:bg-gold/20 transition-colors"
        >
          <Tag className="w-3 h-3 mr-1 opacity-70" />
          {tag}
          {onDelete && (
            <button
              type="button"
              onClick={() => onDelete(index)}
              className="ml-1 text-gold/70 hover:text-gold/90"
            >
              ×
            </button>
          )}
        </span>
      ))}
    </div>
  );
}