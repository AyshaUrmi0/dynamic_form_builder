export interface Field {
  id: string
  type: string
  label?: string
  name?: string
  placeholder?: string
  required?: boolean
  options?: string[]
  content?: string
  columnWidth?: string
}

export interface FormCanvasProps {
  formData: any
  fields: Field[]
  onEditField: (field: Field) => void
  onDeleteField: (fieldId: string) => void
  onDuplicateField: (field: Field) => void
}

export interface FieldRendererProps {
  field: Field
}

export interface FieldActionsProps {
  field: Field
  onEdit: (field: Field) => void
  onDelete: (fieldId: string) => void
  onDuplicate: (field: Field) => void
}

export interface DraggableFormFieldProps {
  field: Field
  onEdit: (field: Field) => void
  onDelete: (fieldId: string) => void
  onDuplicate: (field: Field) => void
}
