import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsletter | evolv",
  description: "The evolv newsletter - evidence-based wellness insights, hormone health education, and members-only content delivered to your inbox.",
  alternates: { canonical: "/newsletter" },
};

export default function NewsletterPage() {
  return (
    <>
      <section className="-mt-[90px] bg-charcoal pb-20 pt-[150px] text-center text-white md:-mt-[100px] md:pb-32 md:pt-[180px]">
        <div className="mx-auto max-w-[700px] px-4 md:px-8">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-copper">The evolv Newsletter</p>
          <h1 className="font-display text-4xl font-semibold leading-tight md:text-6xl">
            Wellness intelligence,
            <br />
            <em className="text-sage-light not-italic">in your inbox.</em>
          </h1>
          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-white/70">
            Evidence-based insights on hormone health, metabolic optimization, longevity, and the science behind
            sustainable wellness. No fluff. Biweekly.
          </p>
          <form className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full max-w-sm rounded-md border border-white/20 bg-white/10 px-5 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-copper sm:w-auto"
            />
            <button type="submit" className="rounded-md bg-copper px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.2em] text-charcoal transition hover:bg-copper-light">
              Subscribe
            </button>
          </form>
          <p className="mt-3 text-[11px] text-white/30">No spam. Unsubscribe at any time.</p>
        </div>
      </section>

      <section className="bg-ivory py-16 md:py-24">
        <div className="mx-auto max-w-[900px] px-4 md:px-8">
          <h2 className="mb-8 font-display text-2xl font-semibold text-charcoal md:text-3xl">Past issues</h2>
          <div className="divide-y divide-stone">
            {[
              { issue: "Issue 04", title: "The Cortisol Curve: Why stress is the hidden hormone problem", date: "September 2026" },
              { issue: "Issue 03", title: "Perimenopause starts at 35: What the research actually says", date: "August 2026" },
              { issue: "Issue 02", title: "Sleep architecture and hormonal recovery - the real connection", date: "August 2026" },
              { issue: "Issue 01", title: "Why metabolic health matters more than your weight", date: "July 2026" },
            ].map((item) => (
              <div key={item.issue} className="py-6">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-copper">{item.issue} · {item.date}</p>
                <h3 className="mt-1.5 font-display text-lg font-medium text-charcoal">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
