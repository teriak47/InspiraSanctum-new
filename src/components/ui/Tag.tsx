import React from 'react';
import { cn } from '../../utils/cn';
import { Tag as TagIcon } from 'lucide-react';

interface TagProps {
  label: string;
  onDelete?: () => void;
  className?: string;
}

export function Tag({ label, onDelete, className }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        'bg-gold/10 text-gold/90 hover:bg-gold/20 transition-colors',
        className
      )}
    >
      <TagIcon className="w-3 h-3 mr-1 opacity-70" />
      {label}
      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="ml-1 text-gold/70 hover:text-gold/90"
        >
          ×
        </button>
      )}
    </span>
  );
}