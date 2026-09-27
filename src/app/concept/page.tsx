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
    image: "/images/brand/program-peptide-education-v2.png",
    href: "/peptides",
  },
  {
    eyebrow: "Health education",
    title: "Hormone Health",
    copy: "Build useful context around hormone health and learn to assess common claims.",
    image: "/images/brand/program-hormone-education-v2.png",
    href: "/hormone-health",
  },
  {
    eyebrow: "Ongoing learning",
    title: "Monthly Membership",
    copy: "Education sessions, organized resources, and support for the questions that matter to you.",
    image: "/images/brand/program-membership-education-v2.png",
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

export default function ConceptPage() {
  return (
    <main className="overflow-hidden bg-[#F6F0E7] text-[#1B1D19]">
      <section className="relative px-4 pb-10 pt-12 md:px-8 md:pb-16 md:pt-20">
        <div className="mx-auto grid max-w-[1440px] gap-5 lg:grid-cols-[1.32fr_.68fr]">
          <div className="relative min-h-[640px] overflow-hidden rounded-[2rem] bg-[#29362F] md:min-h-[720px]">
            <Image src="/images/brand/wellness-hero.png" alt="Woman exploring practical wellness education" fill priority sizes="(max-width: 1024px) 100vw, 68vw" className="object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/5" />
            <div className="absolute inset-x-0 bottom-0 p-7 text-white md:p-12 lg:p-14">
              <p className="mb-5 text-lg font-semibold uppercase tracking-[0.18em] text-[#F2A58C] md:text-xl">Evolve. Alter.</p>
              <h1 className="max-w-4xl font-display text-5xl font-semibold leading-[.95] tracking-[-.045em] md:text-7xl lg:text-[5.6rem]">
                Become your <br /><span className="text-[#F2A58C]">ultimate.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
                Understand peptide science, hormone health, longevity, and everyday wellness. Clear education. No hype and no medical promises.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/book" className="rounded-full bg-[#D77E5F] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#C86B4D]">Book your first call</Link>
                <Link href="/peptides" className="rounded-full border border-white/35 bg-white/10 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white backdrop-blur transition hover:bg-white/20">Explore peptide education</Link>
              </div>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1 lg:grid-rows-2">
            <div className="relative min-h-[310px] overflow-hidden rounded-[2rem] bg-[#D7B99D]">
              <Image src="/images/brand/program-peptide-education.png" alt="Woman studying peptide education materials" fill sizes="(max-width: 1024px) 50vw, 32vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#172019]/90 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#F0C9B8]">Start here</p>
                <h2 className="mt-2 font-display text-3xl font-semibold">Peptide education</h2>
                <Link href="/peptides" className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em]">Read the overview <span aria-hidden>→</span></Link>
              </div>
            </div>
            <div className="flex min-h-[310px] flex-col rounded-[2rem] bg-[#D77E5F] p-7 text-white md:p-9">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/65">A better first step</p>
                <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.02]">Bring the questions.<br />We’ll bring context.</h2>
              </div>
              <div className="mt-6">
                <p className="max-w-sm text-sm leading-relaxed text-white/75">Your first call is a free 15-minute conversation about what you want to learn.</p>
                <Link href="/book" className="mt-5 inline-flex rounded-full bg-[#1B1D19] px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white">Book an education call</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="goals" className="scroll-mt-28 bg-[#1B1D19] px-4 py-20 text-[#F6F0E7] md:px-8 md:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#E8B89F]">Start with how you feel</p>
              <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.02] tracking-[-.035em] md:text-6xl">Explore by how you want to feel.</h2>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/60 md:text-base">Pick the goal that matters most right now. We’ll surface useful education and research context for that topic.</p>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-white/45 lg:text-right">These are learning pathways, not medical care. Personal health questions belong with a licensed healthcare professional.</p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {focusAreas.map((area) => (
              <Link key={area.title} href={area.href} className="group relative flex min-h-[360px] flex-col justify-end overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#283229] text-left transition hover:border-[#E8B89F]/60 sm:min-h-[410px] lg:min-h-[440px]">
                <Image src={area.image} alt={`${area.title} education`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw" className="object-cover object-center transition duration-700 group-hover:scale-[1.05]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/5" />
                <div className="relative z-10 p-5 text-white md:p-6">
                  <span className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-lg transition group-hover:bg-[#D77E5F]" aria-hidden>↗</span>
                  <h3 className="font-display text-2xl font-semibold leading-tight">{area.title}</h3>
                  <p className="mt-3 text-[13px] leading-relaxed text-white/72">{area.tagline}</p>
                  <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#E8B89F]">Explore education <span aria-hidden>→</span></p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#DDD0BE] px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-[1440px]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8D4A38]">Ways to learn</p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.02] tracking-[-.035em] md:text-6xl">A clearer path through complex topics.</h2>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {programs.map((program) => (
              <article key={program.title} className="overflow-hidden rounded-[1.7rem] bg-[#F9F5EE]">
                <div className="relative h-64">
                  <Image src={program.image} alt={`${program.title} learning session`} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover" />
                </div>
                <div className="p-7 md:p-8">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B45C42]">{program.eyebrow}</p>
                  <h3 className="mt-3 font-display text-3xl font-semibold">{program.title}</h3>
                  <p className="mt-4 min-h-[66px] text-sm leading-relaxed text-[#62675F]">{program.copy}</p>
                  <Link href={program.href} className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#1B1D19] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">Learn more <span aria-hidden>→</span></Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#314238] px-4 py-20 text-white md:px-8 md:py-28">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#E8B89F]">How it works</p>
            <h2 className="mt-4 font-display text-5xl font-semibold leading-[1] tracking-[-.04em] md:text-6xl">Learn without being sold a medical promise.</h2>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-white/65 md:text-base">We keep the boundary simple: EVLV explains research and organizes resources. Licensed healthcare professionals handle personal medical care.</p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-[1.7rem] bg-white/15 md:grid-cols-3">
            {[
              ["01", "Tell us your questions", "Start with what you want to understand and how you want to feel."],
              ["02", "Build context", "Use clear guides and education sessions to make sense of the topic."],
              ["03", "Speak with your provider", "Bring better questions to a licensed healthcare professional."],
            ].map(([num, title, copy]) => (
              <div key={num} className="bg-[#314238] p-7 md:min-h-[280px] md:p-8">
                <p className="text-xs font-semibold tracking-[0.2em] text-[#E8B89F]">{num}</p>
                <h3 className="mt-10 font-display text-2xl font-semibold">{title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-white/55">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#1B1D19] px-4 py-20 text-[#F6F0E7] md:px-8 md:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F2A58C]">
                <span className="h-px w-7 bg-[#F2A58C]" />A different category of education
              </p>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.02] tracking-[-.035em] md:text-6xl">EVLV vs. scattered online claims.</h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-white/55 lg:text-right md:text-base">The difference is not hype. It is having a clear place to understand the research, its limits, and what it may mean for your goals.</p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-stretch lg:gap-12">
            <div className="relative min-h-[380px] overflow-hidden rounded-[1.7rem]">
              <Image src="/images/brand/program-membership-education.png" alt="A woman learning in a calm, bright room" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover object-center" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute inset-x-5 bottom-5 rounded-2xl bg-[#1B1D19]/75 p-4 backdrop-blur-sm">
                <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#F2A58C]"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#D77E5F] text-white" aria-hidden>✓</span>A clear place to learn, without the hype</p>
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
              <Link href="/book" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#D77E5F] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#C86B4D]">Book an education call <span aria-hidden>→</span></Link>
            </div>
          </div>
        </div>
      </section>

      <ReviewsSection />

      <section className="bg-[#DDD0BE] px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-[1180px] rounded-[2rem] bg-[#F9F5EE] p-7 shadow-[0_24px_80px_rgba(34,31,25,.08)] md:p-12 lg:p-16">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B45C42]">Find your path</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.02] tracking-[-.035em] md:text-6xl">Not sure where to <span className="italic text-[#D77E5F]">begin?</span></h2>
            <p className="mt-5 text-sm leading-relaxed text-[#62675F] md:text-base">Choose the area that best matches your goals.</p>
          </div>

          <div className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {learningPaths.map((path) => (
              <Link key={path.label} href={path.href} className="group flex min-h-[82px] items-center justify-between rounded-2xl border border-black/10 bg-white px-5 py-4 text-left transition hover:-translate-y-0.5 hover:border-[#D77E5F] hover:shadow-[0_12px_30px_rgba(34,31,25,.08)]">
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

      <section className="px-4 py-20 md:px-8 md:py-28">
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

      <section className="px-4 pb-8 md:px-8">
        <div className="mx-auto grid min-h-[520px] max-w-[1440px] overflow-hidden rounded-[2rem] bg-[#D77E5F] lg:grid-cols-2">
          <div className="flex flex-col justify-center p-8 text-white md:p-14 lg:p-16">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">Your first call is free</p>
            <h2 className="mt-5 font-display text-5xl font-semibold leading-[.98] tracking-[-.04em] md:text-6xl">Start with one honest conversation.</h2>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-white/75 md:text-base">Tell us what you want to learn. We’ll explain what EVLV can help you understand - and what belongs with a licensed professional.</p>
            <Link href="/book" className="mt-8 inline-flex w-fit rounded-full bg-[#1B1D19] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white">Book your first call</Link>
          </div>
          <div className="relative min-h-[360px] lg:min-h-full">
            <Image src="/images/brand/wellness-consultation.png" alt="Warm online wellness education conversation" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>
        </div>
      </section>
    </main>
  );
}
