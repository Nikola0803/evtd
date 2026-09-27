import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

const CARDS = [
  {
    eyebrow: "evolv Affiliates",
    heading: "Become an",
    headingAccent: "evolv Affiliate.",
    body: "Share clear wellness education with your audience. Earn commission on referred memberships and stay supported by our team.",
    bullets: [
      { bold: "Monthly", rest: " commission payments" },
      { bold: "Dedicated", rest: " affiliate support team" },
      { bold: "Exclusive", rest: " content & early access" },
    ],
    cta: "Apply Here",
    href: "/affiliates",
    bg: "bg-sage-deep",
    glow: "rgba(49,71,67,0.0)",
    glowAccent: "rgba(184,135,90,0.15)",
  },
  {
    eyebrow: "Refer a Friend",
    heading: "Give 15%.",
    headingAccent: "Get $50.",
    body: "You earn $50 in member credit for every friend who joins evolv — with no cap on how many you can refer. They get 15% off their first month.",
    bullets: [
      { bold: "$50", rest: " member credit per referral" },
      { bold: "15% off", rest: " for your friends" },
      { bold: "No limit", rest: " on referrals" },
    ],
    cta: "Refer a Friend",
    href: "/refer",
    bg: "bg-copper-dark",
    glow: "rgba(143,104,71,0.0)",
    glowAccent: "rgba(255,255,255,0.08)",
  },
];

export function AffiliateSection() {
  return (
    <section className="bg-ivory py-16 md:py-24">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {CARDS.map((card) => (
            <Reveal key={card.eyebrow}>
              <div
                className={`relative flex h-full min-h-[460px] flex-col overflow-hidden rounded-2xl p-8 text-white md:p-10 ${card.bg}`}
              >
                {/* Subtle radial glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: `radial-gradient(ellipse at 80% 20%, ${card.glowAccent} 0%, transparent 60%)`,
                  }}
                />

                <div className="relative flex flex-1 flex-col">
                  {/* Eyebrow */}
                  <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/50">
                    {card.eyebrow}
                  </p>

                  {/* Heading */}
                  <h2 className="font-display text-4xl font-semibold leading-tight md:text-5xl">
                    {card.heading}{" "}
                    <em className="not-italic italic text-white/80">{card.headingAccent}</em>
                  </h2>

                  {/* Body */}
                  <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/65">
                    {card.body}
                  </p>

                  {/* Bullets */}
                  <ul className="mt-8 flex flex-col gap-3">
                    {card.bullets.map((b) => (
                      <li key={b.bold} className="flex items-center gap-3 text-[14px] text-white/80">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/25">
                          <i className="ri-check-line text-[11px] text-white/70" />
                        </span>
                        <span>
                          <strong className="font-semibold text-white">{b.bold}</strong>
                          {b.rest}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="mt-auto pt-10">
                    <Link
                      href={card.href}
                      className="inline-flex h-12 items-center rounded-full bg-white px-7 text-[12px] font-semibold uppercase tracking-[0.15em] text-charcoal transition hover:bg-ivory-soft"
                    >
                      {card.cta}
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
