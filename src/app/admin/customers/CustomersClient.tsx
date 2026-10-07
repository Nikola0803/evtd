"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface Customer {
  id: number; email: string; first_name: string; last_name: string;
  date_created: string; orders_count: number; total_spent: string;
  billing: { phone: string };
  meta_data: { key: string; value: string }[];
}

const PIPELINE_STAGES = ["lead", "contacted", "consultation", "ordered", "follow-up", "retained"];

const STAGE_COLORS: Record<string, string> = {
  lead: "text-charcoal/50 bg-ivory border-stone",
  contacted: "text-blue-700 bg-blue-50 border-blue-200",
  consultation: "text-amber-700 bg-amber-50 border-amber-200",
  ordered: "text-sage-deep bg-sage-deep/10 border-sage-deep/20",
  "follow-up": "text-purple-700 bg-purple-50 border-purple-200",
  retained: "text-copper bg-copper/10 border-copper/20",
};

function getMeta(meta: { key: string; value: string }[], key: string) {
  return meta?.find((m) => m.key === key)?.value ?? "";
}

function guessStage(c: Customer): string {
  if (c.orders_count > 1) return "retained";
  if (c.orders_count === 1) return "ordered";
  return getMeta(c.meta_data, "_pipeline_stage") || "lead";
}

export function CustomersClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const page = parseInt(searchParams.get("page") ?? "1");
  const search = searchParams.get("search") ?? "";
  const [searchInput, setSearchInput] = useState(search);
  const debounce = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const fetchCustomers = useCallback(async (p: number, q: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(p), search: q });
      const res = await fetch(`/api/admin/customers?${params}`);
      const data = await res.json();
      setCustomers(data.customers ?? []);
      setTotal(data.total ?? 0);
      setTotalPages(data.totalPages ?? 1);
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchCustomers(page, search); }, [page, search, fetchCustomers]);

  function setParam(key: string, value: string) {
    const p = new URLSearchParams(searchParams.toString());
    p.set(key, value);
    if (key !== "page") p.set("page", "1");
    router.push(`/admin/customers?${p}`);
  }

  function onSearchChange(v: string) {
    setSearchInput(v);
    clearTimeout(debounce.current);
    debounce.current = setTimeout(() => setParam("search", v), 400);
  }

  const activeStage = searchParams.get("stage") ?? "";

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="shrink-0 border-b border-stone bg-white px-6 py-4">
        <h1 className="text-lg font-semibold text-charcoal">Customers</h1>
        <p className="text-sm text-charcoal/50">{total} in CRM pipeline</p>
      </div>

      {/* Toolbar */}
      <div className="shrink-0 border-b border-stone bg-ivory-soft px-5 py-3 space-y-2">
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/30 text-sm" />
            <input
              value={searchInput}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search customers..."
              className="w-full rounded-md border border-stone bg-white py-2 pl-8 pr-3 text-sm text-charcoal placeholder:text-charcoal/30 focus:border-copper focus:outline-none transition-colors"
            />
          </div>
        </div>
        {/* Pipeline stage filters */}
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setParam("stage", "")}
            className={`rounded-lg border px-3 py-1 text-[10px] font-semibold uppercase tracking-wider transition-colors ${
              !activeStage ? "border-charcoal bg-charcoal text-ivory" : "border-stone text-charcoal/50 hover:border-charcoal/30 hover:text-charcoal"
            }`}
          >
            All
          </button>
          {PIPELINE_STAGES.map((s) => (
            <button
              key={s}
              onClick={() => setParam("stage", s)}
              className={`rounded-lg border px-3 py-1 text-[10px] font-semibold uppercase tracking-wider transition-colors ${
                activeStage === s
                  ? (STAGE_COLORS[s] ?? "border-charcoal bg-charcoal text-ivory")
                  : "border-stone text-charcoal/50 hover:border-charcoal/30 hover:text-charcoal"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-y-auto bg-white">
        {loading ? (
          <div className="flex h-32 items-center justify-center text-sm text-charcoal/30">Loading...</div>
        ) : customers.length === 0 ? (
          <div className="flex h-32 items-center justify-center text-sm text-charcoal/30">No customers found</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-ivory border-b border-stone">
              <tr>
                <Th>Customer</Th><Th>Phone</Th><Th>Orders</Th>
                <Th>Total Spent</Th><Th>Stage</Th><Th>Joined</Th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => {
                const stage = guessStage(c);
                return (
                  <tr key={c.id} className="border-b border-stone/50 hover:bg-ivory/60 transition-colors last:border-0">
                    <Td>
                      <p className="font-medium text-charcoal">{c.first_name} {c.last_name}</p>
                      <p className="text-xs text-charcoal/40">{c.email}</p>
                    </Td>
                    <Td><span className="text-charcoal/50">{c.billing?.phone || "-"}</span></Td>
                    <Td>
                      <span className={`font-semibold ${c.orders_count > 0 ? "text-charcoal" : "text-charcoal/30"}`}>
                        {c.orders_count}
                      </span>
                    </Td>
                    <Td>
                      <span className={parseFloat(c.total_spent) > 0 ? "text-sage-deep font-semibold" : "text-charcoal/30"}>
                        ${parseFloat(c.total_spent || "0").toLocaleString("en-CA", { minimumFractionDigits: 2 })}
                      </span>
                    </Td>
                    <Td>
                      <span className={`inline-block rounded border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${STAGE_COLORS[stage] ?? "text-charcoal/50 bg-ivory border-stone"}`}>
                        {stage}
                      </span>
                    </Td>
                    <Td>
                      <span className="text-xs text-charcoal/40">
                        {new Date(c.date_created).toLocaleDateString("en-CA")}
                      </span>
                    </Td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="shrink-0 flex items-center justify-between border-t border-stone bg-white px-5 py-3">
          <button disabled={page <= 1} onClick={() => setParam("page", String(page - 1))}
            className="rounded-lg border border-stone px-4 py-1.5 text-xs font-medium text-charcoal/60 disabled:opacity-30 hover:border-charcoal/40 hover:text-charcoal transition-colors">
            Previous
          </button>
          <span className="text-xs text-charcoal/40">Page {page} of {totalPages}</span>
          <button disabled={page >= totalPages} onClick={() => setParam("page", String(page + 1))}
            className="rounded-lg border border-stone px-4 py-1.5 text-xs font-medium text-charcoal/60 disabled:opacity-30 hover:border-charcoal/40 hover:text-charcoal transition-colors">
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
