import { useState, useEffect } from "react";
import { posApi, PosStats } from "@/lib/posApi";
import { Link } from "react-router-dom";

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-background-300 bg-background-50 p-5">
      <p className="text-xs font-medium uppercase tracking-widest text-foreground-400">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-foreground-950">{value}</p>
    </div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<PosStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => { posApi.getStats().then(setStats).catch((e) => setError(e.message)).finally(() => setLoading(false)); }, []);
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="shrink-0 border-b border-background-300 bg-background-50 px-6 py-4">
        <h1 className="text-lg font-semibold text-foreground-950">Dashboard</h1>
        <p className="text-sm text-foreground-400">Overview of today's activity</p>
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {error && <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>}
        {loading ? <div className="grid grid-cols-2 gap-4">{Array.from({length:4}).map((_,i)=><div key={i} className="h-28 rounded-2xl border border-background-300 bg-background-50 animate-pulse" />)}</div>
        : stats ? (
          <>
            <div><h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-foreground-400">Today</h2><div className="grid grid-cols-2 gap-4"><StatCard label="Orders" value={String(stats.orders_today)} /><StatCard label="Revenue" value={`$${stats.revenue_today}`} /></div></div>
            <div><h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-foreground-400">This Week</h2><div className="grid grid-cols-2 gap-4"><StatCard label="Orders" value={String(stats.orders_week)} /><StatCard label="Revenue" value={`$${stats.revenue_week}`} /></div></div>
            <div><h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-foreground-400">Totals</h2><div className="grid grid-cols-2 gap-4"><StatCard label="Customers" value={String(stats.total_customers)} /><StatCard label="Products" value={String(stats.total_products)} /></div></div>
          </>
        ) : null}
        <div className="grid grid-cols-2 gap-4">
          <Link to="/pos/new-order" className="flex flex-col items-start rounded-2xl border border-background-300 bg-background-50 p-5 transition-colors hover:border-primary-300 hover:bg-primary-50/30">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-primary-100"><svg className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" /></svg></div>
            <p className="text-sm font-semibold text-foreground-900">New Order</p><p className="mt-0.5 text-xs text-foreground-400">Open POS terminal</p>
          </Link>
          <Link to="/admin/orders" className="flex flex-col items-start rounded-2xl border border-background-300 bg-background-50 p-5 transition-colors hover:border-primary-300 hover:bg-primary-50/30">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-secondary-100"><svg className="h-5 w-5 text-secondary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg></div>
            <p className="text-sm font-semibold text-foreground-900">View Orders</p><p className="mt-0.5 text-xs text-foreground-400">All WooCommerce orders</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
