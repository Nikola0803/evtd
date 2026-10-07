import { useState, useEffect, useRef } from "react";
import { posApi, PosCustomer } from "@/lib/posApi";

export default function AdminCustomers() {
  const [customers, setCustomers] = useState<PosCustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => { setSearch(searchInput); setPage(1); }, 350);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [searchInput]);

  useEffect(() => {
    setLoading(true);
    posApi.listCustomers(page, search)
      .then(setCustomers)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [page, search]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="shrink-0 border-b border-background-300 bg-background-50 px-6 py-4 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold text-foreground-950">Customers</h1>
          <p className="text-sm text-foreground-400">WooCommerce customer list</p>
        </div>
        <div className="relative w-56">
          <svg className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-foreground-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search customers..."
            className="w-full rounded-xl border border-background-300 bg-background-50 py-2 pl-8 pr-3 text-xs text-foreground-950 placeholder:text-foreground-300 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100" />
        </div>
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
                {["Customer","Email","Joined","Orders","Spent"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-widest text-foreground-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-background-100">
              {customers.map((c) => (
                <tr key={c.id} className="bg-background-50 transition-colors hover:bg-background-100/60">
                  <td className="px-5 py-3.5 text-sm font-medium text-foreground-900">
                    {c.first_name} {c.last_name}
                  </td>
                  <td className="px-5 py-3.5 text-sm text-foreground-500">{c.email}</td>
                  <td className="px-5 py-3.5 text-xs text-foreground-400">
                    {new Date(c.date_created).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3.5 text-sm text-foreground-700">{c.orders_count}</td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-foreground-900">${c.total_spent}</td>
                </tr>
              ))}
              {customers.length === 0 && (
                <tr><td colSpan={5} className="px-5 py-10 text-center text-sm text-foreground-300">No customers found</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <div className="shrink-0 border-t border-background-200 bg-background-50 px-6 py-3 flex items-center justify-between">
        <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
          className="rounded-lg border border-background-300 px-3 py-1.5 text-xs font-medium text-foreground-600 disabled:opacity-40 hover:bg-background-100">Previous</button>
        <span className="text-xs text-foreground-400">Page {page}</span>
        <button onClick={() => setPage((p) => p + 1)} disabled={customers.length < 20}
          className="rounded-lg border border-background-300 px-3 py-1.5 text-xs font-medium text-foreground-600 disabled:opacity-40 hover:bg-background-100">Next</button>
      </div>
    </div>
  );
}