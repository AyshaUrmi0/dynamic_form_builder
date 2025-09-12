"use client"

import { useDrag } from "react-dnd"

const fieldTypes = [
  { type: "text", label: "Text" },
  { type: "email", label: "Email" },
  { type: "date", label: "Date" },
  { type: "time", label: "Time" },
  { type: "select", label: "Select" },
  { type: "checkbox", label: "Checkbox" },
  { type: "radio", label: "Radio" },
  { type: "file", label: "File" },
  { type: "acceptance", label: "Acceptance" },
]

export default function SidebarLeft() {
  return (
    <aside className="w-48 border-r p-4">
      <h2 className="font-semibold mb-2">Fields</h2>
      <div className="space-y-2">
        {fieldTypes.map((field) => (
          <DraggableField key={field.type} field={field} />
        ))}
      </div>
    </aside>
  )
}

function DraggableField({ field }: { field: { type: string; label: string } }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "FIELD",           // This type is used in FormCanvas drop zone
    item: { ...field },      // Send type and label
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  return (
    <div
      ref={drag}
      className={`p-2 border rounded cursor-move bg-white ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      {field.label}
    </div>
  )
}
