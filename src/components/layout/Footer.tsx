import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { NewsletterForm } from "./NewsletterForm";

const RESEARCH_NAV = [
  { href: "/shop", label: "Education Library" },
  { href: "/#goals", label: "Focus Areas" },
  { href: "/journal", label: "Journal" },
];

const COMPANY_NAV = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
  { href: "/account", label: "Account" },
];

const POLICIES_NAV = [
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
];

export function Footer() {
  return (
    <footer className="bg-charcoal pb-10 pt-24 text-white md:pt-36">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <Logo tone="ivory" imgClassName="h-14 w-auto md:h-20" />
            <p className="mt-4 max-w-md text-sm text-white/50">Warm, practical wellness education built around your goals and how you want to feel.</p>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-8 border-t border-white/10 pt-14 md:grid-cols-4">
          <FooterColumn title="Learn">
            {RESEARCH_NAV.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="text-sm text-white/60 transition hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Company">
            {COMPANY_NAV.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="text-sm text-white/60 transition hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Policies">
            {POLICIES_NAV.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="text-sm text-white/60 transition hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <NewsletterForm />
        </div>
      </div>

      <div id="legal-disclaimer" className="mx-auto mt-16 max-w-[1400px] scroll-mt-32 border-t border-white/10 px-4 pt-8 md:px-8">
        <div className="space-y-3 text-xs leading-relaxed text-white/40">
          <p>
            evolv is an educational service. We explain research and wellness topics in plain language. We do not provide medical care, diagnoses, prescriptions, or treatment plans.
          </p>
        </div>
        <div className="mt-6 flex flex-col gap-2 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <span>© evolv {new Date().getFullYear()}. All rights reserved.</span>
          <span>evolvPEPTIDES.COM</span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-4 text-[11px] font-semibold uppercase tracking-wider text-white/40">{title}</p>
      <ul className="space-y-3">{children}</ul>
    </div>
  );
}
