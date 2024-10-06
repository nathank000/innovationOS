import React, { useState } from 'react'
import { Idea, IdeaTrait, Resource, traitNames } from '@/types'
import { ArrowUp, ArrowDown, Trash2, ChevronDown, ChevronUp, Edit, Save, X, PlusCircle, Link as LinkIcon, FileText } from 'lucide-react'

interface IdeaListProps {
  ideas: Idea[]
  onRankChange: (id: string, change: number) => void
  onDelete: (id: string) => void
  onUpdate: (idea: Idea) => void
}

const IdeaList: React.FC<IdeaListProps> = ({ ideas, onRankChange, onDelete, onUpdate }) => {
  const [expandedIdeas, setExpandedIdeas] = useState<Set<string>>(new Set())
  const [editingIdea, setEditingIdea] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Idea | null>(null)
  const [newResource, setNewResource] = useState<Resource>({
    type: 'link',
    name: '',
    url: '',
    description: ''
  })

  const toggleExpand = (id: string) => {
    setExpandedIdeas(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const startEditing = (idea: Idea) => {
    setEditingIdea(idea.id)
    setEditForm(idea)
  }

  const cancelEditing = () => {
    setEditingIdea(null)
    setEditForm(null)
  }

  const handleEditChange = (field: string, value: string | IdeaTrait[] | Resource[]) => {
    if (editForm) {
      setEditForm({ ...editForm, [field]: value })
    }
  }

  const handleTraitChange = (index: number, value: number) => {
    if (editForm) {
      const newTraits = [...editForm.traits]
      newTraits[index] = { ...newTraits[index], value }
      handleEditChange('traits', newTraits)
    }
  }

  const handleAddResource = () => {
    if (editForm && newResource.name && newResource.url) {
      const updatedResources = [...editForm.resources, newResource]
      handleEditChange('resources', updatedResources)
      setNewResource({ type: 'link', name: '', url: '', description: '' })
    }
  }

  const handleRemoveResource = (index: number) => {
    if (editForm) {
      const updatedResources = editForm.resources.filter((_, i) => i !== index)
      handleEditChange('resources', updatedResources)
    }
  }

  const saveEdit = () => {
    if (editForm) {
      onUpdate(editForm)
      setEditingIdea(null)
      setEditForm(null)
    }
  }

  return (
    <ul className="space-y-6">
      {ideas.map((idea) => (
        <li key={idea.id} className="bg-white p-6 rounded-xl shadow-md">
          {editingIdea === idea.id ? (
            <div className="space-y-4">
              <input
                type="text"
                value={editForm?.title}
                onChange={(e) => handleEditChange('title', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <textarea
                value={editForm?.description}
                onChange={(e) => handleEditChange('description', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={4}
              />
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Traits:</h4>
                {editForm?.traits.map((trait, index) => (
                  <div key={trait.name} className="flex items-center space-x-4">
                    <label className="w-64 text-sm">{trait.name}</label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={trait.value}
                      onChange={(e) => handleTraitChange(index, parseInt(e.target.value))}
                      className="flex-grow"
                    />
                    <span className="w-8 text-center">{trait.value}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-lg">Resources:</h4>
                {editForm?.resources.map((resource, index) => (
                  <div key={index} className="flex items-center space-x-2 bg-gray-100 p-2 rounded-md">
                    {resource.type === 'link' ? <LinkIcon size={16} /> : <FileText size={16} />}
                    <span className="flex-grow">{resource.name}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveResource(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
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
                  <button
                    type="button"
                    onClick={handleAddResource}
                    className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                  >
                    <PlusCircle size={20} />
                  </button>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <button onClick={saveEdit} className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
                  <Save size={20} />
                </button>
                <button onClick={cancelEditing} className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
                  <X size={20} />
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">{idea.title}</h3>
                <div className="flex items-center space-x-2">
                  <button onClick={() => onRankChange(idea.id, 1)} className="p-1 rounded hover:bg-gray-100 transition-colors">
                    <ArrowUp size={20} />
                  </button>
                  <span className="font-medium">{idea.rank}</span>
                  <button onClick={() => onRankChange(idea.id, -1)} className="p-1 rounded hover:bg-gray-100 transition-colors">
                    <ArrowDown size={20} />
                  </button>
                  <button onClick={() => startEditing(idea)} className="p-1 rounded hover:bg-gray-100 text-blue-500 transition-colors">
                    <Edit size={20} />
                  </button>
                  <button onClick={() => onDelete(idea.id)} className="p-1 rounded hover:bg-gray-100 text-red-500 transition-colors">
                    <Trash2 size={20} />
                  </button>
                  <button onClick={() => toggleExpand(idea.id)} className="p-1 rounded hover:bg-gray-100 transition-colors">
                    {expandedIdeas.has(idea.id) ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{idea.description}</p>
              {expandedIdeas.has(idea.id) && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Traits:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {idea.traits.map((trait) => (
                        <div key={trait.name} className="flex items-center">
                          <span className="w-64 text-sm text-gray-600">{trait.name}:</span>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className="bg-blue-600 h-2.5 rounded-full"
                              style={{ width: `${trait.value * 10}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 text-sm font-medium">{trait.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Resources:</h4>
                    <ul className="space-y-2">
                      {idea.resources.map((resource, index) => (
                        <li key={index} className="flex items-center space-x-2 bg-gray-100 p-2 rounded-md">
                          {resource.type === 'link' ? <LinkIcon size={16} className="text-blue-500" /> : <FileText size={16} className="text-green-500" />}
                          <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                            {resource.name}
                          </a>
                          {resource.description && <span className="text-gray-500">- {resource.description}</span>}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Process:</h4>
                    <ol className="list-decimal list-inside space-y-1">
                      {idea.process.map((step, index) => (
                        <li key={index} className="text-gray-700">{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              )}
            </>
          )}
        </li>
      ))}
    </ul>
  )
}

export default IdeaList