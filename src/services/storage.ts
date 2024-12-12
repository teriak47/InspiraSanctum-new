import { Idea, IdeaType } from '../types';

const DB_NAME = 'inspirasanctum';
const DB_VERSION = 1;
const STORES = {
  note: 'notes',
  link: 'links',
  image: 'images',
  media: 'media',
} as const;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      // Créer les stores pour chaque type d'idée
      Object.values(STORES).forEach(storeName => {
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { keyPath: 'id' });
        }
      });
    };
  });
}

async function getStore(type: IdeaType, mode: IDBTransactionMode = 'readonly'): Promise<IDBObjectStore> {
  const db = await openDB();
  const transaction = db.transaction(STORES[type], mode);
  return transaction.objectStore(STORES[type]);
}

export async function saveIdea(idea: Idea): Promise<void> {
  const store = await getStore(idea.type, 'readwrite');
  
  // Si c'est une mise à jour, on doit d'abord supprimer l'ancienne version
  if (idea.id) {
    try {
      await store.delete(idea.id);
    } catch (error) {
      console.warn('Failed to delete old version:', error);
    }
  }
  
  return new Promise((resolve, reject) => {
    const request = store.put(idea);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

export async function deleteIdeaFromStorage(id: string, type: IdeaType): Promise<void> {
  const store = await getStore(type, 'readwrite');
  
  return new Promise((resolve, reject) => {
    const request = store.delete(id);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

export async function getIdeasByType(type: IdeaType): Promise<Idea[]> {
  const store = await getStore(type);
  
  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

export async function getAllIdeas(): Promise<Idea[]> {
  const allIdeas: Idea[] = [];
  
  for (const type of Object.keys(STORES) as IdeaType[]) {
    const ideas = await getIdeasByType(type);
    allIdeas.push(...ideas);
  }
  
  return allIdeas.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}