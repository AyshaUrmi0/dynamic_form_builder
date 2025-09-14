"use client"

import { Field } from "@/component/FormCanvas/types"
import PreviewField from "./PreviewField"

interface FormPreviewProps {
  fields: Field[]
  formValues: Record<string, string | number | boolean | readonly string[] | undefined>
  isSubmitted: boolean
  successMessage?: string
  onFormSubmit: (e: React.FormEvent) => void
  onInputChange: (fieldName: string, value: string | number | boolean | readonly string[] | undefined) => void
}

export default function FormPreview({ 
  fields, 
  formValues, 
  isSubmitted, 
  successMessage,
  onFormSubmit, 
  onInputChange 
}: FormPreviewProps) {
  return (
    <div className="flex-1 p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Form Preview</h2>
        
        {isSubmitted ? (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            <h3 className="font-bold">✅ {successMessage || 'Form Submitted Successfully!'}</h3>
            <p className="text-sm mt-1">Thank you for your submission.</p>
          </div>
        ) : (
          <form onSubmit={onFormSubmit} className="space-y-6">
            <div className="flex flex-wrap gap-4">
              {fields.map((field) => (
                <div 
                  key={field.id}
                  style={{
                    width: field.columnWidth || '100%',
                    maxWidth: field.columnWidth || '100%'
                  }}
                >
                  <PreviewField
                    field={field}
                    value={formValues[field.name || ''] || ''}
                    onChange={(value) => onInputChange(field.name || '', value)}
                  />
                </div>
              ))}
            </div>
            
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
  )
}
