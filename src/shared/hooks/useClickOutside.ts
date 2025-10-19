import { useEffect } from 'react';

export function useClickOutside(ref: React.RefObject<HTMLElement>, handler: () => void, active = true) {
  useEffect(() => {
    if (!active) return;
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    }
    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        handler();
      }
    }
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [ref, handler, active]);
}
