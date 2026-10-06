"use client";

import { useEffect, useState } from "react";

interface HealthCheck {
  ok: boolean;
  checks: {
    woocommerce: { configured: boolean; url: string | null; ok: boolean; status?: number; error?: string };
    ghl: { configured: boolean; location_id: string | null; pipeline_id: string | null; stage_id: string | null; ok: boolean; error?: string };
    pos: { configured: boolean; jwt_secret_set: boolean };
  };
}

function StatusDot({ ok, loading }: { ok: boolean; loading?: boolean }) {
  if (loading) return <span className="inline-block h-2 w-2 rounded-full bg-charcoal/20 animate-pulse" />;
  return <span className={`inline-block h-2 w-2 rounded-full ${ok ? "bg-sage-deep" : "bg-red-400"}`} />;
}

function Row({ label, value, ok, note }: { label: string; value?: string | null; ok?: boolean; note?: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-stone/50 last:border-0">
      <div className="min-w-0">
        <p className="text-sm text-charcoal">{label}</p>
        {value && <p className="mt-0.5 text-xs text-charcoal/40 font-mono truncate max-w-xs">{value}</p>}
        {note && <p className="mt-0.5 text-xs text-copper">{note}</p>}
      </div>
      {ok !== undefined && (
        <span className={`shrink-0 rounded border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
          ok ? "text-sage-deep bg-sage-deep/10 border-sage-deep/20" : "text-red-600 bg-red-50 border-red-200"
        }`}>
          {ok ? "OK" : "Missing"}
        </span>
      )}
    </div>
  );
}

export function SettingsClient() {
  const [health, setHealth] = useState<HealthCheck | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function refresh() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/health");
      if (!res.ok && res.status === 403) { setError("Admin role required to view health status."); return; }
      const data = await res.json();
      setHealth(data);
    } catch { setError("Failed to fetch health status."); }
    finally { setLoading(false); }
  }

  useEffect(() => { refresh(); }, []);

  return (
    <div className="flex-1 p-6 space-y-8 overflow-y-auto">

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-charcoal">Integration Status</h2>
          <p className="text-xs text-charcoal/40 mt-0.5">Live connection test to WooCommerce + GHL</p>
        </div>
        <button onClick={refresh} className="rounded-lg border border-stone bg-white px-3 py-2 text-xs font-medium text-charcoal/60 hover:border-charcoal/40 hover:text-charcoal transition-colors">
          <i className="ri-refresh-line mr-1.5" />
          Recheck
        </button>
      </div>

      {error && <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>}

      {/* WooCommerce */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <StatusDot ok={health?.checks.woocommerce.ok ?? false} loading={loading} />
          <h3 className="text-xs font-semibold uppercase tracking-widest text-charcoal/40">WooCommerce</h3>
        </div>
        <div className="rounded-xl border border-stone bg-white px-5">
          <Row
            label="WORDPRESS_URL"
            value={health?.checks.woocommerce.url}
            ok={Boolean(health?.checks.woocommerce.url)}
          />
          <Row
            label="WOOCOMMERCE_CONSUMER_KEY"
            value={health?.checks.woocommerce.configured ? "ck_••••••••••••••••••••" : undefined}
            ok={health?.checks.woocommerce.configured}
          />
          <Row
            label="API Connection"
            ok={health?.checks.woocommerce.ok}
            note={health?.checks.woocommerce.error ?? (health?.checks.woocommerce.status ? `HTTP ${health.checks.woocommerce.status}` : undefined)}
          />
        </div>
      </section>

      {/* GHL */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <StatusDot ok={health?.checks.ghl.ok ?? false} loading={loading} />
          <h3 className="text-xs font-semibold uppercase tracking-widest text-charcoal/40">Go High Level (GHL)</h3>
        </div>
        <div className="rounded-xl border border-stone bg-white px-5">
          <Row label="GHL_API_KEY" value={health?.checks.ghl.configured ? "pit-••••••••••••••••••" : undefined} ok={health?.checks.ghl.configured} />
          <Row label="GHL_LOCATION_ID" value={health?.checks.ghl.location_id} ok={Boolean(health?.checks.ghl.location_id)} />
          <Row
            label="GHL_PIPELINE_ID"
            value={health?.checks.ghl.pipeline_id}
            ok={Boolean(health?.checks.ghl.pipeline_id)}
            note={!health?.checks.ghl.pipeline_id ? "Optional - needed to create opportunities from POS orders" : undefined}
          />
          <Row
            label="GHL_STAGE_ID"
            value={health?.checks.ghl.stage_id}
            ok={Boolean(health?.checks.ghl.stage_id)}
          />
          <Row
            label="API Connection"
            ok={health?.checks.ghl.ok}
            note={health?.checks.ghl.error}
          />
        </div>
      </section>

      {/* POS */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <StatusDot ok={(health?.checks.pos.configured && health?.checks.pos.jwt_secret_set) ?? false} loading={loading} />
          <h3 className="text-xs font-semibold uppercase tracking-widest text-charcoal/40">POS Auth</h3>
        </div>
        <div className="rounded-xl border border-stone bg-white px-5">
          <Row label="POS_STAFF" ok={health?.checks.pos.configured} note={!health?.checks.pos.configured ? "Default 'admin' code active (insecure)" : undefined} />
          <Row label="POS_JWT_SECRET" ok={health?.checks.pos.jwt_secret_set} note={!health?.checks.pos.jwt_secret_set ? "Using default dev secret (insecure)" : undefined} />
        </div>
      </section>

      {/* VPS commands reference */}
      <section>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-charcoal/40">VPS Setup Reference</h3>
        <div className="rounded-xl border border-stone bg-white p-5 space-y-4 text-xs font-mono text-charcoal/60">
          <div>
            <p className="mb-1 text-[10px] font-sans font-semibold uppercase tracking-widest text-charcoal/40">Fix permalinks (required for WC REST API)</p>
            <code className="block bg-ivory rounded-lg px-3 py-2 text-xs">wp rewrite structure &apos;/%postname%/&apos; --hard --allow-root</code>
            <code className="block bg-ivory rounded-lg px-3 py-2 text-xs mt-1">wp rewrite flush --hard --allow-root</code>
          </div>
          <div>
            <p className="mb-1 text-[10px] font-sans font-semibold uppercase tracking-widest text-charcoal/40">Create WooCommerce pages</p>
            <code className="block bg-ivory rounded-lg px-3 py-2 text-xs">wp wc tool run install_pages --user=DarkStar --allow-root</code>
          </div>
          <div>
            <p className="mb-1 text-[10px] font-sans font-semibold uppercase tracking-widest text-charcoal/40">Delete accidentally created user (ID 8)</p>
            <code className="block bg-ivory rounded-lg px-3 py-2 text-xs">wp user delete 8 --reassign=1 --allow-root</code>
          </div>
        </div>
      </section>

    </div>
  );
}
