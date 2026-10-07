const BASE = (import.meta.env.VITE_API_BASE ?? "").replace(/\/$/,  "");
const ENDPOINT = `${BASE}/wp-json/evolv-pos/v1`;

function authHeaders(): HeadersInit {
  const token = localStorage.getItem("pos_token");
  return token ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } : { "Content-Type": "application/json" };
}

async function req<T>(method: string, path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${ENDPOINT}${path}`, {
    method,
    headers: authHeaders(),
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Request failed" }));
    throw new Error(err.message ?? `HTTP ${res.status}`);
  }
  return res.json();
}

export interface PosProduct {
  id: number;
  name: string;
  sku: string;
  price: string;
  stock_status: string;
  categories: { name: string }[];
  images: { src: string }[];
}

export interface PosOrder {
  id: number;
  number: string;
  status: string;
  date_created: string;
  total: string;
  billing: { first_name: string; last_name: string; email: string; phone: string };
  line_items: { name: string; quantity: number; total: string }[];
  payment_url?: string;
}

export interface PosCustomer {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  date_created: string;
  orders_count: number;
  total_spent: string;
}

export interface PosStats {
  orders_today: number;
  revenue_today: string;
  orders_week: number;
  revenue_week: string;
  total_customers: number;
  total_products: number;
}

export interface AuthResponse {
  token: string;
  name: string;
  role: string;
}

export const posApi = {
  login: (pin: string) => req<AuthResponse>("POST", "/auth", { pin }),

  searchProducts: (search: string) =>
    req<PosProduct[]>("GET", `/products?search=${encodeURIComponent(search)}&per_page=20`),

  getAllProducts: (page = 1) =>
    req<PosProduct[]>("GET", `/products?per_page=50&page=${page}`),

  createOrder: (data: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    items: { product_id: number; quantity: number }[];
    note?: string;
  }) => req<PosOrder>("POST", "/orders", data),

  listOrders: (page = 1, status = "") =>
    req<PosOrder[]>("GET", `/orders?per_page=20&page=${page}${status ? `&status=${status}` : ""}`),

  listCustomers: (page = 1, search = "") =>
    req<PosCustomer[]>("GET", `/customers?per_page=20&page=${page}${search ? `&search=${encodeURIComponent(search)}` : ""}`),

  getStats: () => req<PosStats>("GET", "/stats"),

  health: () => req<{ woocommerce: boolean; version: string }>("GET", "/health"),
};
