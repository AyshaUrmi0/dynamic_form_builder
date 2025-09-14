"use client"

import { DragEndEvent } from "@dnd-kit/core"
import { Field } from "@/component/FormCanvas/types"

interface DragHandlerProps {
  fields: Field[]
  onAddField: (field: Field) => void
  onInsertField: (field: Field, targetIndex: number) => void
  onReorderFields: (activeIndex: number, overIndex: number) => void
}

export function createDragHandler({ fields, onAddField, onInsertField, onReorderFields }: DragHandlerProps) {
  return (event: DragEndEvent) => {
    const { active, over } = event

    console.log('Drag end event:', { active: active?.id, over: over?.id })
    console.log('Active data:', active?.data?.current)

    if (!over) {
      console.log('No drop target')
      return
    }

    // Check if dropping a new field from sidebar
    if (String(active.id).startsWith('field-')) {
      const fieldType = active.data?.current?.type
      const fieldLabel = active.data?.current?.label

      console.log('Dropping new field:', { fieldType, fieldLabel, dropTarget: over.id })

      if (fieldType) {
        const newField: Field = {
          id: Math.random().toString(36).substr(2, 9),
          type: fieldType,
          label: fieldLabel,
          name: fieldType + "_" + Math.floor(Math.random() * 1000),
          required: false,
          columnWidth: "100%",
        }
        console.log('Adding new field:', newField)
        
        // If dropping on canvas, add at the end
        if (over.id === 'form-canvas') {
          onAddField(newField)
        }
        // If dropping on an existing field, insert before that field
        else if (String(over.id).startsWith('form-field-')) {
          const targetFieldId = String(over.id).replace('form-field-', '')
          const targetIndex = fields.findIndex(field => field.id === targetFieldId)
          
          if (targetIndex !== -1) {
            onInsertField(newField, targetIndex)
          } else {
            // Fallback: add at the end
            onAddField(newField)
          }
        }
        // Fallback: add at the end
        else {
          onAddField(newField)
        }
      }
    }

    // Check if reordering existing fields
    if (String(active.id).startsWith('form-field-') && String(over.id).startsWith('form-field-')) {
      const activeIndex = fields.findIndex(field => field.id === String(active.id).replace('form-field-', ''))
      const overIndex = fields.findIndex(field => field.id === String(over.id).replace('form-field-', ''))

      console.log('Reordering fields:', { activeIndex, overIndex })

      if (activeIndex !== -1 && overIndex !== -1) {
        onReorderFields(activeIndex, overIndex)
      }
    }
  }
}
