import { NextResponse } from "next/server";
import { getSessionStaff } from "@/lib/pos-auth";
import { isWooCommerceConfigured } from "@/lib/woocommerce";
import { isGhlConfigured } from "@/lib/ghl";

export const runtime = "nodejs";

async function pingWooCommerce(): Promise<{ ok: boolean; status?: number; error?: string }> {
  const url = process.env.WORDPRESS_URL?.replace(/\/$/, "");
  const key = process.env.WOOCOMMERCE_CONSUMER_KEY;
  const secret = process.env.WOOCOMMERCE_CONSUMER_SECRET;
  if (!url || !key || !secret) return { ok: false, error: "Not configured" };
  try {
    const res = await fetch(`${url}/wp-json/wc/v3/system_status`, {
      headers: { Authorization: "Basic " + Buffer.from(`${key}:${secret}`).toString("base64") },
      next: { revalidate: 0 },
      signal: AbortSignal.timeout(8000),
    });
    return { ok: res.ok, status: res.status };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}

async function pingGhl(): Promise<{ ok: boolean; error?: string }> {
  const key = process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID;
  if (!key || !locationId) return { ok: false, error: "Not configured" };
  try {
    const res = await fetch(`https://services.leadconnectorhq.com/locations/${locationId}`, {
      headers: { Authorization: `Bearer ${key}`, Version: "2021-07-28" },
      next: { revalidate: 0 },
      signal: AbortSignal.timeout(8000),
    });
    return { ok: res.ok };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}

export async function GET() {
  const staff = await getSessionStaff();
  if (!staff || staff.role !== "admin") {
    return NextResponse.json({ error: "Admin only" }, { status: 403 });
  }

  const [wc, ghl] = await Promise.all([pingWooCommerce(), pingGhl()]);

  const checks = {
    woocommerce: {
      configured: isWooCommerceConfigured(),
      url: process.env.WORDPRESS_URL ?? null,
      ...wc,
    },
    ghl: {
      configured: isGhlConfigured(),
      location_id: process.env.GHL_LOCATION_ID ?? null,
      pipeline_id: process.env.GHL_PIPELINE_ID ?? null,
      stage_id: process.env.GHL_STAGE_ID ?? null,
      ...ghl,
    },
    pos: {
      configured: Boolean(process.env.POS_STAFF),
      jwt_secret_set: Boolean(process.env.POS_JWT_SECRET),
    },
  };

  const allOk = wc.ok && ghl.ok;
  return NextResponse.json({ ok: allOk, checks }, { status: allOk ? 200 : 207 });
}
