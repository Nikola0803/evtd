import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

const PHOTOS = [
  { src: "/images/brand/reviews-member-conversation.png", alt: "Two adults sharing a thoughtful conversation at home" },
  { src: "/images/brand/reviews-member-movement.png", alt: "Woman enjoying a walk after light exercise" },
  { src: "/images/brand/reviews-member-learning.png", alt: "Man reading and learning at a bright home desk" },
  { src: "/images/brand/reviews-member-reflection.png", alt: "Woman pausing with tea after journaling" },
  { src: "/images/brand/reviews-member-routine.png", alt: "Couple preparing a simple meal together" },
];

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

        {/* Trust header */}
        <Reveal>
          <div className="mb-10 flex flex-col items-center text-center">
            {/* Star badge */}
            <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-stone bg-white px-4 py-2 shadow-sm">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="ri-star-fill text-sm text-[#00b67a]" />
                ))}
              </div>
              <span className="font-semibold text-[13px] text-charcoal">4.9</span>
              <span className="text-stone/80">·</span>
              <span className="text-[12px] font-medium text-soft-gray">Excellent</span>
              <span className="text-stone/80">·</span>
              <span className="text-[11px] text-soft-gray/70">1,200+ reviews</span>
            </div>
            <h2 className="font-display text-4xl font-semibold text-charcoal md:text-5xl">
              Trusted by our{" "}
              <em className="font-accent not-italic text-copper">members.</em>
            </h2>
          </div>
        </Reveal>

        {/* Photo mosaic */}
        <Reveal>
          <div className="mb-6 grid h-[700px] grid-rows-[1.05fr_1fr] gap-1 overflow-hidden rounded-2xl sm:h-[480px] sm:grid-cols-[3fr_2fr] sm:grid-rows-1">
            <div className="relative overflow-hidden bg-ivory-soft">
              <Image src={PHOTOS[0].src} alt={PHOTOS[0].alt} fill sizes="(max-width: 640px) 100vw, 60vw" className="object-cover" />
            </div>
            <div className="grid grid-cols-2 grid-rows-2 gap-1">
              {PHOTOS.slice(1).map((photo, index) => (
                <div key={`${photo.src}-${index}`} className="relative overflow-hidden bg-ivory-soft">
                  <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 640px) 50vw, 20vw" className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Review cards */}
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
