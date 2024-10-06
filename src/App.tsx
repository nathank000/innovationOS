import React, { useState } from 'react';
import { Lightbulb } from 'lucide-react';
import IdeaForm from './components/IdeaForm';
import IdeaList from './components/IdeaList';
import { Idea } from './types';

function App() {
  const [ideas, setIdeas] = useState<Idea[]>([]);

  const addIdea = (newIdea: Omit<Idea, 'id' | 'createdAt'>) => {
    const idea: Idea = {
      ...newIdea,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setIdeas([...ideas, idea]);
  };

  const changeRank = (id: string, change: number) => {
    setIdeas(ideas.map(idea => 
      idea.id === id ? { ...idea, rank: idea.rank + change } : idea
    ));
  };

  const deleteIdea = (id: string) => {
    setIdeas(ideas.filter(idea => idea.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 flex items-center justify-center">
            <Lightbulb className="mr-2" size={32} />
            Innovation OS
          </h1>
          <p className="text-gray-600 mt-2">Create, rank, and track your innovative ideas</p>
        </header>
        <main className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Add New Idea</h2>
          <IdeaForm onSubmit={addIdea} />
          <h2 className="text-2xl font-semibold mt-8 mb-4">Your Ideas</h2>
          <IdeaList ideas={ideas} onRankChange={changeRank} onDelete={deleteIdea} />
        </main>
      </div>
    </div>
  );
}

export default App;