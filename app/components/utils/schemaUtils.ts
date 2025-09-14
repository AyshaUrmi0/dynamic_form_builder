import { Field } from "@/component/FormCanvas/types"

export interface FormSchema {
  fields: Field[]
  successMessage?: string
  [key: string]: unknown
}

export const exportSchema = (schema: FormSchema, filename: string = 'form-schema.json') => {
  const dataStr = JSON.stringify(schema, null, 2)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(dataBlob)
  
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
  
  console.log('Exported schema:', schema)
}

export const importSchema = (file: File): Promise<FormSchema> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const importedSchema = JSON.parse(e.target?.result as string)
        if (importedSchema.fields && Array.isArray(importedSchema.fields)) {
          console.log('Imported schema:', importedSchema)
          resolve(importedSchema)
        } else {
          reject(new Error('Invalid schema format. Please ensure the file contains a "fields" array.'))
        }
      } catch (error) {
        console.error('Error importing schema:', error)
        reject(new Error('Error importing schema. Please check the file format.'))
      }
    }
    reader.readAsText(file)
  })
}

export const resetToDefaultSchema = (defaultFields: Field[]): FormSchema => {
  return {
    fields: defaultFields,
    successMessage: 'Form Submitted Successfully!'
  }
}
