"use client"

import { Field } from "@/component/FormCanvas/types"

interface PreviewFieldProps {
  field: Field
  value: any
  onChange: (value: any) => void
}

export default function PreviewField({ field, value, onChange }: PreviewFieldProps) {
  const renderField = () => {
    switch (field.type) {
      case "text":
      case "email":
        return (
          <input
            type={field.type}
            name={field.name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder || `Enter ${field.type}...`}
            required={field.required}
            className="border-2 border-gray-300 rounded-lg p-3 w-full bg-white text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors"
          />
        )
      case "date":
        return (
          <input 
            type="date" 
            name={field.name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={field.required}
            className="border-2 border-gray-300 rounded-lg p-3 w-full bg-white text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors" 
          />
        )
      case "time":
        return (
          <input 
            type="time" 
            name={field.name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={field.required}
            className="border-2 border-gray-300 rounded-lg p-3 w-full bg-white text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors" 
          />
        )
      case "select":
        return (
          <select 
            name={field.name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={field.required}
            className="border-2 border-gray-300 rounded-lg p-3 w-full bg-white text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors"
          >
            <option value="">{field.placeholder || "Select an option"}</option>
            {field.options?.map((option: string, index: number) => {
              const [label, val] = option.split('=')
              return (
                <option key={index} value={val || label}>
                  {label}
                </option>
              )
            })}
          </select>
        )
      case "checkbox":
        return (
          <div className="space-y-2">
            {field.options?.map((option: string, index: number) => {
              const [label, val] = option.split('=')
              const isChecked = Array.isArray(value) ? value.includes(val || label) : false
              return (
                <div key={index} className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id={`${field.id}-${index}`}
                    name={field.name}
                    value={val || label}
                    checked={isChecked}
                    onChange={(e) => {
                      const newValue = Array.isArray(value) ? [...value] : []
                      if (e.target.checked) {
                        newValue.push(val || label)
                      } else {
                        const index = newValue.indexOf(val || label)
                        if (index > -1) newValue.splice(index, 1)
                      }
                      onChange(newValue)
                    }}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" 
                  />
                  <label htmlFor={`${field.id}-${index}`} className="text-gray-800">{label}</label>
                </div>
              )
            })}
          </div>
        )
      case "radio":
        return (
          <div className="space-y-2">
            {field.options?.map((option: string, index: number) => {
              const [label, val] = option.split('=')
              return (
                <div key={index} className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    id={`${field.id}-${index}`}
                    name={field.name}
                    value={val || label}
                    checked={value === (val || label)}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" 
                  />
                  <label htmlFor={`${field.id}-${index}`} className="text-gray-800">{label}</label>
                </div>
              )
            })}
          </div>
        )
      case "file":
        return (
          <input 
            type="file" 
            name={field.name}
            onChange={(e) => onChange(e.target.files?.[0]?.name || '')}
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
                name={field.name}
                checked={value}
                onChange={(e) => onChange(e.target.checked)}
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
