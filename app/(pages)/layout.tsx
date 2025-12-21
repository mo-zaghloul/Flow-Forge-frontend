import Sidebar from "@/components/SideBar";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full h-screen">
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
