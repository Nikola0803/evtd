import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ReviewsSection } from "@/components/home/ReviewsSection";

export const metadata: Metadata = {
  title: { absolute: "EVLV | Peptide & Wellness Education" },
  description: "Clear, practical education about peptide science, hormone health, longevity, and everyday wellness.",
};

const focusAreas = [
  {
    title: "Weight & Body Composition",
    tagline: "Build steady habits around strength, movement, and metabolic wellness.",
    image: "/images/brand/focus-weight-optimization.png",
    href: "/weight-body-composition",
  },
  {
    title: "Energy & Longevity",
    tagline: "Understand the foundations of consistent energy and long-term resilience.",
    image: "/images/brand/focus-longevity.png",
    href: "/energy-longevity",
  },
  {
    title: "Hormone Health",
    tagline: "Learn the language and context behind common hormone health questions.",
    image: "/images/brand/focus-hormone-balance.png",
    href: "/hormone-health",
  },
  {
    title: "Performance & Energy",
    tagline: "Explore how training, recovery, and daily capacity work together.",
    image: "/images/brand/focus-performance-energy.png",
    href: "/performance-energy",
  },
  {
    title: "Sleep & Recovery",
    tagline: "Build better rhythms for rest, recovery, and steadier days.",
    image: "/images/brand/focus-sleep-recovery.png",
    href: "/sleep-recovery",
  },
];

const programs = [
  {
    eyebrow: "Core education",
    title: "Peptide Education",
    copy: "Understand the language, research categories, and limits of common peptide claims.",
    href: "/peptides",
  },
  {
    eyebrow: "Health education",
    title: "Hormone Health",
    copy: "Build useful context around hormone health and learn to assess common claims.",
    href: "/hormone-health",
  },
  {
    eyebrow: "Ongoing learning",
    title: "Monthly Membership",
    copy: "Education sessions, organized resources, and support for the questions that matter to you.",
    href: "/membership",
  },
];

const comparisonRows = [
  "Plain-language explanations",
  "Research placed in context",
  "Clear limits on what evidence can say",
  "Organized learning pathways",
  "Questions shaped around your goals",
  "Ongoing education and new resources",
];

const learningPaths = [
  { label: "Metabolic Wellness", href: "/shop?focus=Metabolic-Assay-Peptides" },
  { label: "Hormone Balance", href: "/hormone-health" },
  { label: "Weight Optimization", href: "/weight-body-composition" },
  { label: "Longevity & Anti-Aging", href: "/energy-longevity" },
  { label: "Performance & Energy", href: "/performance-energy" },
  { label: "Sleep & Recovery", href: "/sleep-recovery" },
];

const faqs = [
  ["What does the session cost?", "Nothing. Your first 15-minute call is free, with no obligation."],
  ["Who will I be speaking with?", "One of our peptide education specialists. They listen to your questions and explain our resources in plain language."],
  ["Do I need to prepare anything?", "No. Come with whatever questions are on your mind."],
  ["Is this medical advice?", "No. EVLV is an education platform. We do not diagnose, prescribe, or provide treatment."],
  ["Will you try to sell me something?", "No. The first call is educational. There is no pitch and no obligation."],
  ["What happens to my information?", "It stays with our team. We follow applicable U.S. privacy laws and never sell your details."],
  ["Where is EVLV available?", "Online, across the United States. All you need is a phone or computer."],
];

const trustItems = [
  { icon: "ri-chat-smile-2-line", text: "Free 15-min pep talk" },
  { icon: "ri-microscope-line", text: "Peptide literacy" },
  { icon: "ri-shield-check-line", text: "Education only · not medical advice" },
  { icon: "ri-map-pin-user-line", text: "US-based wellness experts" },
  { icon: "ri-hand-heart-line", text: "No commitment, no obligation" },
];

export default function ConceptPage() {
  return (
    <main className="overflow-hidden bg-[#FAF2E4] text-[#1B1D19]">
      {/* ── Hero ── */}
      <section className="relative px-4 pb-16 pt-14 md:px-8 md:pb-24 md:pt-24">
        <div className="mx-auto max-w-[1280px]">
          <div className="mx-auto max-w-4xl text-center">
            <p className="inline-flex rounded-full border border-black/10 bg-white/55 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8D4A38]">U.S.-based wellness education</p>
            <p className="mt-8 text-lg font-semibold uppercase tracking-[0.2em] text-[#B45C42] md:text-xl">Evolve. Alter.</p>
            <h1 className="mt-5 font-display text-5xl font-semibold leading-[.96] tracking-[-.05em] md:text-7xl lg:text-[5.7rem]">Become your <span className="italic text-[#D77E5F]">ultimate.</span></h1>
            <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-[#5F625C] md:text-lg">Understand peptide science, hormone health, longevity, and everyday wellness. Clear education. No hype and no medical promises.</p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/book" className="rounded-full bg-[#1B1D19] px-8 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#314238]">Book your free pep talk</Link>
              <Link href="/peptides" className="rounded-full border border-black/15 bg-white/50 px-8 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#1B1D19] transition hover:bg-white">Explore peptide education</Link>
            </div>

            {/* Trust strip */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              {trustItems.map((item) => (
                <span key={item.text} className="flex items-center gap-1.5 text-[11px] font-medium text-[#7A6A56]">
                  <i className={`${item.icon} text-[#C4724A] text-sm leading-none`} aria-hidden />
                  {item.text}
                </span>
              ))}
            </div>
          </div>

          {/* Dark feature card */}
          <div className="mt-14 grid overflow-hidden rounded-[2rem] bg-[#1B1D19] shadow-[0_30px_90px_rgba(30,27,22,.12)] lg:grid-cols-[1.05fr_.95fr]">
            <div className="relative min-h-[420px] md:min-h-[560px]">
              <picture className="absolute inset-0 block">
                <source media="(max-width: 767px)" srcSet="/images/brand/wellness-hero-mobile.png" />
                <Image src="/images/brand/wellness-hero.png" alt="Woman exploring practical wellness education" fill priority sizes="(max-width: 1024px) 100vw, 54vw" className="object-cover object-center" />
              </picture>
            </div>
            <div className="flex flex-col justify-center p-8 text-white md:p-12 lg:p-14">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#F2A58C]">Your free pep talk starts here</p>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.02] tracking-[-.035em] md:text-5xl">Bring the questions. We&apos;ll bring context.</h2>
              <p className="mt-6 max-w-lg text-sm leading-relaxed text-white/70 md:text-base">Tell us what you want to understand and how you want to feel. We organize the research into clear, plain-language education — no pitch, no prescription.</p>
              <div className="mt-9 divide-y divide-white/10 border-y border-white/10">
                {[
                  ["ri-chat-smile-2-line", "Free 15-minute call with a wellness expert"],
                  ["ri-microscope-line", "Peptide literacy and research context"],
                  ["ri-shield-check-line", "Education only — not medical advice"],
                ].map(([icon, item]) => (
                  <div key={item} className="flex items-center gap-4 py-4">
                    <i className={`${icon} shrink-0 text-base leading-none text-[#F2A58C]`} aria-hidden />
                    <span className="text-sm text-white/85">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Goals ── */}
      <section id="goals" className="scroll-mt-28 bg-[#1B1D19] px-4 py-20 text-[#FAF2E4] md:px-8 md:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#E8B89F]">Start with how you want to feel</p>
              <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.02] tracking-[-.035em] md:text-6xl">Explore by goal.</h2>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/60 md:text-base">Pick the topic that matters most right now. We&apos;ll surface useful education and research context for that area.</p>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-white/45 lg:text-right">These are learning pathways, not medical care. Personal health questions belong with a licensed healthcare professional.</p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-[.88fr_1.12fr] lg:gap-12">
            <div className="relative min-h-[420px] overflow-hidden rounded-[1.7rem] lg:min-h-full">
              <Image src={focusAreas[0].image} alt="Woman exercising as part of a balanced wellness routine" fill sizes="(max-width: 1024px) 100vw, 44vw" className="object-cover object-center" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
              <p className="absolute inset-x-6 bottom-6 text-xs font-semibold uppercase tracking-[0.16em] text-white">Start with the goal that matters now</p>
            </div>
            <div className="overflow-hidden rounded-[1.7rem] border border-white/12">
              {focusAreas.map((area, index) => (
                <Link key={area.title} href={area.href} className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-white/10 px-5 py-6 transition last:border-b-0 hover:bg-white/[.06] md:px-7">
                  <span className="text-xs font-semibold text-[#F2A58C]">0{index + 1}</span>
                  <span>
                    <span className="block font-display text-xl font-semibold text-white md:text-2xl">{area.title}</span>
                    <span className="mt-1.5 block text-sm leading-relaxed text-white/55">{area.tagline}</span>
                  </span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition group-hover:border-[#D77E5F] group-hover:bg-[#D77E5F]" aria-hidden>→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Programs ── */}
      <section className="bg-[#D9C3A0] px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-[1440px]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8D4A38]">Ways to learn</p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.02] tracking-[-.035em] md:text-6xl">A clearer path through complex topics.</h2>
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {programs.map((program, index) => (
              <article key={program.title} className="flex min-h-[340px] flex-col rounded-[1.7rem] border border-black/10 bg-[#FCF3E5] p-7 md:p-9">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B45C42]">{program.eyebrow}</p>
                  <span className="font-display text-4xl font-semibold text-black/10">0{index + 1}</span>
                </div>
                <h3 className="mt-12 max-w-xs font-display text-3xl font-semibold leading-tight">{program.title}</h3>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#62675F]">{program.copy}</p>
                <Link href={program.href} className="mt-auto inline-flex items-center gap-2 pt-8 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1B1D19]">Explore education <span aria-hidden>→</span></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="bg-[#2E3B32] px-4 py-20 text-white md:px-8 md:py-28">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#E8B89F]">How it works</p>
            <h2 className="mt-4 font-display text-5xl font-semibold leading-[1] tracking-[-.04em] md:text-6xl">Learn without being sold a medical promise.</h2>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-white/65 md:text-base">We keep the boundary simple: EVLV explains research and organizes resources. Licensed healthcare professionals handle personal medical care.</p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-[1.7rem] bg-white/15 md:grid-cols-3">
            {[
              ["01", "Ask anything", "Start with what you want to understand. No prep needed — bring your questions as they are."],
              ["02", "Build real context", "Use clear guides and education sessions to make sense of the research and what it actually means."],
              ["03", "Move forward with confidence", "Take what you&apos;ve learned into your wellness journey — better informed, without the hype."],
            ].map(([num, title, copy]) => (
              <div key={num} className="bg-[#2E3B32] p-7 md:min-h-[280px] md:p-8">
                <p className="text-xs font-semibold tracking-[0.2em] text-[#E8B89F]">{num}</p>
                <h3 className="mt-10 font-display text-2xl font-semibold">{title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-white/55" dangerouslySetInnerHTML={{ __html: copy }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison ── */}
      <section className="bg-[#1B1D19] px-4 py-20 text-[#FAF2E4] md:px-8 md:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F2A58C]">
                <span className="h-px w-7 bg-[#F2A58C]" />A different kind of wellness resource
              </p>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.02] tracking-[-.035em] md:text-6xl">EVLV vs. scattered online claims.</h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-white/55 lg:text-right md:text-base">The difference is not hype. It is having a clear place to understand the research, its limits, and what it may mean for your goals.</p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-stretch lg:gap-12">
            <div className="relative min-h-[380px] overflow-hidden rounded-[1.7rem]">
              <Image src="/images/brand/program-membership-education.png" alt="A woman learning in a calm, bright room" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover object-center" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div className="absolute inset-x-5 bottom-5 rounded-2xl bg-[#1B1D19]/75 p-4 backdrop-blur-sm">
                <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#F2A58C]"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#D77E5F] text-white" aria-hidden>✓</span>Pep talks with purpose. Clarity without the hype.</p>
              </div>
            </div>

            <div>
              <div className="overflow-hidden rounded-[1.35rem] border border-white/12">
                <div className="grid grid-cols-[1.7fr_1fr_1fr] items-center gap-2 bg-white/[.07] px-4 py-4 text-[10px] font-semibold uppercase tracking-[0.12em] md:px-5">
                  <span className="text-white/65">What matters</span>
                  <span className="text-center text-[#F2A58C]">EVLV</span>
                  <span className="text-center text-white/35">Doing it alone</span>
                </div>
                {comparisonRows.map((row, index) => (
                  <div key={row} className={`grid grid-cols-[1.7fr_1fr_1fr] items-center gap-2 px-4 py-4 md:px-5 ${index % 2 === 0 ? "bg-white/[.03]" : "bg-transparent"}`}>
                    <span className="pr-2 text-sm leading-snug text-white/75">{row}</span>
                    <span className="flex justify-center"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#D77E5F] text-sm font-semibold text-white" aria-label="Included">✓</span></span>
                    <span className="flex justify-center"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-sm text-white/35" aria-label="Not consistently available"> - </span></span>
                  </div>
                ))}
              </div>

              <p className="mt-5 max-w-2xl text-xs leading-relaxed text-white/40">This comparison is general. EVLV provides education only. We do not diagnose, prescribe, recommend doses, or provide medical treatment.</p>
              <Link href="/book" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#D77E5F] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#C86B4D]">Book a free pep talk <span aria-hidden>→</span></Link>
            </div>
          </div>
        </div>
      </section>

      <ReviewsSection />

      {/* ── Learning paths ── */}
      <section className="bg-[#D9C3A0] px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-[1180px] rounded-[2rem] bg-[#FCF3E5] p-7 shadow-[0_24px_80px_rgba(34,31,25,.08)] md:p-12 lg:p-16">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B45C42]">Find your path</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.02] tracking-[-.035em] md:text-6xl">Not sure where to <span className="italic text-[#D77E5F]">begin?</span></h2>
            <p className="mt-5 text-sm leading-relaxed text-[#62675F] md:text-base">Choose the area that best matches your goals. Your first call is free.</p>
          </div>

          <div className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {learningPaths.map((path) => (
              <Link key={path.label} href={path.href} className="group flex min-h-[82px] items-center justify-between rounded-2xl border border-black/10 bg-[#FBF5EB] px-5 py-4 text-left transition hover:-translate-y-0.5 hover:border-[#D77E5F] hover:shadow-[0_12px_30px_rgba(34,31,25,.08)]">
                <span className="font-display text-xl font-semibold text-[#1B1D19]">{path.label}</span>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F3DDD3] text-[#B45C42] transition group-hover:bg-[#D77E5F] group-hover:text-white" aria-hidden>→</span>
              </Link>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-black/10 pt-8 sm:flex-row">
            <Link href="/shop" className="inline-flex items-center gap-2 rounded-full bg-[#1B1D19] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#314238]">Browse the Education Library <span aria-hidden>→</span></Link>
            <p className="text-sm text-[#62675F]">Explore each topic at your own pace.</p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-[#FAF2E4] px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B45C42]">Common questions</p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-.035em] md:text-5xl">Straight answers.</h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#62675F]">Warm, plain language. No inflated claims and no hidden medical service.</p>
          </div>
          <div className="divide-y divide-black/10 border-y border-black/10">
            {faqs.map(([question, answer]) => (
              <details key={question} className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-display text-xl font-semibold md:text-2xl">
                  {question}<span className="text-[#B45C42] transition group-open:rotate-45">+</span>
                </summary>
                <p className="max-w-2xl pt-4 text-sm leading-relaxed text-[#62675F]">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="px-4 pb-8 md:px-8">
        <div className="mx-auto grid min-h-[520px] max-w-[1440px] overflow-hidden rounded-[2rem] bg-[#D77E5F] lg:grid-cols-2">
          <div className="flex flex-col justify-center p-8 text-white md:p-14 lg:p-16">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">Your first call is free</p>
            <h2 className="mt-5 font-display text-5xl font-semibold leading-[.98] tracking-[-.04em] md:text-6xl">Start with one honest conversation.</h2>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-white/75 md:text-base">Tell us what you want to learn. We&apos;ll explain what EVLV can help you understand &mdash; and what belongs with a licensed professional.</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/book" className="inline-flex items-center gap-2 rounded-full bg-[#1B1D19] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#2E3B32]">Book your free pep talk</Link>
              <span className="text-[11px] text-white/55">Education only &middot; No commitment</span>
            </div>
          </div>
          <div className="relative min-h-[360px] lg:min-h-full">
            <Image src="/images/brand/wellness-consultation.png" alt="Warm online wellness education conversation" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>
        </div>
      </section>
    </main>
  );
}
