import React from 'react';
import { Tag } from './Tag';

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  className?: string;
}

export function TagInput({ tags, onChange, className }: TagInputProps) {
  const [input, setInput] = React.useState('');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault();
      onChange([...tags, input.trim()]);
      setInput('');
    }
  };

  const removeTag = (indexToRemove: number) => {
    onChange(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-silver/70 mb-2">
        Tags
      </label>
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Tag
              key={index}
              label={tag}
              onDelete={() => removeTag(index)}
            />
          ))}
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ajouter un tag (Appuyez sur Entrée)"
          className="block w-full rounded-md bg-[#0A0F1C] border border-[#1E2330] text-silver shadow-sm focus:border-gold/20 focus:ring-1 focus:ring-gold/20 p-2.5"
        />
      </div>
    </div>
  );
}