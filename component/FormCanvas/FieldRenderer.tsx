"use client"

import { FieldRendererProps } from "./types"

export default function FieldRenderer({ field }: FieldRendererProps) {
  const renderField = () => {
    switch (field.type) {
      case "text":
      case "email":
        return (
          <input
            type={field.type}
            placeholder={field.placeholder || `Enter ${field.type}...`}
            required={field.required}
            className="border-2 border-gray-300 rounded-lg p-3 w-full bg-white text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors"
          />
        )
      case "date":
        return (
          <input 
            type="date" 
            required={field.required}
            className="border-2 border-gray-300 rounded-lg p-3 w-full bg-white text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors" 
          />
        )
      case "time":
        return (
          <input 
            type="time" 
            required={field.required}
            className="border-2 border-gray-300 rounded-lg p-3 w-full bg-white text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors" 
          />
        )
      case "select":
        return (
          <select 
            required={field.required}
            className="border-2 border-gray-300 rounded-lg p-3 w-full bg-white text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors"
          >
            <option>{field.placeholder || "Select an option"}</option>
            {field.options?.map((option, index) => {
              const [label, value] = option.split('=')
              return (
                <option key={index} value={value || label}>
                  {label}
                </option>
              )
            })}
          </select>
        )
      case "checkbox":
        return (
          <div className="space-y-2">
            {field.options?.map((option, index) => {
              const [label, value] = option.split('=')
              return (
                <div key={index} className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id={`${field.id}-${index}`}
                    name={field.name}
                    value={value || label}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" 
                  />
                  <label htmlFor={`${field.id}-${index}`} className="text-gray-800">{label}</label>
                </div>
              )
            }) || (
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" 
                />
                <label className="text-gray-800">{field.label}</label>
              </div>
            )}
          </div>
        )
      case "radio":
        return (
          <div className="space-y-2">
            {field.options?.map((option, index) => {
              const [label, value] = option.split('=')
              return (
                <div key={index} className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    id={`${field.id}-${index}`}
                    name={field.name}
                    value={value || label}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" 
                  />
                  <label htmlFor={`${field.id}-${index}`} className="text-gray-800">{label}</label>
                </div>
              )
            }) || (
              <div className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" 
                />
                <label className="text-gray-800">{field.label}</label>
              </div>
            )}
          </div>
        )
      case "file":
        return (
          <input 
            type="file" 
            required={field.required}
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
