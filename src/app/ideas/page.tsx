'use client'

import { useState, useEffect } from 'react'
import { Lightbulb, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import IdeaForm from '@/components/IdeaForm'
import IdeaList from '@/components/IdeaList'
import { Idea } from '@/types'

export default function IdeasPage() {
  const [ideas, setIdeas] = useState<Idea[]>([])

  useEffect(() => {
    const storedIdeas = localStorage.getItem('ideas')
    if (storedIdeas) {
      setIdeas(JSON.parse(storedIdeas))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('ideas', JSON.stringify(ideas))
  }, [ideas])

  const addIdea = (newIdea: Omit<Idea, 'id' | 'createdAt'>) => {
    const idea: Idea = {
      ...newIdea,
      id: Date.now().toString(),
      createdAt: new Date(),
    }
    setIdeas([...ideas, idea])
  }

  const updateIdea = (updatedIdea: Idea) => {
    setIdeas(ideas.map(idea => idea.id === updatedIdea.id ? updatedIdea : idea))
  }

  const changeRank = (id: string, change: number) => {
    setIdeas(ideas.map(idea => 
      idea.id === id ? { ...idea, rank: idea.rank + change } : idea
    ))
  }

  const deleteIdea = (id: string) => {
    setIdeas(ideas.filter(idea => idea.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Link href="/" className="inline-flex items-center text-blue-500 hover:underline mb-8">
          <ArrowLeft className="mr-1" size={20} />
          Back to Home
        </Link>
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 flex items-center justify-center">
            <Lightbulb className="mr-4" size={36} />
            Manage Ideas
          </h1>
          <p className="text-xl text-gray-600 mt-2">Create, rank, and track your innovative ideas</p>
        </header>
        <main className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-6">Add New Idea</h2>
          <IdeaForm onSubmit={addIdea} />
          <h2 className="text-2xl font-semibold mt-12 mb-6">Your Ideas</h2>
          <IdeaList
            ideas={ideas}
            onRankChange={changeRank}
            onDelete={deleteIdea}
            onUpdate={updateIdea}
          />
        </main>
      </div>
    </div>
  )
}