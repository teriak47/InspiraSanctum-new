import { useMemo } from 'react';
import { IdeaType } from '../../types';
import { TYPE_COLORS } from '../constants/colors';
import { cn } from '../utils/cn';

export function useTypeStyles(type: IdeaType) {
  return useMemo(() => ({
    colors: {
      primary: TYPE_COLORS[type].primary,
      hover: TYPE_COLORS[type].hover,
      background: TYPE_COLORS[type].bg,
      ring: TYPE_COLORS[type].ring,
    },
    card: (options?: { hover?: boolean }) => cn(
      "relative w-full h-full flex flex-col transition-all duration-300",
      type === 'image' && "aspect-[3/4] md:aspect-auto",
      type === 'media' && "min-h-[300px]",
      type === 'note' && "min-h-[200px]",
      type === 'link' && "min-h-[200px]",
      `ring-1 ring-${TYPE_COLORS[type].ring}/30`,
      options?.hover && `hover:ring-${TYPE_COLORS[type].ring}/50 hover:shadow-lg hover:shadow-${TYPE_COLORS[type].ring}/5`
    ),
    text: (options?: { hover?: boolean }) => cn(
      `text-${TYPE_COLORS[type].primary}`,
      options?.hover && `hover:text-${TYPE_COLORS[type].hover}`
    ),
    icon: (options?: { hover?: boolean }) => cn(
      `text-${TYPE_COLORS[type].primary}`,
      options?.hover && "group-hover:scale-110 transition-transform"
    ),
    background: (options?: { hover?: boolean }) => cn(
      `bg-${TYPE_COLORS[type].bg}/50`,
      options?.hover && `hover:bg-${TYPE_COLORS[type].bg}/80`
    ),
    border: (options?: { hover?: boolean }) => cn(
      `border-${TYPE_COLORS[type].ring}/20`,
      options?.hover && `hover:border-${TYPE_COLORS[type].ring}/40`
    ),
    button: (options?: { hover?: boolean }) => cn(
      `bg-${TYPE_COLORS[type].primary}`,
      options?.hover && `hover:bg-${TYPE_COLORS[type].hover}`,
      "text-white font-medium rounded-md transition-colors"
    ),
    gradient: {
      overlay: `bg-gradient-to-t from-${TYPE_COLORS[type].bg}/90 via-${TYPE_COLORS[type].bg}/60 to-${TYPE_COLORS[type].bg}/20`,
      background: `bg-gradient-to-br from-${TYPE_COLORS[type].bg}/50 to-[#0A0F1C]/50`
    },
  }), [type]);
}