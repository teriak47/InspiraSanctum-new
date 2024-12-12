import React from 'react';
import { TagInput } from '../TagInput';
import { IdeaFormData } from '../../types';
import { Image, Upload } from 'lucide-react';
import { parseContent } from '../../utils/content';
import { uploadFile } from '../../services/upload';
import { cn } from '../../utils/cn';

interface ImageFormProps {
  onSubmit: (data: IdeaFormData) => void;
  initialData?: {
    title: string;
    content: string;
    tags: string[];
    url?: string;
    description?: string;
  };
}

export function ImageForm({ onSubmit, initialData }: ImageFormProps) {
  const parsedContent = initialData ? parseContent(initialData.content) : {};
  const [title, setTitle] = React.useState(initialData?.title || '');
  const [imageUrl, setImageUrl] = React.useState(parsedContent.url || '');
  const [description, setDescription] = React.useState(parsedContent.description || '');
  const [tags, setTags] = React.useState<string[]>(initialData?.tags || []);
  const [isUploading, setIsUploading] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const url = await uploadFile(file);
      setImageUrl(url);
    } catch (error) {
      console.error('Failed to upload file:', error);
      // TODO: Add error handling
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      type: 'image',
      title,
      content: JSON.stringify({ url: imageUrl, description }),
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
          className="block w-full rounded-md bg-[#0A0F1C] border border-[#1E2330] text-silver shadow-sm focus:border-[#FFC821]/20 focus:ring-1 focus:ring-[#FFC821]/20 p-2.5"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-silver/70 mb-2">Image</label>
        <div className="mt-1 flex items-center space-x-4">
          <div className="flex-1">
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-[#1E2330] bg-[#151923]">
                <Image className="h-4 w-4 text-[#FFC821]" />
              </span>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="URL de l'image"
                className="flex-1 block w-full rounded-none rounded-r-md bg-[#0A0F1C] border border-[#1E2330] text-silver shadow-sm focus:border-[#FFC821]/20 focus:ring-1 focus:ring-[#FFC821]/20 p-2.5"
              />
            </div>
          </div>
          <span className="text-sm text-silver/50">ou</span>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center px-4 py-2 border border-[#1E2330] shadow-sm text-sm font-medium rounded-md text-silver bg-[#151923] hover:bg-[#1E2330] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isUploading}
          >
            {isUploading ? (
              <span className="animate-spin mr-2">⏳</span>
            ) : (
              <Upload className="h-4 w-4 mr-2" />
            )}
            {isUploading ? 'Téléchargement...' : 'Télécharger'}
          </button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileUpload}
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-silver/70 mb-2">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="block w-full rounded-md bg-[#0A0F1C] border border-[#1E2330] text-silver shadow-sm focus:border-[#FFC821]/20 focus:ring-1 focus:ring-[#FFC821]/20 p-2.5"
        />
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
          className="px-4 py-2 text-sm font-medium text-white bg-[#FFC821] hover:bg-[#FFC821]/80 rounded-md transition-colors"
        >
          Enregistrer
        </button>
      </div>
    </form>
  );
}