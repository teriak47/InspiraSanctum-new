import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { NoteForm } from '../components/forms/NoteForm';
import { LinkForm } from '../components/forms/LinkForm';
import { ImageForm } from '../components/forms/ImageForm';
import { MediaForm } from '../components/forms/MediaForm';
import { TypeSelector } from '../components/TypeSelector';
import { IdeaType, IdeaFormData } from '../types';
import { useIdeas } from '../contexts/IdeasContext';
import { parseContent } from '../utils/content';

export function EditIdeaPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { ideas, updateIdea } = useIdeas();
  const idea = ideas.find(i => i.id === id);
  
  if (!idea) {
    navigate('/');
    return null;
  }

  const content = parseContent(idea.content);
  const [selectedType] = React.useState<IdeaType>(idea.type);

  const handleSubmit = (formData: IdeaFormData) => {
    updateIdea(id!, { ...formData, type: selectedType });
    navigate('/');
  };

  const renderForm = () => {
    const commonProps = {
      onSubmit: handleSubmit,
      initialData: {
        title: idea.title,
        content: idea.content,
        tags: idea.tags,
        ...content,
      },
    };

    switch (selectedType) {
      case 'note':
        return <NoteForm {...commonProps} />;
      case 'link':
        return <LinkForm {...commonProps} />;
      case 'image':
        return <ImageForm {...commonProps} />;
      case 'media':
        return <MediaForm {...commonProps} />;
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-gold/90 font-primary mb-6">
          Modifier l'idée
        </h1>
        <div className="max-w-xl mx-auto">
          <TypeSelector selectedType={selectedType} onChange={() => {}} disabled />
        </div>
      </div>
      <div className="mt-8">
        {renderForm()}
      </div>
    </div>
  );
}