import React from 'react';
import { TagInput } from '../TagInput';
import { IdeaFormData } from '../../types';
import { Film, Upload } from 'lucide-react';
import { parseContent } from '../../utils/content';
import { uploadFile } from '../../services/upload';
import { cn } from '../../utils/cn';

interface MediaFormProps {
  onSubmit: (data: IdeaFormData) => void;
  initialData?: {
    title: string;
    content: string;
    tags: string[];
    url?: string;
    type?: 'video' | 'audio';
    description?: string;
  };
}

export function MediaForm({ onSubmit, initialData }: MediaFormProps) {
  const parsedContent = initialData ? parseContent(initialData.content) : {};
  const [title, setTitle] = React.useState(initialData?.title || '');
  const [mediaUrl, setMediaUrl] = React.useState(parsedContent.url || '');
  const [mediaType, setMediaType] = React.useState<'video' | 'audio'>(parsedContent.type || 'video');
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
      setMediaUrl(url);
    } catch (error) {
      console.error('Failed to upload file:', error);
      // TODO: Add error handling
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const processedUrl = mediaType === 'video' ? getYouTubeEmbedUrl(mediaUrl) : mediaUrl;
    onSubmit({
      type: 'media',
      title,
      content: JSON.stringify({ url: processedUrl, type: mediaType, description }),
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
          className="block w-full rounded-md bg-[#0A0F1C] border border-[#1E2330] text-silver shadow-sm focus:border-[#FF7F50]/20 focus:ring-1 focus:ring-[#FF7F50]/20 p-2.5"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-silver/70 mb-2">
          Type de média
        </label>
        <div className="flex space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="video"
              checked={mediaType === 'video'}
              onChange={(e) => setMediaType(e.target.value as 'video')}
              className="form-radio h-4 w-4 text-gold border-[#1E2330]"
            />
            <span className="ml-2 text-silver">Vidéo</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="audio"
              checked={mediaType === 'audio'}
              onChange={(e) => setMediaType(e.target.value as 'audio')}
              className="form-radio h-4 w-4 text-gold border-[#1E2330]"
            />
            <span className="ml-2 text-silver">Audio</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-silver/70 mb-2">Média</label>
        <div className="mt-1 flex items-center space-x-4">
          <div className="flex-1">
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-[#1E2330] bg-[#151923]">
                <Film className="h-4 w-4 text-[#FF7F50]" />
              </span>
              <input
                type="url"
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
                placeholder="URL du média"
                className="flex-1 block w-full rounded-none rounded-r-md bg-[#0A0F1C] border border-[#1E2330] text-silver shadow-sm focus:border-[#FF7F50]/20 focus:ring-1 focus:ring-[#FF7F50]/20 p-2.5"
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
            accept={mediaType === 'video' ? 'video/*' : 'audio/*'}
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
          className="block w-full rounded-md bg-[#0A0F1C] border border-[#1E2330] text-silver shadow-sm focus:border-[#FF7F50]/20 focus:ring-1 focus:ring-[#FF7F50]/20 p-2.5"
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
          className="px-4 py-2 text-sm font-medium text-white bg-[#FF7F50] hover:bg-[#FF7F50]/80 rounded-md transition-colors"
        >
          Enregistrer
        </button>
      </div>
    </form>
  );
}