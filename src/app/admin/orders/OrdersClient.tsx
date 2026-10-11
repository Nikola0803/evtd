"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface OrderLine { id: number; name: string; quantity: number; total: string }
interface Order {
  id: number; number: string; status: string; date_created: string;
  total: string; currency: string;
  billing: { first_name: string; last_name: string; email: string; phone: string };
  line_items: OrderLine[];
  meta_data: { key: string; value: string }[];
  payment_url: string;
}

const STATUS_OPTS = ["any", "pending", "processing", "on-hold", "completed", "cancelled", "refunded"];

const STATUS_COLORS: Record<string, string> = {
  pending: "text-amber-700 bg-amber-50 border-amber-200",
  processing: "text-blue-700 bg-blue-50 border-blue-200",
  completed: "text-sage-deep bg-sage-deep/10 border-sage-deep/20",
  cancelled: "text-red-600 bg-red-50 border-red-200",
  "on-hold": "text-charcoal/50 bg-ivory border-stone",
  refunded: "text-purple-600 bg-purple-50 border-purple-200",
};

function getMeta(meta: { key: string; value: string }[], key: string) {
  return meta?.find((m) => m.key === key)?.value ?? "";
}

function fmt(amount: string) {
  return "$" + parseFloat(amount || "0").toLocaleString("en-CA", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function OrdersClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [orders, setOrders] = useState<Order[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState<number | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);

  const page = parseInt(searchParams.get("page") ?? "1");
  const status = searchParams.get("status") ?? "any";
  const search = searchParams.get("search") ?? "";

  const [searchInput, setSearchInput] = useState(search);
  const debounce = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const fetchOrders = useCallback(async (p: number, st: string, q: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(p), status: st, search: q });
      const res = await fetch(`/api/admin/orders?${params}`);
      const data = await res.json();
      setOrders(data.orders ?? []);
      setTotal(data.total ?? 0);
      setTotalPages(data.totalPages ?? 1);
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchOrders(page, status, search); }, [page, status, search, fetchOrders]);

  function setParam(key: string, value: string) {
    const p = new URLSearchParams(searchParams.toString());
    p.set(key, value);
    if (key !== "page") p.set("page", "1");
    router.push(`/admin/orders?${p}`);
  }

  function onSearchChange(v: string) {
    setSearchInput(v);
    clearTimeout(debounce.current);
    debounce.current = setTimeout(() => setParam("search", v), 400);
  }

  function copyLink(url: string, id: number) {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    });
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="shrink-0 border-b border-stone bg-white px-6 py-4">
        <h1 className="text-lg font-semibold text-charcoal">Orders</h1>
        <p className="text-sm text-charcoal/50">{total} total orders</p>
      </div>

      {/* Toolbar */}
      <div className="shrink-0 flex items-center gap-3 border-b border-stone bg-ivory-soft px-5 py-3">
        <div className="relative flex-1 max-w-xs">
          <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/30 text-sm" />
          <input
            value={searchInput}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search orders..."
            className="w-full rounded-md border border-stone bg-white py-2 pl-8 pr-3 text-sm text-charcoal placeholder:text-charcoal/30 focus:border-copper focus:outline-none transition-colors"
          />
        </div>
        <select
          value={status}
          onChange={(e) => setParam("status", e.target.value)}
          className="rounded-md border border-stone bg-white px-3 py-2 text-sm text-charcoal focus:border-copper focus:outline-none"
        >
          {STATUS_OPTS.map((s) => <option key={s} value={s}>{s === "any" ? "All statuses" : s}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-y-auto bg-white">
        {loading ? (
          <div className="flex h-32 items-center justify-center text-sm text-charcoal/30">Loading...</div>
        ) : orders.length === 0 ? (
          <div className="flex h-32 items-center justify-center text-sm text-charcoal/30">No orders found</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-ivory border-b border-stone">
              <tr>
                <Th>Order</Th><Th>Date</Th><Th>Customer</Th><Th>Items</Th>
                <Th>Total</Th><Th>Status</Th><Th>Setter</Th><Th>Closer</Th><Th>Link</Th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <>
                  <tr
                    key={o.id}
                    onClick={() => setExpanded(expanded === o.id ? null : o.id)}
                    className="border-b border-stone/50 hover:bg-ivory/60 cursor-pointer transition-colors"
                  >
                    <Td><span className="font-mono text-charcoal/50">#{o.number}</span></Td>
                    <Td><span className="text-charcoal/40 text-xs">{new Date(o.date_created).toLocaleDateString("en-CA")}</span></Td>
                    <Td>
                      <p className="text-charcoal font-medium">{o.billing.first_name} {o.billing.last_name}</p>
                      <p className="text-xs text-charcoal/40">{o.billing.email}</p>
                    </Td>
                    <Td><span className="text-charcoal/50">{o.line_items?.length ?? 0} item{o.line_items?.length !== 1 ? "s" : ""}</span></Td>
                    <Td><span className="font-semibold text-charcoal">{fmt(o.total)}</span></Td>
                    <Td>
                      <span className={`inline-block rounded border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${STATUS_COLORS[o.status] ?? "text-charcoal/50 bg-ivory border-stone"}`}>
                        {o.status}
                      </span>
                    </Td>
                    <Td><span className="text-charcoal/50">{getMeta(o.meta_data, "_pos_setter") || "-"}</span></Td>
                    <Td><span className="text-charcoal/50">{getMeta(o.meta_data, "_pos_closer") || "-"}</span></Td>
                    <Td>
                      {o.payment_url && o.status === "pending" ? (
                        <button
                          onClick={(e) => { e.stopPropagation(); copyLink(o.payment_url, o.id); }}
                          className="rounded border border-stone px-2 py-1 text-[10px] font-semibold text-charcoal/60 hover:border-copper hover:text-copper transition-colors"
                        >
                          {copied === o.id ? "Copied!" : "Copy link"}
                        </button>
                      ) : <span className="text-charcoal/20">-</span>}
                    </Td>
                  </tr>
                  {expanded === o.id && (
                    <tr key={`${o.id}-exp`} className="bg-ivory border-b border-stone/50">
                      <td colSpan={9} className="px-6 py-4">
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-charcoal/40">Line Items</p>
                            {o.line_items?.map((li) => (
                              <p key={li.id} className="text-sm text-charcoal/70">
                                {li.quantity}x {li.name} <span className="text-charcoal/40">{fmt(li.total)}</span>
                              </p>
                            ))}
                          </div>
                          <div>
                            <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-charcoal/40">Billing</p>
                            <p className="text-sm text-charcoal/70">{o.billing.first_name} {o.billing.last_name}</p>
                            <p className="text-sm text-charcoal/70">{o.billing.email}</p>
                            <p className="text-sm text-charcoal/70">{o.billing.phone}</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="shrink-0 flex items-center justify-between border-t border-stone bg-white px-5 py-3">
          <button
            disabled={page <= 1}
            onClick={() => setParam("page", String(page - 1))}
            className="rounded-lg border border-stone px-4 py-1.5 text-xs font-medium text-charcoal/60 disabled:opacity-30 hover:border-charcoal/40 hover:text-charcoal transition-colors"
          >
            Previous
          </button>
          <span className="text-xs text-charcoal/40">Page {page} of {totalPages}</span>
          <button
            disabled={page >= totalPages}
            onClick={() => setParam("page", String(page + 1))}
            className="rounded-lg border border-stone px-4 py-1.5 text-xs font-medium text-charcoal/60 disabled:opacity-30 hover:border-charcoal/40 hover:text-charcoal transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-widest text-charcoal/40">{children}</th>;
}
function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-4 py-3">{children}</td>;
}
