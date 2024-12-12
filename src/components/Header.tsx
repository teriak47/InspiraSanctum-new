import React from 'react';
import { Link } from 'react-router-dom';
import { LightbulbIcon } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-[#0A0F1C]/80 backdrop-blur-sm fixed w-full z-50 border-b border-gold/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link to="/" className="flex items-center justify-center group">
          <div className="relative">
            <div className="absolute inset-0 bg-gold/10 rounded-full blur-lg group-hover:blur-xl transition-all"></div>
            <LightbulbIcon className="h-8 w-8 text-gold relative z-10" />
          </div>
          <h1 className="ml-3 text-3xl font-bold text-gold/90 font-decorative tracking-wider group-hover:text-gold transition-colors">
            InspiraSanctum
          </h1>
        </Link>
      </div>
    </header>
  );
}