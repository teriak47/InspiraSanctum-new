import React from 'react';
import { Calendar } from 'lucide-react';
import { Idea } from '../types';
import { IDEA_TYPES } from '../constants/ideaTypes';
import { TagList } from './TagList';
import { parseContent } from '../utils/content';
import { VideoPlayer } from './VideoPlayer';
import { IdeaModal } from './IdeaModal';
import { useNavigate } from 'react-router-dom';
import { MarkdownRenderer } from './MarkdownRenderer';
import { cn } from '../utils/cn';
import { createPortal } from 'react-dom';

interface IdeaCardProps {
  idea: Idea;
  onDelete: (id: string) => void;
}

export function IdeaCard({ idea, onDelete }: IdeaCardProps) {
  const typeConfig = IDEA_TYPES.find(t => t.type === idea.type);
  const Icon = typeConfig?.icon;
  const content = parseContent(idea.content);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const navigate = useNavigate();
  const cardClasses = React.useMemo(() => {
    const baseClasses = "relative w-full h-full flex flex-col";
    
    switch (idea.type) {
      case 'image':
        return cn(
          baseClasses,
          "aspect-[3/4] md:aspect-auto ring-1 ring-gold/30"
        );
      case 'media':
        return cn(
          baseClasses,
          "bg-[#151923]/50 p-6 min-h-[300px] ring-1 ring-[#FF7F50]/30"
        );
      case 'note':
        return cn(
          baseClasses,
          "bg-[#151923]/50 p-6 min-h-[200px] ring-1 ring-[#2ECC71]/30"
        );
      case 'link':
        return cn(
          baseClasses,
          "bg-gradient-to-br from-[#151923]/50 to-[#0A0F1C]/50 p-6 min-h-[200px] ring-1 ring-[#17A2B8]/30"
        );
      default:
        return cn(
          baseClasses,
          "bg-[#151923]/50 p-6 min-h-[200px]"
        );
    }
  }, [idea.type]);
  
  return (
    <>
      <article
        onClick={() => setIsModalOpen(true)}
        className={cardClasses}
      >
        {idea.type === 'image' && content.url ? (
          <>
            <img
              src={content.url}
              alt={content.description || idea.title}
              className="absolute inset-0 w-full h-full object-cover blur-[5px] transition-all duration-500 group-hover:scale-110 group-hover:blur-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-[#1a1810]/60 to-[#2a2616]/20 opacity-50 group-hover:opacity-30 transition-all duration-300"></div>
            <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {Icon && (
                    <div className="relative">
                      <div className="absolute inset-0 bg-gold/30 rounded-full blur-lg group-hover:blur-xl transition-all duration-300"></div>
                      <Icon className="w-5 h-5 text-gold relative z-10" />
                    </div>
                  )}
                  <h3 className="text-lg font-semibold text-gold/90 font-primary group-hover:text-gold transition-all duration-300 group-hover:scale-105 drop-shadow-lg">
                    {idea.title}
                  </h3>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); onDelete(idea.id); }}
                  className="text-white/70 hover:text-scarlet transition-colors opacity-0 group-hover:opacity-100"
                >
                  <span className="sr-only">Supprimer</span>
                  <span className="text-xl">×</span>
                </button>
              </div>
              <div>
                {content.description && (
                  <p className="text-white/90 mb-4 font-secondary line-clamp-2 drop-shadow-lg transition-all duration-300 group-hover:text-white">
                    {content.description}
                  </p>
                )}
                <TagList tags={idea.tags} className="mb-4 transition-all duration-300 drop-shadow-lg" />
                <div className="flex items-center text-sm text-gold/70 drop-shadow-lg transition-all duration-300 group-hover:text-gold">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(idea.createdAt).toLocaleDateString('fr-FR')}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                {Icon && (
                  <div className="relative group-hover:scale-110 transition-transform">
                    <div className={cn(
                      "absolute inset-0 rounded-full blur-md group-hover:blur-lg transition-all",
                      idea.type === 'link' ? 'bg-[#17A2B8]/20' :
                      idea.type === 'media' ? 'bg-[#FF7F50]/20' :
                      idea.type === 'note' ? 'bg-[#32CD32]/20' :
                      'bg-gold/10'
                    )}></div>
                    <Icon className={cn(
                      "w-5 h-5 relative z-10",
                      idea.type === 'link' ? 'text-[#17A2B8]' :
                      idea.type === 'media' ? 'text-[#FF7F50]' :
                      idea.type === 'note' ? 'text-[#2ECC71]' :
                      'text-gold'
                    )} />
                  </div>
                )}
                {idea.type === 'link' ? (
                  <div className="flex flex-col">
                    <h3 className={cn(
                      "text-lg font-semibold font-primary",
                      idea.type === 'link' ? 'text-[#17A2B8]/90 group-hover:text-[#17A2B8]' : 
                      idea.type === 'note' ? 'text-[#32CD32]/90 group-hover:text-[#32CD32]' :
                      'text-gold/90 group-hover:text-gold',
                      'transition-colors'
                    )}>
                      {idea.type === 'link' ? idea.title || 'Lien sans titre' : idea.title}
                    </h3>
                    <p className="text-xs text-silver/50 font-mono mt-1 truncate max-w-[200px]">
                      {content.url}
                    </p>
                  </div>
                ) : (
                  <h3 className={cn(
                    "text-lg font-semibold font-primary",
                    idea.type === 'link' ? 'text-[#17A2B8]/90 group-hover:text-[#17A2B8]' : 
                    idea.type === 'note' ? 'text-[#2ECC71]/90 group-hover:text-[#2ECC71]' :
                    idea.type === 'note' ? 'text-[#2ECC71]/90 group-hover:text-[#2ECC71]' :
                    'text-gold/90 group-hover:text-gold',
                    'transition-colors'
                  )}>
                    {idea.title}
                  </h3>
                )}
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); onDelete(idea.id); }}
                className="text-silver/50 hover:text-scarlet transition-colors opacity-0 group-hover:opacity-100"
              >
                <span className="sr-only">Supprimer</span>
                <span className="text-xl">×</span>
              </button>
            </div>

           {idea.type === 'media' && content.url && (
             <div className="mb-4 relative aspect-video rounded-lg overflow-hidden bg-[#0A0F1C] group-hover:shadow-md transition-shadow">
               {content.type === 'video' ? (
                 <div className="relative">
                   <div className="absolute inset-0 bg-[#FFA500]/10 group-hover:bg-transparent transition-colors duration-300"></div>
                   <VideoPlayer
                     url={content.url}
                     title={content.description || idea.title}
                   />
                 </div>
               ) : (
                 <audio
                   src={content.url}
                   controls
                   className="w-full absolute bottom-0 left-0 right-0 bg-[#0A0F1C]/80 p-2"
                   title={content.description || idea.title}
                 >
                   Votre navigateur ne prend pas en charge la lecture audio.
                 </audio>
               )}
             </div>
           )}
           
           {(idea.type !== 'image' || content.description) && (
            <div className="mb-4 line-clamp-4">
              {idea.type === 'note' ? (
                <MarkdownRenderer 
                  content={idea.content}
                  className="prose-sm prose-headings:mb-2 prose-p:mb-2"
                />
              ) : (
                <p className="text-silver/80 font-secondary leading-relaxed">
                  {content.description || content.url || idea.content}
                </p>
              )}
            </div>
           )}
           
           <div className="mt-auto">
             <TagList tags={idea.tags} className="mb-4 transition-opacity group-hover:opacity-90" />
           
             <div className="flex items-center text-sm text-silver/40 group-hover:text-silver/60 transition-all">
               <Calendar className="w-4 h-4 mr-1" />
               {new Date(idea.createdAt).toLocaleDateString('fr-FR')}
             </div>
           </div>
          </>
        )}
      </article>
      
      {isModalOpen && createPortal(
        <IdeaModal
          idea={idea}
          onClose={() => setIsModalOpen(false)}
          onEdit={() => {
            navigate(`/edit/${idea.id}`);
            setIsModalOpen(false);
          }}
          onDelete={(id) => {
            onDelete(id);
            setIsModalOpen(false);
          }}
        />,
        document.body
      )}
    </>
  );
}