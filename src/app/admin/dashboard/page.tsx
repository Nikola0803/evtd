import { getSessionStaff } from "@/lib/pos-auth";
import { isWooCommerceConfigured, listWooOrders } from "@/lib/woocommerce";

const STATUS_COLORS: Record<string, string> = {
  pending: "text-amber-400",
  processing: "text-blue-400",
  completed: "text-green-400",
  cancelled: "text-red-400",
  "on-hold": "text-zinc-400",
  refunded: "text-purple-400",
};

function fmt(amount: string) {
  return "$" + parseFloat(amount || "0").toLocaleString("en-CA", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function getPosMeta(meta: { key: string; value: string }[], key: string) {
  return meta?.find((m) => m.key === key)?.value ?? "";
}

export default async function DashboardPage() {
  const staff = await getSessionStaff();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let stats = { total_orders: 0, total_revenue: "0", recent_orders: [] as any[] };
  let configured = false;

  if (isWooCommerceConfigured()) {
    configured = true;
    const [recent] = await Promise.all([
      listWooOrders({ page: 1, per_page: 10 }),
    ]);
    stats.recent_orders = recent.orders;
    stats.total_orders = recent.total;
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="shrink-0 border-b border-zinc-800 px-6 py-4">
        <h1 className="text-lg font-semibold text-white">Dashboard</h1>
        <p className="text-sm text-zinc-500">Welcome back, {staff?.name}</p>
      </div>

      <div className="flex-1 p-6 space-y-6">
        {/* No WooCommerce banner */}
        {!configured && (
          <div className="rounded-lg border border-amber-900/50 bg-amber-950/30 px-4 py-3">
            <p className="text-sm font-medium text-amber-400">WooCommerce not configured</p>
            <p className="mt-0.5 text-xs text-zinc-500">
              Set WORDPRESS_URL, WOOCOMMERCE_CONSUMER_KEY, and WOOCOMMERCE_CONSUMER_SECRET in your environment to enable live data.
            </p>
          </div>
        )}

        {/* Stat tiles */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatTile label="Total Orders" value={String(stats.total_orders)} />
          <StatTile label="WooCommerce" value={configured ? "Connected" : "Not set"} accent={configured} />
          <StatTile label="Section" value="Admin CRM" />
          <StatTile label="Staff" value={staff?.role ?? ""} />
        </div>

        {/* Recent orders table */}
        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-zinc-500">Recent Orders</h2>
          {stats.recent_orders.length === 0 ? (
            <div className="rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-8 text-center text-sm text-zinc-600">
              {configured ? "No orders found" : "Connect WooCommerce to see orders"}
            </div>
          ) : (
            <div className="overflow-hidden rounded-lg border border-zinc-800">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-900">
                    <Th>Order</Th><Th>Customer</Th><Th>Total</Th><Th>Status</Th><Th>Setter</Th><Th>Closer</Th>
                  </tr>
                </thead>
                <tbody>
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {stats.recent_orders.map((o: any) => (
                    <tr key={o.id} className="border-b border-zinc-900 hover:bg-zinc-900/50 transition-colors">
                      <Td><span className="font-mono text-zinc-400">#{o.number}</span></Td>
                      <Td>
                        <p className="text-white">{o.billing.first_name} {o.billing.last_name}</p>
                        <p className="text-xs text-zinc-600">{o.billing.email}</p>
                      </Td>
                      <Td><span className="font-semibold text-white">{fmt(o.total)}</span></Td>
                      <Td>
                        <span className={`text-xs font-medium ${STATUS_COLORS[o.status] ?? "text-zinc-400"}`}>
                          {o.status}
                        </span>
                      </Td>
                      <Td><span className="text-zinc-400">{getPosMeta(o.meta_data, "_pos_setter") || "-"}</span></Td>
                      <Td><span className="text-zinc-400">{getPosMeta(o.meta_data, "_pos_closer") || "-"}</span></Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatTile({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-4">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-600">{label}</p>
      <p className={`mt-1.5 text-xl font-bold ${accent ? "text-green-400" : "text-white"}`}>{value}</p>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-widest text-zinc-600">{children}</th>;
}
function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-4 py-2.5">{children}</td>;
}
