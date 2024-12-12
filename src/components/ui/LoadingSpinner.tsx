import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`relative ${className}`}>
      <div className={`absolute inset-0 bg-gold/10 rounded-full blur-lg animate-pulse`}></div>
      <div
        className={`${sizeClasses[size]} border-2 border-gold/20 border-t-gold animate-spin rounded-full relative z-10`}
        role="status"
      >
        <span className="sr-only">Chargement...</span>
      </div>
    </div>
  );
}