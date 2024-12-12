import React from 'react';
import { TagInput } from '../TagInput';
import { IdeaFormData } from '../../types';
import { Link } from 'lucide-react';
import { parseContent } from '../../utils/content';
import { cn } from '../../utils/cn';
import { getLinkTitle } from '../../services/linkTitle';

interface LinkFormProps {
  onSubmit: (data: IdeaFormData) => void;
  initialData?: {
    title: string;
    content: string;
    tags: string[];
    url?: string;
    description?: string;
  };
}

export function LinkForm({ onSubmit, initialData }: LinkFormProps) {
  const parsedContent = initialData ? parseContent(initialData.content) : {};
  const [title, setTitle] = React.useState(initialData?.title || '');
  const [url, setUrl] = React.useState(parsedContent.url || '');
  const [description, setDescription] = React.useState(parsedContent.description || '');
  const [tags, setTags] = React.useState<string[]>(initialData?.tags || []);
  const [isGeneratingTitle, setIsGeneratingTitle] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isUrlValid, setIsUrlValid] = React.useState(false);

  const updateTitle = React.useCallback(async (url: string) => {
    if (!url || !isUrlValid) return;
    setIsLoading(true);
    try {
      const title = await getLinkTitle(url);
      setTitle(title);
    } catch (error) {
      console.error('Failed to get link title:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  const validateUrl = (url: string) => {
    try {
      new URL(url);
      setIsUrlValid(true);
      return true;
    } catch {
      setIsUrlValid(false);
      return false;
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    if (validateUrl(newUrl)) {
      updateTitle(newUrl);
    }
  };

  React.useEffect(() => {
    if (url && isUrlValid && !title) {
      updateTitle(url);
    }
  }, [url, isUrlValid, title, updateTitle]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      type: 'link',
      title,
      content: JSON.stringify({ url, description }),
      tags,
    });
  };

  const updateTitleFromUrl = React.useCallback(async (url: string) => {
    if (!url) return;
    try {
      setIsGeneratingTitle(true);
      const generatedTitle = await getLinkTitle(url);
      if (!title) {
        setTitle(generatedTitle);
      }
    } catch (error) {
      console.error('Failed to generate title:', error);
    } finally {
      setIsGeneratingTitle(false);
    }
  }, [title]);

  React.useEffect(() => {
    updateTitleFromUrl(url);
  }, [url, updateTitleFromUrl]);

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-[#151923]/50 backdrop-blur-sm rounded-xl p-8 border border-[#1E2330] shadow-lg">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-silver/70 mb-2">
          Titre
        </label>
        <input
          placeholder={isGeneratingTitle ? "Génération du titre..." : "Titre de votre lien"}
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={cn(
            "block w-full rounded-md bg-[#0A0F1C] border border-[#1E2330] text-silver shadow-sm focus:border-[#17A2B8]/20 focus:ring-1 focus:ring-[#17A2B8]/20 p-2.5",
            isGeneratingTitle && "animate-pulse"
          )}
          required
          disabled={isGeneratingTitle}
          aria-busy={isGeneratingTitle}
          aria-label={isGeneratingTitle ? "Génération automatique du titre en cours" : "Titre du lien"}
        />
      </div>

      <div>
        <label htmlFor="url" className="block text-sm font-medium text-silver/70 mb-2">
          URL
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-[#1E2330] bg-[#151923] text-[#17A2B8]">
            <Link className="h-4 w-4 text-silver/50" />
          </span>
          <div className="flex-1 relative">
            <input
            type="url"
            id="url"
            value={url}
            onChange={handleUrlChange}
            className="flex-1 block w-full rounded-none rounded-r-md bg-[#0A0F1C] border border-[#1E2330] text-silver shadow-sm focus:border-[#17A2B8]/20 focus:ring-1 focus:ring-[#17A2B8]/20 p-2.5"
            required
            />
            {isLoading && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <div className="w-4 h-4 border-2 border-[#17A2B8]/20 border-t-[#17A2B8] rounded-full animate-spin"></div>
              </div>
            )}
            {!isUrlValid && url && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-scarlet text-sm">
                URL invalide
              </div>
            )}
          </div>
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
          className="block w-full rounded-md bg-[#0A0F1C] border border-[#1E2330] text-silver shadow-sm focus:border-[#17A2B8]/20 focus:ring-1 focus:ring-[#17A2B8]/20 p-2.5"
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
          className="px-4 py-2 text-sm font-medium text-white bg-[#17A2B8] hover:bg-[#17A2B8]/80 rounded-md transition-colors"
        >
          Enregistrer
        </button>
      </div>
    </form>
  );
}