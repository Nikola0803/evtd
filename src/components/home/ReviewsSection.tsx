import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

const FEATURE_PHOTO = {
  src: "/images/brand/reviews-member-conversation.png",
  alt: "Two adults sharing a thoughtful conversation at home",
};

const REVIEWS = [
  {
    stars: 5,
    text: "The information felt built around my questions, not copied from a generic guide. The first call helped me understand where to begin.",
    initials: "EM",
    name: "Elena M.",
    category: "Hormone Health",
    duration: "3 months",
    avatarBg: "bg-sage-deep",
  },
  {
    stars: 5,
    text: "The science was explained in plain language without overselling it. I left with better questions and a much clearer view of the research.",
    initials: "JT",
    name: "James T.",
    category: "Longevity",
    duration: "6 months",
    avatarBg: "bg-copper",
  },
  {
    stars: 5,
    text: "I was skeptical about wellness education online. The resources were thoughtful, easy to follow, and clear about what belonged with my healthcare provider.",
    initials: "PS",
    name: "Priya S.",
    category: "Metabolic Wellness",
    duration: "4 months",
    avatarBg: "bg-charcoal",
  },
];

export function ReviewsSection() {
  return (
    <section className="bg-ivory py-16 md:py-24">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">

        <Reveal>
          <div className="mb-8 grid overflow-hidden rounded-[1.8rem] bg-charcoal md:grid-cols-[.9fr_1.1fr]">
            <div className="flex flex-col justify-center p-8 text-white md:p-12 lg:p-14">
              <div className="mb-6 inline-flex w-fit items-center gap-2.5 rounded-full border border-white/10 bg-white/[.06] px-4 py-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="ri-star-fill text-sm text-[#69C7A4]" />
                  ))}
                </div>
                <span className="text-[13px] font-semibold">4.9</span>
                <span className="text-white/30">·</span>
                <span className="text-[11px] text-white/60">1,200+ reviews</span>
              </div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-copper-light">Member perspective</p>
              <h2 className="mt-4 max-w-lg font-display text-4xl font-semibold leading-[1.02] md:text-5xl">Trusted for making complex topics feel clearer.</h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-white/60">Thoughtful education. Plain language. Clear limits on what belongs with a licensed healthcare professional.</p>
            </div>
            <div className="relative min-h-[360px] md:min-h-[520px]">
              <Image src={FEATURE_PHOTO.src} alt={FEATURE_PHOTO.alt} fill sizes="(max-width: 768px) 100vw, 55vw" className="object-cover" />
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {REVIEWS.map((r) => (
            <Reveal key={r.name}>
              <div className="flex h-full flex-col rounded-2xl border border-stone/50 bg-white p-6 shadow-sm">
                {/* Stars */}
                <div className="mb-4 flex gap-0.5">
                  {[...Array(r.stars)].map((_, i) => (
                    <i key={i} className="ri-star-fill text-sm text-[#00b67a]" />
                  ))}
                </div>

                {/* Quote */}
                <p className="flex-1 text-[14px] leading-relaxed text-charcoal/75">
                  &ldquo;{r.text}&rdquo;
                </p>

                {/* Reviewer */}
                <div className="mt-5 flex items-center gap-3 border-t border-stone/40 pt-4">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white ${r.avatarBg}`}
                  >
                    {r.initials}
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-charcoal">{r.name}</p>
                    <p className="text-[11px] text-soft-gray">
                      {r.category} · {r.duration}
                    </p>
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
