"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type StaffRole = "setter" | "closer" | "admin";

interface Staff { name: string; role: StaffRole; code: string }
interface Product {
  id: number | string; name: string; slug: string; sku: string;
  price: string; stock_status: string; categories: { name: string }[];
}
interface CartItem { product: Product; quantity: number; unit_price: number }
interface GhlContact { id: string; firstName: string; lastName: string; email: string; phone: string }
interface Customer {
  first_name: string; last_name: string; email: string; phone: string; ghl_contact_id?: string;
}
type PaymentMode = "paylink" | "manual";
type ManualMethod = "cc" | "etransfer" | "cashapp" | "zelle" | "venmo";

const MANUAL_LABELS: Record<ManualMethod, string> = {
  cc: "Credit Card", etransfer: "E-Transfer", cashapp: "CashApp", zelle: "Zelle", venmo: "Venmo",
};

const INPUT = "w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:border-zinc-600 focus:outline-none";

export function PosOrderClient({ staff }: { staff: Staff }) {
  const router = useRouter();

  const [productQuery, setProductQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [productSource, setProductSource] = useState<"woocommerce" | "local" | "">("");
  const [loadingProducts, setLoadingProducts] = useState(false);
  const productTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const [contactQuery, setContactQuery] = useState("");
  const [contacts, setContacts] = useState<GhlContact[]>([]);
  const [loadingContacts, setLoadingContacts] = useState(false);
  const [showContactDrop, setShowContactDrop] = useState(false);
  const contactTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const [customer, setCustomer] = useState<Customer>({ first_name: "", last_name: "", email: "", phone: "" });
  const [cart, setCart] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState("");
  const [setterCode, setSetterCode] = useState(staff.role === "setter" ? staff.code : "");
  const [paymentMode, setPaymentMode] = useState<PaymentMode>("paylink");
  const [manualMethod, setManualMethod] = useState<ManualMethod>("cc");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [result, setResult] = useState<{
    order_number?: string; payment_url?: string; total?: string; source?: string;
    ghl_contact_id?: string; ghl_opportunity_id?: string;
  } | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);

  const subtotal = cart.reduce((s, i) => s + i.unit_price * i.quantity, 0);
  const discountAmt = parseFloat(discount) || 0;
  const total = Math.max(0, subtotal - discountAmt);

  const searchProducts = useCallback((q: string) => {
    clearTimeout(productTimer.current);
    productTimer.current = setTimeout(async () => {
      setLoadingProducts(true);
      try {
        const res = await fetch(`/api/pos/products?q=${encodeURIComponent(q)}`);
        const data = await res.json();
        setProducts(data.products ?? []);
        setProductSource(data.source ?? "");
      } finally { setLoadingProducts(false); }
    }, 200);
  }, []);

  useEffect(() => { searchProducts(productQuery); }, [productQuery, searchProducts]);

  const searchContacts = useCallback((q: string) => {
    clearTimeout(contactTimer.current);
    if (!q || q.length < 2) { setContacts([]); setShowContactDrop(false); return; }
    contactTimer.current = setTimeout(async () => {
      setLoadingContacts(true);
      try {
        const res = await fetch(`/api/pos/contacts?q=${encodeURIComponent(q)}`);
        const data = await res.json();
        setContacts(data.contacts ?? []);
        setShowContactDrop(true);
      } finally { setLoadingContacts(false); }
    }, 300);
  }, []);

  function selectContact(c: GhlContact) {
    setCustomer({ first_name: c.firstName, last_name: c.lastName, email: c.email, phone: c.phone, ghl_contact_id: c.id });
    setContactQuery(`${c.firstName} ${c.lastName}`);
    setShowContactDrop(false);
  }

  function addToCart(p: Product) {
    setCart((prev) => {
      const ex = prev.find((i) => i.product.id === p.id);
      if (ex) return prev.map((i) => i.product.id === p.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { product: p, quantity: 1, unit_price: parseFloat(p.price) || 0 }];
    });
  }

  function updateQty(id: number | string, qty: number) {
    if (qty <= 0) setCart((p) => p.filter((i) => i.product.id !== id));
    else setCart((p) => p.map((i) => i.product.id === id ? { ...i, quantity: qty } : i));
  }

  function updatePrice(id: number | string, price: number) {
    setCart((p) => p.map((i) => i.product.id === id ? { ...i, unit_price: price } : i));
  }

  async function submitOrder() {
    if (!customer.email) { setSubmitError("Customer email is required."); return; }
    if (!cart.length) { setSubmitError("Add at least one item."); return; }
    setSubmitting(true);
    setSubmitError("");
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
      if (!res.ok) { setSubmitError(data.error ?? "Order failed."); return; }
      setResult(data);
    } catch { setSubmitError("Network error. Try again."); }
    finally { setSubmitting(false); }
  }

  function copyLink(url: string) {
    navigator.clipboard.writeText(url).then(() => {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    });
  }

  function resetOrder() {
    setCart([]); setCustomer({ first_name: "", last_name: "", email: "", phone: "" });
    setContactQuery(""); setDiscount(""); setNotes(""); setResult(null);
    setSubmitError(""); setPaymentMode("paylink");
  }

  async function handleLogout() {
    await fetch("/api/pos/auth", { method: "DELETE" });
    router.push("/pos/login"); router.refresh();
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-black">

      {/* ── Header ── */}
      <header className="flex shrink-0 items-center justify-between border-b border-zinc-800 bg-zinc-950 px-5 py-3">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold tracking-widest text-white uppercase">evolv POS</span>
          <span className="rounded-sm bg-zinc-800 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
            {staff.role}
          </span>
          {productSource === "local" && (
            <span className="rounded-sm bg-amber-900/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-400">
              local catalog
            </span>
          )}
        </div>
        <div className="flex items-center gap-5">
          <span className="text-sm text-zinc-400">{staff.name}</span>
          <button onClick={handleLogout} className="text-xs text-zinc-500 hover:text-white transition-colors">
            Sign out
          </button>
        </div>
      </header>

      {/* ── 3-column grid ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── LEFT: Products ── */}
        <div className="flex w-[360px] shrink-0 flex-col border-r border-zinc-800">
          <div className="shrink-0 border-b border-zinc-800 px-4 py-3">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Products</p>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
              <input
                type="text"
                value={productQuery}
                onChange={(e) => setProductQuery(e.target.value)}
                placeholder="Search products..."
                autoFocus
                className="w-full rounded-md border border-zinc-800 bg-zinc-900 py-2 pl-8 pr-3 text-sm text-white placeholder:text-zinc-600 focus:border-zinc-600 focus:outline-none"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {loadingProducts && (
              <p className="py-6 text-center text-xs text-zinc-600">Loading...</p>
            )}
            {!loadingProducts && products.length === 0 && (
              <p className="py-6 text-center text-xs text-zinc-600">
                {productQuery ? "No products found" : "Type to search"}
              </p>
            )}
            {products.map((p) => (
              <button
                key={p.id}
                onClick={() => addToCart(p)}
                disabled={p.stock_status !== "instock"}
                className="flex w-full items-center justify-between border-b border-zinc-900 px-4 py-3 text-left transition-colors hover:bg-zinc-900 disabled:opacity-40"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">{p.name}</p>
                  <p className="mt-0.5 text-xs text-zinc-600">{p.sku || p.slug}</p>
                </div>
                <div className="ml-3 shrink-0 text-right">
                  <p className="text-sm font-semibold text-white">${parseFloat(p.price || "0").toFixed(2)}</p>
                  {p.stock_status !== "instock" && <p className="text-[10px] text-red-500">Out of stock</p>}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ── MIDDLE: Cart ── */}
        <div className="flex w-[300px] shrink-0 flex-col border-r border-zinc-800">
          <div className="shrink-0 border-b border-zinc-800 px-4 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
              Order {cart.length > 0 && <span className="ml-1 text-white">({cart.length})</span>}
            </p>
          </div>

          <div className="flex-1 overflow-y-auto">
            {cart.length === 0 ? (
              <div className="flex h-full items-center justify-center">
                <p className="text-sm text-zinc-700">No items yet</p>
              </div>
            ) : (
              <div className="divide-y divide-zinc-900">
                {cart.map((item) => (
                  <div key={item.product.id} className="px-4 py-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-white leading-tight">{item.product.name}</p>
                        {item.product.sku && <p className="mt-0.5 text-xs text-zinc-600">{item.product.sku}</p>}
                      </div>
                      <button onClick={() => updateQty(item.product.id, 0)} className="shrink-0 text-zinc-700 hover:text-red-500 transition-colors">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex items-center rounded-md border border-zinc-800">
                        <button onClick={() => updateQty(item.product.id, item.quantity - 1)} className="px-2.5 py-1 text-sm text-zinc-500 hover:text-white transition-colors">-</button>
                        <span className="min-w-[28px] text-center text-sm font-semibold text-white">{item.quantity}</span>
                        <button onClick={() => updateQty(item.product.id, item.quantity + 1)} className="px-2.5 py-1 text-sm text-zinc-500 hover:text-white transition-colors">+</button>
                      </div>
                      <span className="text-xs text-zinc-700">@</span>
                      <div className="flex items-center rounded-md border border-zinc-800 bg-zinc-900 px-2 py-1">
                        <span className="text-xs text-zinc-600">$</span>
                        <input
                          type="number" min="0" step="0.01" value={item.unit_price}
                          onChange={(e) => updatePrice(item.product.id, parseFloat(e.target.value) || 0)}
                          className="w-14 bg-transparent text-sm text-white focus:outline-none"
                        />
                      </div>
                      <span className="ml-auto text-sm font-semibold text-white">
                        ${(item.unit_price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Totals */}
          {cart.length > 0 && (
            <div className="shrink-0 border-t border-zinc-800 px-4 py-3 space-y-2">
              <div className="flex justify-between text-sm text-zinc-500">
                <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm text-zinc-500">Discount</span>
                <div className="flex items-center rounded-md border border-zinc-800 bg-zinc-900 px-2 py-1">
                  <span className="text-xs text-zinc-600">$</span>
                  <input
                    type="number" min="0" step="0.01" value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    placeholder="0.00"
                    className="w-16 bg-transparent text-sm text-white focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex justify-between border-t border-zinc-800 pt-2 text-base font-bold text-white">
                <span>Total</span><span>${total.toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>

        {/* ── RIGHT: Customer + Payment ── */}
        <div className="flex flex-1 flex-col overflow-y-auto">

          {/* ── ORDER SUCCESS OVERLAY ── */}
          {result && (
            <div className="flex flex-col items-center justify-center h-full px-8 py-12 text-center">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border-2 border-green-500 text-green-500">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-white">Order Created</h2>
              {result.order_number && (
                <p className="mt-1 text-sm text-zinc-500">Order #{result.order_number}</p>
              )}
              <p className="mt-3 text-3xl font-bold text-white">${parseFloat(result.total ?? String(total)).toFixed(2)}</p>
              <p className="mt-1 text-xs text-zinc-600 uppercase tracking-wider">
                {result.source === "woocommerce" ? "WooCommerce" : "CRM"}
                {result.ghl_contact_id && " · GHL synced"}
              </p>

              {result.payment_url && (
                <div className="mt-6 w-full max-w-sm rounded-lg border border-zinc-800 bg-zinc-900 p-4 text-left">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-500">Payment Link</p>
                  <p className="mb-3 break-all text-xs text-zinc-400">{result.payment_url}</p>
                  <button
                    onClick={() => copyLink(result.payment_url!)}
                    className="w-full rounded-md bg-white py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-100"
                  >
                    {linkCopied ? "Copied!" : "Copy link"}
                  </button>
                  <p className="mt-2 text-center text-xs text-zinc-600">Send via SMS or email - expires on payment</p>
                </div>
              )}

              {paymentMode === "manual" && (
                <div className="mt-4 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-400">
                  Payment recorded: <span className="font-semibold text-white">{MANUAL_LABELS[manualMethod]}</span>
                </div>
              )}

              <button
                onClick={resetOrder}
                className="mt-6 rounded-md border border-zinc-700 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-900"
              >
                New order
              </button>
            </div>
          )}

          {/* ── FORM ── */}
          {!result && (
            <div className="flex-1 space-y-0 divide-y divide-zinc-900">

              {/* Customer */}
              <section className="px-5 py-4">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Customer</p>
                <div className="relative mb-3">
                  <input
                    type="text"
                    value={contactQuery}
                    onChange={(e) => { setContactQuery(e.target.value); searchContacts(e.target.value); }}
                    onBlur={() => setTimeout(() => setShowContactDrop(false), 200)}
                    placeholder="Search CRM contacts..."
                    className={INPUT}
                  />
                  {loadingContacts && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-600">...</span>
                  )}
                  {showContactDrop && contacts.length > 0 && (
                    <div className="absolute z-20 mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-900 shadow-2xl overflow-hidden">
                      {contacts.map((c) => (
                        <button key={c.id} onMouseDown={() => selectContact(c)}
                          className="w-full px-4 py-2.5 text-left hover:bg-zinc-800 transition-colors">
                          <p className="text-sm font-medium text-white">{c.firstName} {c.lastName}</p>
                          <p className="text-xs text-zinc-500">{c.email}{c.phone ? ` · ${c.phone}` : ""}</p>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {customer.ghl_contact_id && (
                  <div className="mb-3 flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                    <span className="text-xs text-zinc-400">Linked to CRM</span>
                    <button onClick={() => setCustomer((c) => ({ ...c, ghl_contact_id: undefined }))}
                      className="ml-auto text-xs text-zinc-600 hover:text-zinc-400 transition-colors">Unlink</button>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-2">
                  <input value={customer.first_name} onChange={(e) => setCustomer((c) => ({ ...c, first_name: e.target.value }))} placeholder="First name" className={INPUT} />
                  <input value={customer.last_name} onChange={(e) => setCustomer((c) => ({ ...c, last_name: e.target.value }))} placeholder="Last name" className={INPUT} />
                  <input type="email" value={customer.email} onChange={(e) => setCustomer((c) => ({ ...c, email: e.target.value }))} placeholder="Email *" className={`${INPUT} col-span-2`} />
                  <input type="tel" value={customer.phone} onChange={(e) => setCustomer((c) => ({ ...c, phone: e.target.value }))} placeholder="Phone" className={`${INPUT} col-span-2`} />
                </div>
              </section>

              {/* Attribution */}
              <section className="px-5 py-4">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Attribution</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-xs text-zinc-600">Setter</label>
                    <input value={setterCode} onChange={(e) => setSetterCode(e.target.value)} placeholder="Staff code" className={INPUT} />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-zinc-600">Closer</label>
                    <div className="rounded-md border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-400">
                      {staff.name}
                    </div>
                  </div>
                </div>
              </section>

              {/* Payment */}
              <section className="px-5 py-4">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Payment</p>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {(["paylink", "manual"] as PaymentMode[]).map((mode) => (
                    <button key={mode} type="button" onClick={() => setPaymentMode(mode)}
                      className={`rounded-md border py-2.5 text-sm font-medium transition-colors ${
                        paymentMode === mode
                          ? "border-white bg-white text-black"
                          : "border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-white"
                      }`}>
                      {mode === "paylink" ? "Send payment link" : "Manual / collect"}
                    </button>
                  ))}
                </div>

                {paymentMode === "paylink" && (
                  <p className="rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2.5 text-xs text-zinc-500">
                    WooCommerce generates a one-time payment link. Copy and send via SMS or email. Expires automatically on payment.
                  </p>
                )}

                {paymentMode === "manual" && (
                  <div className="flex flex-wrap gap-2">
                    {(Object.keys(MANUAL_LABELS) as ManualMethod[]).map((m) => (
                      <button key={m} onClick={() => setManualMethod(m)}
                        className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
                          manualMethod === m
                            ? "border-white bg-white text-black"
                            : "border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-white"
                        }`}>
                        {MANUAL_LABELS[m]}
                      </button>
                    ))}
                  </div>
                )}
              </section>

              {/* Notes */}
              <section className="px-5 py-4">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Notes</p>
                <textarea rows={2} value={notes} onChange={(e) => setNotes(e.target.value)}
                  placeholder="Optional order notes..."
                  className="w-full resize-none rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:border-zinc-600 focus:outline-none"
                />
              </section>

              {/* Submit */}
              <section className="px-5 py-4">
                {submitError && (
                  <div className="mb-3 rounded-md border border-red-900 bg-red-950 px-3 py-2.5 text-sm text-red-400">
                    {submitError}
                  </div>
                )}
                <button
                  onClick={submitOrder}
                  disabled={submitting || !cart.length || !customer.email}
                  className="w-full rounded-md bg-white py-3.5 text-sm font-bold text-black transition hover:bg-zinc-100 disabled:opacity-30"
                >
                  {submitting
                    ? "Creating order..."
                    : cart.length === 0
                    ? "Add items to order"
                    : paymentMode === "paylink"
                    ? `Send payment link  $${total.toFixed(2)}`
                    : `Record order  $${total.toFixed(2)}`}
                </button>
                {!customer.email && cart.length > 0 && (
                  <p className="mt-2 text-center text-xs text-zinc-600">Customer email required</p>
                )}
              </section>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
