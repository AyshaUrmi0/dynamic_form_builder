import FormCanvas from "@/component/FormCanvas";
import Navbar from "@/component/Navbar";
import SidebarLeft from "@/component/SidebarLeft";
import SidebarRight from "@/component/SidebarRight";

import formData from "@/data/formSchema.json"

export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main layout */}
      <div className="flex flex-1">
        {/* Left Sidebar */}
        <SidebarLeft />

        {/* Canvas */}
        <FormCanvas  formData={formData} />

        {/* Right Sidebar */}
        <SidebarRight />
      </div>
    </div>
  )
}
