"use client"

import { useState } from "react"
import { useDroppable } from "@dnd-kit/core"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

interface Field {
  id: string
  type: string
  label?: string
  name?: string
  placeholder?: string
  required?: boolean
  options?: string[]
  content?: string
  columnWidth?: string
}

export default function FormCanvas({ 
  formData, 
  fields, 
  onEditField, 
  onDeleteField, 
  onDuplicateField 
}: { 
  formData: any
  fields: Field[]
  onEditField: (field: Field) => void
  onDeleteField: (fieldId: string) => void
  onDuplicateField: (field: Field) => void
}) {
  const { setNodeRef } = useDroppable({
    id: 'form-canvas',
  })

  return (
    <div ref={setNodeRef} className="flex-1 p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Form Canvas</h2>
      <div className="min-h-96">
        {fields.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-lg">Drag form fields from the sidebar to start building your form</p>
          </div>
        ) : (
          fields.map((field) => (
            <DraggableFormField
              key={field.id}
              field={field}
              onEdit={onEditField}
              onDelete={onDeleteField}
              onDuplicate={onDuplicateField}
            />
          ))
        )}
      </div>
    </div>
  )
}

// Draggable field inside canvas
function DraggableFormField({
  field,
  onEdit,
  onDelete,
  onDuplicate,
}: {
  field: Field
  onEdit: (field: Field) => void
  onDelete: (fieldId: string) => void
  onDuplicate: (field: Field) => void
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: `form-field-${field.id}`,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  // Render different field types
  const renderField = () => {
    switch (field.type) {
      case "text":
      case "email":
        return (
          <input
            type={field.type}
            placeholder={field.placeholder || `Enter ${field.type}...`}
            className="border-2 border-gray-300 rounded-lg p-3 w-full bg-white text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors"
          />
        )
      case "date":
        return (
          <input 
            type="date" 
            className="border-2 border-gray-300 rounded-lg p-3 w-full bg-white text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors" 
          />
        )
      case "time":
        return (
          <input 
            type="time" 
            className="border-2 border-gray-300 rounded-lg p-3 w-full bg-white text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors" 
          />
        )
      case "select":
        return (
          <select className="border-2 border-gray-300 rounded-lg p-3 w-full bg-white text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors">
            <option>{field.label || "Select an option"}</option>
          </select>
        )
      case "checkbox":
        return (
          <div className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" 
            />
            <label className="text-gray-800">{field.label}</label>
          </div>
        )
      case "radio":
        return (
          <div className="flex items-center space-x-2">
            <input 
              type="radio" 
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" 
            />
            <label className="text-gray-800">{field.label}</label>
          </div>
        )
      case "file":
        return (
          <input 
            type="file" 
            className="border-2 border-gray-300 rounded-lg p-3 w-full bg-white text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" 
          />
        )
      case "acceptance":
        return (
          <div 
            className="border-2 border-gray-300 rounded-lg p-3 w-full bg-white text-gray-800"
            dangerouslySetInnerHTML={{ __html: field.content || "" }} 
          />
        )
      default:
        return null
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`border-2 border-gray-200 rounded-lg p-4 mb-3 bg-white shadow-sm hover:shadow-md transition-shadow group relative ${isDragging ? "opacity-50 shadow-lg" : ""}`}
    >
      {/* Hover Action Buttons */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-1">
        <button
          onClick={(e) => {
            e.stopPropagation()
            onEdit(field)
          }}
          className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          title="Settings"
        >
          ⚙️
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onDuplicate(field)
          }}
          className="p-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          title="Duplicate"
        >
          📋
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onDelete(field.id)
          }}
          className="p-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          title="Delete"
        >
          🗑️
        </button>
      </div>

      <strong className="text-gray-800 text-lg mb-2 block pr-16">{field.label || field.type}</strong>
      <div className="mt-2">{renderField()}</div>
    </div>
  )
}
