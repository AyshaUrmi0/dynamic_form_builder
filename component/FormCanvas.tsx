"use client"

import { useEffect } from "react"
import { useDroppable } from "@dnd-kit/core"
import DraggableFormField from "./DraggableFormField"
import EmptyState from "./EmptyState"

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
  const { setNodeRef, isOver } = useDroppable({
    id: 'form-canvas',
  })

  // Debug logging
  useEffect(() => {
    if (isOver) {
      console.log('FormCanvas: Drop zone is being hovered over')
    }
  }, [isOver])

  return (
    <div 
      ref={setNodeRef} 
      className={`flex-1 p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen transition-colors ${
        isOver ? 'bg-blue-100' : ''
      }`}
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Form Canvas</h2>
      <div className="min-h-96">
        {fields.length === 0 ? (
          <EmptyState />
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
