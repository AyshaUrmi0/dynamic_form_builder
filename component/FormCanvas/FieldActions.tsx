"use client"

import { FieldActionsProps } from "./types"

export default function FieldActions({ field, onEdit, onDelete, onDuplicate }: FieldActionsProps) {
  return (
    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-1 z-10">
      <button
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
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
          e.preventDefault()
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
          e.preventDefault()
          onDelete(field.id)
        }}
        className="p-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        title="Delete"
      >
        🗑️
      </button>
    </div>
  )
}
