import { NextResponse } from "next/server";
import { getSessionStaff } from "@/lib/pos-auth";
import { isWooCommerceConfigured, createWooOrder, type WooOrderInput } from "@/lib/woocommerce";
import { crmConfigured, crmFetch } from "@/lib/crm-proxy";

export const runtime = "nodejs";

export interface PosOrderItem {
  /** WooCommerce product_id (when WooCommerce is live) or slug (local fallback) */
  product_id?: number;
  slug?: string;
  name: string;
  sku?: string;
  quantity: number;
  unit_price: number;
}

export interface PosOrderInput {
  customer: {
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    postcode?: string;
    country?: string;
    ghl_contact_id?: string;
  };
  items: PosOrderItem[];
  discount?: number;
  notes?: string;
  /** "paylink" = create pending order and return a pay URL to send to customer
   *  "manual"  = mark as already collected (CC by phone, e-transfer confirmed) */
  payment_mode: "paylink" | "manual";
  /** Only required when payment_mode === "manual" */
  payment_method?: "cc" | "etransfer" | "cashapp" | "zelle" | "venmo" | "other";
  /** setter code of the staff member who made the initial sale */
  setter_code?: string;
}

export async function POST(req: Request) {
  const staff = await getSessionStaff();
  if (!staff) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body: PosOrderInput = await req.json().catch(() => ({})) as PosOrderInput;

  if (!body.customer?.email || !body.items?.length) {
    return NextResponse.json({ error: "Customer email and at least one item are required." }, { status: 400 });
  }

  const subtotal = body.items.reduce((sum, i) => sum + i.unit_price * i.quantity, 0);
  const discount = body.discount ?? 0;
  const total = Math.max(0, subtotal - discount);

  const staffMeta = [
    { key: "_pos_closer", value: `${staff.name} (${staff.code})` },
    { key: "_pos_setter", value: body.setter_code || staff.code },
    { key: "_pos_total_before_discount", value: String(subtotal) },
    { key: "_pos_discount", value: String(discount) },
    ...(body.customer.ghl_contact_id
      ? [{ key: "_ghl_contact_id", value: body.customer.ghl_contact_id }]
      : []),
  ];

  // --- WooCommerce path (preferred) ---
  if (isWooCommerceConfigured()) {
    const lineItems = body.items.map((item) => ({
      product_id: item.product_id ?? 0,
      quantity: item.quantity,
    }));

    const wooInput: WooOrderInput = {
      billing: {
        first_name: body.customer.first_name,
        last_name: body.customer.last_name,
        email: body.customer.email,
        phone: body.customer.phone,
        address_1: body.customer.address,
        city: body.customer.city,
        state: body.customer.state,
        postcode: body.customer.postcode,
        country: body.customer.country || "CA",
      },
      line_items: lineItems,
      payment_method: body.payment_mode === "paylink" ? "bacs" : "cod",
      payment_method_title: body.payment_mode === "paylink" ? "Payment Link" : "Manual Payment",
      status: body.payment_mode === "paylink" ? "pending" : "processing",
      customer_note: body.notes,
      meta_data: staffMeta,
    };

    const { ok, order, error } = await createWooOrder(wooInput);
    if (!ok || !order) {
      return NextResponse.json({ error: error ?? "Failed to create WooCommerce order." }, { status: 500 });
    }

    return NextResponse.json({
      source: "woocommerce",
      order_id: order.id,
      order_number: order.number,
      total: order.total,
      currency: order.currency,
      payment_url: body.payment_mode === "paylink" ? order.payment_url : null,
      status: order.status,
    });
  }

  // --- CRM fallback ---
  if (crmConfigured()) {
    const crmPayload = {
      items: body.items.map((i) => ({ slug: i.slug ?? i.name, quantity: i.quantity })),
      paymentMethod: body.payment_mode === "manual" ? (body.payment_method ?? "other") : "pending_link",
      paymentMemo: `POS order — closer: ${staff.name}`,
      billing: {
        firstName: body.customer.first_name,
        lastName: body.customer.last_name,
        email: body.customer.email,
        phone: body.customer.phone ?? "",
      },
      customerNote: body.notes,
      discount,
      staffMeta,
    };
    const { ok, status, data } = await crmFetch("/api/store/checkout", crmPayload);
    if (!ok) return NextResponse.json({ error: data?.error ?? "Order failed" }, { status });
    return NextResponse.json({ source: "crm", ...data });
  }

  return NextResponse.json({ error: "No order backend configured (WooCommerce or CRM)." }, { status: 503 });
}
