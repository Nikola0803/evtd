"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "ri-dashboard-line" },
  { href: "/admin/orders", label: "Orders", icon: "ri-file-list-3-line" },
  { href: "/admin/customers", label: "Customers", icon: "ri-group-line" },
  { href: "/admin/staff", label: "Staff", icon: "ri-user-settings-line" },
  { href: "/admin/import", label: "Import", icon: "ri-upload-cloud-line" },
];

export function AdminSidebar({ staffName, staffRole }: { staffName: string; staffRole: string }) {
  const path = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/pos/auth", { method: "DELETE" });
    router.push("/pos/login");
    router.refresh();
  }

  return (
    <aside className="flex h-full w-[200px] shrink-0 flex-col border-r border-zinc-800 bg-zinc-950">
      {/* Brand */}
      <div className="border-b border-zinc-800 px-5 py-4">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white">evolv</p>
        <p className="mt-0.5 text-[10px] uppercase tracking-widest text-zinc-600">Admin</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3">
        {NAV.map((item) => {
          const active = path.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-5 py-2.5 text-sm transition-colors ${
                active
                  ? "bg-zinc-900 text-white"
                  : "text-zinc-500 hover:bg-zinc-900 hover:text-white"
              }`}
            >
              <i className={`${item.icon} text-base`} />
              {item.label}
            </Link>
          );
        })}

        <div className="my-2 border-t border-zinc-900" />

        <Link
          href="/pos/new-order"
          className="flex items-center gap-3 px-5 py-2.5 text-sm text-zinc-500 transition-colors hover:bg-zinc-900 hover:text-white"
        >
          <i className="ri-shopping-cart-line text-base" />
          POS
        </Link>
      </nav>

      {/* User */}
      <div className="border-t border-zinc-800 px-5 py-4">
        <p className="text-sm font-medium text-white truncate">{staffName}</p>
        <p className="text-[10px] uppercase tracking-widest text-zinc-600">{staffRole}</p>
        <button
          onClick={handleLogout}
          className="mt-2 text-xs text-zinc-600 transition-colors hover:text-white"
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}
