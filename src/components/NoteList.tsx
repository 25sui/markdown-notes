import { useState, useMemo } from 'react';
import type { Note } from '../types';
import { useTheme } from '../contexts/ThemeContext';

interface NoteListProps {
  notes: Note[];
  activeNoteId: string | null;
  onSelectNote: (id: string) => void;
  onCreateNote: () => void;
  onDeleteNote: (id: string) => void;
  onExportNote: (note: Note) => void;
  onExportPdf: (note: Note) => void;
}

export function NoteList({
  notes,
  activeNoteId,
  onSelectNote,
  onCreateNote,
  onDeleteNote,
  onExportNote,
  onExportPdf,
}: NoteListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const filteredNotes = useMemo(() => {
    if (!searchQuery.trim()) return notes;
    const lower = searchQuery.toLowerCase();
    return notes.filter(note =>
      note.title.toLowerCase().includes(lower) ||
      note.content.toLowerCase().includes(lower)
    );
  }, [notes, searchQuery]);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('zh-CN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={`h-full flex flex-col border-r ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <div className={`p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-lg font-semibold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>笔记列表</h2>
          <button
            onClick={onCreateNote}
            className={`px-3 py-1.5 text-white text-sm rounded-lg transition-colors ${isDark ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-500 hover:bg-blue-600'}`}
          >
            新建
          </button>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="搜索笔记..."
          className={`w-full px-3 py-2 text-sm rounded-lg outline-none focus:ring-2 focus:ring-blue-500 ${
            isDark
              ? 'bg-gray-700 text-gray-100 placeholder-gray-400'
              : 'bg-gray-100 text-gray-800 placeholder-gray-500'
          }`}
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        {filteredNotes.length === 0 ? (
          <div className={`p-4 text-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {searchQuery ? '没有找到匹配的笔记' : '暂无笔记，点击新建开始'}
          </div>
        ) : (
          filteredNotes.map(note => (
            <div
              key={note.id}
              onClick={() => onSelectNote(note.id)}
              className={`p-3 border-b cursor-pointer transition-colors group ${
                isDark
                  ? `border-gray-700 ${note.id === activeNoteId ? 'bg-gray-700 border-l-2 border-l-blue-500' : 'hover:bg-gray-700/50'}`
                  : `border-gray-100 ${note.id === activeNoteId ? 'bg-blue-50 border-l-2 border-l-blue-500' : 'hover:bg-gray-50'}`
              }`}
            >
              <div className="flex items-start justify-between">
                <h3 className={`text-sm font-medium truncate flex-1 mr-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                  {note.title}
                </h3>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onExportNote(note);
                    }}
                    className={`p-1 transition-colors ${isDark ? 'text-gray-400 hover:text-blue-400' : 'text-gray-500 hover:text-blue-500'}`}
                    title="导出 MD"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onExportPdf(note);
                    }}
                    className={`p-1 transition-colors ${isDark ? 'text-gray-400 hover:text-green-400' : 'text-gray-500 hover:text-green-500'}`}
                    title="导出 PDF"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm('确定要删除这篇笔记吗？')) {
                        onDeleteNote(note.id);
                      }
                    }}
                    className={`p-1 transition-colors ${isDark ? 'text-gray-400 hover:text-red-400' : 'text-gray-500 hover:text-red-500'}`}
                    title="删除"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
              <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                {formatDate(note.updatedAt)}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}