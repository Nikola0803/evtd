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
      <input
        type="password"
        autoComplete="off"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Staff code"
        className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-zinc-600 focus:outline-none"
        autoFocus
      />
      {error && <p className="text-sm text-red-400">{error}</p>}
      <button
        type="submit"
        disabled={loading || !code}
        className="w-full rounded-lg bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-zinc-100 disabled:opacity-40"
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
