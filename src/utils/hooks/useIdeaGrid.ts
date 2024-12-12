import { useMemo } from 'react';
import { Idea } from '../../types';

interface UseIdeaGridProps {
  ideas: Idea[];
}

export function useIdeaGrid({ ideas }: UseIdeaGridProps) {
  const gridStyles = useMemo(() => ({
    display: 'grid',
    gap: '1.5rem',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gridAutoFlow: 'dense',
    gridAutoFlow: 'dense',
  }), []);

  return {
    gridStyles,
    isEmpty: ideas.length === 0,
  };
}