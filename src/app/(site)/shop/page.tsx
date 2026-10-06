import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Education Library",
  description: "Explore plain-language education on peptide science, hormone health, weight, longevity, energy, sleep, and recovery.",
  alternates: { canonical: "/shop" },
};

const TOPICS = [
  {
    title: "Weight Optimization",
    copy: "Explore the habits and research context behind sustainable body composition.",
    image: "/images/brand/focus-weight-optimization.png",
    href: "/weight-body-composition",
  },
  {
    title: "Longevity & Anti-Aging",
    copy: "Learn how sleep, movement, recovery, and everyday capacity shape healthy aging.",
    image: "/images/brand/focus-longevity.png",
    href: "/energy-longevity",
  },
  {
    title: "Hormone Balance",
    copy: "Build clear context around common hormone topics and the questions they raise.",
    image: "/images/brand/focus-hormone-balance.png",
    href: "/hormone-health",
  },
  {
    title: "Metabolic Wellness",
    copy: "Understand the relationship between daily habits, energy, and metabolic wellbeing.",
    image: "/images/brand/focus-metabolic-wellness.png",
    href: "/journal/metabolic-health-beyond-the-scale",
  },
  {
    title: "Performance & Energy",
    copy: "Explore how training, recovery, and daily rhythms work together.",
    image: "/images/brand/focus-performance-energy.png",
    href: "/performance-energy",
  },
  {
    title: "Sleep & Recovery",
    copy: "Learn the foundations of restorative sleep and more consistent recovery.",
    image: "/images/brand/focus-sleep-recovery.png",
    href: "/sleep-recovery",
  },
];

const GUIDES = [
  {
    eyebrow: "Core education",
    title: "Peptide Education",
    copy: "A clear introduction to peptide biology, research categories, and what evidence can and cannot tell us.",
    image: "/images/brand/program-peptide-education-v2.png",
    href: "/peptides",
  },
  {
    eyebrow: "Health education",
    title: "Hormone Health",
    copy: "Plain-language context for common hormone topics, without diagnosis or personal medical advice.",
    image: "/images/brand/program-hormone-education-v2.png",
    href: "/hormone-health",
  },
  {
    eyebrow: "Fresh perspectives",
    title: "The EVLV Journal",
    copy: "Short, thoughtful reads about energy, recovery, longevity, and sustainable wellbeing.",
    image: "/images/brand/program-membership-education-v2.png",
    href: "/journal",
  },
];

export default function EducationLibraryPage() {
  return (
    <>
      <section className="bg-[#18231E] px-4 py-14 text-white md:px-8 md:py-24">
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F2A58C]">Education library</p>
            <h1 className="mt-5 max-w-3xl font-display text-5xl font-semibold leading-[.98] tracking-[-.04em] md:text-7xl">
              Start with what you want to <span className="italic text-[#F2A58C]">understand.</span>
            </h1>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-white/65 md:text-lg lg:justify-self-end">
            Browse clear, practical education by goal or topic. No product catalog. No medical promises. Just useful context at your own pace.
          </p>
        </div>
      </section>

      <section className="bg-[#F6F0E7] px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-[1400px]">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B45C42]">Browse by goal</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-[-.035em] md:text-5xl">Find the topic that feels most useful today.</h2>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TOPICS.map((topic) => (
              <Link key={topic.title} href={topic.href} className="group overflow-hidden rounded-[1.5rem] bg-white shadow-[0_18px_50px_rgba(34,31,25,.06)]">
                <div className="relative aspect-[4/3] overflow-hidden bg-[#DDD0BE]">
                  <Image src={topic.image} alt={`${topic.title} education`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover object-center transition duration-700 group-hover:scale-[1.04]" />
                </div>
                <div className="p-6 md:p-7">
                  <h3 className="font-display text-2xl font-semibold">{topic.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#62675F]">{topic.copy}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#B45C42]">Explore education <span aria-hidden>→</span></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#DDD0BE] px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-[1400px]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8D4A38]">Start with a guide</p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-.035em] md:text-5xl">Three simple ways in.</h2>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {GUIDES.map((guide) => (
              <article key={guide.title} className="overflow-hidden rounded-[1.5rem] bg-[#F9F5EE]">
                <div className="relative h-60">
                  <Image src={guide.image} alt={`${guide.title} learning`} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover object-center" />
                </div>
                <div className="p-7">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B45C42]">{guide.eyebrow}</p>
                  <h3 className="mt-3 font-display text-3xl font-semibold">{guide.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-[#62675F]">{guide.copy}</p>
                  <Link href={guide.href} className="mt-7 inline-flex rounded-full bg-[#18231E] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">Open guide</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#D77E5F] px-4 py-16 text-center text-white md:px-8 md:py-20">
        <h2 className="font-display text-4xl font-semibold">Want help choosing where to begin?</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/75">Your first 15-minute education call is free. Bring the questions already on your mind.</p>
        <Link href="/book" className="mt-7 inline-flex rounded-full bg-[#18231E] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white">Book your first call</Link>
      </section>
    </>
  );
}
