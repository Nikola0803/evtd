"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

const NAV = [
  { href: "/peptides", label: "Peptide Education" },
  { href: "/hormone-health", label: "Hormone Education" },
  { href: "/membership", label: "Membership" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-[32px] right-0 left-0 z-50 bg-[#18231E]/95 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? "shadow-sm shadow-black/20" : ""
      }`}
    >
      <div
        className={`mx-auto flex max-w-[1400px] items-center justify-between px-4 transition-[padding] duration-300 md:px-8 ${
          scrolled ? "py-2.5 md:py-3" : "py-4 md:py-5"
        }`}
      >
        <Logo tone="ivory" imgClassName="h-8 w-auto sm:h-9 lg:h-12" />

        <nav className="hidden items-center gap-5 text-[11px] font-medium uppercase tracking-[0.14em] text-white/85 lg:flex lg:gap-6">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 md:gap-3">
          <Link
            href="/book"
            className="hidden shrink-0 whitespace-nowrap rounded-full bg-[#D77E5F] px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-white transition hover:bg-[#C86B4D] lg:block"
          >
            Book Free Call
          </Link>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/85 transition hover:bg-white/10 hover:text-white lg:hidden"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            <i className={open ? "ri-close-line text-base" : "ri-menu-line text-base"} />
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-white/10 bg-[#18231E] px-4 pb-5 pt-3 lg:hidden">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="py-2.5 text-sm font-medium uppercase tracking-wide text-white">
              {item.label}
            </Link>
          ))}
          <Link href="/book" onClick={() => setOpen(false)} className="mt-2 rounded-full bg-[#D77E5F] px-4 py-3 text-center text-sm font-semibold uppercase tracking-wide text-white">
            Book Free Call
          </Link>
        </nav>
      )}
    </header>
  );
}
