import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { posApi } from "@/lib/posApi";
import { saveSession } from "@/lib/posAuth";

export default function PosLogin() {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!pin.trim()) return;
    setLoading(true); setError("");
    try {
      const session = await posApi.login(pin.trim());
      saveSession(session);
      navigate(session.role === "admin" ? "/admin/dashboard" : "/pos/new-order");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid PIN");
    } finally { setLoading(false); }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background-100 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="font-heading text-2xl font-semibold text-foreground-950">evolv</p>
          <p className="mt-1 text-sm text-foreground-500">Staff Access</p>
        </div>
        <div className="rounded-2xl border border-background-300 bg-background-50 p-8 shadow-sm">
          <h1 className="mb-6 text-base font-semibold text-foreground-900">Sign in with your PIN</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-foreground-600">Staff PIN</label>
              <input type="password" value={pin} onChange={(e) => setPin(e.target.value)}
                placeholder="Enter your code" autoFocus
                className="w-full rounded-xl border border-background-300 bg-background-50 px-4 py-3 text-sm text-foreground-950 placeholder:text-foreground-300 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-200" />
            </div>
            {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">{error}</p>}
            <button type="submit" disabled={loading || !pin.trim()}
              className="w-full rounded-full bg-primary-500 px-5 py-3 text-sm font-semibold text-background-50 transition-colors hover:bg-primary-600 disabled:opacity-50">
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
        <p className="mt-6 text-center text-xs text-foreground-300">evolv Today Internal &mdash; Authorized Staff Only</p>
      </div>
    </div>
  );
}
