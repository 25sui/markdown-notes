export interface TocItem {
  id: string;
  text: string;
  level: number;
  children: TocItem[];
}

export function parseToc(content: string): TocItem[] {
  const lines = content.split('\n');
  const toc: TocItem[] = [];
  const stack: { item: TocItem; level: number }[] = [];

  for (const line of lines) {
    const match = line.match(/^(#{1,6})\s+(.+)$/);
    if (!match) continue;

    const level = match[1].length;
    const text = match[2].trim();
    const id = text.toLowerCase().replace(/[^\u4e00-\u9fa5a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    const item: TocItem = { id, text, level, children: [] };

    while (stack.length > 0 && stack[stack.length - 1].level >= level) {
      stack.pop();
    }

    if (stack.length === 0) {
      toc.push(item);
    } else {
      stack[stack.length - 1].item.children.push(item);
    }

    stack.push({ item, level });
  }

  return toc;
}