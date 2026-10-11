import { getSessionStaff } from "@/lib/pos-auth";
import { isWooCommerceConfigured, listWooOrders } from "@/lib/woocommerce";

const STATUS_COLORS: Record<string, string> = {
  pending: "text-amber-600 bg-amber-50 border-amber-200",
  processing: "text-blue-600 bg-blue-50 border-blue-200",
  completed: "text-sage-deep bg-sage-deep/10 border-sage-deep/20",
  cancelled: "text-red-600 bg-red-50 border-red-200",
  "on-hold": "text-charcoal/50 bg-ivory border-stone",
  refunded: "text-purple-600 bg-purple-50 border-purple-200",
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
  let stats = { total_orders: 0, recent_orders: [] as any[] };
  let configured = false;

  if (isWooCommerceConfigured()) {
    configured = true;
    const [recent] = await Promise.all([listWooOrders({ page: 1, per_page: 10 })]);
    stats.recent_orders = recent.orders;
    stats.total_orders = recent.total;
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="shrink-0 border-b border-stone bg-white px-6 py-4">
        <h1 className="text-lg font-semibold text-charcoal">Dashboard</h1>
        <p className="text-sm text-charcoal/50">Welcome back, {staff?.name}</p>
      </div>

      <div className="flex-1 p-6 space-y-6">
        {!configured && (
          <div className="rounded-xl border border-copper/30 bg-copper/5 px-4 py-3">
            <p className="text-sm font-semibold text-copper">WooCommerce not configured</p>
            <p className="mt-0.5 text-xs text-charcoal/50">
              Set WORDPRESS_URL, WOOCOMMERCE_CONSUMER_KEY, and WOOCOMMERCE_CONSUMER_SECRET in your environment to enable live data.
            </p>
          </div>
        )}

        {/* Stat tiles */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatTile label="Total Orders" value={String(stats.total_orders)} />
          <StatTile label="WooCommerce" value={configured ? "Connected" : "Not set"} accent={configured} />
          <StatTile label="Section" value="Admin CRM" />
          <StatTile label="Role" value={staff?.role ?? ""} />
        </div>

        {/* Recent orders */}
        <div>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-charcoal/40">Recent Orders</h2>
          {stats.recent_orders.length === 0 ? (
            <div className="rounded-xl border border-stone bg-white px-4 py-10 text-center text-sm text-charcoal/30">
              {configured ? "No orders found" : "Connect WooCommerce to see orders"}
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl border border-stone bg-white">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-stone bg-ivory">
                    <Th>Order</Th><Th>Customer</Th><Th>Total</Th><Th>Status</Th><Th>Setter</Th><Th>Closer</Th>
                  </tr>
                </thead>
                <tbody>
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {stats.recent_orders.map((o: any) => (
                    <tr key={o.id} className="border-b border-stone/50 hover:bg-ivory/60 transition-colors last:border-0">
                      <Td><span className="font-mono text-charcoal/50">#{o.number}</span></Td>
                      <Td>
                        <p className="text-charcoal font-medium">{o.billing.first_name} {o.billing.last_name}</p>
                        <p className="text-xs text-charcoal/40">{o.billing.email}</p>
                      </Td>
                      <Td><span className="font-semibold text-charcoal">{fmt(o.total)}</span></Td>
                      <Td>
                        <span className={`inline-block rounded border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${STATUS_COLORS[o.status] ?? "text-charcoal/50 bg-ivory border-stone"}`}>
                          {o.status}
                        </span>
                      </Td>
                      <Td><span className="text-charcoal/50">{getPosMeta(o.meta_data, "_pos_setter") || "-"}</span></Td>
                      <Td><span className="text-charcoal/50">{getPosMeta(o.meta_data, "_pos_closer") || "-"}</span></Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <QuickLink href="/admin/orders" icon="ri-file-list-3-line" label="View all orders" />
          <QuickLink href="/admin/customers" icon="ri-group-line" label="Customer pipeline" />
          <QuickLink href="/pos/new-order" icon="ri-shopping-cart-line" label="New POS order" />
        </div>
      </div>
    </div>
  );
}

function StatTile({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-xl border border-stone bg-white px-5 py-4">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-charcoal/40">{label}</p>
      <p className={`mt-1.5 text-2xl font-semibold ${accent ? "text-sage-deep" : "text-charcoal"}`}>{value}</p>
    </div>
  );
}

function QuickLink({ href, icon, label }: { href: string; icon: string; label: string }) {
  return (
    <a href={href} className="flex items-center gap-3 rounded-xl border border-stone bg-white px-4 py-3.5 text-sm font-medium text-charcoal transition-colors hover:bg-ivory">
      <i className={`${icon} text-base text-copper`} />
      {label}
    </a>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-widest text-charcoal/40">{children}</th>;
}
function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-4 py-3">{children}</td>;
}
