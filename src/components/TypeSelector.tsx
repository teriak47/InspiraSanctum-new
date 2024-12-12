import React from 'react';
import { IDEA_TYPES } from '../constants/ideaTypes';
import { IdeaType } from '../types';
import { cn } from '../utils/cn';

interface TypeSelectorProps {
  selectedType: IdeaType;
  onChange: (type: IdeaType) => void;
  disabled?: boolean;
}

export function TypeSelector({ selectedType, onChange, disabled = false }: TypeSelectorProps) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-silver/70 mb-4">
        Type d'idée
      </label>
      <div className="flex flex-wrap justify-center gap-4">
        {IDEA_TYPES.map(({ type, icon: Icon, label }) => (
          <button
            key={type}
            type="button"
            onClick={() => !disabled && onChange(type)}
            disabled={disabled}
            className={cn(
              "flex items-center px-4 py-2 rounded-md transition-all duration-300",
              selectedType === type
                ? {
                    'note': 'bg-[#2ECC71]/10 text-[#2ECC71] border border-[#2ECC71]/20 shadow-[0_0_10px_rgba(46,204,113,0.1)]',
                    'link': 'bg-[#17A2B8]/10 text-[#17A2B8] border border-[#17A2B8]/20 shadow-[0_0_10px_rgba(23,162,184,0.1)]',
                    'image': 'bg-[#FFC821]/10 text-[#FFC821] border border-[#FFC821]/20 shadow-[0_0_10px_rgba(255,200,33,0.1)]',
                    'media': 'bg-[#FF7F50]/10 text-[#FF7F50] border border-[#FF7F50]/20 shadow-[0_0_10px_rgba(255,127,80,0.1)]'
                  }[type]
                : {
                    'note': 'bg-[#151923] border border-[#1E2330] text-[#2ECC71]/50 hover:text-[#2ECC71] hover:bg-[#2ECC71]/5 hover:border-[#2ECC71]/20',
                    'link': 'bg-[#151923] border border-[#1E2330] text-[#17A2B8]/50 hover:text-[#17A2B8] hover:bg-[#17A2B8]/5 hover:border-[#17A2B8]/20',
                    'image': 'bg-[#151923] border border-[#1E2330] text-[#FFC821]/50 hover:text-[#FFC821] hover:bg-[#FFC821]/5 hover:border-[#FFC821]/20',
                    'media': 'bg-[#151923] border border-[#1E2330] text-[#FF7F50]/50 hover:text-[#FF7F50] hover:bg-[#FF7F50]/5 hover:border-[#FF7F50]/20'
                  }[type],
              disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            <Icon className={cn(
              "w-4 h-4 mr-2.5",
              {
                'note': 'text-[#2ECC71] group-hover:scale-110 transition-transform',
                'link': 'text-[#17A2B8] group-hover:scale-110 transition-transform',
                'image': 'text-[#FFC821] group-hover:scale-110 transition-transform',
                'media': 'text-[#FF7F50] group-hover:scale-110 transition-transform'
              }[type]
            )} />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}