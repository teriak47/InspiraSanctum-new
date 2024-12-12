import React from 'react';
import { cn } from '../../utils/cn';
import { IdeaType } from '../../types';
import { useTypeStyles } from '../../hooks/useTypeStyles';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ElementType;
  type?: IdeaType;
  variant?: 'ghost' | 'solid';
  size?: 'sm' | 'md' | 'lg';
}

export function IconButton({
  icon: Icon,
  type,
  variant = 'ghost',
  size = 'md',
  className,
  ...props
}: IconButtonProps) {
  const styles = type ? useTypeStyles(type) : null;

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-lg transition-colors',
        {
          'p-1': size === 'sm',
          'p-2': size === 'md',
          'p-3': size === 'lg',
          'hover:bg-[#1E2330]/80': variant === 'ghost',
          [styles?.button({ hover: true }) || '']: variant === 'solid',
        },
        className
      )}
      {...props}
    >
      <Icon className={cn(
        {
          'w-4 h-4': size === 'sm',
          'w-5 h-5': size === 'md',
          'w-6 h-6': size === 'lg',
        },
        styles?.icon({ hover: true })
      )} />
    </button>
  );
}