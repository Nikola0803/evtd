import Link from "next/link";
import Image from "next/image";
import { getGoogleReviews } from "@/lib/google-reviews";

const QUICK_LINKS = [
  { label: "Wellness Education", href: "/shop" },
  { label: "Women's Optimization", href: "/shop?category=womens" },
  { label: "Membership Plans", href: "/plans" },
  { label: "Free Consultation", href: "/contact" },
  { label: "Wellness Journal", href: "/journal" },
];

/**
 * Full-bleed video hero -- the actual everlifemd pattern (a full-width
 * banner video/image behind centered white headline copy), not a bento
 * tile grid. Matches the same video-hero treatment now used on /shop's
 * banner (ShopClient.tsx) so the site opens with one consistent visual
 * language instead of two different hero styles.
 */
export async function Hero() {
  const reviews = await getGoogleReviews();

  return (
    <section className="relative min-h-[720px] overflow-hidden bg-charcoal text-white md:min-h-[760px]">
      <Image
        src="/images/brand/wellness-hero.png"
        alt="Woman in a serene, sunlit wellness studio"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[68%_center]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(14,17,19,0.96)_0%,rgba(14,17,19,0.82)_38%,rgba(14,17,19,0.24)_70%,rgba(14,17,19,0.10)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/45 via-transparent to-charcoal/20" />

      <div className="relative mx-auto flex min-h-[720px] max-w-[1400px] items-center px-4 py-20 md:min-h-[760px] md:px-8">
        <div className="max-w-2xl text-left">
        <div className="mb-6 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.3em] text-copper-light">
          <span className="h-px w-10 bg-copper/70" />
          Wellness. Balance. Transformation.
        </div>

        <h1 className="font-display text-5xl font-semibold leading-[0.98] text-white md:text-7xl lg:text-[5.4rem]">
          Your health,
          <br />
          <span className="text-copper-light">made personal.</span>
        </h1>

        <p className="mt-7 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
          Plain-language peptide and wellness education - careful research context, practical resources,
          education, and expert guidance built around your goals.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          {reviews && reviews.rating > 0 ? (
            <a
              href={reviews.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-sm transition hover:border-white/30"
            >
              <Stars rating={reviews.rating} />
              <span className="text-xs font-semibold text-white">{reviews.rating.toFixed(1)}/5</span>
              <span className="text-xs text-white/60">· {reviews.reviewCount.toLocaleString()}+ client reviews</span>
            </a>
          ) : (
            <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
              <i className="ri-shield-check-line text-copper" /> Evidence-Based &amp; Women-First
            </div>
          )}
          <span className="hidden h-4 w-px bg-white/20 sm:block" />
          {["Personalized Plans", "Education First", "Private & Confidential"].map((label) => (
            <span key={label} className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-white/60">
              <i className="ri-check-line text-copper" />
              {label}
            </span>
          ))}
        </div>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Link
            href="/contact"
            className="rounded-md bg-copper px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-charcoal transition hover:bg-copper-light"
          >
            Book a Free Consultation
          </Link>
          <Link
            href="/shop"
            className="rounded-md border border-white/25 px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white/10"
          >
            Explore Programs
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          {QUICK_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-white/15 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.1em] text-white/70 transition hover:border-white/40 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-copper" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <i key={i} className={i < Math.round(rating) ? "ri-star-fill text-xs" : "ri-star-line text-xs text-white/30"} />
      ))}
    </span>
  );
}
