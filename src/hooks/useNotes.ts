import { useCallback, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { Note } from '../types';

const generateId = () => Math.random().toString(36).substring(2, 15) + Date.now().toString(36);

const extractTitle = (content: string): string => {
  const lines = content.trim().split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed) {
      return trimmed.replace(/^#+\s*/, '').substring(0, 50) || '无标题笔记';
    }
  }
  return '无标题笔记';
};

export function useNotes() {
  const [notes, setNotes] = useLocalStorage<Note[]>('markdown-notes', []);

  const activeNoteId = useLocalStorage<string | null>('active-note-id', notes[0]?.id || null);

  const activeNote = useMemo(() => {
    return notes.find(n => n.id === activeNoteId[0]) || null;
  }, [notes, activeNoteId[0]]);

  const createNote = useCallback(() => {
    const newNote: Note = {
      id: generateId(),
      title: '新笔记',
      content: '# 新笔记\n\n开始写点什么...',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setNotes(prev => [newNote, ...prev]);
    activeNoteId[1](newNote.id);
    return newNote;
  }, [setNotes, activeNoteId]);

  const updateNote = useCallback((id: string, updates: Partial<Pick<Note, 'content' | 'title'>>) => {
    setNotes(prev => prev.map(note => {
      if (note.id !== id) return note;
      const updated = { ...note, ...updates, updatedAt: Date.now() };
      if (updates.content !== undefined) {
        updated.title = extractTitle(updates.content);
      }
      return updated;
    }));
  }, [setNotes]);

  const deleteNote = useCallback((id: string) => {
    setNotes(prev => {
      const filtered = prev.filter(note => note.id !== id);
      if (activeNoteId[0] === id && filtered.length > 0) {
        activeNoteId[1](filtered[0].id);
      } else if (filtered.length === 0) {
        activeNoteId[1](null);
      }
      return filtered;
    });
  }, [setNotes, activeNoteId]);

  const selectNote = useCallback((id: string) => {
    activeNoteId[1](id);
  }, [activeNoteId]);

  const searchNotes = useCallback((query: string) => {
    if (!query.trim()) return notes;
    const lower = query.toLowerCase();
    return notes.filter(note =>
      note.title.toLowerCase().includes(lower) ||
      note.content.toLowerCase().includes(lower)
    );
  }, [notes]);

  return {
    notes,
    activeNote,
    createNote,
    updateNote,
    deleteNote,
    selectNote,
    searchNotes,
  };
}