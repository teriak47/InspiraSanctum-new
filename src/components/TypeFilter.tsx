import React from 'react';
import { IDEA_TYPES } from '../constants/ideaTypes';
import { IdeaType } from '../types';

interface TypeFilterProps {
  selectedType: IdeaType | 'all';
  onChange: (type: IdeaType | 'all') => void;
  count: Record<IdeaType | 'all', number>;
}

export function TypeFilter({ selectedType, onChange, count }: TypeFilterProps) {
  return (
    <div className="flex flex-col space-y-2">
      <button
        onClick={() => onChange('all')}
        className={`flex items-center px-3 py-1.5 rounded-full text-sm transition-colors ${
          selectedType === 'all'
            ? 'bg-gold/10 text-gold'
            : 'bg-[#151923] text-silver/70 hover:bg-[#1E2330] hover:text-silver/90'
        }`}
      >
        Tout ({count.all})
      </button>
      {IDEA_TYPES.map(({ type, icon: Icon, label }) => (
        <button
          key={type}
          onClick={() => onChange(type)}
          className={`flex items-center px-3 py-1.5 rounded-full text-sm transition-colors ${
            selectedType === type
              ? 'bg-gold/10 text-gold'
              : 'bg-[#151923] text-silver/70 hover:bg-[#1E2330] hover:text-silver/90'
          }`}
        >
          <Icon className="w-4 h-4 mr-1.5" />
          {label} ({count[type]})
        </button>
      ))}
    </div>
  );
}