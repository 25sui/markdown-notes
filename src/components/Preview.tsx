import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { xonokai } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { styleConfigs, type MarkdownStyle } from '../utils/styles';

interface PreviewProps {
  content: string;
  style?: MarkdownStyle;
}

const createHeadingId = (text: string): string => {
  return String(text).toLowerCase().replace(/[^\u4e00-\u9fa5a-z0-9]+/g, '-').replace(/^-|-$/g, '');
};

const codeStyles: Record<MarkdownStyle, any> = {
  github: oneLight,
  standard: oneLight,
  solarized: solarizedlight,
  monokai: xonokai,
};

export function Preview({ content, style = 'github' }: PreviewProps) {
  const config = styleConfigs[style];
  const codeStyle = codeStyles[style] || oneLight;

  return (
    <div className={`w-full h-full p-4 overflow-y-auto ${config.bg} ${config.text}`}>
      <ReactMarkdown
        className="prose max-w-none"
        remarkPlugins={[remarkGfm]}
        components={{
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const codeString = String(children).replace(/\n$/, '');
            if (match) {
              return (
                <SyntaxHighlighter
                  style={codeStyle}
                  language={match[1]}
                  PreTag="div"
                >
                  {codeString}
                </SyntaxHighlighter>
              );
            }
            return (
              <code className={`${config.code} rounded px-1 py-0.5 text-sm font-mono`} {...props}>
                {children}
              </code>
            );
          },
          pre({ children }) {
            return (
              <pre className={`${config.codeBg} rounded-lg p-4 overflow-x-auto my-4`}>
                {children}
              </pre>
            );
          },
          h1({ children }) {
            const id = createHeadingId(String(children));
            return <h1 id={id} className={`text-3xl font-bold border-b ${config.border} ${config.heading} pb-2 mb-4`}>{children}</h1>;
          },
          h2({ children }) {
            const id = createHeadingId(String(children));
            return <h2 id={id} className={`text-2xl font-bold border-b ${config.border} ${config.heading} pb-2 mb-3`}>{children}</h2>;
          },
          h3({ children }) {
            const id = createHeadingId(String(children));
            return <h3 id={id} className={`text-xl font-semibold ${config.heading} mb-2`}>{children}</h3>;
          },
          h4({ children }) {
            const id = createHeadingId(String(children));
            return <h4 id={id} className={`text-lg font-semibold ${config.heading} mb-2`}>{children}</h4>;
          },
          h5({ children }) {
            const id = createHeadingId(String(children));
            return <h5 id={id} className={`text-base font-semibold ${config.heading} mb-2`}>{children}</h5>;
          },
          h6({ children }) {
            const id = createHeadingId(String(children));
            return <h6 id={id} className={`text-sm font-semibold ${config.heading} mb-2`}>{children}</h6>;
          },
          p({ children }) {
            return <p className="mb-4 leading-relaxed">{children}</p>;
          },
          ul({ children }) {
            return <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>;
          },
          ol({ children }) {
            return <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>;
          },
          li({ children }) {
            return <li>{children}</li>;
          },
          blockquote({ children }) {
            return <blockquote className={`border-l-4 ${config.blockquote} pl-4 italic my-4`}>{children}</blockquote>;
          },
          a({ href, children }) {
            return <a href={href} className={`${config.link} underline`} target="_blank" rel="noopener noreferrer">{children}</a>;
          },
          table({ children }) {
            return <table className={`w-full border-collapse border ${config.border} my-4`}>{children}</table>;
          },
          th({ children }) {
            return <th className={`border ${config.border} ${config.codeBg} px-4 py-2 text-left`}>{children}</th>;
          },
          td({ children }) {
            return <td className={`border ${config.border} px-4 py-2`}>{children}</td>;
          },
          hr() {
            return <hr className={`${config.border} my-6`} />;
          },
          img({ src, alt }) {
            return (
              <div className="my-4">
                <img
                  src={src}
                  alt={alt}
                  className="max-w-full h-auto rounded-lg shadow-md"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `
                        <div class="flex items-center justify-center bg-gray-100 rounded-lg border border-gray-300 p-4 text-gray-500">
                          <svg class="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>图片加载失败，请检查 URL 是否正确</span>
                        </div>
                      `;
                    }
                  }}
                />
              </div>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}