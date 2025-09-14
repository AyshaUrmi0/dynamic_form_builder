"use client"

import { useState, useEffect } from "react"

export default function SidebarRight({ 
  selectedField, 
  onUpdateField 
}: { 
  selectedField: any
  onUpdateField: (fieldId: string, updates: any) => void
}) {
  const [formData, setFormData] = useState({
    label: '',
    name: '',
    placeholder: '',
    required: false,
    columnWidth: '100%',
    options: [] as string[],
    content: ''
  })

  // Update form data when selectedField changes
  useEffect(() => {
    if (selectedField) {
      setFormData({
        label: selectedField.label || '',
        name: selectedField.name || '',
        placeholder: selectedField.placeholder || '',
        required: selectedField.required || false,
        columnWidth: selectedField.columnWidth || '100%',
        options: selectedField.options || [],
        content: selectedField.content || ''
      })
    }
  }, [selectedField])

  const handleSave = () => {
    if (selectedField && onUpdateField) {
      onUpdateField(selectedField.id, formData)
    }
  }

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...formData.options]
    newOptions[index] = value
    setFormData(prev => ({ ...prev, options: newOptions }))
  }

  const addOption = () => {
    setFormData(prev => ({ 
      ...prev, 
      options: [...prev.options, 'New Option=new_option'] 
    }))
  }

  const removeOption = (index: number) => {
    const newOptions = formData.options.filter((_, i) => i !== index)
    setFormData(prev => ({ ...prev, options: newOptions }))
  }

  if (!selectedField) {
    return (
      <aside className="w-64 border-l border-gray-300 p-4 bg-gray-50">
        <h2 className="font-semibold mb-4 text-gray-800 text-lg">Field Settings</h2>
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-2">⚙️</div>
          <p>Select a field to edit its settings</p>
        </div>
      </aside>
    )
  }

  return (
    <aside className="w-64 border-l border-gray-300 p-4 bg-gray-50 overflow-y-auto">
      <h2 className="font-semibold mb-4 text-gray-800 text-lg">Field Settings</h2>
      
      <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-4">
        <div>
          <h3 className="font-medium text-gray-700 mb-2">{selectedField.type} Field</h3>
        </div>

        {/* Basic Settings */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
          <input
            type="text"
            value={formData.label}
            onChange={(e) => setFormData(prev => ({ ...prev, label: e.target.value }))}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            placeholder="Field label"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            placeholder="Field name"
          />
        </div>

        {/* Placeholder for text inputs */}
        {(selectedField.type === 'text' || selectedField.type === 'email' || selectedField.type === 'select') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Placeholder</label>
            <input
              type="text"
              value={formData.placeholder}
              onChange={(e) => setFormData(prev => ({ ...prev, placeholder: e.target.value }))}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              placeholder="Placeholder text"
            />
          </div>
        )}

        {/* Required Toggle */}
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.required}
              onChange={(e) => setFormData(prev => ({ ...prev, required: e.target.checked }))}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Required field</span>
          </label>
        </div>

        {/* Column Width */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Column Width</label>
          <select
            value={formData.columnWidth}
            onChange={(e) => setFormData(prev => ({ ...prev, columnWidth: e.target.value }))}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          >
            <option value="25%">25%</option>
            <option value="33%">33%</option>
            <option value="50%">50%</option>
            <option value="66%">66%</option>
            <option value="75%">75%</option>
            <option value="100%">100%</option>
          </select>
        </div>

        {/* Options for select, checkbox, radio */}
        {(selectedField.type === 'select' || selectedField.type === 'checkbox' || selectedField.type === 'radio') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Options</label>
            <div className="space-y-2">
              {formData.options.map((option, index) => (
                <div key={index} className="flex space-x-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    placeholder="Label=value"
                  />
                  <button
                    onClick={() => removeOption(index)}
                    className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                onClick={addOption}
                className="w-full py-2 bg-green-500 text-white rounded text-sm hover:bg-green-600"
              >
                + Add Option
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Format: "Display Text=value"</p>
          </div>
        )}

        {/* Content for acceptance field */}
        {selectedField.type === 'acceptance' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              rows={3}
              placeholder="Acceptance text or HTML"
            />
          </div>
        )}

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full py-2 bg-blue-500 text-white rounded font-medium hover:bg-blue-600 transition-colors"
        >
          Save Changes
        </button>
      </div>
    </aside>
  )
}
