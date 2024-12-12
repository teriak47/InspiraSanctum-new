import React from 'react';
import { X, Pencil, Trash2, Calendar } from 'lucide-react';
import { Idea } from '../types';
import { IDEA_TYPES } from '../constants/ideaTypes';
import { TagList } from './TagList';
import { parseContent } from '../utils/content';
import { VideoPlayer } from './VideoPlayer';
import { MarkdownRenderer } from './MarkdownRenderer';
import { cn } from '../utils/cn';

interface IdeaModalProps {
  idea: Idea;
  onClose: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function IdeaModal({ idea, onClose, onEdit, onDelete }: IdeaModalProps) {
  const typeConfig = IDEA_TYPES.find(t => t.type === idea.type);
  const Icon = typeConfig?.icon;
  const content = parseContent(idea.content);

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm overflow-hidden p-4"
      onClick={onClose}
    >
      <div 
        className={cn(
          "relative w-full max-w-4xl bg-[#151923]/95 rounded-xl shadow-2xl overflow-hidden transition-all duration-300 backdrop-blur-sm",
          idea.type === 'image' 
            ? 'ring-1 ring-gold/30 border border-gold/20 shadow-[0_0_15px_rgba(212,175,55,0.1)]' 
           : idea.type === 'note'
             ? 'ring-1 ring-[#2ECC71]/30 border border-[#2ECC71]/20 shadow-[0_0_15px_rgba(46,204,113,0.1)]'
           : idea.type === 'media'
             ? 'ring-1 ring-[#FF7F50]/30 border border-[#FF7F50]/20 shadow-[0_0_15px_rgba(255,127,80,0.1)]' 
           : idea.type === 'link'
             ? 'ring-1 ring-[#17A2B8]/30 border border-[#17A2B8]/20 shadow-[0_0_15px_rgba(23,162,184,0.1)]'
            : 'border border-[#1E2330]'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={cn(
          "flex items-center justify-between p-6 border-b",
          idea.type === 'image' 
            ? 'border-gold/20 bg-gradient-to-r from-[#1a1810]/80 to-[#151923]/95' 
           : idea.type === 'note'
             ? 'border-[#32CD32]/20 bg-gradient-to-r from-[#0a1a0e]/80 to-[#151923]/95'
           : idea.type === 'media'
             ? 'border-[#FF7F50]/20 bg-gradient-to-r from-[#1a0f08]/80 to-[#151923]/95' 
           : idea.type === 'link'
             ? 'border-[#17A2B8]/20 bg-gradient-to-r from-[#0a1a1e]/80 to-[#151923]/95'
            : 'border-[#1E2330]'
        )}>
          <div className="flex items-center space-x-3">
            {Icon && (
              <div className="relative">
                <div className={cn(
                  "absolute inset-0 rounded-full blur-lg animate-pulse",
                  idea.type === 'image' ? 'bg-[#FFC821]/40' :
                 idea.type === 'note' ? 'bg-[#2ECC71]/40' :
                  idea.type === 'media' ? 'bg-[#FF7F50]/40' :
                  idea.type === 'link' ? 'bg-[#17A2B8]/40' : 'bg-gold/10'
                )}></div>
                <Icon className={cn(
                  "w-6 h-6 relative z-10",
                  idea.type === 'image' ? 'text-[#FFC821]' : 
                 idea.type === 'note' ? 'text-[#2ECC71]' :
                  idea.type === 'media' ? 'text-[#FF7F50]' :
                  idea.type === 'link' ? 'text-[#17A2B8]' : 'text-gold'
                )} />
              </div>
            )}
            <h2 className={cn(
              "text-xl font-semibold font-primary",
              idea.type === 'image' 
                ? 'text-[#FFC821] drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]' 
                : idea.type === 'note' ? 'text-[#32CD32]' :
                idea.type === 'link' ? 'text-[#17A2B8]' :
                idea.type === 'media' ? 'text-[#FF7F50]' :
               idea.type === 'media' ? 'text-[#FF7F50]' :
                'text-gold/90'
            )}>{idea.title}</h2>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onEdit(idea.id)}
              className={cn(
                "p-2 transition-all rounded-lg",
                idea.type === 'image'
                  ? 'text-gold/70 hover:text-gold hover:bg-gold/10 hover:shadow-lg hover:shadow-gold/5'
                  : 'text-silver/70 hover:text-gold hover:bg-[#1E2330]/80 hover:shadow-lg hover:shadow-gold/5'
              )}
            >
              <Pencil className="w-5 h-5" />
            </button>
            <button
              onClick={() => onDelete(idea.id)}
              className="p-2 text-red-400/70 hover:text-scarlet transition-all rounded-lg hover:bg-[#1E2330]/80 hover:shadow-lg hover:shadow-scarlet/5"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-silver/70 hover:text-silver transition-all rounded-lg hover:bg-[#1E2330]/80 hover:shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {idea.type === 'link' && content.url && (
          <div className="flex flex-col items-center justify-center py-8 px-6 border-b border-[#17A2B8]/20">
            <div className="text-center mb-6">
              <p className="text-sm text-silver/50 font-mono mb-2">{content.url}</p>
            </div>
            <a
              href={content.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-[#17A2B8]/10 text-[#17A2B8] hover:bg-[#17A2B8]/20 transition-all duration-300 group"
            >
              <Icon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              <span>Ouvrir le lien</span>
            </a>
          </div>
        )}
        <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto scrollbar-thin scrollbar-thumb-[#1E2330] scrollbar-track-transparent">
          {idea.type === 'image' && content.url && (
            <div className="mb-6 relative rounded-lg overflow-hidden bg-[#0A0F1C] shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-b from-[#1a1810]/20 to-transparent pointer-events-none"></div>
              <img
                src={content.url}
                alt={content.description || idea.title}
                className="w-full h-full object-contain max-h-[70vh] brightness-[0.95] contrast-[1.05]"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-gold/30 rounded-lg"></div>
            </div>
          )}
          
          {idea.type === 'media' && content.url && (
            <div className="mb-6 relative rounded-lg overflow-hidden bg-[#0A0F1C] shadow-xl ring-1 ring-[#FF7F50]/30">
              <div className="absolute inset-0 bg-gradient-to-b from-[#1a1008]/20 to-transparent pointer-events-none"></div>
              {content.type === 'video' ? (
                <VideoPlayer
                  url={content.url}
                  title={content.description || idea.title}
                  className="brightness-[0.95] contrast-[1.05]"
                />
              ) : (
                <audio
                  src={content.url}
                  controls
                  className="w-full p-4 bg-[#0A0F1C]/90 border-t border-[#FF7F50]/20"
                  title={content.description || idea.title}
                >
                  Votre navigateur ne prend pas en charge la lecture audio.
                </audio>
              )}
            </div>
          )}

          {(idea.type !== 'image' || content.description) && (
            <div className="prose prose-invert max-w-none mb-6 prose-p:text-silver/80 prose-p:leading-relaxed">
              {idea.type === 'note' ? (
                <MarkdownRenderer content={idea.content} />
              ) : (
                <p className="text-silver/80 font-secondary leading-relaxed">
                  {content.description || content.url || idea.content}
                </p>
              )}
            </div>
          )}

          <div className="mt-6">
            <TagList tags={idea.tags} className="mb-4" />
            <p className={cn(
              "text-sm flex items-center",
              idea.type === 'image' ? 'text-gold/40' : 'text-silver/40'
            )}>
              <Calendar className={cn(
                "w-4 h-4 mr-2",
                idea.type === 'image' ? 'text-gold/40' : 'opacity-70'
              )} />
              Créé le {new Date(idea.createdAt).toLocaleDateString('fr-FR')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}