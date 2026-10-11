import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ReviewsSection } from "@/components/home/ReviewsSection";

export const metadata: Metadata = {
  title: { absolute: "EVLV | Peptide & Wellness Education" },
  description: "Clear, practical education about peptide science, hormone health, longevity, and everyday wellness.",
};

const focusAreas = [
  { title: "Weight & Body Composition", href: "/weight-body-composition", icon: "ri-scales-3-line" },
  { title: "Energy & Longevity", href: "/energy-longevity", icon: "ri-heart-pulse-line" },
  { title: "Hormone Health", href: "/hormone-health", icon: "ri-test-tube-line" },
  { title: "Performance & Energy", href: "/performance-energy", icon: "ri-flashlight-line" },
  { title: "Sleep & Recovery", href: "/sleep-recovery", icon: "ri-moon-line" },
];

const faqs = [
  ["What does the session cost?", "Nothing. Your first 15-minute call is free, with no obligation."],
  ["Who will I be speaking with?", "One of our peptide education specialists. They listen to your questions and explain our resources in plain language."],
  ["Do I need to prepare anything?", "No. Come with whatever questions are on your mind."],
  ["Is this medical advice?", "No. EVLV is an education platform. We do not diagnose, prescribe, or provide treatment."],
  ["Will you try to sell me something?", "No. The first call is educational. There is no pitch and no obligation."],
  ["What happens to my information?", "It stays with our team. We follow applicable U.S. privacy laws and never sell your details."],
];

export default function ConceptPage() {
  return (
    <main className="overflow-hidden bg-[#FAF2E4] text-[#1B1D19]">

      {/* ============================================================
          HERO -- centered, typography-first
      ============================================================ */}
      <section className="flex min-h-[88vh] flex-col items-center justify-center px-5 pb-12 pt-20 text-center md:px-10 md:pb-16 md:pt-28">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#D9C3A0] bg-[#F5EDD8] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8D4A38]">
          <i className="ri-shield-check-line text-xs" aria-hidden /> Peptide &amp; wellness education, US-wide
        </span>

        <h1 className="mt-8 max-w-3xl font-display text-[2.6rem] font-semibold leading-[.95] tracking-[-0.04em] md:text-[3.8rem] lg:text-[4.6rem]">
          Start with how you feel.<br />
          Build a plan around<br />
          <span className="text-[#D77E5F]">your goals.</span>
        </h1>

        <p className="mx-auto mt-7 max-w-lg text-base leading-relaxed text-[#5A5550]">
          EVLV is a US-based wellness education platform. We translate peptide science, hormone health, and longevity research into clear, honest guidance -- built around your goals, not a generic script.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link href="/book" className="inline-flex items-center gap-2.5 rounded-full bg-[#D77E5F] px-8 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#C86B4D]">
            Book a free call <span aria-hidden>--&gt;</span>
          </Link>
          <Link href="/peptides" className="inline-flex items-center gap-2.5 rounded-full border border-[#1B1D19]/20 bg-white/60 px-8 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#1B1D19] transition hover:bg-white">
            Browse our services
          </Link>
        </div>

        <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1B1D19]/30">
          Free &middot; 15 minutes &middot; By phone &middot; Anywhere in the US
        </p>

        {/* Feature cards below hero */}
        <div className="mt-16 grid w-full max-w-[1100px] gap-4 text-left sm:grid-cols-2">
          {/* Membership card */}
          <div className="relative overflow-hidden rounded-2xl bg-[#1B1D19] p-7 text-white md:p-9">
            <div className="absolute right-5 top-5 rounded-full bg-[#D77E5F] px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-white">Most popular</div>
            <div className="relative mb-4 h-40 overflow-hidden rounded-xl">
              <Image src="/images/brand/wellness-hero.png" alt="Wellness membership" fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover object-center" />
            </div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#E8B89F]">Membership</p>
            <h3 className="mt-2 font-display text-2xl font-semibold">Monthly Wellness Plan</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/55">Ongoing peptide education, a personal learning guide, and monthly 1-on-1 sessions with an EVLV wellness expert.</p>
            <div className="mt-6 flex items-center gap-4">
              <Link href="/membership" className="inline-flex items-center gap-2 rounded-full bg-[#D77E5F] px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#C86B4D]">See if I qualify</Link>
              <Link href="/membership" className="text-[11px] font-semibold text-white/50 transition hover:text-white">Learn more --&gt;</Link>
            </div>
          </div>

          {/* Free pep talk card */}
          <div className="relative overflow-hidden rounded-2xl bg-[#1B1D19] p-7 text-white md:p-9">
            <div className="absolute right-5 top-5 rounded-full bg-[#F5EDD8] px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#8D4A38]">Start here</div>
            <div className="relative mb-4 h-40 overflow-hidden rounded-xl">
              <Image src="/images/brand/wellness-consultation.png" alt="Free pep talk" fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover object-center" />
            </div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#E8B89F]">Free session</p>
            <h3 className="mt-2 font-display text-2xl font-semibold">Wellness optimization call</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/55">15 minutes with a wellness expert. We listen, explain the research, and map out the topics that apply to your goals.</p>
            <div className="mt-6">
              <Link href="/book" className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-white/20">Book free call --&gt;</Link>
            </div>
          </div>
        </div>

        {/* Disclaimer strip */}
        <div className="mt-6 flex w-full max-w-[1100px] items-center justify-center gap-2 rounded-xl border border-[#1B1D19]/8 bg-white/40 px-5 py-3">
          <i className="ri-shield-line text-sm text-[#C4724A]" aria-hidden />
          <p className="text-[11px] text-[#1B1D19]/40">Education only. EVLV does not diagnose, prescribe, or provide medical advice. Consult a licensed healthcare professional for personal health decisions.</p>
        </div>
      </section>

      {/* ============================================================
          TRUST STRIP
      ============================================================ */}
      <section className="border-y border-[#1B1D19]/8 bg-[#F0E8D5] px-5 py-8 md:px-10">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-center gap-x-10 gap-y-5 md:justify-between">
          {[
            { icon: "ri-chat-smile-2-line", label: "Free 15-min call", sub: "No obligation, no pitch" },
            { icon: "ri-microscope-line", label: "Peptide science", sub: "Translated into plain language" },
            { icon: "ri-shield-check-line", label: "Education only", sub: "Not medical advice" },
            { icon: "ri-map-pin-user-line", label: "US-based experts", sub: "Wellness specialists" },
            { icon: "ri-lock-line", label: "Private & secure", sub: "We never sell your data" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <i className={`${item.icon} text-xl text-[#C4724A]`} aria-hidden />
              <div>
                <p className="text-sm font-semibold text-[#1B1D19]">{item.label}</p>
                <p className="text-[11px] text-[#5A5550]">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
          GOALS -- explore by topic
      ============================================================ */}
      <section className="px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-14 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B45C42]">Explore by topic</p>
              <h2 className="mt-3 font-display text-4xl font-semibold tracking-[-0.04em] md:text-6xl">Where do you<br />want to start?</h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-[#5A5550]">Choose a focus area and we'll walk you through the research, context, and what questions to ask next.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {focusAreas.map((area, i) => (
              <Link
                key={area.title}
                href={area.href}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#1B1D19]/10 bg-[#F5EDD8] p-6 transition hover:-translate-y-1 hover:border-[#D77E5F] hover:shadow-[0_16px_40px_rgba(27,29,25,.09)]"
              >
                <div className="flex items-start justify-between">
                  <i className={`${area.icon} text-2xl text-[#C4724A]`} aria-hidden />
                  <span className="text-[10px] font-semibold tracking-[0.15em] text-[#1B1D19]/25">0{i + 1}</span>
                </div>
                <div className="mt-12">
                  <h3 className="font-display text-lg font-semibold leading-snug">{area.title}</h3>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#B45C42] transition group-hover:gap-3">Explore <span aria-hidden>--&gt;</span></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          PACKS -- what we offer
      ============================================================ */}
      <section className="bg-[#1B1D19] px-5 py-24 text-white md:px-10 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-14">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#E8B89F]">How to work with us</p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-[-0.04em] md:text-6xl">Choose your path.</h2>
          </div>

          <div className="grid gap-4 lg:grid-cols-4">
            {/* Free pep talk */}
            <article className="flex flex-col rounded-2xl border border-white/10 bg-white/[.05] p-7 transition hover:bg-white/[.07] md:p-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D77E5F]/20 text-[#F2A58C]">
                <i className="ri-chat-smile-2-line text-lg" aria-hidden />
              </div>
              <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#E8B89F]">Start here</p>
              <h3 className="mt-2 font-display text-2xl font-semibold">Free Pep Talk</h3>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-white/55">A 15-minute call with a wellness expert. Bring whatever questions are on your mind -- no prep, no pitch, no commitment.</p>
              <Link href="/book" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#D77E5F] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#C86B4D]">Book free call <span aria-hidden>--&gt;</span></Link>
            </article>

            {/* Topic deep dives */}
            <article className="flex flex-col rounded-2xl border border-white/10 bg-white/[.05] p-7 transition hover:bg-white/[.07] md:p-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/60">
                <i className="ri-microscope-line text-lg" aria-hidden />
              </div>
              <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#E8B89F]">Education sessions</p>
              <h3 className="mt-2 font-display text-2xl font-semibold">Topic Deep Dives</h3>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-white/55">Focused education sessions on peptide science, hormone health, longevity, and everyday wellness. Practical context, not medical advice.</p>
              <Link href="/peptides" className="mt-8 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70 transition hover:text-white">Explore topics <span aria-hidden>--&gt;</span></Link>
            </article>

            {/* Monthly membership -- featured */}
            <article className="flex flex-col rounded-2xl border border-[#D77E5F]/60 bg-[#D77E5F]/10 p-7 ring-1 ring-[#D77E5F]/30 transition hover:bg-[#D77E5F]/15 md:p-8">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D77E5F]/30 text-[#F2A58C]">
                  <i className="ri-medal-line text-lg" aria-hidden />
                </div>
                <span className="rounded-full bg-[#D77E5F] px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-white">Most popular</span>
              </div>
              <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#E8B89F]">Membership</p>
              <h3 className="mt-2 font-display text-2xl font-semibold">Monthly Plan</h3>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-white/55">Ongoing education, a personal learning guide, and monthly 1-on-1 sessions with an EVLV wellness expert. Built around your goals.</p>
              <Link href="/membership" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#D77E5F]">See if I qualify <span aria-hidden>--&gt;</span></Link>
            </article>

            {/* DNA Blueprint */}
            <article className="flex flex-col rounded-2xl border border-white/10 bg-white/[.05] p-7 transition hover:bg-white/[.07] md:p-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/60">
                <i className="ri-dna-line text-lg" aria-hidden />
              </div>
              <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#E8B89F]">Members only</p>
              <h3 className="mt-2 font-display text-2xl font-semibold">DNA Blueprint</h3>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-white/55">A home collection kit, a comprehensive genetic wellness report, and a private 60-minute consultation on what your DNA means for your health.</p>
              <Link href="/dna-blueprint" className="mt-8 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70 transition hover:text-white">Learn more <span aria-hidden>--&gt;</span></Link>
            </article>
          </div>
        </div>
      </section>

      {/* ============================================================
          WHY EVLV -- photo + 4 points
      ============================================================ */}
      <section className="px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-[1400px] items-center gap-16 lg:grid-cols-2">
          <div className="relative min-h-[520px] overflow-hidden rounded-[1.5rem]">
            <Image
              src="/images/brand/program-membership-education.png"
              alt="Wellness education in a calm, focused setting"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B45C42]">Why EVLV</p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-[-0.04em] md:text-5xl">Clarity, not a pitch.</h2>
            <p className="mt-5 text-base leading-relaxed text-[#5A5550]">Most wellness information either oversells or overwhelms. We built EVLV to be a third option: clear, honest, and built around your questions.</p>

            <div className="mt-10 space-y-7">
              {[
                ["ri-file-search-line", "Research in context", "We don't cherry-pick studies. We explain what the evidence actually shows and where it has limits."],
                ["ri-user-voice-line", "Your questions first", "Sessions are shaped around what you want to understand, not a script we need to get through."],
                ["ri-shield-line", "No medical claims", "We never diagnose, prescribe, or recommend doses. That boundary isn't a disclaimer -- it's how we operate."],
                ["ri-heart-line", "Education that sticks", "Learning pathways, not one-off answers. You leave every session with context, not just an answer."],
              ].map(([icon, title, body]) => (
                <div key={title as string} className="flex gap-5">
                  <i className={`${icon} mt-0.5 shrink-0 text-xl text-[#C4724A]`} aria-hidden />
                  <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-[#5A5550]">{body}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/book" className="mt-12 inline-flex items-center gap-2 rounded-full bg-[#1B1D19] px-8 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#2A2C27]">
              Book your free pep talk
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          REVIEWS
      ============================================================ */}
      <ReviewsSection />

      {/* ============================================================
          FAQ
      ============================================================ */}
      <section className="bg-[#F0E8D5] px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-[.75fr_1.25fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B45C42]">Common questions</p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-[-0.04em] md:text-5xl">Straight answers.</h2>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-[#5A5550]">No hidden agenda and no medical service. Just honest answers to the questions we hear most.</p>
            <Link href="/book" className="mt-10 inline-flex items-center gap-2 rounded-full border border-[#1B1D19]/20 bg-white/60 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#1B1D19] transition hover:bg-white">
              Still have questions? Book a call
            </Link>
          </div>

          <div className="divide-y divide-[#1B1D19]/8">
            {faqs.map(([question, answer]) => (
              <details key={question} className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-xl font-semibold">
                  {question}
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#1B1D19]/15 text-[#B45C42] transition group-open:rotate-45 group-open:border-[#D77E5F] group-open:bg-[#D77E5F] group-open:text-white">+</span>
                </summary>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#5A5550]">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          FINAL CTA
      ============================================================ */}
      <section className="px-5 pb-10 pt-4 md:px-10">
        <div className="mx-auto grid min-h-[560px] max-w-[1400px] overflow-hidden rounded-[2rem] bg-[#1B1D19] lg:grid-cols-[1.1fr_.9fr]">
          <div className="flex flex-col justify-center p-10 text-white md:p-16 lg:p-20">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#E8B89F]">Your first call is free</p>
            <h2 className="mt-5 font-display text-5xl font-semibold leading-[.95] tracking-[-0.04em] md:text-6xl lg:text-7xl">
              One honest<br />conversation.
            </h2>
            <p className="mt-7 max-w-md text-base leading-relaxed text-white/60">
              Tell us what you want to learn. We'll explain what EVLV can help you understand -- and what belongs with a licensed professional.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Link href="/book" className="inline-flex items-center gap-2 rounded-full bg-[#D77E5F] px-8 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#C86B4D]">
                Book your free pep talk
              </Link>
              <span className="text-[11px] text-white/35">Education only &middot; No commitment &middot; Always free</span>
            </div>
          </div>
          <div className="relative min-h-[380px] lg:min-h-full">
            <Image
              src="/images/brand/wellness-consultation.png"
              alt="Warm wellness education conversation"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>

    </main>
  );
}
