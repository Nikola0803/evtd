"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const MAX_PIN = 8;

const PAD_KEYS = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["clear", "0", "del"],
];

export function PosLoginForm() {
  const router = useRouter();
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (!error) return;
    setShake(true);
    const t = setTimeout(() => setShake(false), 500);
    return () => clearTimeout(t);
  }, [error]);

  function pressKey(key: string) {
    if (loading) return;
    setError("");
    if (key === "del") {
      setPin((p: string) => p.slice(0, -1));
    } else if (key === "clear") {
      setPin("");
    } else if (pin.length < MAX_PIN) {
      setPin((p: string) => p + key);
    }
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key >= "0" && e.key <= "9") pressKey(e.key);
      else if (e.key === "Backspace") pressKey("del");
      else if (e.key === "Escape") pressKey("clear");
      else if (e.key === "Enter" && pin.length >= 4) submit(pin);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pin, loading]);

  async function submit(code: string) {
    if (!code || loading) return;
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
        setError(data.error ?? "Invalid PIN.");
        setPin("");
        return;
      }
      router.push("/pos/new-order");
      router.refresh();
    } catch {
      setError("Connection error. Try again.");
      setPin("");
    } finally {
      setLoading(false);
    }
  }

  const displayLen = Math.max(pin.length, 4);

  return (
    <div className="space-y-6">
      {/* PIN display */}
      <div
        className={`flex justify-center gap-3 ${shake ? "animate-shake" : ""}`}
        aria-live="polite"
        aria-label={`${pin.length} digits entered`}
      >
        {Array.from({ length: displayLen }).map((_, i) => (
          <span
            key={i}
            className={`h-3 w-3 rounded-full border-2 transition-all duration-150 ${
              i < pin.length
                ? "border-charcoal bg-charcoal scale-110"
                : "border-stone bg-transparent"
            }`}
          />
        ))}
      </div>

      {/* Error */}
      {error && (
        <p className="text-center text-sm text-red-600">{error}</p>
      )}

      {/* Number pad */}
      <div className="grid grid-cols-3 gap-2.5">
        {PAD_KEYS.flat().map((key) => {
          const isAction = key === "clear" || key === "del";
          const isDisabled = loading || (key !== "clear" && key !== "del" && pin.length >= MAX_PIN);
          return (
            <button
              key={key}
              type="button"
              disabled={isDisabled}
              onClick={() => pressKey(key)}
              className={`relative flex h-14 items-center justify-center rounded-xl text-base font-semibold transition-all active:scale-95 select-none ${
                isAction
                  ? "border border-stone bg-ivory text-charcoal/50 hover:border-charcoal/30 hover:text-charcoal"
                  : "border border-stone bg-white text-charcoal shadow-sm hover:border-copper/50 hover:bg-ivory"
              } disabled:pointer-events-none disabled:opacity-30`}
              aria-label={key === "del" ? "Backspace" : key === "clear" ? "Clear" : key}
            >
              {key === "del" ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-current">
                  <path d="M14 10H8M10 7l-3 3 3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M7.5 4h9a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 16.5 16h-9L2 10l5.5-6z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                </svg>
              ) : key === "clear" ? (
                <span className="text-xs uppercase tracking-widest">CLR</span>
              ) : (
                key
              )}
            </button>
          );
        })}
      </div>

      {/* Submit */}
      <button
        type="button"
        disabled={loading || pin.length < 4}
        onClick={() => submit(pin)}
        className="w-full rounded-xl bg-charcoal py-3.5 text-sm font-semibold text-ivory transition hover:bg-sage-deep disabled:opacity-30"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-ivory/30 border-t-ivory" />
            Signing in…
          </span>
        ) : (
          "Sign in"
        )}
      </button>
    </div>
  );
}
