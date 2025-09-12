export default function SidebarLeft() {
  return (
    <aside className="w-48 border-r p-4 ">
      <h2 className="font-semibold mb-2 ">Fields</h2>
      <div className="space-y-2 ">
        <div className="p-2 border rounded ">Text</div>
        <div className="p-2 border rounded ">Email</div>
        <div className="p-2 border rounded ">Date</div>
        <div className="p-2 border rounded ">Time</div>
        <div className="p-2 border rounded ">Select</div>
        <div className="p-2 border rounded ">Checkbox</div>
        <div className="p-2 border rounded ">Radio</div>
        <div className="p-2 border rounded ">File</div>
        <div className="p-2 border rounded ">Acceptance</div>
      </div>
    </aside>
  )
}
