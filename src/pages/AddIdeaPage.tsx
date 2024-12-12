import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NoteForm } from '../components/forms/NoteForm';
import { LinkForm } from '../components/forms/LinkForm';
import { ImageForm } from '../components/forms/ImageForm';
import { MediaForm } from '../components/forms/MediaForm';
import { TypeSelector } from '../components/TypeSelector';
import { IdeaType, IdeaFormData } from '../types';
import { useIdeas } from '../contexts/IdeasContext';

export function AddIdeaPage() {
  const [selectedType, setSelectedType] = React.useState<IdeaType>('note');
  const navigate = useNavigate();
  const { addIdea } = useIdeas();

  const handleSubmit = (formData: IdeaFormData) => {
    addIdea(formData);
    navigate('/');
  };

  const renderForm = () => {
    switch (selectedType) {
      case 'note':
        return <NoteForm onSubmit={handleSubmit} />;
      case 'link':
        return <LinkForm onSubmit={handleSubmit} />;
      case 'image':
        return <ImageForm onSubmit={handleSubmit} />;
      case 'media':
        return <MediaForm onSubmit={handleSubmit} />;
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-gold/90 font-primary mb-6">
          Ajouter une nouvelle idée
        </h1>
        <div className="max-w-xl mx-auto">
          <TypeSelector selectedType={selectedType} onChange={setSelectedType} />
        </div>
      </div>
      <div className="mt-8">
        {renderForm()}
      </div>
    </div>
  );
}