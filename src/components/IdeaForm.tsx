import React, { useState } from 'react';
import { IdeaType, IdeaFormData } from '../types';
import { TypeSelector } from './TypeSelector';
import { TagList } from './TagList';

interface IdeaFormProps {
  onSubmit: (data: IdeaFormData) => void;
}

export function IdeaForm({ onSubmit }: IdeaFormProps) {
  const [formData, setFormData] = useState<IdeaFormData>({
    title: '',
    type: 'note',
    content: '',
    tags: [],
  });
  const [tagInput, setTagInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ title: '', type: 'note', content: '', tags: [] });
    setTagInput('');
  };

  const addTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <TypeSelector
        selectedType={formData.type}
        onChange={(type) => setFormData(prev => ({ ...prev, type }))}
      />

      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Titre
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
          Contenu
        </label>
        <textarea
          id="content"
          value={formData.content}
          onChange={e => setFormData(prev => ({ ...prev, content: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          rows={4}
          required
        />
      </div>

      <div className="mb-6">
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
          Tags (Appuyez sur Entrée pour ajouter)
        </label>
        <input
          type="text"
          id="tags"
          value={tagInput}
          onChange={e => setTagInput(e.target.value)}
          onKeyDown={addTag}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <TagList
          tags={formData.tags}
          onDelete={removeTag}
          className="mt-2"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
      >
        Ajouter l'idée
      </button>
    </form>
  );
}