import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { MarkdownStyle } from '../utils/styles';

interface StyleContextType {
  style: MarkdownStyle;
  setStyle: (style: MarkdownStyle) => void;
}

const StyleContext = createContext<StyleContextType | undefined>(undefined);

export function StyleProvider({ children }: { children: ReactNode }) {
  const [style, setStyle] = useState<MarkdownStyle>(() => {
    const saved = localStorage.getItem('markdown-style');
    if (saved === 'github' || saved === 'standard' || saved === 'solarized' || saved === 'monokai') {
      return saved;
    }
    return 'github';
  });

  useEffect(() => {
    localStorage.setItem('markdown-style', style);
  }, [style]);

  return (
    <StyleContext.Provider value={{ style, setStyle }}>
      {children}
    </StyleContext.Provider>
  );
}

export function useStyle() {
  const context = useContext(StyleContext);
  if (!context) {
    throw new Error('useStyle must be used within StyleProvider');
  }
  return context;
}