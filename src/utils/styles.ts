export type MarkdownStyle = 'github' | 'standard' | 'solarized' | 'monokai';

export interface StyleConfig {
  name: string;
  bg: string;
  text: string;
  heading: string;
  link: string;
  code: string;
  codeBg: string;
  blockquote: string;
  border: string;
}

export const styleConfigs: Record<MarkdownStyle, StyleConfig> = {
  github: {
    name: 'GitHub',
    bg: 'bg-white',
    text: 'text-gray-900',
    heading: 'text-gray-900',
    link: 'text-blue-600 hover:text-blue-700',
    code: 'bg-gray-100 text-gray-800',
    codeBg: 'bg-gray-50',
    blockquote: 'border-gray-300 text-gray-600',
    border: 'border-gray-300',
  },
  standard: {
    name: '标准',
    bg: 'bg-gray-50',
    text: 'text-gray-800',
    heading: 'text-gray-900',
    link: 'text-blue-500 hover:text-blue-600',
    code: 'bg-gray-200 text-gray-800',
    codeBg: 'bg-gray-100',
    blockquote: 'border-blue-400 text-gray-600',
    border: 'border-gray-300',
  },
  solarized: {
    name: 'Solarized',
    bg: 'bg-base3',
    text: 'text-base00',
    heading: 'text-yellow',
    link: 'text-blue hover:text-cyan',
    code: 'bg-base02 text-green',
    codeBg: 'bg-base03',
    blockquote: 'border-cyan text-base0',
    border: 'border-base02',
  },
  monokai: {
    name: 'Monokai',
    bg: 'bg-gray-900',
    text: 'text-gray-100',
    heading: 'text-purple-400',
    link: 'text-cyan-400 hover:text-cyan-300',
    code: 'bg-gray-800 text-yellow-400',
    codeBg: 'bg-gray-800',
    blockquote: 'border-purple-500 text-gray-400',
    border: 'border-gray-700',
  },
};