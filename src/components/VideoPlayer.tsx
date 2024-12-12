import React from 'react';
import { cn } from '../utils/cn';
import { Film } from 'lucide-react';

interface VideoPlayerProps {
  url: string;
  title: string;
  className?: string;
}

export function VideoPlayer({ url, title, className = '' }: VideoPlayerProps) {
  const [isError, setIsError] = React.useState(false);

  // Fonction pour extraire l'ID de la vidéo YouTube
  const getVideoId = (url: string): string | null => {
    const regExp = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[1] ? match[1] : null;
  };

  const videoId = getVideoId(url);
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;

  return (
    <div className={cn(
      "relative aspect-video rounded-lg overflow-hidden bg-[#0A0F1C]",
      "group-hover:shadow-[0_0_15px_rgba(255,127,80,0.1)]",
      className
    )}>
      {thumbnailUrl ? (
        <>
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
            onError={() => setIsError(true)}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm group-hover:backdrop-blur-none transition-all duration-300">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center text-white"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-[#FF7F50]/20 rounded-full blur-lg group-hover:blur-xl transition-all"></div>
                <Film className="w-12 h-12 text-[#FF7F50] relative z-10 group-hover:scale-110 transition-transform" />
              </div>
              <span className="mt-4 text-sm font-medium">Voir sur YouTube</span>
            </a>
          </div>
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <Film className="w-12 h-12 text-gold/50" />
        </div>
      )}
    </div>
  );
}