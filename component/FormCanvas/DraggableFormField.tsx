"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import FieldRenderer from "./FieldRenderer"
import FieldActions from "./FieldActions"
import { DraggableFormFieldProps } from "./types"

export default function DraggableFormField({
  field,
  onEdit,
  onDelete,
  onDuplicate,
}: DraggableFormFieldProps) {
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

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        width: field.columnWidth || '100%',
        maxWidth: field.columnWidth || '100%'
      }}
      className={`border-2 border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow group relative cursor-move ${isDragging ? "opacity-50 shadow-lg" : ""}`}
    >
      <FieldActions 
        field={field}
        onEdit={onEdit}
        onDelete={onDelete}
        onDuplicate={onDuplicate}
      />

      <strong className="text-gray-800 text-lg mb-2 block pr-16" {...attributes} {...listeners}>
        <span className="inline-block mr-2 text-gray-400">⋮⋮</span>
        {field.label || field.type}
      </strong>
      
      <div {...attributes} {...listeners}>
        <FieldRenderer field={field} />
      </div>
    </div>
  )
}
