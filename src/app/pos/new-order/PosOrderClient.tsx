"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { StaffRole } from "@/lib/pos-auth";

interface Staff {
  name: string;
  role: StaffRole;
  code: string;
}

interface Product {
  id: number | string;
  name: string;
  slug: string;
  sku: string;
  price: string;
  stock_status: string;
  categories: { name: string }[];
}

interface CartItem {
  product: Product;
  quantity: number;
  unit_price: number;
}

interface GhlContact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface Customer {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  ghl_contact_id?: string;
}

type PaymentMode = "paylink" | "manual";
type ManualMethod = "cc" | "etransfer" | "cashapp" | "zelle" | "venmo";

export function PosOrderClient({ staff }: { staff: Staff }) {
  const router = useRouter();

  // Product search
  const [productQuery, setProductQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [productSource, setProductSource] = useState<"woocommerce" | "local" | "">("");
  const [loadingProducts, setLoadingProducts] = useState(false);
  const productSearchTimer = useRef<ReturnType<typeof setTimeout>>();

  // Customer
  const [contactQuery, setContactQuery] = useState("");
  const [contacts, setContacts] = useState<GhlContact[]>([]);
  const [loadingContacts, setLoadingContacts] = useState(false);
  const [customer, setCustomer] = useState<Customer>({
    first_name: "", last_name: "", email: "", phone: "",
  });
  const [showContactDropdown, setShowContactDropdown] = useState(false);
  const contactTimer = useRef<ReturnType<typeof setTimeout>>();

  // Cart
  const [cart, setCart] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState("");

  // Setter tracking
  const [setterCode, setSetterCode] = useState(staff.role === "setter" ? staff.code : "");

  // Payment
  const [paymentMode, setPaymentMode] = useState<PaymentMode>("paylink");
  const [manualMethod, setManualMethod] = useState<ManualMethod>("cc");
  const [notes, setNotes] = useState("");

  // Submission
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{
    order_number?: string;
    payment_url?: string;
    total?: string;
    source?: string;
    error?: string;
  } | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);

  const subtotal = cart.reduce((sum, i) => sum + i.unit_price * i.quantity, 0);
  const discountAmt = parseFloat(discount) || 0;
  const total = Math.max(0, subtotal - discountAmt);

  // --- Product search ---
  const searchProducts = useCallback((q: string) => {
    clearTimeout(productSearchTimer.current);
    productSearchTimer.current = setTimeout(async () => {
      setLoadingProducts(true);
      try {
        const res = await fetch(`/api/pos/products?q=${encodeURIComponent(q)}`);
        const data = await res.json();
        setProducts(data.products ?? []);
        setProductSource(data.source ?? "");
      } finally {
        setLoadingProducts(false);
      }
    }, 200);
  }, []);

  useEffect(() => {
    searchProducts(productQuery);
  }, [productQuery, searchProducts]);

  // --- Contact search ---
  const searchContacts = useCallback((q: string) => {
    clearTimeout(contactTimer.current);
    if (!q || q.length < 2) { setContacts([]); return; }
    contactTimer.current = setTimeout(async () => {
      setLoadingContacts(true);
      try {
        const res = await fetch(`/api/pos/contacts?q=${encodeURIComponent(q)}`);
        const data = await res.json();
        setContacts(data.contacts ?? []);
        setShowContactDropdown(true);
      } finally {
        setLoadingContacts(false);
      }
    }, 300);
  }, []);

  function selectContact(c: GhlContact) {
    setCustomer({
      first_name: c.firstName,
      last_name: c.lastName,
      email: c.email,
      phone: c.phone,
      ghl_contact_id: c.id,
    });
    setContactQuery(`${c.firstName} ${c.lastName}`);
    setShowContactDropdown(false);
    setContacts([]);
  }

  // --- Cart ---
  function addToCart(product: Product) {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { product, quantity: 1, unit_price: parseFloat(product.price) || 0 }];
    });
  }

  function updateQty(productId: number | string, qty: number) {
    if (qty <= 0) {
      setCart((prev) => prev.filter((i) => i.product.id !== productId));
    } else {
      setCart((prev) =>
        prev.map((i) => (i.product.id === productId ? { ...i, quantity: qty } : i))
      );
    }
  }

  function updatePrice(productId: number | string, price: number) {
    setCart((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, unit_price: price } : i))
    );
  }

  // --- Submit ---
  async function submitOrder() {
    if (!customer.email) { alert("Customer email required."); return; }
    if (!cart.length) { alert("Add at least one item."); return; }

    setSubmitting(true);
    setResult(null);
    try {
      const res = await fetch("/api/pos/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer,
          items: cart.map((i) => ({
            product_id: typeof i.product.id === "number" ? i.product.id : undefined,
            slug: i.product.slug,
            name: i.product.name,
            sku: i.product.sku,
            quantity: i.quantity,
            unit_price: i.unit_price,
          })),
          discount: discountAmt || undefined,
          notes: notes || undefined,
          payment_mode: paymentMode,
          payment_method: paymentMode === "manual" ? manualMethod : undefined,
          setter_code: setterCode || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setResult({ error: data.error ?? "Order failed." });
      } else {
        setResult(data);
      }
    } catch {
      setResult({ error: "Network error. Try again." });
    } finally {
      setSubmitting(false);
    }
  }

  function copyLink(url: string) {
    navigator.clipboard.writeText(url).then(() => {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    });
  }

  async function handleLogout() {
    await fetch("/api/pos/auth", { method: "DELETE" });
    router.push("/pos/login");
    router.refresh();
  }

  function resetOrder() {
    setCart([]);
    setCustomer({ first_name: "", last_name: "", email: "", phone: "" });
    setContactQuery("");
    setDiscount("");
    setNotes("");
    setResult(null);
    setPaymentMode("paylink");
  }

  // ---- Render ----
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      {/* Top bar */}
      <header className="flex items-center justify-between border-b border-white/10 bg-[var(--color-sage-forest)] px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold tracking-wider text-[var(--color-ivory)]">evolv POS</span>
          <span className="rounded-full bg-[var(--color-sage-deep)] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-ivory-soft)]">
            {staff.role}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-[var(--color-sage)]">{staff.name}</span>
          <button onClick={handleLogout} className="text-xs text-[var(--color-sage)] hover:text-white transition">
            Sign out
          </button>
        </div>
      </header>

      {/* Main grid */}
      <div className="flex flex-1 overflow-hidden">

        {/* LEFT: Products */}
        <div className="flex w-[400px] shrink-0 flex-col border-r border-white/10">
          <div className="p-3">
            <div className="relative">
              <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-sage)] text-sm" />
              <input
                type="text"
                value={productQuery}
                onChange={(e) => setProductQuery(e.target.value)}
                placeholder="Search products…"
                className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-white/30 focus:border-[var(--color-sage-deep)] focus:outline-none"
                autoFocus
              />
              {productSource === "local" && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[var(--color-sage)]">local</span>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-1">
            {loadingProducts && (
              <p className="py-4 text-center text-xs text-[var(--color-sage)]">Loading…</p>
            )}
            {!loadingProducts && products.length === 0 && (
              <p className="py-4 text-center text-xs text-[var(--color-sage)]">
                {productQuery ? "No products found." : "Loading catalog…"}
              </p>
            )}
            {products.map((p) => (
              <button
                key={p.id}
                onClick={() => addToCart(p)}
                disabled={p.stock_status !== "instock"}
                className="w-full rounded-lg border border-white/5 bg-white/5 px-3 py-2.5 text-left transition hover:bg-white/10 hover:border-white/15 disabled:opacity-40"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-white">{p.name}</p>
                    <p className="text-[11px] text-[var(--color-sage)]">{p.sku || p.slug}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-sm font-semibold text-[var(--color-ivory)]">${parseFloat(p.price || "0").toFixed(2)}</p>
                    {p.stock_status !== "instock" && (
                      <p className="text-[10px] text-red-400">Out of stock</p>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT: Order */}
        <div className="flex flex-1 flex-col overflow-hidden">

          {/* Order confirmed overlay */}
          {result && !result.error && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/80 backdrop-blur-sm">
              <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[var(--color-sage-forest)] p-8 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-500/20 text-green-400 text-2xl">
                  <i className="ri-check-line" />
                </div>
                <h2 className="text-xl font-semibold text-white">Order Created</h2>
                {result.order_number && (
                  <p className="mt-1 text-sm text-[var(--color-sage)]">Order #{result.order_number}</p>
                )}
                <p className="mt-2 text-lg font-semibold text-[var(--color-ivory)]">
                  Total: ${parseFloat(result.total ?? String(total)).toFixed(2)}
                </p>

                {result.payment_url && (
                  <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-sage)] mb-3">Payment Link</p>
                    <p className="break-all text-xs text-[var(--color-ivory-soft)] mb-3">{result.payment_url}</p>
                    <button
                      onClick={() => copyLink(result.payment_url!)}
                      className="w-full rounded-lg bg-[var(--color-sage-deep)] px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                    >
                      {linkCopied ? "✓ Copied!" : "Copy payment link"}
                    </button>
                    <p className="mt-2 text-[11px] text-[var(--color-sage)]">
                      Share via SMS or email — link expires on payment.
                    </p>
                  </div>
                )}

                {paymentMode === "manual" && !result.payment_url && (
                  <div className="mt-4 rounded-xl bg-green-900/30 border border-green-700/30 p-3">
                    <p className="text-sm text-green-300">Payment recorded as {manualMethod.toUpperCase()}</p>
                  </div>
                )}

                <button
                  onClick={resetOrder}
                  className="mt-5 w-full rounded-lg border border-white/10 px-4 py-2.5 text-sm font-medium text-[var(--color-ivory-soft)] transition hover:bg-white/5"
                >
                  New order
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-1 overflow-hidden">

            {/* Cart items */}
            <div className="flex w-[340px] shrink-0 flex-col border-r border-white/10">
              <div className="border-b border-white/10 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-sage)]">Order items</p>
              </div>
              <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
                {cart.length === 0 && (
                  <p className="py-8 text-center text-sm text-[var(--color-sage)]">
                    Tap a product to add it
                  </p>
                )}
                {cart.map((item) => (
                  <div key={item.product.id} className="rounded-lg border border-white/8 bg-white/5 p-3">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-white leading-tight">{item.product.name}</p>
                        <p className="text-[11px] text-[var(--color-sage)]">{item.product.sku}</p>
                      </div>
                      <button
                        onClick={() => updateQty(item.product.id, 0)}
                        className="shrink-0 text-[var(--color-sage)] hover:text-red-400 transition"
                      >
                        <i className="ri-close-line text-sm" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center rounded-lg border border-white/10 bg-white/5">
                        <button
                          onClick={() => updateQty(item.product.id, item.quantity - 1)}
                          className="px-2.5 py-1.5 text-sm text-[var(--color-sage)] hover:text-white"
                        >−</button>
                        <span className="min-w-[24px] text-center text-sm font-semibold text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQty(item.product.id, item.quantity + 1)}
                          className="px-2.5 py-1.5 text-sm text-[var(--color-sage)] hover:text-white"
                        >+</button>
                      </div>
                      <span className="text-[var(--color-sage)] text-xs">@</span>
                      <div className="flex items-center rounded-lg border border-white/10 bg-white/5 px-2 py-1.5">
                        <span className="text-xs text-[var(--color-sage)]">$</span>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.unit_price}
                          onChange={(e) => updatePrice(item.product.id, parseFloat(e.target.value) || 0)}
                          className="w-16 bg-transparent text-sm text-white focus:outline-none"
                        />
                      </div>
                      <span className="ml-auto text-sm font-semibold text-[var(--color-ivory)]">
                        ${(item.unit_price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              {cart.length > 0 && (
                <div className="border-t border-white/10 px-4 py-3 space-y-1.5">
                  <div className="flex justify-between text-sm text-[var(--color-sage)]">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[var(--color-sage)]">Discount</span>
                    <div className="flex items-center rounded-lg border border-white/10 bg-white/5 px-2 py-1 ml-auto">
                      <span className="text-xs text-[var(--color-sage)]">$</span>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        placeholder="0.00"
                        className="w-16 bg-transparent text-sm text-white focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between text-base font-semibold text-white pt-1 border-t border-white/10">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Customer + Payment */}
            <div className="flex flex-1 flex-col overflow-y-auto p-4 space-y-4">

              {/* Customer */}
              <section className="rounded-xl border border-white/10 bg-white/3 p-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-sage)]">Customer</p>

                {/* GHL search */}
                <div className="relative mb-3">
                  <input
                    type="text"
                    value={contactQuery}
                    onChange={(e) => {
                      setContactQuery(e.target.value);
                      searchContacts(e.target.value);
                    }}
                    onBlur={() => setTimeout(() => setShowContactDropdown(false), 200)}
                    placeholder="Search GHL contacts…"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-[var(--color-sage-deep)] focus:outline-none"
                  />
                  {loadingContacts && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--color-sage)]">…</span>
                  )}
                  {showContactDropdown && contacts.length > 0 && (
                    <div className="absolute z-10 mt-1 w-full rounded-xl border border-white/10 bg-[var(--color-sage-forest)] shadow-xl overflow-hidden">
                      {contacts.map((c) => (
                        <button
                          key={c.id}
                          onMouseDown={() => selectContact(c)}
                          className="w-full px-3 py-2.5 text-left text-sm hover:bg-white/5 transition"
                        >
                          <p className="font-medium text-white">{c.firstName} {c.lastName}</p>
                          <p className="text-xs text-[var(--color-sage)]">{c.email} · {c.phone}</p>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <input
                    value={customer.first_name}
                    onChange={(e) => setCustomer((c) => ({ ...c, first_name: e.target.value }))}
                    placeholder="First name"
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-[var(--color-sage-deep)] focus:outline-none"
                  />
                  <input
                    value={customer.last_name}
                    onChange={(e) => setCustomer((c) => ({ ...c, last_name: e.target.value }))}
                    placeholder="Last name"
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-[var(--color-sage-deep)] focus:outline-none"
                  />
                  <input
                    type="email"
                    value={customer.email}
                    onChange={(e) => setCustomer((c) => ({ ...c, email: e.target.value }))}
                    placeholder="Email *"
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-[var(--color-sage-deep)] focus:outline-none"
                  />
                  <input
                    type="tel"
                    value={customer.phone}
                    onChange={(e) => setCustomer((c) => ({ ...c, phone: e.target.value }))}
                    placeholder="Phone"
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-[var(--color-sage-deep)] focus:outline-none"
                  />
                </div>
              </section>

              {/* Staff tracking */}
              <section className="rounded-xl border border-white/10 bg-white/3 p-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-sage)]">Sale attribution</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-[var(--color-sage)] mb-1">Setter (who booked the sale)</label>
                    <input
                      value={setterCode}
                      onChange={(e) => setSetterCode(e.target.value)}
                      placeholder="Staff code"
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-[var(--color-sage-deep)] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[var(--color-sage)] mb-1">Closer (current staff)</label>
                    <div className="rounded-lg border border-white/8 bg-white/3 px-3 py-2 text-sm text-[var(--color-ivory-soft)]">
                      {staff.name}
                    </div>
                  </div>
                </div>
              </section>

              {/* Payment method */}
              <section className="rounded-xl border border-white/10 bg-white/3 p-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-sage)]">Payment</p>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMode("paylink")}
                    className={`rounded-lg border px-3 py-3 text-sm font-medium transition ${
                      paymentMode === "paylink"
                        ? "border-[var(--color-sage-deep)] bg-[var(--color-sage-deep)]/20 text-white"
                        : "border-white/10 text-[var(--color-sage)] hover:border-white/20"
                    }`}
                  >
                    <i className="ri-link mr-2" />
                    Send payment link
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMode("manual")}
                    className={`rounded-lg border px-3 py-3 text-sm font-medium transition ${
                      paymentMode === "manual"
                        ? "border-[var(--color-sage-deep)] bg-[var(--color-sage-deep)]/20 text-white"
                        : "border-white/10 text-[var(--color-sage)] hover:border-white/20"
                    }`}
                  >
                    <i className="ri-money-dollar-box-line mr-2" />
                    Manual / CC
                  </button>
                </div>

                {paymentMode === "paylink" && (
                  <p className="text-xs text-[var(--color-sage)] rounded-lg bg-white/5 p-3">
                    WooCommerce will generate a one-time secure payment link. Copy it and send via SMS or email.
                    Link expires automatically once paid.
                  </p>
                )}

                {paymentMode === "manual" && (
                  <div>
                    <p className="text-xs text-[var(--color-sage)] mb-3">Payment already collected — how was it received?</p>
                    <div className="flex flex-wrap gap-2">
                      {(["cc", "etransfer", "cashapp", "zelle", "venmo"] as ManualMethod[]).map((m) => (
                        <button
                          key={m}
                          onClick={() => setManualMethod(m)}
                          className={`rounded-full border px-3 py-1.5 text-xs font-medium transition uppercase tracking-wide ${
                            manualMethod === m
                              ? "border-[var(--color-copper)] bg-[var(--color-copper)]/10 text-[var(--color-copper)]"
                              : "border-white/10 text-[var(--color-sage)] hover:border-white/20"
                          }`}
                        >
                          {m === "cc" ? "Credit Card" : m === "etransfer" ? "E-Transfer" : m}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </section>

              {/* Notes */}
              <section className="rounded-xl border border-white/10 bg-white/3 p-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-sage)]">Order notes</p>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Optional notes for this order…"
                  className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-[var(--color-sage-deep)] focus:outline-none"
                />
              </section>

              {result?.error && (
                <div className="rounded-xl border border-red-800 bg-red-900/20 px-4 py-3 text-sm text-red-300">
                  {result.error}
                </div>
              )}

              <button
                onClick={submitOrder}
                disabled={submitting || !cart.length || !customer.email}
                className="w-full rounded-xl bg-[var(--color-sage-deep)] py-4 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-40"
              >
                {submitting
                  ? "Creating order…"
                  : paymentMode === "paylink"
                  ? `Create order & get payment link — $${total.toFixed(2)}`
                  : `Record order — $${total.toFixed(2)}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
