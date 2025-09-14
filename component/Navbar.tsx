export default function Navbar({ 
  isPreviewMode, 
  onTogglePreview,
  onExportSchema,
  onImportSchema,
  onResetSchema
}: { 
  isPreviewMode: boolean
  onTogglePreview: () => void
  onExportSchema: () => void
  onImportSchema: (file: File) => void
  onResetSchema: () => void
}) {
  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onImportSchema(file)
    }
  }

  return (
    <nav className="h-12 bg-gray-800 text-white flex items-center justify-between px-4">
      <h1 className="font-bold">Dynamic Form Builder</h1>
      
      <div className="flex items-center space-x-2">
        {/* Export Button */}
        <button 
          onClick={onExportSchema}
          className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-sm transition-colors"
          title="Export Schema"
        >
          📤 Export
        </button>
        
        {/* Import Button */}
        <label className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-sm transition-colors cursor-pointer">
          📥 Import
          <input
            type="file"
            accept=".json"
            onChange={handleFileImport}
            className="hidden"
          />
        </label>
        
        {/* Reset Button */}
        <button 
          onClick={onResetSchema}
          className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm transition-colors"
          title="Reset to Original Schema"
        >
          🔄 Reset
        </button>
        
        {/* Preview Toggle */}
        <button 
          onClick={onTogglePreview}
          className={`px-4 py-2 rounded font-medium transition-colors ${
            isPreviewMode 
              ? 'bg-green-600 hover:bg-green-700' 
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isPreviewMode ? 'Edit Mode' : 'Preview Mode'}
        </button>
      </div>
    </nav>
  )
}
