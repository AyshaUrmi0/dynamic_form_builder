"use client"

import { useState, useEffect } from "react"
import { Field } from "@/component/FormCanvas/types"

export function useFormBuilder(initialFields: Field[] = []) {
  const [fields, setFields] = useState<Field[]>([])
  const [selectedField, setSelectedField] = useState<Field | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    console.log('Component mounting...')
    setIsMounted(true)
    
    // Try to load from localStorage first, then fallback to initial fields
    const savedFields = localStorage.getItem('formBuilderFields')
    if (savedFields) {
      try {
        const parsedFields = JSON.parse(savedFields)
        setFields(parsedFields)
        console.log('Loaded fields from localStorage:', parsedFields)
      } catch (error) {
        console.error('Error loading from localStorage:', error)
        // Fallback to initial fields
        if (initialFields.length > 0) {
          setFields(initialFields)
        }
      }
    } else {
      // Load initial fields
      if (initialFields.length > 0) {
        setFields(initialFields)
        console.log('Loaded initial fields:', initialFields)
      }
    }
    
    console.log('Component mounted successfully!')
  }, [initialFields])

  // Save fields to localStorage whenever fields change
  useEffect(() => {
    if (isMounted && fields.length > 0) {
      localStorage.setItem('formBuilderFields', JSON.stringify(fields))
      console.log('Saved fields to localStorage:', fields)
    }
  }, [fields, isMounted])

  const handleEditField = (field: Field) => {
    setSelectedField(field)
  }

  const handleDeleteField = (fieldId: string) => {
    setFields(prev => prev.filter(field => field.id !== fieldId))
    if (selectedField?.id === fieldId) {
      setSelectedField(null)
    }
  }

  const handleDuplicateField = (field: Field) => {
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

  const handleUpdateField = (fieldId: string, updates: Partial<Field>) => {
    setFields(prev => prev.map(field => 
      field.id === fieldId ? { ...field, ...updates } : field
    ))
    // Update selected field if it's the one being edited
    if (selectedField?.id === fieldId) {
      setSelectedField((prev: Field | null) => prev ? { ...prev, ...updates } : null)
    }
  }

  const addField = (field: Field) => {
    setFields(prev => [...prev, field])
  }

  const insertField = (field: Field, targetIndex: number) => {
    setFields(prev => {
      const newFields = [...prev]
      newFields.splice(targetIndex, 0, field)
      return newFields
    })
  }

  const reorderFields = (activeIndex: number, overIndex: number) => {
    if (activeIndex !== overIndex) {
      const updatedFields = [...fields]
      const [removed] = updatedFields.splice(activeIndex, 1)
      updatedFields.splice(overIndex, 0, removed)
      setFields(updatedFields)
    }
  }

  const resetFields = (newFields: Field[]) => {
    setFields(newFields)
    setSelectedField(null)
  }

  return {
    fields,
    selectedField,
    isMounted,
    setFields,
    setSelectedField,
    handleEditField,
    handleDeleteField,
    handleDuplicateField,
    handleUpdateField,
    addField,
    insertField,
    reorderFields,
    resetFields
  }
}
