import "server-only";

const WC_URL = process.env.WORDPRESS_URL?.replace(/\/$/, "");
const WC_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY;
const WC_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET;

export function isWooCommerceConfigured() {
  return Boolean(WC_URL && WC_KEY && WC_SECRET);
}

function wcAuth() {
  return "Basic " + Buffer.from(`${WC_KEY ?? ""}:${WC_SECRET ?? ""}`).toString("base64");
}

async function wcFetch(path: string, options: RequestInit = {}) {
  if (!WC_URL) throw new Error("WORDPRESS_URL not configured");
  const res = await fetch(`${WC_URL}/wp-json/wc/v3${path}`, {
    ...options,
    headers: {
      Authorization: wcAuth(),
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  });
  const data = await res.json().catch(() => null);
  return { ok: res.ok, status: res.status, data };
}

export interface WooProduct {
  id: number;
  name: string;
  slug: string;
  sku: string;
  price: string;
  regular_price: string;
  stock_status: "instock" | "outofstock";
  short_description: string;
  categories: { id: number; name: string }[];
}

export async function searchWooProducts(query: string): Promise<WooProduct[]> {
  const params = new URLSearchParams({ per_page: "20", status: "publish" });
  if (query) params.set("search", query);
  const { ok, data } = await wcFetch(`/products?${params}`);
  return ok && Array.isArray(data) ? data : [];
}

export interface WooOrderLine {
  product_id: number;
  quantity: number;
  /** optional: for variable products */
  variation_id?: number;
}

export interface WooOrderInput {
  billing: {
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    address_1?: string;
    city?: string;
    state?: string;
    postcode?: string;
    country?: string;
  };
  line_items: WooOrderLine[];
  payment_method: string;
  payment_method_title: string;
  /** "pending" leaves the order unpaid so the pay link works */
  status?: "pending" | "processing" | "on-hold";
  customer_note?: string;
  meta_data?: { key: string; value: string }[];
}

export interface WooOrderResult {
  id: number;
  number: string;
  order_key: string;
  payment_url: string;
  status: string;
  total: string;
  currency: string;
}

export async function createWooOrder(input: WooOrderInput): Promise<{ ok: boolean; order?: WooOrderResult; error?: string }> {
  const body: WooOrderInput = { status: "pending", ...input };
  const { ok, data } = await wcFetch("/orders", {
    method: "POST",
    body: JSON.stringify(body),
  });
  if (!ok) return { ok: false, error: data?.message ?? "WooCommerce order creation failed" };
  return { ok: true, order: data as WooOrderResult };
}

export async function getWooOrder(orderId: number): Promise<WooOrderResult | null> {
  const { ok, data } = await wcFetch(`/orders/${orderId}`);
  return ok ? (data as WooOrderResult) : null;
}
