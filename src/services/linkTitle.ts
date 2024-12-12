// Fonction pour extraire le nom de domaine d'une URL
function extractDomain(url: string): string {
  try {
    const domain = new URL(url).hostname.replace('www.', '');
    return domain.charAt(0).toUpperCase() + domain.slice(1);
  } catch {
    return 'Site web';
  }
}

// Fonction pour générer un titre à partir de l'URL
export async function getLinkTitle(url: string): Promise<string> {
  try {
    // Extrait le nom de domaine
    const domain = extractDomain(url);
    
    // Extrait le dernier segment de l'URL (après le dernier /)
    const segments = url.split('/').filter(Boolean);
    const lastSegment = segments[segments.length - 1];
    
    if (lastSegment && lastSegment !== domain) {
      // Convertit les tirets et underscores en espaces
      const cleanSegment = lastSegment
        .split(/[-_]/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
        .split('?')[0] // Supprime les paramètres d'URL
        .split('#')[0]; // Supprime les ancres
        
      return `${cleanSegment} - ${domain}`;
    }
    
    return `Lien vers ${domain}`;
  } catch (error) {
    console.error('Failed to generate link title:', error);
    return 'Lien sans titre';
  }
}