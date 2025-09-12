"use client" // This makes it a client component, needed for interactive inputs

import { useState } from "react"


interface Field {
  id: string
  label?: string
  name?: string
  type?: string 
  placeholder?: string
  required?: boolean
  options?: string[]
  content?: string
  columnWidth?: string
}

interface FormData {
  id: string
  version: string
  name: string
  toEmail?: string
  subject?: string
  successMessage?: string
  fields: Field[]
}

export default function FormCanvas({ formData }: { formData: FormData }) {
  // State to track form values
  const [formValues, setFormValues] = useState<{ [key: string]: any }>({})

  // Handle change for all input types
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    const target = e.target as HTMLInputElement

    console.log('Form change:', { name, value, type, fieldName: target.name })

    if (type === "checkbox") {
      
      setFormValues((prev) => ({
        ...prev,
        [name]: { ...prev[name], [value]: target.checked },
      }))
    } else if (type === "file") {
      setFormValues((prev) => ({ ...prev, [name]: target.files }))
    } else {
      setFormValues((prev) => ({ ...prev, [name]: value }))
    }
  }

  // Guard if formData or fields are missing
  if (!formData || !formData.fields) return <div>No form data available</div>

  return (
    <div className="flex-1 p-4  overflow-auto">
      <h2 className="text-xl font-bold mb-4">{formData.name}</h2>
      
      {/* Debug info */}
      {/* <div className="mb-4 p-2 rounded text-sm">
        <strong>Debug - Form Values:</strong>
        <pre>{JSON.stringify(formValues, null, 2)}</pre>
      </div> */}

      <form className="flex flex-wrap gap-4">
        {formData.fields.map((field) => {
          const widthClass = field.columnWidth ? `w-[${field.columnWidth}]` : "w-full"
          const fieldType = field.type || "text" // default to text if undefined
          
          // console.log('Rendering field:', { id: field.id, name: field.name, type: fieldType, widthClass })

          return (
            <div key={field.id} className={`${widthClass} flex flex-col`}>
              {field.label && (
                <label htmlFor={field.id} className="font-medium mb-1">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
              )}

              {/* Text and Email */}
              {["text", "email"].includes(fieldType) && (
                <input
                  id={field.id}
                  name={field.name || field.id}
                  type={fieldType}
                  placeholder={field.placeholder}
                  required={field.required}
                  className="border rounded p-2 w-full"
                  value={formValues[field.name || field.id] || ""}
                  onChange={handleChange}
                />
              )}

            {/* Date */}
{fieldType === "date" && (
  <input
    id={field.id}
    name={field.name || field.id}
    type="date"
    required={field.required}
    className="border rounded p-2 w-full"
    value={formValues[field.name || field.id] ?? ""}
    onChange={handleChange}
  />
)}

{/* Time */}
{fieldType === "time" && (
  <input
    id={field.id}
    name={field.name || field.id}
    type="time"
    required={field.required}
    className="border rounded p-2 w-full"
    value={formValues[field.name || field.id] ?? ""}
    onChange={handleChange}
  />
)}


              {/* File */}
              {fieldType === "file" && (
                <input
                  id={field.id}
                  name={field.name || field.id}
                  type="file"
                  required={field.required}
                  className="border rounded p-2 w-full"
                  onChange={handleChange}
                />
              )}

              {/* Select */}
              {fieldType === "select" && (
                <select
                  id={field.id}
                  name={field.name || field.id}
                  required={field.required}
                  className="border rounded p-2 w-full"
                  value={formValues[field.name || field.id] || ""}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    {field.placeholder || "Select an option"}
                  </option>
                  {field.options?.map((opt, idx) => {
                    const [label, value] = opt.split("=")
                    return (
                      <option key={idx} value={value?.trim()}>
                        {label.trim()}
                      </option>
                    )
                  })}
                </select>
              )}

              {/* Radio */}
              {fieldType === "radio" &&
                field.options?.map((opt, idx) => {
                  const [label, value] = opt.split("=")
                  return (
                    <label key={idx} className="inline-flex items-center mr-4">
                      <input
                        type="radio"
                        name={field.name || field.id}
                        value={value?.trim()}
                        checked={formValues[field.name || field.id] === value?.trim()}
                        onChange={handleChange}
                        className="mr-1"
                        required={field.required}
                      />
                      {label.trim()}
                    </label>
                  )
                })}

              {/* Checkbox */}
              {fieldType === "checkbox" &&
                field.options?.map((opt, idx) => {
                  const [label, value] = opt.split("=")
                  return (
                    <label key={idx} className="inline-flex items-center mr-4">
                      <input
                        type="checkbox"
                        name={field.name || field.id}
                        value={value?.trim()}
                        checked={formValues[field.name || field.id]?.[value?.trim()] || false}
                        onChange={handleChange}
                        className="mr-1"
                        required={field.required}
                      />
                      {label.trim()}
                    </label>
                  )
                })}

              {/* Acceptance (HTML content) */}
              {fieldType === "acceptance" && (
                <div
                  className="border rounded p-2"
                  dangerouslySetInnerHTML={{ __html: field.content || "" }}
                />
              )}
            </div>
          )
        })}
        
        {/* Submit button for testing */}
        <div className="w-full mt-4">
          <button 
            type="submit" 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={(e) => {
              e.preventDefault()
              console.log('Form submitted with values:', formValues)
              alert('Form submitted! Check console for values.')
            }}
          >
            Submit Form (Test)
          </button>
        </div>
      </form>
    </div>
  )
}
