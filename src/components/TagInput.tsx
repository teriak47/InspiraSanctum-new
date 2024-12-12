import React from 'react';
import { Tag, X } from 'lucide-react';

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
}

export function TagInput({ tags, onChange }: TagInputProps) {
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
    <div className="space-y-3">
      <label className="block text-sm font-medium text-silver/70">
        Tags
      </label>
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2.5 py-1 rounded-full text-sm bg-gold/10 text-gold border border-gold/20"
            >
              <Tag className="w-3 h-3 mr-1" />
              {tag}
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="ml-1.5 hover:text-gold"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
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