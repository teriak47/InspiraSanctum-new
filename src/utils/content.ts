interface ParsedContent {
  url?: string;
  description?: string;
  type?: 'video' | 'audio';
}

function getYouTubeEmbedUrl(url: string): string {
  try {
    // Vérifier si c'est déjà une URL d'embed
    if (url.includes('youtube.com/embed/')) {
      return url;
    }
    
    // Extraire l'ID de la vidéo de différents formats d'URL YouTube
    let videoId = '';
    const youtubeRegex = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
    const match = url.match(youtubeRegex);
    
    if (match && match[1]) {
      videoId = match[1];
    }
    
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  } catch {
    return url;
  }
}

export function parseContent(content: string): ParsedContent {
  try {
    const parsed = JSON.parse(content);
    if (parsed.type === 'video' && parsed.url) {
      return {
        ...parsed,
        url: getYouTubeEmbedUrl(parsed.url)
      };
    }
    return parsed;
  } catch {
    return { description: content };
  }
}

export function formatContent(content: ParsedContent): string {
  return JSON.stringify(content);
}