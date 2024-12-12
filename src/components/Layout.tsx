import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export function Layout() {
  return (
    <div className="min-h-screen bg-[#0A0F1C] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0A0F1C] via-[#0A0F1C]/95 to-[#0A0F1C]">
      <Header />
      <div className="pt-24">
        <Outlet />
      </div>
    </div>
  );
}