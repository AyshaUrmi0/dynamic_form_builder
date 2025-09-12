import FormCanvas from "@/component/FormCanvas";
import Navbar from "@/component/Navbar";
import SidebarLeft from "@/component/SidebarLeft";
import SidebarRight from "@/component/SidebarRight";


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
        <FormCanvas />

        {/* Right Sidebar */}
        <SidebarRight />
      </div>
    </div>
  )
}
