"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const MAX_PIN = 8;
const MIN_PIN = 4;

const ROWS = [
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
    if (key === "del") setPin((p: string) => p.slice(0, -1));
    else if (key === "clear") setPin("");
    else if (pin.length < MAX_PIN) setPin((p: string) => p + key);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key >= "0" && e.key <= "9") pressKey(e.key);
      else if (e.key === "Backspace") pressKey("del");
      else if (e.key === "Escape") pressKey("clear");
      else if (e.key === "Enter" && pin.length >= MIN_PIN) void submit(pin);
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

  const dots = Math.max(pin.length, MIN_PIN);
  const ready = pin.length >= MIN_PIN;

  return (
    <div className="space-y-7">

      {/* PIN dot display */}
      <div className="flex flex-col items-center gap-3">
        <div
          className={`flex items-center gap-[18px] py-2 ${shake ? "animate-shake" : ""}`}
          aria-live="polite"
          aria-label={`${pin.length} digits entered`}
        >
          {Array.from({ length: dots }).map((_, i) => {
            const filled = i < pin.length;
            return (
              <span
                key={i}
                className={`block rounded-full transition-all duration-200 ease-out ${
                  filled
                    ? "h-[15px] w-[15px] scale-110 bg-copper shadow-[0_0_10px_3px_rgba(184,135,90,0.4)]"
                    : "h-[13px] w-[13px] border-[1.5px] border-ivory/20 bg-transparent"
                }`}
              />
            );
          })}
        </div>

        {/* Error row — reserves space to prevent layout shift */}
        <div className={`transition-opacity duration-200 ${error ? "opacity-100" : "opacity-0"}`}>
          <p className="text-xs text-red-400">{error || " "}</p>
        </div>
      </div>

      {/* Keypad */}
      <div className="grid grid-cols-3 gap-2">
        {ROWS.flat().map((key) => {
          const isAction = key === "clear" || key === "del";
          const isDisabled = loading || (!isAction && pin.length >= MAX_PIN);
          return (
            <button
              key={key}
              type="button"
              disabled={isDisabled}
              onClick={() => pressKey(key)}
              className={`
                flex h-[62px] items-center justify-center rounded-xl
                select-none transition-all duration-100
                active:scale-[0.91]
                disabled:pointer-events-none disabled:opacity-20
                ${isAction
                  ? "bg-transparent text-ivory/25 hover:text-ivory/55 active:bg-ivory/5"
                  : "bg-ivory/[.07] text-ivory/75 hover:bg-ivory/[.12] hover:text-ivory active:bg-copper/25 active:text-ivory"
                }
              `}
              aria-label={key === "del" ? "Backspace" : key === "clear" ? "Clear" : key}
            >
              {key === "del" ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M13 10H8M10 7l-3 3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M7.5 4h9A1.5 1.5 0 0 1 18 5.5v9A1.5 1.5 0 0 1 16.5 16h-9L2 10l5.5-6z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                </svg>
              ) : key === "clear" ? (
                <span className="text-[10px] font-medium uppercase tracking-widest">CLR</span>
              ) : (
                <span className="text-xl font-medium">{key}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Submit — slides up and fades in when ≥ MIN_PIN digits */}
      <div
        className={`transition-all duration-300 ease-out ${
          ready ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-2"
        }`}
      >
        <button
          type="button"
          disabled={loading || !ready}
          onClick={() => void submit(pin)}
          className="w-full rounded-xl bg-ivory/90 py-4 text-sm font-semibold text-charcoal transition-colors hover:bg-ivory active:bg-stone disabled:opacity-40"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-charcoal/20 border-t-charcoal" />
              Signing in…
            </span>
          ) : (
            "Sign in"
          )}
        </button>
      </div>
    </div>
  );
}
