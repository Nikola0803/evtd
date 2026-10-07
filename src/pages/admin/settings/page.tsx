import { useState, useEffect } from "react";
import { posApi } from "@/lib/posApi";

function Dot({ ok, loading }: { ok: boolean; loading?: boolean }) {
  if (loading) return <span className="inline-block h-2 w-2 rounded-full bg-background-300 animate-pulse" />;
  return <span className={`inline-block h-2 w-2 rounded-full ${ok ? "bg-green-500" : "bg-red-400"}`} />;
}

export default function AdminSettings() {
  const [health, setHealth] = useState<{ woocommerce: boolean; version: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  function refresh() {
    setLoading(true);
    setError("");
    posApi.health()
      .then(setHealth)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }

  useEffect(() => { refresh(); }, []);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="shrink-0 border-b border-background-300 bg-background-50 px-6 py-4">
        <h1 className="text-lg font-semibold text-foreground-950">Settings</h1>
        <p className="text-sm text-foreground-400">Integration health and configuration</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <section>
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Dot ok={health?.woocommerce ?? false} loading={loading} />
              <h2 className="text-xs font-semibold uppercase tracking-widest text-foreground-400">WooCommerce</h2>
            </div>
            <button onClick={refresh} className="rounded-lg border border-background-300 bg-background-50 px-3 py-1.5 text-xs font-medium text-foreground-500 hover:bg-background-100 transition-colors">
              Recheck
            </button>
          </div>

          {error && <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 mb-3">{error}</div>}

          <div className="rounded-2xl border border-background-300 bg-background-50 divide-y divide-background-100">
            <div className="flex items-center justify-between px-5 py-3.5">
              <p className="text-sm text-foreground-700">WooCommerce REST API</p>
              <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${health?.woocommerce ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                {loading ? "Checking..." : health?.woocommerce ? "Connected" : "Disconnected"}
              </span>
            </div>
            {health?.version && (
              <div className="flex items-center justify-between px-5 py-3.5">
                <p className="text-sm text-foreground-700">WooCommerce Version</p>
                <p className="text-xs text-foreground-500">{health.version}</p>
              </div>
            )}
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-foreground-400">Plugin Config Reference</h2>
          <div className="rounded-2xl border border-background-300 bg-background-50 p-5 space-y-4 text-xs font-mono">
            <div>
              <p className="mb-1.5 font-sans text-[10px] font-semibold uppercase tracking-widest text-foreground-400">Staff PINs (wp-admin &gt; Settings &gt; evolv POS)</p>
              <code className="block rounded-xl bg-background-100 px-3 py-2.5 text-foreground-600">admin:DarkStar:admin,staff:Agent1:staff</code>
            </div>
            <div>
              <p className="mb-1.5 font-sans text-[10px] font-semibold uppercase tracking-widest text-foreground-400">JWT Secret (auto-generated on install)</p>
              <code className="block rounded-xl bg-background-100 px-3 py-2.5 text-foreground-400">Stored in wp_options as evolv_pos_jwt_secret</code>
            </div>
            <div>
              <p className="mb-1.5 font-sans text-[10px] font-semibold uppercase tracking-widest text-foreground-400">Plugin REST base</p>
              <code className="block rounded-xl bg-background-100 px-3 py-2.5 text-foreground-600">/wp-json/evolv-pos/v1/</code>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-foreground-400">Quick Links</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "WP Admin", href: "/wp-admin/" },
              { label: "WC Orders", href: "/wp-admin/edit.php?post_type=shop_order" },
              { label: "WC Products", href: "/wp-admin/edit.php?post_type=product" },
              { label: "POS Settings", href: "/wp-admin/admin.php?page=evolv-pos-settings" },
            ].map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer"
                className="rounded-xl border border-background-300 bg-background-50 px-4 py-3 text-sm font-medium text-foreground-700 transition-colors hover:bg-background-100 hover:text-foreground-950">
                {link.label} &rarr;
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}