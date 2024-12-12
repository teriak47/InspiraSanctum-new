// Couleurs par type d'idée
export const TYPE_COLORS = {
  note: {
    primary: '#2ECC71',
    hover: '#27AE60',
    bg: '#0a1a0e',
    ring: '#2ECC71',
  },
  link: {
    primary: '#17A2B8',
    hover: '#138496',
    bg: '#0a1a1e',
    ring: '#17A2B8',
  },
  image: {
    primary: '#FFC821',
    hover: '#E6B800',
    bg: '#1a1810',
    ring: '#FFC821',
  },
  media: {
    primary: '#FF7F50',
    hover: '#FF6347',
    bg: '#1a1008',
    ring: '#FF7F50',
  },
} as const;

// Couleurs globales
export const COLORS = {
  background: '#0A0F1C',
  foreground: '#c0c0c0',
  gold: '#d4af37',
  silver: '#c0c0c0',
  scarlet: '#ff2400',
  surface: {
    light: '#151923',
    dark: '#0A0F1C',
  },
  border: '#1E2330',
} as const;