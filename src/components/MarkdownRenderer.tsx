import React from 'react';
import { marked } from 'marked';
import { cn } from '../utils/cn';
import { Image } from 'lucide-react';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  const renderer = new marked.Renderer();
  
  // Personnalisation du rendu des images
  renderer.image = (href, title, text) => {
    return `
      <div class="relative group">
        <div class="absolute inset-0 bg-[#2ECC71]/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
        ${href ? 
          `<img 
            src="${href}" 
            alt="${text || ''}" 
            title="${title || ''}"
            class="rounded-lg border border-[#2ECC71]/20 shadow-lg max-h-[400px] object-contain mx-auto hover:border-[#2ECC71]/40 transition-all duration-300"
          />` :
          `<div class="flex items-center justify-center h-32 bg-[#0A0F1C] rounded-lg border border-[#1E2330]">
            <Image class="w-8 h-8 text-[#1E2330]" />
          </div>`
        }
        ${text ? `<p class="text-center text-sm text-[#2ECC71]/60 mt-2 font-secondary">${text}</p>` : ''}
      </div>
    `;
  };

  // Personnalisation du rendu des liens
  renderer.link = (href, title, text) => {
    return `
      <a 
        href="${href}"
        title="${title || ''}"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center text-[#2ECC71] hover:text-[#2ECC71]/80 transition-colors no-underline group"
      >
        ${text}
        <svg class="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
          <polyline points="15 3 21 3 21 9"></polyline>
          <line x1="10" y1="14" x2="21" y2="3"></line>
        </svg>
      </a>
    `;
  };

  // Personnalisation du rendu des blocs de code
  renderer.code = (code, language) => {
    return `
      <div class="relative group rounded-lg overflow-hidden my-6">
        <div class="absolute top-0 right-0 px-4 py-2 text-xs text-[#2ECC71] font-mono bg-[#1a1a1a] rounded-bl-lg border-l border-b border-[#2ECC71]/20">
          ${language || 'text'}
        </div>
        <pre class="!mt-0 !mb-0 overflow-x-auto bg-[#0A0F1C]/80 p-6 pt-12">
          <code class="language-${language || 'text'} font-mono text-sm leading-relaxed text-silver/90">${code}</code>
        </pre>
        <div class="absolute inset-0 ring-1 ring-inset ring-[#2ECC71]/30 shadow-[0_0_15px_rgba(46,204,113,0.1)] pointer-events-none rounded-lg group-hover:ring-[#2ECC71]/50 transition-all duration-300"></div>
      </div>
    `;
  };

  // Personnalisation du rendu des tableaux
  renderer.table = (header, body) => {
    return `
      <div class="relative overflow-hidden rounded-lg my-8">
        <table class="w-full border-collapse bg-[#0A0F1C]/80">
          <thead class="bg-[#1a2a1f]/60">
            ${header}
          </thead>
          <tbody class="divide-y divide-[#2ECC71]/10 [&>tr:nth-child(odd)]:bg-[#151923]/30">
            ${body}
          </tbody>
        </table>
        <div class="absolute inset-0 ring-1 ring-inset ring-[#2ECC71]/30 shadow-[0_0_15px_rgba(46,204,113,0.1)] pointer-events-none rounded-lg"></div>
      </div>
    `;
  };

  // Personnalisation du rendu des citations
  renderer.blockquote = (quote) => {
    return `
      <div class="relative group">
        <blockquote class="relative pl-8 pr-6 py-8 my-8 bg-[#0A0F1C]/80 rounded-lg">
          <div class="absolute left-0 top-0 bottom-0 w-2 bg-[#2ECC71]/40 rounded-l group-hover:bg-[#2ECC71]/60 transition-colors"></div>
          <div class="absolute -left-3 top-4">
            <svg class="w-6 h-6 text-[#2ECC71]/20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>
          <div class="text-lg italic text-silver/90 leading-relaxed">
            ${quote}
          </div>
        </blockquote>
        <div class="absolute inset-0 ring-1 ring-inset ring-[#2ECC71]/30 shadow-[0_0_15px_rgba(46,204,113,0.1)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-lg"></div>
      </div>
    `;
  };
  marked.setOptions({
    gfm: true,
    breaks: true,
    headerIds: false,
    renderer,
    mangle: false,
    headerPrefix: '',
    highlight: function(code, lang) {
      return code;
    }
  });

  // Rendu du markdown en HTML
  const html = marked(content);

  return (
    <div 
      className={cn(
        "prose max-w-none text-silver/90",
        // Titres
        "prose-headings:text-[#2ECC71] prose-headings:font-primary prose-headings:tracking-tight",
        "prose-h1:text-2xl prose-h1:mb-6 prose-h1:border-b prose-h1:border-[#2ECC71]/20 prose-h1:pb-2",
        "prose-h2:text-xl prose-h2:mb-4",
        "prose-h3:text-lg prose-h3:mb-3 prose-h3:text-[#2ECC71]/90",
        // Texte
        "prose-p:text-silver/90 prose-p:leading-relaxed prose-p:mb-4 prose-p:font-secondary",
        "prose-strong:text-[#2ECC71] prose-strong:font-semibold",
        "prose-em:text-silver/90 prose-em:italic",
        // Liens
        "prose-a:text-[#2ECC71] prose-a:no-underline hover:prose-a:text-[#2ECC71]/80 prose-a:transition-colors prose-a:border-b prose-a:border-[#2ECC71]/20 hover:prose-a:border-[#2ECC71]/40",
        // Listes
        "prose-ul:text-silver/90 prose-ul:list-disc prose-ul:pl-5 prose-ul:mb-4 prose-ul:font-secondary",
        "prose-ol:text-silver/90 prose-ol:list-decimal prose-ol:pl-5 prose-ol:mb-4 prose-ol:font-secondary",
        "prose-li:my-1",
        // Code
        "prose-code:bg-[#1a1a1a]/80 prose-code:text-[#2ECC71] prose-code:px-2 prose-code:py-0.5 prose-code:rounded-md prose-code:font-mono prose-code:text-sm prose-code:border prose-code:border-[#2ECC71]/20 hover:prose-code:border-[#2ECC71]/40 prose-code:transition-colors",
        "prose-pre:bg-transparent prose-pre:p-0 prose-pre:m-0",
        "prose-pre:code:bg-transparent prose-pre:code:p-0 prose-pre:code:border-0",
        // Blockquotes
        "prose-blockquote:p-0 prose-blockquote:m-0 prose-blockquote:border-0",
        "prose-blockquote:text-silver/80 prose-blockquote:italic prose-blockquote:text-lg prose-blockquote:font-secondary",
        // Tables
        "prose-table:w-full",
        "prose-th:p-4 prose-th:text-left prose-th:text-[#2ECC71] prose-th:font-semibold prose-th:border-b prose-th:border-[#2ECC71]/20",
        "prose-td:p-4 prose-td:text-silver/90 hover:prose-td:bg-[#1E2330]/30 prose-td:transition-colors",
        className
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}