import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "evolv POS",
  robots: "noindex,nofollow",
};

export default function PosLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--color-charcoal)] text-[var(--color-ivory)]">
      {children}
    </div>
  );
}
