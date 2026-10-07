"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "ri-dashboard-line" },
  { href: "/admin/orders", label: "Orders", icon: "ri-file-list-3-line" },
  { href: "/admin/customers", label: "Customers", icon: "ri-group-line" },
  { href: "/admin/staff", label: "Staff", icon: "ri-user-settings-line" },
  { href: "/admin/import", label: "Import", icon: "ri-upload-cloud-line" },
  { href: "/admin/settings", label: "Settings", icon: "ri-settings-3-line" },
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
    <aside className="flex h-full w-[210px] shrink-0 flex-col border-r border-stone bg-white">
      {/* Brand */}
      <div className="border-b border-stone px-5 py-4">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-charcoal">evolv</p>
        <p className="mt-0.5 text-[10px] uppercase tracking-widest text-copper">CRM Admin</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-2">
        {NAV.map((item) => {
          const active = path.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-5 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-ivory text-charcoal border-r-2 border-r-copper"
                  : "text-charcoal/50 hover:bg-ivory hover:text-charcoal"
              }`}
            >
              <i className={`${item.icon} text-base`} />
              {item.label}
            </Link>
          );
        })}

        <div className="my-2 border-t border-stone/50" />

        <Link
          href="/pos/new-order"
          className="flex items-center gap-3 px-5 py-2.5 text-sm font-medium text-charcoal/50 transition-colors hover:bg-ivory hover:text-charcoal"
        >
          <i className="ri-shopping-cart-line text-base" />
          POS
        </Link>
      </nav>

      {/* User */}
      <div className="border-t border-stone px-5 py-4">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-copper/15 text-xs font-semibold text-copper">
            {staffName.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-charcoal truncate">{staffName}</p>
            <p className="text-[10px] uppercase tracking-widest text-charcoal/40">{staffRole}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="text-xs text-charcoal/40 transition-colors hover:text-charcoal"
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}
