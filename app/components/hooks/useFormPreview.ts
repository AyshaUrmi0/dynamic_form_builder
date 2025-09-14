"use client"

import { useState } from "react"

export function useFormPreview() {
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [formValues, setFormValues] = useState<Record<string, string | number | boolean | readonly string[] | undefined>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode)
    setIsSubmitted(false) // Reset submission state when switching modes
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    // In a real app, you would send this data to a server
    console.log('Form submitted with data:', formValues)
  }

  const handleInputChange = (fieldName: string, value: string | number | boolean | readonly string[] | undefined) => {
    setFormValues((prev: Record<string, string | number | boolean | readonly string[] | undefined>) => ({ ...prev, [fieldName]: value }))
  }

  const resetForm = () => {
    setFormValues({})
    setIsSubmitted(false)
  }

  return {
    isPreviewMode,
    formValues,
    isSubmitted,
    togglePreviewMode,
    handleFormSubmit,
    handleInputChange,
    resetForm
  }
}
