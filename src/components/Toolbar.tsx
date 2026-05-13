import { useState, type RefObject } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface ToolbarProps {
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  value: string;
  onChange: (value: string) => void;
}

export function Toolbar({ textareaRef, value, onChange }: ToolbarProps) {
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const insertImage = () => {
    if (!imageUrl.trim()) return;
    
    const altText = imageAlt.trim() || '图片';
    const markdown = `![${altText}](${imageUrl})`;
    
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newValue = value.substring(0, start) + markdown + value.substring(end);
      onChange(newValue);
      
      requestAnimationFrame(() => {
        textarea.focus();
        textarea.selectionStart = textarea.selectionEnd = start + markdown.length;
      });
    }
    
    setShowImageModal(false);
    setImageUrl('');
    setImageAlt('');
  };

  const formatText = (prefix: string, suffix: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const newValue = value.substring(0, start) + prefix + selectedText + suffix + value.substring(end);
    
    onChange(newValue);
    
    requestAnimationFrame(() => {
      textarea.focus();
      if (selectedText) {
        textarea.selectionStart = start + prefix.length;
        textarea.selectionEnd = end + prefix.length;
      } else {
        textarea.selectionStart = textarea.selectionEnd = start + prefix.length;
      }
    });
  };

  return (
    <>
      <div className={`flex items-center gap-1 p-2 border-b ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300'}`}>
        <button
          onClick={() => formatText('# ')}
          className={`p-2 rounded hover:bg-gray-200 transition-colors ${isDark ? 'hover:bg-gray-700 text-gray-300' : 'text-gray-600'}`}
          title="标题"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
        </button>
        <button
          onClick={() => formatText('**', '**')}
          className={`p-2 rounded hover:bg-gray-200 transition-colors ${isDark ? 'hover:bg-gray-700 text-gray-300' : 'text-gray-600'}`}
          title="粗体"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM9 4v16M15 4v16M5 9h14M5 15h14" />
          </svg>
        </button>
        <button
          onClick={() => formatText('*', '*')}
          className={`p-2 rounded hover:bg-gray-200 transition-colors ${isDark ? 'hover:bg-gray-700 text-gray-300' : 'text-gray-600'}`}
          title="斜体"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM5 4v16M9 4v16M12 4v16M15 4v16M18 4v16M5 9h14M5 15h14" />
          </svg>
        </button>
        <button
          onClick={() => formatText('`', '`')}
          className={`p-2 rounded hover:bg-gray-200 transition-colors ${isDark ? 'hover:bg-gray-700 text-gray-300' : 'text-gray-600'}`}
          title="行内代码"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </button>
        <button
          onClick={() => formatText('```\n', '\n```')}
          className={`p-2 rounded hover:bg-gray-200 transition-colors ${isDark ? 'hover:bg-gray-700 text-gray-300' : 'text-gray-600'}`}
          title="代码块"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </button>
        <div className="w-px h-6 bg-gray-400 mx-1" />
        <button
          onClick={() => formatText('- ')}
          className={`p-2 rounded hover:bg-gray-200 transition-colors ${isDark ? 'hover:bg-gray-700 text-gray-300' : 'text-gray-600'}`}
          title="无序列表"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
        </button>
        <button
          onClick={() => formatText('1. ')}
          className={`p-2 rounded hover:bg-gray-200 transition-colors ${isDark ? 'hover:bg-gray-700 text-gray-300' : 'text-gray-600'}`}
          title="有序列表"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
        </button>
        <button
          onClick={() => formatText('> ')}
          className={`p-2 rounded hover:bg-gray-200 transition-colors ${isDark ? 'hover:bg-gray-700 text-gray-300' : 'text-gray-600'}`}
          title="引用"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
        <button
          onClick={() => formatText('[', '](url)')}
          className={`p-2 rounded hover:bg-gray-200 transition-colors ${isDark ? 'hover:bg-gray-700 text-gray-300' : 'text-gray-600'}`}
          title="链接"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </button>
        <div className="w-px h-6 bg-gray-400 mx-1" />
        <button
          onClick={() => setShowImageModal(true)}
          className={`p-2 rounded hover:bg-gray-200 transition-colors ${isDark ? 'hover:bg-gray-700 text-gray-300' : 'text-gray-600'}`}
          title="插入图片"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>
      </div>
      
      {showImageModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className={`bg-white rounded-lg shadow-xl p-6 w-full max-w-md ${isDark ? 'bg-gray-800' : ''}`}>
            <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>插入图片</h3>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>图片 URL</label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>图片名称（可选）</label>
                <input
                  type="text"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  placeholder="图片描述"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setShowImageModal(false);
                    setImageUrl('');
                    setImageAlt('');
                  }}
                  className={`px-4 py-2 rounded-lg transition-colors ${isDark ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
                >
                  取消
                </button>
                <button
                  onClick={insertImage}
                  disabled={!imageUrl.trim()}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  插入
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}