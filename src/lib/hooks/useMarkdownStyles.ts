import { useMemo } from 'react';
import { cn } from '../utils/cn';

const MARKDOWN_COLORS = {
  primary: '#2ECC71',
  secondary: '#c0c0c0',
  background: '#0A0F1C',
  surface: '#1a1a1a',
  border: '#1E2330',
} as const;

export function useMarkdownStyles() {
  return useMemo(() => ({
    base: cn(
      "prose max-w-none",
      `text-${MARKDOWN_COLORS.secondary}/90`,
      // Titres
      `prose-headings:text-[${MARKDOWN_COLORS.primary}] prose-headings:font-primary`,
      `prose-h1:text-2xl prose-h1:border-b prose-h1:border-[${MARKDOWN_COLORS.primary}]/20`,
      "prose-h2:text-xl prose-h2:mb-4",
      `prose-h3:text-lg prose-h3:text-[${MARKDOWN_COLORS.primary}]/90`,
      // Texte
      `prose-p:text-${MARKDOWN_COLORS.secondary}/90 prose-p:font-secondary`,
      `prose-strong:text-[${MARKDOWN_COLORS.primary}] prose-strong:font-semibold`,
      `prose-em:text-${MARKDOWN_COLORS.secondary}/90 prose-em:italic`,
      // Code
      `prose-code:bg-[${MARKDOWN_COLORS.surface}]/80 prose-code:text-[${MARKDOWN_COLORS.primary}]`,
      "prose-pre:bg-transparent prose-pre:p-0",
      // Tables
      "prose-table:w-full",
      `prose-th:text-[${MARKDOWN_COLORS.primary}] prose-th:border-[${MARKDOWN_COLORS.primary}]/20`,
      `prose-td:text-${MARKDOWN_COLORS.secondary}/90 hover:prose-td:bg-[${MARKDOWN_COLORS.border}]/30`
    ),
    code: {
      block: `relative rounded-lg overflow-hidden my-6 bg-[${MARKDOWN_COLORS.background}]/80`,
      language: "absolute top-0 right-0 px-4 py-2 text-xs font-mono",
      content: "overflow-x-auto p-6 pt-12",
    },
    table: {
      wrapper: "relative overflow-hidden rounded-lg my-8",
      header: `bg-[${MARKDOWN_COLORS.surface}]/60`,
      body: `divide-y divide-[${MARKDOWN_COLORS.primary}]/10`,
      row: `[&:nth-child(odd)]:bg-[${MARKDOWN_COLORS.background}]/30`,
    },
    blockquote: {
      wrapper: `relative pl-8 pr-6 py-8 my-8 bg-[${MARKDOWN_COLORS.background}]/80 rounded-lg`,
      border: "absolute left-0 top-0 bottom-0 w-2 rounded-l",
      content: `text-lg italic text-${MARKDOWN_COLORS.secondary}/90 leading-relaxed`,
    },
  }), []);
}