import { useMemo, useState } from 'react';
import { parseToc } from '../utils/toc';
import type { TocItem } from '../utils/toc';
import { useTheme } from '../contexts/ThemeContext';

interface TableOfContentsProps {
  content: string;
}

function TocItemComponent({ item, onClick, isDark }: { item: TocItem; onClick: (id: string) => void; isDark: boolean }) {
  const indent = (item.level - 1) * 12;

  return (
    <div>
      <div
        style={{ paddingLeft: `${indent}px` }}
        onClick={() => onClick(item.id)}
        className={`py-1 px-2 text-sm cursor-pointer hover:text-blue-400 transition-colors truncate ${
          isDark ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'
        }`}
      >
        {item.text}
      </div>
      {item.children.map(child => (
        <TocItemComponent key={child.id} item={child} onClick={onClick} isDark={isDark} />
      ))}
    </div>
  );
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const toc = useMemo(() => parseToc(content), [content]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (toc.length === 0) {
    return (
      <div className={`h-full border-l ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300'} p-3`}>
        <div className="text-xs text-gray-500 text-center py-4">
          暂无目录
        </div>
      </div>
    );
  }

  return (
    <div className={`h-full border-l ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300'} flex flex-col`}>
      <div
        className={`p-3 border-b ${isDark ? 'border-gray-700' : 'border-gray-300'} flex items-center justify-between cursor-pointer`}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <h3 className={`text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>目录导航</h3>
        <svg
          className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'} transition-transform ${isCollapsed ? '' : 'rotate-180'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      {!isCollapsed && (
        <div className="flex-1 overflow-y-auto p-2">
          {toc.map(item => (
            <TocItemComponent key={item.id} item={item} onClick={handleClick} isDark={isDark} />
          ))}
        </div>
      )}
    </div>
  );
}