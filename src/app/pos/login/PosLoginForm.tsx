"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function PosLoginForm() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/pos/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Invalid code.");
        return;
      }
      router.push("/pos/new-order");
      router.refresh();
    } catch {
      setError("Connection error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-charcoal/50">
          Staff Code
        </label>
        <input
          type="password"
          autoComplete="off"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter your staff code"
          className="w-full rounded-lg border border-stone bg-ivory px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/30 focus:border-copper focus:outline-none transition-colors"
          autoFocus
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={loading || !code}
        className="w-full rounded-lg bg-charcoal px-4 py-3 text-sm font-semibold text-ivory transition hover:bg-sage-deep disabled:opacity-40"
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
