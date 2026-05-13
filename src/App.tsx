import { useCallback, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Editor } from './components/Editor';
import { Preview } from './components/Preview';
import { NoteList } from './components/NoteList';
import { Header } from './components/Header';
import { TableOfContents } from './components/TableOfContents';
import { ThemeProvider } from './contexts/ThemeContext';
import { StyleProvider, useStyle } from './contexts/StyleContext';
import { useNotes } from './hooks/useNotes';
import { exportNoteAsMarkdown, exportNoteAsPdf } from './utils/export';

function AppContent() {
  const {
    notes,
    activeNote,
    createNote,
    updateNote,
    deleteNote,
    selectNote,
  } = useNotes();
  const { style } = useStyle();

  const handleContentChange = useCallback((content: string) => {
    if (activeNote) {
      updateNote(activeNote.id, { content });
    }
  }, [activeNote, updateNote]);

  useEffect(() => {
    if (notes.length === 0) {
      createNote();
    }
  }, []);

  const handleExportNote = useCallback((note: NonNullable<typeof activeNote>) => {
    if (note) {
      exportNoteAsMarkdown(note);
    }
  }, []);

  const handleExportPdf = useCallback((note: NonNullable<typeof activeNote>) => {
    if (note) {
      exportNoteAsPdf(note);
    }
  }, []);

  return (
    <Layout
      header={<Header />}
      sidebar={
        <NoteList
          notes={notes}
          activeNoteId={activeNote?.id || null}
          onSelectNote={selectNote}
          onCreateNote={createNote}
          onDeleteNote={deleteNote}
          onExportNote={handleExportNote}
          onExportPdf={handleExportPdf}
        />
      }
      editor={
        <Editor
          value={activeNote?.content || ''}
          onChange={handleContentChange}
        />
      }
      preview={
        <Preview content={activeNote?.content || ''} style={style} />
      }
      toc={<TableOfContents content={activeNote?.content || ''} />}
    />
  );
}

function ThemedApp() {
  return (
    <StyleProvider>
      <AppContent />
    </StyleProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
}