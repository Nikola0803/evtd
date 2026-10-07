import { redirect } from "next/navigation";
import { getSessionStaff } from "@/lib/pos-auth";
import { AdminSidebar } from "./AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const staff = await getSessionStaff();
  if (!staff) redirect("/pos/login");
  if (staff.role === "setter") redirect("/pos/new-order");

  return (
    <div className="flex h-screen overflow-hidden bg-ivory-soft text-charcoal antialiased">
      <AdminSidebar staffName={staff.name} staffRole={staff.role} />
      <main className="flex flex-1 flex-col overflow-hidden">{children}</main>
    </div>
  );
}
