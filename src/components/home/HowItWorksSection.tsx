import { Reveal } from "@/components/ui/Reveal";

// Static calendar data — Jan 2026, day 15 selected
const CAL_WEEKS = [
  [null, null, null, 1, 2, 3, 4],
  [5, 6, 7, 8, 9, 10, 11],
  [12, 13, 14, 15, 16, 17, 18],
  [19, 20, 21, 22, 23, 24, 25],
  [26, 27, 28, 29, 30, 31, null],
];
const SELECTED = 15;

const GOALS = [
  { label: "Hormone Balance", on: true },
  { label: "Longevity", on: false },
  { label: "Weight & Metabolism", on: true },
  { label: "Performance", on: false },
  { label: "Sleep & Recovery", on: true },
  { label: "General Wellness", on: false },
];

const PLAN = [
  { icon: "ri-heart-pulse-line", title: "Hormone Health", sub: "Plain-language learning guide" },
  { icon: "ri-timer-line", title: "Longevity", sub: "Lifestyle optimisation plan" },
  { icon: "ri-flask-line", title: "Peptide Education", sub: "Research guide + advisor session" },
];

const STEPS = [
  {
    num: "01",
    heading: "Book Your Free Call",
    body: "A focused 15-minute call with your evolv advisor. Tell us your goals and how you want to feel.",
    visual: (
      <div className="flex h-full flex-col overflow-hidden rounded-md border border-stone bg-ivory">
        {/* Calendar header */}
        <div className="flex items-center justify-between border-b border-stone px-4 py-3">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal">January 2026</span>
          <div className="flex gap-1.5">
            <button className="flex h-6 w-6 items-center justify-center rounded text-soft-gray hover:bg-stone/40">
              <i className="ri-arrow-left-s-line text-sm" />
            </button>
            <button className="flex h-6 w-6 items-center justify-center rounded text-soft-gray hover:bg-stone/40">
              <i className="ri-arrow-right-s-line text-sm" />
            </button>
          </div>
        </div>
        {/* Day labels */}
        <div className="grid grid-cols-7 px-2 pt-2">
          {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
            <div key={i} className="py-1 text-center font-mono text-[9px] uppercase tracking-wider text-soft-gray/60">
              {d}
            </div>
          ))}
        </div>
        {/* Dates */}
        <div className="flex-1 px-2 pb-2">
          {CAL_WEEKS.map((week, wi) => (
            <div key={wi} className="grid grid-cols-7">
              {week.map((day, di) => (
                <div
                  key={di}
                  className={`flex h-7 items-center justify-center rounded font-mono text-[11px] transition ${
                    day === null
                      ? ""
                      : day === SELECTED
                      ? "bg-sage-deep font-semibold text-ivory"
                      : day < SELECTED
                      ? "text-soft-gray/40"
                      : "cursor-pointer text-charcoal hover:bg-stone/40"
                  }`}
                >
                  {day ?? ""}
                </div>
              ))}
            </div>
          ))}
        </div>
        {/* Time slot */}
        <div className="border-t border-stone bg-ivory-soft px-4 py-2.5">
          <div className="flex items-center gap-2">
            <i className="ri-time-line text-xs text-copper" />
            <span className="text-[11px] text-charcoal">Thu, 15 Jan &middot; 10:00 AM</span>
            <span className="ml-auto rounded bg-sage-deep/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-sage-deep">
              Confirmed
            </span>
          </div>
        </div>
      </div>
    ),
  },
  {
    num: "02",
    heading: "Share Your Goals",
    body: "Pick what you want to optimize. We build your plan around your biology and lifestyle — not a one-size-fits-all template.",
    visual: (
      <div className="flex h-full flex-col rounded-md border border-stone bg-ivory p-4">
        <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.2em] text-soft-gray/60">
          What would you like to work on?
        </p>
        <div className="grid flex-1 grid-cols-2 gap-2">
          {GOALS.map((g) => (
            <div
              key={g.label}
              className={`flex items-center gap-2 rounded-md border px-3 py-2 text-[11px] font-medium transition ${
                g.on
                  ? "border-copper/40 bg-copper/8 text-charcoal"
                  : "border-stone bg-ivory-soft text-soft-gray/60"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 shrink-0 rounded-full ${g.on ? "bg-copper" : "bg-soft-gray/30"}`}
              />
              {g.label}
            </div>
          ))}
        </div>
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-stone">
          <div className="h-full w-2/3 rounded-full bg-copper" />
        </div>
        <p className="mt-1.5 font-mono text-[9px] text-soft-gray/50">3 of 6 selected</p>
      </div>
    ),
  },
  {
    num: "03",
    heading: "Receive Your Resources",
    body: "Your learning resources are organized around the topics and questions that matter to you.",
    visual: (
      <div className="flex h-full flex-col rounded-md border border-stone bg-ivory p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-soft-gray/60">Your learning guide</p>
          <span className="rounded bg-sage-deep/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-sage-deep">
            Ready
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-2">
          {PLAN.map((p) => (
            <div
              key={p.title}
              className="flex items-center gap-3 rounded-md border border-stone bg-ivory-soft px-3 py-3"
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-copper/10">
                <i className={`${p.icon} text-sm text-copper`} />
              </div>
              <div>
                <p className="text-[12px] font-semibold text-charcoal">{p.title}</p>
                <p className="text-[10px] text-soft-gray">{p.sub}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3 font-mono text-[9px] text-soft-gray/40">
          Curated for your questions &middot; Updated monthly
        </p>
      </div>
    ),
  },
];

export function HowItWorksSection() {
  return (
    <section className="bg-ivory-soft py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <Reveal>
          <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-copper">
                Getting Started
              </p>
              <h2 className="font-display text-4xl font-semibold text-charcoal md:text-5xl">
                Getting started{" "}
                <em className="font-accent not-italic text-copper">is simple.</em>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-soft-gray">
              Tell us what you want to understand. We organize clear resources and useful questions around your goals.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {STEPS.map((step) => (
            <Reveal key={step.num}>
              <div className="flex h-full flex-col">
                {/* Visual panel */}
                <div className="h-[280px] overflow-hidden rounded-lg border border-stone shadow-sm">
                  {step.visual}
                </div>

                {/* Text */}
                <div className="mt-6 flex flex-1 flex-col">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-copper">
                      {step.num}
                    </span>
                    <span className="h-px flex-1 bg-stone" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-charcoal">{step.heading}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-soft-gray">{step.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
