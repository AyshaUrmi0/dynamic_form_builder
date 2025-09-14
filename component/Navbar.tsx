export default function Navbar({ 
  isPreviewMode, 
  onTogglePreview 
}: { 
  isPreviewMode: boolean
  onTogglePreview: () => void
}) {
  return (
    <nav className="h-12 bg-gray-800 text-white flex items-center justify-between px-4">
      <h1 className="font-bold">Dynamic Form Builder</h1>
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
    </nav>
  )
}
