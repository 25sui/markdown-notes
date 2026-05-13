import { useCallback, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Toolbar } from './Toolbar';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function Editor({ value, onChange }: EditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const newValue = value.substring(0, start) + '  ' + value.substring(end);
      onChange(newValue);
      requestAnimationFrame(() => {
        target.selectionStart = target.selectionEnd = start + 2;
      });
    }
  }, [value, onChange]);

  return (
    <div className="flex flex-col h-full">
      <Toolbar textareaRef={textareaRef} value={value} onChange={onChange} />
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className={`flex-1 w-full font-mono text-sm p-4 resize-none outline-none overflow-y-auto ${
          isDark
            ? 'bg-gray-900 text-gray-100'
            : 'bg-gray-50 text-gray-900 border-r border-gray-300'
        }`}
        placeholder="在这里编写 Markdown..."
        spellCheck={false}
      />
    </div>
  );
}