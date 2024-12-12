import React from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils/cn';
import { IdeaType } from '../../types';
import { useTypeStyles } from '../../hooks/useTypeStyles';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  type?: IdeaType;
  children: React.ReactNode;
  className?: string;
}

export function Modal({ isOpen, onClose, type, children, className }: ModalProps) {
  const styles = type ? useTypeStyles(type) : null;

  if (!isOpen) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm overflow-hidden p-4"
      onClick={onClose}
    >
      <div 
        className={cn(
          "relative w-full max-w-4xl bg-[#151923]/95 rounded-xl shadow-2xl overflow-hidden transition-all duration-300 backdrop-blur-sm",
          type && styles?.card({ hover: true }),
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}