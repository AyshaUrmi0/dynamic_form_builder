# FormCanvas Components

This folder contains all components related to the Form Canvas functionality in the dynamic form builder.

## Structure

```
FormCanvas/
├── FormCanvas.tsx          # Main canvas component with drop zone
├── DraggableFormField.tsx  # Individual draggable field wrapper
├── FieldRenderer.tsx       # Renders different field types (text, select, etc.)
├── FieldActions.tsx        # Action buttons (edit, duplicate, delete)
├── EmptyState.tsx         # Empty state when no fields exist
├── types.ts               # Shared TypeScript interfaces
├── index.ts               # Clean exports for easy importing
└── README.md              # This file
```

## Components

### FormCanvas.tsx
- **Purpose**: Main canvas component that handles the drop zone
- **Features**: 
  - Drop zone functionality using `@dnd-kit/core`
  - Renders list of fields or empty state
  - Handles field management callbacks

### DraggableFormField.tsx
- **Purpose**: Wrapper for individual form fields with drag functionality
- **Features**:
  - Sortable functionality using `@dnd-kit/sortable`
  - Combines FieldRenderer and FieldActions
  - Handles drag styling and transitions

### FieldRenderer.tsx
- **Purpose**: Renders different field types based on field.type
- **Supported Types**:
  - `text`, `email` - Text inputs
  - `date`, `time` - Date/time inputs
  - `select` - Dropdown select
  - `checkbox` - Multiple checkboxes
  - `radio` - Radio button group
  - `file` - File upload
  - `acceptance` - HTML content display

### FieldActions.tsx
- **Purpose**: Action buttons that appear on hover
- **Actions**:
  - ⚙️ Settings (Edit field)
  - 📋 Duplicate field
  - 🗑️ Delete field

### EmptyState.tsx
- **Purpose**: Displays when no fields are present
- **Content**: Encouraging message with emoji to drag fields from sidebar

## Usage

### Import the main component:
```tsx
import { FormCanvas } from './component/FormCanvas'
```

### Import individual components if needed:
```tsx
import { FieldRenderer, FieldActions } from './component/FormCanvas'
```

### Import types:
```tsx
import { Field, FormCanvasProps } from './component/FormCanvas'
```

## Types

All shared interfaces are defined in `types.ts`:
- `Field` - Field data structure
- `FormCanvasProps` - Main component props
- `FieldRendererProps` - Field renderer props
- `FieldActionsProps` - Action buttons props
- `DraggableFormFieldProps` - Draggable field props

## Benefits

1. **Modularity**: Each component has a single responsibility
2. **Reusability**: Components can be used independently
3. **Maintainability**: Easy to find and modify specific functionality
4. **Type Safety**: Shared types ensure consistency
5. **Clean Imports**: Index file provides organized exports
