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

export interface WooCustomerInput {
  email: string;
  first_name: string;
  last_name: string;
  username?: string;
}

/**
 * Creates a WooCommerce customer account. Returns the customer ID or null.
 * Silently ignores "already exists" errors (code: registration-error-email-exists).
 */
// ---------- paginated list helpers ----------

async function wcFetchPaged(path: string) {
  if (!WC_URL) throw new Error("WORDPRESS_URL not configured");
  const res = await fetch(`${WC_URL}/wp-json/wc/v3${path}`, {
    headers: { Authorization: wcAuth(), "Content-Type": "application/json" },
    cache: "no-store",
  });
  const total = parseInt(res.headers.get("X-WP-Total") ?? "0");
  const totalPages = parseInt(res.headers.get("X-WP-TotalPages") ?? "1");
  const data = await res.json().catch(() => []);
  return { ok: res.ok, data, total, totalPages };
}

export interface WooOrderFull {
  id: number; number: string; status: string; date_created: string;
  total: string; currency: string;
  billing: { first_name: string; last_name: string; email: string; phone: string };
  line_items: { id: number; name: string; quantity: number; total: string }[];
  meta_data: { key: string; value: string }[];
  payment_url: string;
}

export interface WooCustomerFull {
  id: number; email: string; first_name: string; last_name: string;
  date_created: string; orders_count: number; total_spent: string;
  meta_data: { key: string; value: string }[];
  billing: { phone: string };
}

export async function listWooOrders(params: {
  page?: number; per_page?: number; status?: string; search?: string;
} = {}): Promise<{ orders: WooOrderFull[]; total: number; totalPages: number }> {
  const p = new URLSearchParams({ per_page: String(params.per_page ?? 25), page: String(params.page ?? 1) });
  if (params.status && params.status !== "any") p.set("status", params.status);
  if (params.search) p.set("search", params.search);
  const { ok, data, total, totalPages } = await wcFetchPaged(`/orders?${p}`);
  return { orders: ok && Array.isArray(data) ? data : [], total, totalPages };
}

export async function listWooCustomers(params: {
  page?: number; per_page?: number; search?: string;
} = {}): Promise<{ customers: WooCustomerFull[]; total: number; totalPages: number }> {
  const p = new URLSearchParams({ per_page: String(params.per_page ?? 25), page: String(params.page ?? 1) });
  if (params.search) p.set("search", params.search);
  const { ok, data, total, totalPages } = await wcFetchPaged(`/customers?${p}`);
  return { customers: ok && Array.isArray(data) ? data : [], total, totalPages };
}

export async function getWooStats(): Promise<{ total_orders: number; total_revenue: string }> {
  const p = new URLSearchParams({ per_page: "1", page: "1" });
  const ordersRes = await wcFetchPaged(`/orders?${p}`);
  const salesRes = await fetch(`${WC_URL}/wp-json/wc/v3/reports/sales`, {
    headers: { Authorization: wcAuth(), "Content-Type": "application/json" },
    cache: "no-store",
  });
  const salesData = await salesRes.json().catch(() => [{}]);
  const sales = Array.isArray(salesData) ? salesData[0] : salesData;
  return {
    total_orders: ordersRes.total,
    total_revenue: sales?.total_sales ?? "0",
  };
}

export async function createWooCustomer(input: WooCustomerInput): Promise<number | null> {
  const body = {
    email: input.email,
    first_name: input.first_name,
    last_name: input.last_name,
    username: input.username ?? input.email,
  };
  const { ok, data } = await wcFetch("/customers", { method: "POST", body: JSON.stringify(body) });
  if (ok) return (data as { id: number }).id;
  // email already registered - not a real error for us
  if (data?.code === "registration-error-email-exists") return null;
  return null;
}
