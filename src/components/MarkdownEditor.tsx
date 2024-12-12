import React from 'react';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function MarkdownEditor({ value, onChange, className = '' }: MarkdownEditorProps) {
  return (
    <div className={`w-full ${className}`}>
      <div className="border border-[#1E2330] rounded-t-md bg-[#151923] px-3 py-2">
        <div className="text-sm text-silver/50">
          Markdown supporté
        </div>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full h-full min-h-[300px] rounded-b-md bg-[#0A0F1C] border border-[#1E2330] text-silver shadow-sm focus:border-gold/20 focus:ring-1 focus:ring-gold/20 p-2.5"
        rows={10}
      />
    </div>
  );
}