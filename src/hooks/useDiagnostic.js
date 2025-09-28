// /hooks/useDiagnostic.js - Hook to manage diagnostic modal state

import { useState, useCallback } from 'react';

export default function useDiagnostic() {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState('unknown');

  const openDiagnostic = useCallback((triggerSource = 'unknown') => {
    setSource(triggerSource);
    setIsOpen(true);
    
    // Prevent body scroll when modal is open
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }, []);

  const closeDiagnostic = useCallback(() => {
    setIsOpen(false);
    
    // Restore body scroll
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'unset';
    }
  }, []);

  return {
    isOpen,
    source,
    openDiagnostic,
    closeDiagnostic
  };
}