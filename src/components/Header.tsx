import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useStyle } from '../contexts/StyleContext';
import { styleConfigs, type MarkdownStyle } from '../utils/styles';

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { style, setStyle } = useStyle();
  const [showStyleMenu, setShowStyleMenu] = useState(false);

  const isDark = theme === 'dark';

  return (
    <div className={`h-full px-4 flex items-center justify-between border-b ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300'}`}>
      <h1 className={`text-lg font-semibold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>📝 Markdown 笔记</h1>
      <div className="flex items-center gap-2">
        <div className="relative">
          <button
            onClick={() => setShowStyleMenu(!showStyleMenu)}
            className={`px-3 py-1.5 text-sm rounded-lg transition-colors flex items-center gap-2 ${
              isDark
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                : 'bg-white hover:bg-gray-200 text-gray-700 border border-gray-300'
            }`}
          >
            <span>{styleConfigs[style].name}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {showStyleMenu && (
            <div className={`absolute right-0 top-full mt-1 py-1 rounded-lg shadow-lg z-50 min-w-[120px] ${
              isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
            }`}>
              {(Object.keys(styleConfigs) as MarkdownStyle[]).map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setStyle(s);
                    setShowStyleMenu(false);
                  }}
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                    style === s
                      ? isDark ? 'bg-gray-700 text-white' : 'bg-blue-50 text-blue-700'
                      : isDark ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-700'
                  }`}
                >
                  {styleConfigs[s].name}
                </button>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
          title={theme === 'dark' ? '切换到浅色主题' : '切换到深色主题'}
        >
          {theme === 'dark' ? (
            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}