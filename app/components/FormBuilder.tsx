"use client"

import FormCanvas from "@/component/FormCanvas/FormCanvas"
import Navbar from "@/component/Navbar"
import SidebarLeft from "@/component/SidebarLeft"
import SidebarRight from "@/component/SidebarRight"
import FormPreview from "./FormPreview"
import { DndContext } from "@dnd-kit/core"
import { useFormBuilder } from "./hooks/useFormBuilder"
import { useFormPreview } from "./hooks/useFormPreview"
import { createDragHandler } from "./DragHandler"
import { exportSchema, importSchema } from "./utils/schemaUtils"

import { Field } from "@/component/FormCanvas/types"

interface FormBuilderProps {
  formData: { fields?: Field[]; successMessage?: string; [key: string]: unknown }
}

export default function FormBuilder({ formData }: FormBuilderProps) {
  const {
    fields,
    selectedField,
    isMounted,
    handleEditField,
    handleDeleteField,
    handleDuplicateField,
    handleUpdateField,
    addField,
    insertField,
    reorderFields,
    resetFields
  } = useFormBuilder(formData.fields || [])

  const {
    isPreviewMode,
    formValues,
    isSubmitted,
    togglePreviewMode,
    handleFormSubmit,
    handleInputChange
  } = useFormPreview()

  const handleDragEnd = createDragHandler({
    fields,
    onAddField: addField,
    onInsertField: insertField,
    onReorderFields: reorderFields
  })

  // Schema management functions
  const handleExportSchema = () => {
    const schema = {
      ...formData,
      fields: fields
    }
    exportSchema(schema)
  }

  const handleImportSchema = async (file: File) => {
    try {
      const importedSchema = await importSchema(file)
      resetFields(importedSchema.fields)
      alert('Schema imported successfully!')
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Error importing schema')
    }
  }

  const handleResetSchema = () => {
    if (confirm('Are you sure you want to reset to the original schema? This will clear all your changes.')) {
      localStorage.removeItem('formBuilderFields')
      resetFields(formData.fields || [])
      console.log('Reset to original schema')
    }
  }

  if (!isMounted) {
    return (
      <div className="flex-1 p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Loading...</h2>
      </div>
    )
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="h-screen flex flex-col">
        {/* Navbar */}
        <Navbar 
          isPreviewMode={isPreviewMode} 
          onTogglePreview={togglePreviewMode}
          onExportSchema={handleExportSchema}
          onImportSchema={handleImportSchema}
          onResetSchema={handleResetSchema}
        />

        {/* Main layout */}
        <div className="flex flex-1">
          {!isPreviewMode ? (
            <>
              {/* Left Sidebar */}
              <SidebarLeft />

              {/* Canvas */}
              <FormCanvas 
                formData={formData} 
                fields={fields} 
                onEditField={handleEditField}
                onDeleteField={handleDeleteField}
                onDuplicateField={handleDuplicateField}
              />

              {/* Right Sidebar */}
              <SidebarRight 
                selectedField={selectedField} 
                onUpdateField={handleUpdateField}
              />
            </>
          ) : (
            <FormPreview
              fields={fields}
              formValues={formValues}
              isSubmitted={isSubmitted}
              successMessage={formData.successMessage}
              onFormSubmit={handleFormSubmit}
              onInputChange={handleInputChange}
            />
          )}
        </div>
      </div>
    </DndContext>
  )
}
