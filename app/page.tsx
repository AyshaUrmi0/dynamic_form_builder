"use client"

import FormCanvas from "@/component/FormCanvas";
import Navbar from "@/component/Navbar";
import SidebarLeft from "@/component/SidebarLeft";
import SidebarRight from "@/component/SidebarRight";
import { DndContext } from "@dnd-kit/core";
import { useState, useEffect } from "react";

import formData from "@/data/formSchema.json"

// Preview Field Component
function PreviewField({ 
  field, 
  value, 
  onChange 
}: { 
  field: any
  value: any
  onChange: (value: any) => void
}) {
  const renderField = () => {
    switch (field.type) {
      case "text":
      case "email":
        return (
          <input
            type={field.type}
            name={field.name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder || `Enter ${field.type}...`}
            required={field.required}
            className="border-2 border-gray-300 rounded-lg p-3 w-full bg-white text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors"
          />
        )
      case "date":
        return (
          <input 
            type="date" 
            name={field.name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={field.required}
            className="border-2 border-gray-300 rounded-lg p-3 w-full bg-white text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors" 
          />
        )
      case "time":
        return (
          <input 
            type="time" 
            name={field.name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={field.required}
            className="border-2 border-gray-300 rounded-lg p-3 w-full bg-white text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors" 
          />
        )
      case "select":
        return (
          <select 
            name={field.name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={field.required}
            className="border-2 border-gray-300 rounded-lg p-3 w-full bg-white text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors"
          >
            <option value="">{field.placeholder || "Select an option"}</option>
            {field.options?.map((option: string, index: number) => {
              const [label, val] = option.split('=')
              return (
                <option key={index} value={val || label}>
                  {label}
                </option>
              )
            })}
          </select>
        )
      case "checkbox":
        return (
          <div className="space-y-2">
            {field.options?.map((option: string, index: number) => {
              const [label, val] = option.split('=')
              const isChecked = Array.isArray(value) ? value.includes(val || label) : false
              return (
                <div key={index} className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id={`${field.id}-${index}`}
                    name={field.name}
                    value={val || label}
                    checked={isChecked}
                    onChange={(e) => {
                      const newValue = Array.isArray(value) ? [...value] : []
                      if (e.target.checked) {
                        newValue.push(val || label)
                      } else {
                        const index = newValue.indexOf(val || label)
                        if (index > -1) newValue.splice(index, 1)
                      }
                      onChange(newValue)
                    }}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" 
                  />
                  <label htmlFor={`${field.id}-${index}`} className="text-gray-800">{label}</label>
                </div>
              )
            })}
          </div>
        )
      case "radio":
        return (
          <div className="space-y-2">
            {field.options?.map((option: string, index: number) => {
              const [label, val] = option.split('=')
              return (
                <div key={index} className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    id={`${field.id}-${index}`}
                    name={field.name}
                    value={val || label}
                    checked={value === (val || label)}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" 
                  />
                  <label htmlFor={`${field.id}-${index}`} className="text-gray-800">{label}</label>
                </div>
              )
            })}
          </div>
        )
      case "file":
        return (
          <input 
            type="file" 
            name={field.name}
            onChange={(e) => onChange(e.target.files?.[0]?.name || '')}
            className="border-2 border-gray-300 rounded-lg p-3 w-full bg-white text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" 
          />
        )
      case "acceptance":
        return (
          <div className="border-2 border-gray-300 rounded-lg p-3 w-full bg-white text-gray-800">
            <div dangerouslySetInnerHTML={{ __html: field.content || "" }} />
            <div className="mt-2 flex items-center space-x-2">
              <input 
                type="checkbox" 
                name={field.name}
                checked={value}
                onChange={(e) => onChange(e.target.checked)}
                required={field.required}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" 
              />
              <label className="text-gray-800">I agree to the terms</label>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {renderField()}
    </div>
  )
}

export default function Home() {
  const [fields, setFields] = useState<any[]>([])
  const [selectedField, setSelectedField] = useState<any>(null)
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [formValues, setFormValues] = useState<any>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    console.log('Component mounting...')
    setIsMounted(true)
    
    // Try to load from localStorage first, then fallback to JSON schema
    const savedFields = localStorage.getItem('formBuilderFields')
    if (savedFields) {
      try {
        const parsedFields = JSON.parse(savedFields)
        setFields(parsedFields)
        console.log('Loaded fields from localStorage:', parsedFields)
      } catch (error) {
        console.error('Error loading from localStorage:', error)
        // Fallback to JSON schema
        if (formData.fields && formData.fields.length > 0) {
          setFields(formData.fields)
        }
      }
    } else {
      // Load initial fields from JSON schema
      if (formData.fields && formData.fields.length > 0) {
        setFields(formData.fields)
        console.log('Loaded fields from JSON schema:', formData.fields)
      }
    }
    
    console.log('Component mounted successfully!')
  }, [])

  // Save fields to localStorage whenever fields change
  useEffect(() => {
    if (isMounted && fields.length > 0) {
      localStorage.setItem('formBuilderFields', JSON.stringify(fields))
      console.log('Saved fields to localStorage:', fields)
    }
  }, [fields, isMounted])

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    
    console.log('Drag end event:', { active: active?.id, over: over?.id })
    console.log('Active data:', active?.data?.current)

    if (!over) {
      console.log('No drop target')
      return
    }

    // Check if dropping a new field from sidebar
    if (active.id.startsWith('field-') && over.id === 'form-canvas') {
      const fieldType = active.data.current?.type
      const fieldLabel = active.data.current?.label
      
      console.log('Dropping new field:', { fieldType, fieldLabel })
      
      if (fieldType) {
        const newField = {
          id: Math.random().toString(36).substr(2, 9),
          type: fieldType,
          label: fieldLabel,
          name: fieldType + "_" + Math.floor(Math.random() * 1000),
          required: false,
          columnWidth: "100%",
        }
        console.log('Adding new field:', newField)
        setFields((prev) => [...prev, newField])
      }
    }
    
    // Check if reordering existing fields
    if (active.id.startsWith('form-field-') && over.id.startsWith('form-field-')) {
      const activeIndex = fields.findIndex(field => field.id === active.id.replace('form-field-', ''))
      const overIndex = fields.findIndex(field => field.id === over.id.replace('form-field-', ''))
      
      console.log('Reordering fields:', { activeIndex, overIndex })
      
      if (activeIndex !== overIndex) {
        const updatedFields = [...fields]
        const [removed] = updatedFields.splice(activeIndex, 1)
        updatedFields.splice(overIndex, 0, removed)
        setFields(updatedFields)
      }
    }
  }

  // Handle field actions
  const handleEditField = (field: any) => {
    setSelectedField(field)
  }

  const handleDeleteField = (fieldId: string) => {
    setFields(prev => prev.filter(field => field.id !== fieldId))
    if (selectedField?.id === fieldId) {
      setSelectedField(null)
    }
  }

  const handleDuplicateField = (field: any) => {
    const duplicatedField = {
      ...field,
      id: Math.random().toString(36).substr(2, 9),
      name: field.name + "_copy"
    }
    const fieldIndex = fields.findIndex(f => f.id === field.id)
    setFields(prev => {
      const newFields = [...prev]
      newFields.splice(fieldIndex + 1, 0, duplicatedField)
      return newFields
    })
  }

  const handleUpdateField = (fieldId: string, updates: any) => {
    setFields(prev => prev.map(field => 
      field.id === fieldId ? { ...field, ...updates } : field
    ))
    // Update selected field if it's the one being edited
    if (selectedField?.id === fieldId) {
      setSelectedField((prev: any) => ({ ...prev, ...updates }))
    }
  }

  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode)
    setSelectedField(null) // Clear selection in preview mode
    setIsSubmitted(false) // Reset submission state
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    // In a real app, you would send this data to a server
    console.log('Form submitted with data:', formValues)
  }

  const handleInputChange = (fieldName: string, value: any) => {
    setFormValues((prev: any) => ({ ...prev, [fieldName]: value }))
  }

  // Export current schema as JSON file
  const handleExportSchema = () => {
    const schema = {
      ...formData,
      fields: fields
    }
    
    const dataStr = JSON.stringify(schema, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = 'form-schema.json'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    
    console.log('Exported schema:', schema)
  }

  // Import schema from JSON file
  const handleImportSchema = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const importedSchema = JSON.parse(e.target?.result as string)
        if (importedSchema.fields && Array.isArray(importedSchema.fields)) {
          setFields(importedSchema.fields)
          console.log('Imported schema:', importedSchema)
          alert('Schema imported successfully!')
        } else {
          alert('Invalid schema format. Please ensure the file contains a "fields" array.')
        }
      } catch (error) {
        console.error('Error importing schema:', error)
        alert('Error importing schema. Please check the file format.')
      }
    }
    reader.readAsText(file)
  }

  // Reset to original schema
  const handleResetSchema = () => {
    if (confirm('Are you sure you want to reset to the original schema? This will clear all your changes.')) {
      localStorage.removeItem('formBuilderFields')
      setFields(formData.fields || [])
      setSelectedField(null)
      console.log('Reset to original schema')
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="h-screen flex flex-col">
        {/* Navbar */}
        <Navbar 
          isPreviewMode={isPreviewMode} 
          onTogglePreview={togglePreviewMode}
          onExportSchema={handleExportSchema}
          onImportSchema={handleImportSchema}
          onResetSchema={handleResetSchema}
        />

        {/* Main layout */}
        <div className="flex flex-1">
          {!isMounted ? (
            <div className="flex-1 p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Loading...</h2>
            </div>
          ) : !isPreviewMode ? (
            <>
              {/* Left Sidebar */}
              <SidebarLeft />

              {/* Canvas */}
              <FormCanvas 
                formData={formData} 
                fields={fields} 
                onEditField={handleEditField}
                onDeleteField={handleDeleteField}
                onDuplicateField={handleDuplicateField}
              />

              {/* Right Sidebar */}
              <SidebarRight 
                selectedField={selectedField} 
                onUpdateField={handleUpdateField}
              />
            </>
          ) : (
            <div className="flex-1 p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Form Preview</h2>
                
                {isSubmitted ? (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                    <h3 className="font-bold">✅ {formData.successMessage || 'Form Submitted Successfully!'}</h3>
                    <p className="text-sm mt-1">Thank you for your submission.</p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    {fields.map((field) => (
                      <PreviewField
                        key={field.id}
                        field={field}
                        value={formValues[field.name] || ''}
                        onChange={(value) => handleInputChange(field.name, value)}
                      />
                    ))}
                    
                    <button
                      type="submit"
                      className="w-full py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                    >
                      Submit Form
                    </button>
                  </form>
                )}

                {/* Show submitted data */}
                {isSubmitted && Object.keys(formValues).length > 0 && (
                  <div className="mt-8 bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Submitted Data</h3>
                    <div className="space-y-2">
                      {Object.entries(formValues).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                          <span className="font-medium text-gray-600">{key}:</span>
                          <span className="text-gray-800">{String(value)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </DndContext>
  )
}
