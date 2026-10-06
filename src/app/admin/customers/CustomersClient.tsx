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
  lead: "text-zinc-400 bg-zinc-800",
  contacted: "text-blue-400 bg-blue-950/40",
  consultation: "text-amber-400 bg-amber-950/40",
  ordered: "text-green-400 bg-green-950/40",
  "follow-up": "text-purple-400 bg-purple-950/40",
  retained: "text-emerald-400 bg-emerald-950/40",
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

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Toolbar */}
      <div className="shrink-0 flex items-center gap-3 border-b border-zinc-800 bg-zinc-950 px-5 py-3">
        <div className="relative flex-1 max-w-xs">
          <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 text-sm" />
          <input
            value={searchInput}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search customers..."
            className="w-full rounded-md border border-zinc-800 bg-zinc-900 py-2 pl-8 pr-3 text-sm text-white placeholder:text-zinc-600 focus:border-zinc-600 focus:outline-none"
          />
        </div>
        {/* Pipeline filter */}
        <div className="flex gap-1">
          {PIPELINE_STAGES.map((s) => (
            <button
              key={s}
              onClick={() => setParam("stage", s)}
              className={`rounded-sm px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider transition-colors ${
                searchParams.get("stage") === s
                  ? (STAGE_COLORS[s] ?? "text-white bg-zinc-700")
                  : "text-zinc-600 hover:text-zinc-400"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <span className="text-xs text-zinc-600 ml-auto">{total} customers</span>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex h-32 items-center justify-center text-sm text-zinc-600">Loading...</div>
        ) : customers.length === 0 ? (
          <div className="flex h-32 items-center justify-center text-sm text-zinc-600">No customers found</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-zinc-950 border-b border-zinc-800">
              <tr>
                <Th>Customer</Th><Th>Phone</Th><Th>Orders</Th>
                <Th>Total Spent</Th><Th>Stage</Th><Th>Joined</Th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => {
                const stage = guessStage(c);
                return (
                  <tr key={c.id} className="border-b border-zinc-900 hover:bg-zinc-900/50 transition-colors">
                    <Td>
                      <p className="text-white">{c.first_name} {c.last_name}</p>
                      <p className="text-xs text-zinc-600">{c.email}</p>
                    </Td>
                    <Td><span className="text-zinc-500">{c.billing?.phone || "-"}</span></Td>
                    <Td>
                      <span className={`font-semibold ${c.orders_count > 0 ? "text-white" : "text-zinc-600"}`}>
                        {c.orders_count}
                      </span>
                    </Td>
                    <Td>
                      <span className={parseFloat(c.total_spent) > 0 ? "text-green-400 font-semibold" : "text-zinc-600"}>
                        ${parseFloat(c.total_spent || "0").toLocaleString("en-CA", { minimumFractionDigits: 2 })}
                      </span>
                    </Td>
                    <Td>
                      <span className={`rounded-sm px-2 py-0.5 text-[10px] font-semibold uppercase ${STAGE_COLORS[stage] ?? "text-zinc-400 bg-zinc-800"}`}>
                        {stage}
                      </span>
                    </Td>
                    <Td>
                      <span className="text-xs text-zinc-600">
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
        <div className="shrink-0 flex items-center justify-between border-t border-zinc-800 px-5 py-3">
          <button disabled={page <= 1} onClick={() => setParam("page", String(page - 1))}
            className="rounded-md border border-zinc-800 px-3 py-1.5 text-xs text-zinc-400 disabled:opacity-30 hover:border-zinc-600 hover:text-white transition-colors">
            Previous
          </button>
          <span className="text-xs text-zinc-600">Page {page} of {totalPages}</span>
          <button disabled={page >= totalPages} onClick={() => setParam("page", String(page + 1))}
            className="rounded-md border border-zinc-800 px-3 py-1.5 text-xs text-zinc-400 disabled:opacity-30 hover:border-zinc-600 hover:text-white transition-colors">
            Next
          </button>
        </div>
      )}
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-widest text-zinc-600">{children}</th>;
}
function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-4 py-2.5">{children}</td>;
}
