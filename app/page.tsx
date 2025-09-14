"use client"

import FormCanvas from "@/component/FormCanvas";
import Navbar from "@/component/Navbar";
import SidebarLeft from "@/component/SidebarLeft";
import SidebarRight from "@/component/SidebarRight";
import { DndContext } from "@dnd-kit/core";
import { useState } from "react";

import formData from "@/data/formSchema.json"

export default function Home() {
  const [fields, setFields] = useState<any[]>([])

  const handleDragEnd = (event: any) => {
    const { active, over } = event

    if (!over) return

    // Check if dropping a new field from sidebar
    if (active.id.startsWith('field-') && over.id === 'form-canvas') {
      const fieldType = active.data.current?.type
      const fieldLabel = active.data.current?.label
      
      if (fieldType) {
        const newField = {
          id: Math.random().toString(36).substr(2, 9),
          type: fieldType,
          label: fieldLabel,
          name: fieldType + "_" + Math.floor(Math.random() * 1000),
          required: false,
          columnWidth: "100%",
        }
        setFields((prev) => [...prev, newField])
      }
    }
    
    // Check if reordering existing fields
    if (active.id.startsWith('form-field-') && over.id.startsWith('form-field-')) {
      const activeIndex = fields.findIndex(field => field.id === active.id.replace('form-field-', ''))
      const overIndex = fields.findIndex(field => field.id === over.id.replace('form-field-', ''))
      
      if (activeIndex !== overIndex) {
        const updatedFields = [...fields]
        const [removed] = updatedFields.splice(activeIndex, 1)
        updatedFields.splice(overIndex, 0, removed)
        setFields(updatedFields)
      }
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="h-screen flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Main layout */}
        <div className="flex flex-1">
          {/* Left Sidebar */}
          <SidebarLeft />

          {/* Canvas */}
          <FormCanvas formData={formData} fields={fields} />

          {/* Right Sidebar */}
          <SidebarRight />
        </div>
      </div>
    </DndContext>
  )
}
