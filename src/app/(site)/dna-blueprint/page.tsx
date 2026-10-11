import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "DNA Blueprint | EVLV",
  description: "A home collection kit, a comprehensive genetic wellness report, and a private 60-minute consultation to understand what your DNA means for your health, hormones, and longevity.",
  alternates: { canonical: "/dna-blueprint" },
};

export default function DnaBlueprintPage() {
  return (
    <>
      <section className="-mt-[90px] bg-[#1B1D19] pb-20 pt-[150px] text-center text-white md:-mt-[100px] md:pb-32 md:pt-[180px]">
        <div className="mx-auto max-w-[800px] px-4 md:px-8">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-copper">Genetic Wellness</p>
          <h1 className="font-display text-4xl font-semibold leading-tight md:text-6xl">
            DNA Blueprint
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
            A home collection kit, a comprehensive genetic wellness report, and a private 60-minute consultation to walk you through exactly what your DNA means for your health, hormones, and longevity.
          </p>
          <p className="mt-4 text-sm text-white/40">Available to EVLV members · Priority access included with membership</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/book" className="rounded-full bg-[#D77E5F] px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#C86B4D]">
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <h2 className="mb-10 text-center font-display text-3xl font-semibold text-charcoal md:text-4xl">What&apos;s included</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              { num: "01", title: "Home Collection Kit", body: "Simple, painless cheek swab. Mail it back prepaid and we handle the rest." },
              { num: "02", title: "Genetic Wellness Report", body: "A detailed analysis of your genetic markers for hormones, metabolism, inflammation, sleep, and longevity pathways." },
              { num: "03", title: "Private 60-Min Consult", body: "A 1-on-1 session with your EVLV consultant to interpret your results and build your personalized action plan." },
            ].map((item) => (
              <div key={item.num} className="rounded-lg border border-stone bg-ivory-soft p-8">
                <p className="mb-3 font-display text-sm font-semibold text-copper">{item.num}</p>
                <h3 className="font-display text-lg font-semibold text-charcoal">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-soft-gray">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#1B1D19] py-16 text-center text-white md:py-24">
        <div className="mx-auto max-w-[600px] px-4">
          <h2 className="font-display text-2xl font-semibold md:text-3xl">Interested in your blueprint?</h2>
          <p className="mt-4 text-sm text-white/60">Start with a free 15-minute call to see if this is the right next step for you.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/book" className="rounded-full bg-[#D77E5F] px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#C86B4D]">
              Book a Free Call
            </Link>
            <Link href="/membership" className="rounded-full border border-white/25 px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-white/10">
              View Membership
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
