import type { ReactNode } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface LayoutProps {
  header?: ReactNode;
  sidebar: ReactNode;
  editor: ReactNode;
  preview: ReactNode;
  toc?: ReactNode;
}

export function Layout({ header, sidebar, editor, preview, toc }: LayoutProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`h-screen w-screen overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {header && <div className="h-12 shrink-0">{header}</div>}
      <div className="h-full flex flex-col lg:flex-row">
        <div className="w-full lg:w-72 h-48 lg:h-full shrink-0">
          {sidebar}
        </div>
        <div className="flex-1 flex flex-col lg:flex-row min-h-0">
          <div className={`flex-1 min-h-0 lg:min-h-full ${isDark ? '' : 'border-r border-gray-300'}`}>
            {editor}
          </div>
          {toc && (
            <div className="w-48 xl:w-56 hidden xl:block shrink-0">
              {toc}
            </div>
          )}
          <div className="flex-1 min-h-0 lg:min-h-full">
            {preview}
          </div>
        </div>
      </div>
    </div>
  );
}