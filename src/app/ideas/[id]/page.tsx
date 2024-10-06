'use client'

import { useState, useEffect } from 'react'
import { Lightbulb, ArrowLeft, FileIcon } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Idea } from '@/types'

export default function IdeaDetail() {
  const [idea, setIdea] = useState<Idea | null>(null)
  const params = useParams()
  const { id } = params

  useEffect(() => {
    const storedIdeas = localStorage.getItem('ideas')
    if (storedIdeas) {
      const ideas: Idea[] = JSON.parse(storedIdeas)
      const foundIdea = ideas.find(idea => idea.id === id)
      if (foundIdea) {
        setIdea(foundIdea)
      }
    }
  }, [id])

  if (!idea) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Link href="/ideas" className="inline-flex items-center text-blue-500 hover:underline mb-4">
          <ArrowLeft className="mr-1" size={16} />
          Back to Ideas
        </Link>
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 flex items-center justify-center">
            <Lightbulb className="mr-2" size={32} />
            {idea.title}
          </h1>
        </header>
        <main className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{idea.description}</p>
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Traits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {idea.traits.map((trait) => (
                <div key={trait.name} className="flex items-center">
                  <span className="w-64 text-sm">{trait.name}:</span>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${trait.value * 10}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm">{trait.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Resources</h2>
            <ul className="list-disc list-inside">
              {idea.resources.map((resource, index) => (
                <li key={index} className="flex items-center mb-2">
                  {resource.type === 'link' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  ) : (
                    <FileIcon className="h-4 w-4 mr-2" />
                  )}
                  <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    {resource.name}
                  </a>
                  {resource.description && <span className="ml-2 text-gray-500">- {resource.description}</span>}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">Process</h2>
            <ol className="list-decimal list-inside">
              {idea.process.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        </main>
      </div>
    </div>
  )
}