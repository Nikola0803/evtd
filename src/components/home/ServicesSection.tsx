import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

const CARDS = [
  {
    chip: "Most Popular",
    chipClass: "bg-sage-deep/10 text-sage-deep border-sage-deep/25",
    type: "Wellness Membership",
    title: "Monthly Membership",
    href: "/membership",
    bullets: [
      "Monthly 1-on-1 education session",
      "A learning plan shaped around your goals",
      "Questions and resource support between sessions",
    ],
    price: "$99",
    per: "/ month",
    cta: "Join the Membership",
    available: true,
    image: "/images/brand/program-membership-education.png",
    alt: "Woman taking part in an online wellness education session",
  },
  {
    chip: "Education",
    chipClass: "bg-stone/40 text-charcoal/70 border-stone/60",
    type: "Health Education",
    title: "Hormone Health Education",
    href: "/book",
    bullets: [
      "Plain-language hormone health education",
      "Research context for common hormone topics",
      "Better conversations with your healthcare provider",
    ],
    price: null,
    per: null,
    cta: "Book an Education Call",
    available: true,
    image: "/images/brand/program-hormone-education.png",
    alt: "Woman reading and taking notes for hormone health education",
  },
  {
    chip: "Core Education",
    chipClass: "bg-sage-deep/10 text-sage-deep border-sage-deep/25",
    type: "Research Education",
    title: "Peptide Education",
    href: "/book",
    bullets: [
      "Evidence-based education on peptide biology",
      "Compound category overviews and research guides",
      "Resources for better provider conversations",
    ],
    price: null,
    per: null,
    cta: "Book an Education Call",
    available: true,
    image: "/images/brand/program-peptide-education.png",
    alt: "Woman studying peptide education materials on a tablet",
  },
];

export function ServicesSection() {
  return (
    <section className="bg-ivory py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <Reveal>
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-copper">
                Featured Programs
              </p>
              <h2 className="font-display text-4xl font-semibold text-charcoal md:text-5xl">
                Expert-guided,{" "}
                <em className="font-accent not-italic text-copper">built around you.</em>
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-soft-gray">
                Plain-language wellness education, research context, and practical resources
                built around your goals.
              </p>
            </div>
            {/* Nav arrows — decorative, matching EverlifeMD layout */}
            <div className="hidden shrink-0 items-center gap-2 md:flex">
              <button className="flex h-9 w-9 items-center justify-center rounded-full border border-stone bg-ivory-soft text-charcoal/50 transition hover:border-copper/40 hover:text-charcoal">
                <i className="ri-arrow-left-s-line text-base" />
              </button>
              <button className="flex h-9 w-9 items-center justify-center rounded-full border border-stone bg-ivory-soft text-charcoal/50 transition hover:border-copper/40 hover:text-charcoal">
                <i className="ri-arrow-right-s-line text-base" />
              </button>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card) => (
            <Reveal key={card.title}>
              <div
                className={`flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_1px_4px_rgba(0,0,0,0.07)] transition duration-200 ${
                  card.available ? "hover:shadow-[0_4px_20px_rgba(0,0,0,0.10)] hover:-translate-y-1" : "opacity-60"
                }`}
              >
                <div className="relative h-[240px] overflow-hidden bg-stone/20">
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 via-transparent to-transparent" />
                  {/* Category chip — top-left inside card */}
                  <div className="absolute left-4 top-4 z-10">
                    <span
                      className={`inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] ${card.chipClass}`}
                    >
                      {card.chip}
                    </span>
                  </div>

                </div>

                {/* Content area */}
                <div className="flex flex-1 flex-col border-t border-stone/40 bg-white px-6 pb-6 pt-5">
                  <p className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-soft-gray/50">
                    {card.type}
                  </p>
                  <h3 className="font-display text-[22px] font-semibold leading-snug text-charcoal">
                    {card.title}
                  </h3>

                  <ul className="mt-4 flex flex-1 flex-col gap-2">
                    {card.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-[13px] leading-snug text-soft-gray">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-copper/50" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex items-center justify-between border-t border-stone/40 pt-5">
                    {card.price ? (
                      <div>
                        <span className="font-display text-2xl font-semibold text-charcoal">
                          {card.price}
                        </span>
                        <span className="ml-1 text-[12px] text-soft-gray">{card.per}</span>
                      </div>
                    ) : (
                      <div />
                    )}
                    <Link
                      href={card.href}
                      className={`rounded-full px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.15em] transition ${
                        card.available
                          ? "bg-charcoal text-ivory hover:bg-sage-deep"
                          : "bg-stone/30 text-soft-gray/40 cursor-default pointer-events-none"
                      }`}
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
