// import FlowDemo from "../../FlowDemo";

// export default function Home() {
//   return (
//     <div className="w-screen h-screen">
//       <FlowDemo />
//     </div>
//   );
// }

"use client";
import Sidebar from "@/components/SideBar";
import FlowDemo from "../../FlowDemo";

export default function Home() {
  return (
    <div className="flex w-screen h-screen bg-black screen">
      {/* Sidebar على الشمال */}
      <Sidebar />

      {/* محتوى الصفحة */}
      <main className="flex-1 flex flex-col items-center justify-center gap-6 overflow-auto p-4">
        <FlowDemo />
        
      </main>
    </div>
  );
}
