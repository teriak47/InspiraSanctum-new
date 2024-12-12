import React from 'react';
import { cn } from '../../utils/cn';
import { IdeaType } from '../../types';
import { useTypeStyles } from '../../hooks/useTypeStyles';

interface CardProps {
  type: IdeaType;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ type, children, className, onClick }: CardProps) {
  const styles = useTypeStyles(type);

  return (
    <div
      onClick={onClick}
      className={cn(
        styles.card({ hover: true }),
        'group cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
}