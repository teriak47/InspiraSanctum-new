import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useSidebar() {
  const [isOpen, setIsOpen] = useLocalStorage('sidebarOpen', true);

  const toggle = () => setIsOpen(!isOpen);

  return {
    isOpen,
    toggle,
  };
}