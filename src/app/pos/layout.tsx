import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "evolv POS",
  robots: { index: false, follow: false },
};

export default function PosLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-ivory text-charcoal antialiased">{children}</div>
  );
}
