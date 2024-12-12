import React from 'react';
import { LightbulbIcon } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="text-center py-12 bg-[#151923]/50 backdrop-blur-sm rounded-xl border border-[#1E2330]">
      <div className="relative inline-block">
        <div className="absolute inset-0 bg-gold/10 rounded-full blur-lg"></div>
        <LightbulbIcon className="relative z-10 mx-auto h-12 w-12 text-gold/90" />
      </div>
      <h3 className="mt-4 text-sm font-medium text-gold/90 font-primary">Aucune idée</h3>
      <p className="mt-2 text-sm text-silver/70 font-secondary">
        Commencez par ajouter votre première idée !
      </p>
    </div>
  );
}