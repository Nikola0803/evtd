import { Outlet, Navigate, NavLink, useNavigate } from "react-router-dom";
import { getSession, clearSession, isAdmin } from "@/lib/posAuth";

const NAV = [
  { to: "/admin/dashboard", label: "Dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { to: "/admin/orders", label: "Orders", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
  { to: "/admin/customers", label: "Customers", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
  { to: "/admin/settings", label: "Settings", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
];

export default function AdminLayout() {
  const session = getSession();
  const navigate = useNavigate();
  if (!session) return <Navigate to="/pos/login" replace />;
  if (!isAdmin(session)) return <Navigate to="/pos/new-order" replace />;
  function logout() { clearSession(); navigate("/pos/login"); }
  return (
    <div className="flex h-screen overflow-hidden bg-background-100 font-body">
      <aside className="flex w-56 shrink-0 flex-col border-r border-background-300 bg-background-50">
        <div className="border-b border-background-300 px-5 py-4">
          <p className="font-heading text-sm font-semibold text-foreground-950">evolv</p>
          <p className="mt-0.5 text-[10px] uppercase tracking-widest text-primary-500">CRM Admin</p>
        </div>
        <nav className="flex-1 overflow-y-auto py-2">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to}
              className={({ isActive }) => `flex items-center gap-3 px-5 py-2.5 text-sm font-medium transition-colors ${ isActive ? "border-r-2 border-r-primary-500 bg-primary-50/60 text-foreground-950" : "text-foreground-500 hover:bg-background-100 hover:text-foreground-900" }`}>
              <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d={item.icon} /></svg>
              {item.label}
            </NavLink>
          ))}
          <div className="my-2 border-t border-background-200" />
          <NavLink to="/pos/new-order" className="flex items-center gap-3 px-5 py-2.5 text-sm font-medium text-foreground-500 transition-colors hover:bg-background-100 hover:text-foreground-900">
            <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            POS
          </NavLink>
        </nav>
        <div className="border-t border-background-200 px-5 py-4">
          <div className="mb-2 flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-xs font-semibold text-primary-700">{session.name.charAt(0).toUpperCase()}</div>
            <div className="min-w-0"><p className="truncate text-sm font-medium text-foreground-900">{session.name}</p><p className="text-[10px] uppercase tracking-widest text-foreground-400">{session.role}</p></div>
          </div>
          <button onClick={logout} className="text-xs text-foreground-400 transition-colors hover:text-foreground-900">Sign out</button>
        </div>
      </aside>
      <main className="flex flex-1 flex-col overflow-hidden"><Outlet /></main>
    </div>
  );
}
