import React from 'react';
import { ArrowDownAZ, ArrowUpAZ, CalendarDays, Tags } from 'lucide-react';
import { SortOption } from '../types';

interface SortSelectorProps {
  value: SortOption;
  onChange: (option: SortOption) => void;
}

const SORT_OPTIONS: { value: SortOption; label: string; icon: React.ElementType }[] = [
  { value: 'date-desc', label: 'Plus récent', icon: CalendarDays },
  { value: 'date-asc', label: 'Plus ancien', icon: CalendarDays },
  { value: 'title-asc', label: 'Titre A-Z', icon: ArrowDownAZ },
  { value: 'title-desc', label: 'Titre Z-A', icon: ArrowUpAZ },
  { value: 'type', label: 'Type', icon: Tags },
];

export function SortSelector({ value, onChange }: SortSelectorProps) {
  return (
    <div className="flex items-center space-x-2">
      <label className="text-sm font-medium text-silver/70">
        Trier par:
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="bg-[#151923] border border-[#1E2330] rounded-md py-1.5 pl-3 pr-10 text-sm text-silver/90 focus:border-gold/20 focus:outline-none focus:ring-1 focus:ring-gold/20"
      >
        {SORT_OPTIONS.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}