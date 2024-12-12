import React from 'react';
import { TagInput } from '../TagInput';
import { IdeaFormData } from '../../types';
import { MarkdownEditor } from '../MarkdownEditor';
import { parseContent } from '../../utils/content';

interface NoteFormProps {
  onSubmit: (data: IdeaFormData) => void;
  initialData?: {
    title: string;
    content: string;
    tags: string[];
  };
}

export function NoteForm({ onSubmit, initialData }: NoteFormProps) {
  const [title, setTitle] = React.useState(initialData?.title || '');
  const [content, setContent] = React.useState(initialData?.content || '');
  const [tags, setTags] = React.useState<string[]>(initialData?.tags || []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      type: 'note',
      title,
      content,
      tags,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-[#151923]/50 backdrop-blur-sm rounded-xl p-8 border border-[#1E2330] shadow-lg">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-silver/70 mb-2">
          Titre
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block w-full rounded-md bg-[#0A0F1C] border border-[#1E2330] text-silver shadow-sm focus:border-[#2ECC71]/20 focus:ring-1 focus:ring-[#2ECC71]/20 p-2.5"
          required
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-silver/70 mb-2">
          Contenu (Markdown supporté)
        </label>
        <div className="min-h-[400px]">
          <MarkdownEditor
            value={content}
            onChange={setContent}
          />
        </div>
      </div>

      <TagInput tags={tags} onChange={setTags} />

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-4 py-2 text-sm font-medium text-silver/70 bg-[#0A0F1C] border border-[#1E2330] rounded-md hover:bg-[#151923] transition-colors"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-[#2ECC71] hover:bg-[#2ECC71]/80 rounded-md transition-colors"
        >
          Enregistrer
        </button>
      </div>
    </form>
  );
}