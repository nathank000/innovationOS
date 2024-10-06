import React, { useState } from 'react'
import { PlusCircle, X, Link as LinkIcon, FileText, Save } from 'lucide-react'
import { Idea, IdeaTrait, Resource, traitNames } from '@/types'

interface IdeaFormProps {
  onSubmit: (idea: Omit<Idea, 'id' | 'createdAt'>) => void
}

const IdeaForm: React.FC<IdeaFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [traits, setTraits] = useState<IdeaTrait[]>(
    traitNames.map(name => ({ name, value: 5 }))
  )
  const [resources, setResources] = useState<Resource[]>([])
  const [newResource, setNewResource] = useState<Resource>({
    type: 'link',
    name: '',
    url: '',
    description: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      title,
      description,
      rank: 0,
      resources,
      process: [],
      traits,
    })
    setTitle('')
    setDescription('')
    setTraits(traitNames.map(name => ({ name, value: 5 })))
    setResources([])
  }

  const handleTraitChange = (index: number, value: number) => {
    const newTraits = [...traits]
    newTraits[index].value = value
    setTraits(newTraits)
  }

  const handleAddResource = () => {
    if (newResource.name && newResource.url) {
      setResources([...resources, newResource])
      setNewResource({ type: 'link', name: '', url: '', description: '' })
    }
  }

  const handleRemoveResource = (index: number) => {
    setResources(resources.filter((_, i) => i !== index))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Idea Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter your idea title"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Idea Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your idea"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          rows={4}
          required
        />
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-2">Idea Traits</h3>
        <div className="space-y-4">
          {traits.map((trait, index) => (
            <div key={trait.name} className="flex items-center space-x-4">
              <label className="w-64 text-sm text-gray-600">{trait.name}</label>
              <input
                type="range"
                min="1"
                max="10"
                value={trait.value}
                onChange={(e) => handleTraitChange(index, parseInt(e.target.value))}
                className="flex-grow"
              />
              <span className="w-8 text-center text-gray-700 font-medium">{trait.value}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-2">Resources</h3>
        <ul className="space-y-2 mb-4">
          {resources.map((resource, index) => (
            <li key={index} className="flex items-center space-x-2 bg-gray-100 p-2 rounded-md">
              {resource.type === 'link' ? <LinkIcon size={16} /> : <FileText size={16} />}
              <span className="flex-grow">{resource.name}</span>
              <button
                type="button"
                onClick={() => handleRemoveResource(index)}
                className="text-red-500 hover:text-red-700"
              >
                <X size={16} />
              </button>
            </li>
          ))}
        </ul>
        <div className="flex space-x-2">
          <select
            value={newResource.type}
            onChange={(e) => setNewResource({ ...newResource, type: e.target.value as 'file' | 'link' })}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="link">Link</option>
            <option value="file">File</option>
          </select>
          <input
            type="text"
            value={newResource.name}
            onChange={(e) => setNewResource({ ...newResource, name: e.target.value })}
            placeholder="Resource Name"
            className="flex-grow p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            value={newResource.url}
            onChange={(e) => setNewResource({ ...newResource, url: e.target.value })}
            placeholder={newResource.type === 'link' ? 'URL' : 'File Path'}
            className="flex-grow p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            value={newResource.description}
            onChange={(e) => setNewResource({ ...newResource, description: e.target.value })}
            placeholder="Description"
            className="flex-grow p-2 border border-gray-300 rounded-md"
          />
          <button
            type="button"
            onClick={handleAddResource}
            className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            <PlusCircle size={20} />
          </button>
        </div>
      </div>
      <button type="submit" className="w-full flex items-center justify-center p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
        <Save size={20} className="mr-2" />
        Save Idea
      </button>
    </form>
  )
}

export default IdeaForm