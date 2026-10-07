import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { posApi, PosProduct } from "@/lib/posApi";
import { getSession, clearSession } from "@/lib/posAuth";

interface CartItem {
  product: PosProduct;
  quantity: number;
}

interface OrderForm {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  note: string;
}

export default function NewOrder() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<PosProduct[]>([]);
  const [searching, setSearching] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [form, setForm] = useState<OrderForm>({ first_name: "", last_name: "", email: "", phone: "", note: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<{ id: number; number: string; payment_url?: string } | null>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const session = getSession();
  const searchRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (searchRef.current) clearTimeout(searchRef.current);
    if (!search.trim()) { setProducts([]); return; }
    searchRef.current = setTimeout(async () => {
      setSearching(true);
      try { setProducts(await posApi.searchProducts(search)); }
      catch { setProducts([]); }
      finally { setSearching(false); }
    }, 300);
    return () => { if (searchRef.current) clearTimeout(searchRef.current); };
  }, [search]);

  function addToCart(product: PosProduct) {
    setCart((prev) => {
      const ex = prev.find((i) => i.product.id === product.id);
      return ex
        ? prev.map((i) => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i)
        : [...prev, { product, quantity: 1 }];
    });
    setSearch("");
    setProducts([]);
  }

  function updateQty(productId: number, qty: number) {
    if (qty < 1) return removeFromCart(productId);
    setCart((prev) => prev.map((i) => i.product.id === productId ? { ...i, quantity: qty } : i));
  }

  function removeFromCart(productId: number) {
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
  }

  const total = cart.reduce((sum, i) => sum + parseFloat(i.product.price) * i.quantity, 0);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!cart.length) { setError("Add at least one product."); return; }
    if (!form.first_name || !form.last_name || !form.email) { setError("First name, last name and email are required."); return; }
    setSubmitting(true);
    setError("");
    try {
      const order = await posApi.createOrder({
        ...form,
        items: cart.map((i) => ({ product_id: i.product.id, quantity: i.quantity })),
      });
      setSuccess({ id: order.id, number: order.number, payment_url: order.payment_url });
      setCart([]);
      setForm({ first_name: "", last_name: "", email: "", phone: "", note: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create order.");
    } finally {
      setSubmitting(false);
    }
  }

  function logout() { clearSession(); navigate("/pos/login"); }
  function newOrder() { setSuccess(null); }

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background-100 px-4">
        <div className="w-full max-w-sm text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
            <svg className="h-7 w-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 className="mb-1 text-lg font-semibold text-foreground-950">Order Created</h2>
          <p className="mb-6 text-sm text-foreground-500">Order #{success.number}</p>
          {success.payment_url && (
            <a href={success.payment_url} target="_blank" rel="noopener noreferrer"
              className="mb-3 block w-full rounded-full bg-primary-500 px-5 py-3 text-sm font-semibold text-background-50 text-center transition-colors hover:bg-primary-600">
              Send Payment Link
            </a>
          )}
          <button onClick={newOrder} className="w-full rounded-full border border-background-300 bg-background-50 px-5 py-3 text-sm font-semibold text-foreground-900 transition-colors hover:bg-background-100">
            New Order
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background-100">
      {/* Left: Product search + cart */}
      <div className="flex w-full flex-col md:w-[55%] border-r border-background-300">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-background-300 bg-background-50 px-5 py-3">
          <div>
            <p className="font-heading text-sm font-semibold text-foreground-950">evolv POS</p>
            <p className="text-[10px] text-foreground-400">{session?.name} &middot; {session?.role}</p>
          </div>
          <div className="flex items-center gap-3">
            {session?.role === "admin" && (
              <button onClick={() => navigate("/admin/dashboard")} className="text-xs text-foreground-400 hover:text-foreground-900">Admin</button>
            )}
            <button onClick={logout} className="text-xs text-foreground-400 hover:text-foreground-900">Sign out</button>
          </div>
        </div>

        {/* Search */}
        <div className="border-b border-background-200 bg-background-50 px-5 py-3">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-xl border border-background-300 bg-background-50 py-2.5 pl-9 pr-4 text-sm text-foreground-950 placeholder:text-foreground-300 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
            />
          </div>
        </div>

        {/* Results */}
        {(products.length > 0 || searching) && (
          <div className="overflow-y-auto border-b border-background-200 bg-background-50">
            {searching && <p className="px-5 py-3 text-xs text-foreground-400">Searching...</p>}
            {products.map((p) => (
              <button key={p.id} onClick={() => addToCart(p)}
                className="flex w-full items-center justify-between border-b border-background-100 px-5 py-3 text-left transition-colors last:border-0 hover:bg-primary-50/50">
                <div>
                  <p className="text-sm font-medium text-foreground-900">{p.name}</p>
                  <p className="text-xs text-foreground-400">{p.sku}</p>
                </div>
                <p className="ml-4 shrink-0 text-sm font-semibold text-primary-600">${p.price}</p>
              </button>
            ))}
          </div>
        )}

        {/* Cart */}
        <div className="flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-foreground-300">Search and add products above</p>
            </div>
          ) : (
            <div className="divide-y divide-background-200">
              {cart.map((item) => (
                <div key={item.product.id} className="flex items-center gap-4 px-5 py-3">
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium text-foreground-900">{item.product.name}</p>
                    <p className="text-xs text-foreground-400">${item.product.price} each</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQty(item.product.id, item.quantity - 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-lg border border-background-300 text-foreground-500 transition-colors hover:border-foreground-400">
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
                    </button>
                    <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                    <button onClick={() => updateQty(item.product.id, item.quantity + 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-lg border border-background-300 text-foreground-500 transition-colors hover:border-foreground-400">
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    </button>
                  </div>
                  <p className="w-16 text-right text-sm font-semibold text-foreground-900">
                    ${(parseFloat(item.product.price) * item.quantity).toFixed(2)}
                  </p>
                  <button onClick={() => removeFromCart(item.product.id)} className="text-foreground-300 hover:text-red-400">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Total */}
        {cart.length > 0 && (
          <div className="border-t border-background-300 bg-background-50 px-5 py-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-foreground-600">{cart.reduce((s, i) => s + i.quantity, 0)} items</p>
              <p className="text-lg font-semibold text-foreground-950">Total: ${total.toFixed(2)}</p>
            </div>
          </div>
        )}
      </div>

      {/* Right: Customer form */}
      <div className="hidden md:flex md:w-[45%] flex-col overflow-y-auto bg-background-50">
        <div className="border-b border-background-200 px-6 py-4">
          <h2 className="text-sm font-semibold text-foreground-900">Customer Details</h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-1 flex-col p-6">
          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {(["first_name", "last_name"] as const).map((field) => (
                <div key={field}>
                  <label className="mb-1 block text-xs font-medium capitalize text-foreground-600">
                    {field.replace("_", " ")} *
                  </label>
                  <input
                    type="text"
                    value={form[field]}
                    onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                    className="w-full rounded-xl border border-background-300 bg-background-50 px-3 py-2.5 text-sm text-foreground-950 placeholder:text-foreground-300 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-foreground-600">Email *</label>
              <input type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="w-full rounded-xl border border-background-300 bg-background-50 px-3 py-2.5 text-sm text-foreground-950 placeholder:text-foreground-300 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-foreground-600">Phone</label>
              <input type="tel" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                className="w-full rounded-xl border border-background-300 bg-background-50 px-3 py-2.5 text-sm text-foreground-950 placeholder:text-foreground-300 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-foreground-600">Order note</label>
              <textarea value={form.note} onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))} rows={3}
                className="w-full resize-none rounded-xl border border-background-300 bg-background-50 px-3 py-2.5 text-sm text-foreground-950 placeholder:text-foreground-300 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
              />
            </div>

            {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">{error}</p>}
          </div>

          <div className="mt-6 border-t border-background-200 pt-4">
            <div className="mb-4 flex items-center justify-between text-sm">
              <span className="text-foreground-500">Order total</span>
              <span className="text-lg font-semibold text-foreground-950">${total.toFixed(2)}</span>
            </div>
            <button
              type="submit"
              disabled={submitting || !cart.length}
              className="w-full rounded-full bg-primary-500 px-5 py-3.5 text-sm font-semibold text-background-50 transition-colors hover:bg-primary-600 disabled:opacity-50"
            >
              {submitting ? "Creating Order..." : "Create Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}