"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const DISMISSED_KEY = "evlv-today-call-launch-dismissed";

export function CallLaunchPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (pathname === "/book" || sessionStorage.getItem(DISMISSED_KEY)) return;
    const timer = window.setTimeout(() => setOpen(true), 0);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => ctaRef.current?.focus(), 100);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  function dismiss() {
    sessionStorage.setItem(DISMISSED_KEY, "1");
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center overflow-y-auto bg-[#101612]/80 p-3 backdrop-blur-md sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="call-launch-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) dismiss();
      }}
    >
      <div className="relative grid w-full max-w-4xl overflow-hidden rounded-[2rem] bg-[#F6F0E7] shadow-[0_32px_120px_rgba(15,23,18,.4)] md:grid-cols-[1.05fr_.95fr]">
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close call announcement"
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-[#18231E]/55 text-xl text-white backdrop-blur transition hover:bg-[#18231E]"
        >
          <i className="ri-close-line" aria-hidden="true" />
        </button>

        <div className="relative min-h-[250px] overflow-hidden md:min-h-[610px]">
          <Image
            src="/images/brand/wellness-consultation.png"
            alt="A personal EVLV education conversation"
            fill
            priority
            sizes="(min-width: 768px) 470px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#18231E]/70 via-transparent to-transparent" />
          <p className="absolute bottom-6 left-6 right-6 text-[10px] font-semibold uppercase tracking-[.24em] text-white/80 md:bottom-8 md:left-8">
            Personal education. Real conversation.
          </p>
        </div>

        <div className="flex flex-col justify-center px-6 py-10 sm:px-10 md:px-12 md:py-14">
          <p className="text-[10px] font-semibold uppercase tracking-[.25em] text-[#B45C42]">Now opening</p>
          <h2 id="call-launch-title" className="mt-4 font-display text-4xl font-semibold leading-[1.02] tracking-[-.035em] text-[#18231E] sm:text-5xl">
            Your first EVLV call is free.
          </h2>
          <p className="mt-5 text-sm leading-6 text-[#62675F]">
            Reserve a calm, focused 15-minute conversation about the wellness topics you want to understand. No pitch, no obligation, and no medical advice.
          </p>

          <div className="mt-7 space-y-3 text-sm text-[#314238]">
            {[
              "Choose the topics that matter to you",
              "Pick an available time online",
              "We call you directly, no app required",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F3DDD3] text-[11px] font-bold text-[#B45C42]">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          <Link
            ref={ctaRef}
            href="/book?source=launch-popup"
            onClick={dismiss}
            className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#D77E5F] px-7 text-xs font-semibold uppercase tracking-[.15em] text-white transition hover:bg-[#C86B4D] focus:outline-none focus:ring-2 focus:ring-[#D77E5F] focus:ring-offset-2"
          >
            Pre-register for my call <span aria-hidden="true">→</span>
          </Link>
          <button type="button" onClick={dismiss} className="mt-4 text-xs font-semibold text-[#62675F] underline decoration-black/20 underline-offset-4 hover:text-[#18231E]">
            I&apos;ll explore first
          </button>
        </div>
      </div>
    </div>
  );
}
