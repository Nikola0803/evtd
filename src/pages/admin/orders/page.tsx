import { useState, useEffect } from "react";
import { posApi, PosOrder } from "@/lib/posApi";

const STATUS_COLORS: Record<string, string> = {
  completed: "bg-green-100 text-green-700",
  processing: "bg-blue-100 text-blue-700",
  "on-hold": "bg-yellow-100 text-yellow-700",
  pending: "bg-background-200 text-foreground-600",
  cancelled: "bg-red-100 text-red-600",
  refunded: "bg-purple-100 text-purple-700",
};

export default function AdminOrders() {
  const [orders, setOrders] = useState<PosOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");

  useEffect(() => {
    setLoading(true);
    posApi.listOrders(page, status)
      .then(setOrders)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [page, status]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="shrink-0 border-b border-background-300 bg-background-50 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-foreground-950">Orders</h1>
          <p className="text-sm text-foreground-400">WooCommerce order history</p>
        </div>
        <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}
          className="rounded-xl border border-background-300 bg-background-50 px-3 py-2 text-xs text-foreground-700 focus:border-primary-400 focus:outline-none">
          <option value="">All statuses</option>
          {["pending","processing","on-hold","completed","cancelled","refunded"].map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="flex-1 overflow-y-auto">
        {error && <div className="m-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>}
        {loading ? (
          <div className="space-y-2 p-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-16 rounded-xl bg-background-200 animate-pulse" />
            ))}
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-background-200 bg-background-100">
                {["Order","Customer","Date","Status","Total"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-widest text-foreground-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-background-100">
              {orders.map((o) => (
                <tr key={o.id} className="bg-background-50 transition-colors hover:bg-background-100/60">
                  <td className="px-5 py-3.5 text-sm font-medium text-foreground-900">#{o.number}</td>
                  <td className="px-5 py-3.5">
                    <p className="text-sm text-foreground-900">{o.billing.first_name} {o.billing.last_name}</p>
                    <p className="text-xs text-foreground-400">{o.billing.email}</p>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-foreground-500">
                    {new Date(o.date_created).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${STATUS_COLORS[o.status] ?? "bg-background-200 text-foreground-600"}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-foreground-900">${o.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="shrink-0 border-t border-background-200 bg-background-50 px-6 py-3 flex items-center justify-between">
        <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
          className="rounded-lg border border-background-300 px-3 py-1.5 text-xs font-medium text-foreground-600 disabled:opacity-40 hover:bg-background-100">
          Previous
        </button>
        <span className="text-xs text-foreground-400">Page {page}</span>
        <button onClick={() => setPage((p) => p + 1)} disabled={orders.length < 20}
          className="rounded-lg border border-background-300 px-3 py-1.5 text-xs font-medium text-foreground-600 disabled:opacity-40 hover:bg-background-100">
          Next
        </button>
      </div>
    </div>
  );
}