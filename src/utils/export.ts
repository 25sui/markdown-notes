import type { Note } from '../types';

export function exportNoteAsMarkdown(note: Note): void {
  const blob = new Blob([note.content], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${note.title.replace(/[/\\:*?"<>|]/g, '_')}.md`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportNoteAsPdf(note: Note): void {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>${note.title}</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          padding: 40px;
          max-width: 800px;
          margin: 0 auto;
          line-height: 1.6;
          color: #333;
        }
        h1, h2, h3 { color: #1a1a1a; margin-top: 1.5em; }
        h1 { font-size: 2em; border-bottom: 2px solid #333; padding-bottom: 0.3em; }
        h2 { font-size: 1.5em; border-bottom: 1px solid #ddd; padding-bottom: 0.2em; }
        code {
          background: #f4f4f4;
          padding: 2px 6px;
          border-radius: 3px;
          font-family: 'Consolas', monospace;
        }
        pre {
          background: #f4f4f4;
          padding: 16px;
          border-radius: 6px;
          overflow-x: auto;
        }
        pre code { background: none; padding: 0; }
        blockquote {
          border-left: 4px solid #ddd;
          margin-left: 0;
          padding-left: 20px;
          color: #666;
        }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background: #f4f4f4; }
        @media print {
          body { padding: 20px; }
        }
      </style>
    </head>
    <body>
      <pre style="white-space: pre-wrap; word-wrap: break-word;">${note.content.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
      <script>
        window.onload = function() {
          setTimeout(function() {
            window.print();
            window.close();
          }, 250);
        };
      </script>
    </body>
    </html>
  `);
  printWindow.document.close();
}