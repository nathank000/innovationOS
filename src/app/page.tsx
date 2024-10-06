'use client'

import { useState, useEffect } from 'react'
import { Lightbulb, TrendingUp, BarChart2, Award } from 'lucide-react'
import Link from 'next/link'
import { Idea } from '@/types'

export default function Home() {
  const [ideas, setIdeas] = useState<Idea[]>([])

  useEffect(() => {
    const storedIdeas = localStorage.getItem('ideas')
    if (storedIdeas) {
      setIdeas(JSON.parse(storedIdeas))
    }
  }, [])

  const calculateAverageScore = (ideas: Idea[]) => {
    if (ideas.length === 0) return 0
    const totalScore = ideas.reduce((sum, idea) => {
      const traitAverage = idea.traits.reduce((sum, trait) => sum + trait.value, 0) / idea.traits.length
      return sum + traitAverage
    }, 0)
    return (totalScore / ideas.length).toFixed(2)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 flex items-center justify-center">
            <Lightbulb className="mr-4" size={48} />
            Innovation OS
          </h1>
          <p className="text-xl text-gray-600 mt-4">Track and manage your innovative ideas</p>
        </header>
        <main>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-xl shadow-md flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <TrendingUp size={24} className="text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-1">Total Ideas</h2>
                <p className="text-3xl font-bold text-blue-600">{ideas.length}</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md flex items-center">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <BarChart2 size={24} className="text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-1">Average Score</h2>
                <p className="text-3xl font-bold text-green-600">{calculateAverageScore(ideas)}</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md flex items-center">
              <div className="bg-yellow-100 p-3 rounded-full mr-4">
                <Award size={24} className="text-yellow-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-1">Top Ranked</h2>
                <p className="text-3xl font-bold text-yellow-600">{ideas.length > 0 ? Math.max(...ideas.map(idea => idea.rank)) : 'N/A'}</p>
              </div>
            </div>
          </div>
          <h2 className="text-3xl font-semibold mb-6">Recent Ideas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ideas.slice(0, 6).map((idea, index) => (
              <Link href={`/ideas/${idea.id}`} key={idea.id} className="block">
                <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105">
                  <img
                    src={`https://source.unsplash.com/random/400x200?sig=${index}`}
                    alt="Random background"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{idea.title}</h3>
                    <p className="text-gray-600 line-clamp-2">{idea.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}