import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { AddIdeaPage } from './pages/AddIdeaPage';
import { EditIdeaPage } from './pages/EditIdeaPage';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddIdeaPage />} />
        <Route path="/edit/:id" element={<EditIdeaPage />} />
      </Route>
    </Routes>
  );
}

export default App;