"use client"

import { useDraggable } from "@dnd-kit/core";

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
    <aside className="w-48 border-r border-gray-300 p-4 bg-gray-50">
      <h2 className="font-semibold mb-4 text-gray-800 text-lg">Form Fields</h2>
      <div className="space-y-3">
        {fieldTypes.map((field) => (
          <DraggableField key={field.type} field={field} />
        ))}
      </div>
    </aside>
  )
}

function DraggableField({ field }: { field: { type: string; label: string } }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: `field-${field.type}`,
    data: {
      type: field.type,
      label: field.label,
    },
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`p-3 border-2 border-gray-300 rounded-lg cursor-move bg-white text-gray-800 font-medium hover:border-blue-400 hover:bg-blue-50 transition-colors ${
        isDragging ? "opacity-50 border-blue-500 bg-blue-100" : ""
      }`}
    >
      {field.label}
    </div>
  );
}
