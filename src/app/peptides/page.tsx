import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Peptide Education",
  description: "Plain-language peptide education, research context, and resources for better conversations with a licensed healthcare professional.",
  alternates: { canonical: "/peptides" },
};

export default function PeptidesPage() {
  return (
    <>
      <section className="bg-[#F6F0E7] px-4 py-8 md:px-8 md:py-14">
        <div className="mx-auto grid max-w-[1400px] overflow-hidden rounded-[2rem] bg-[#18231E] lg:grid-cols-[1fr_1.05fr]">
          <div className="flex flex-col justify-center p-8 text-white md:p-14 lg:p-16">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#F2A58C]">Core Education</p>
            <h1 className="font-display text-4xl font-semibold leading-tight md:text-6xl">Peptide Education</h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
            Peptides are one of the most discussed topics in modern wellness — and one of the most misunderstood.
            We explain what peptides are, how researchers study them, and how to read common claims with more context.
            </p>
            <p className="mt-4 text-xs uppercase tracking-widest text-white/40">Education only · No prescriptions · No medical care</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/book" className="rounded-full bg-[#D77E5F] px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#C86B4D]">
              Book Your First Call
            </Link>
            <Link href="/#goals" className="rounded-full border border-white/25 px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-white/10">Explore Topics</Link>
            </div>
          </div>
          <div className="relative min-h-[360px] lg:min-h-[620px]">
            <Image src="/images/brand/program-peptide-education-v2.png" alt="Woman learning about peptide science" fill priority sizes="(max-width: 1024px) 100vw, 52vw" className="object-cover object-center" />
          </div>
        </div>
      </section>

      <section className="bg-ivory py-16 md:py-24">
        <div className="mx-auto max-w-[900px] px-4 md:px-8">
          <h2 className="mb-10 font-display text-3xl font-semibold text-charcoal md:text-4xl">What our peptide education covers</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {[
              { title: "What peptides actually are", body: "An evidence-based overview of peptide biology, how they signal in the body, and what the current research says." },
              { title: "Research categories", body: "Learn how common peptide topics are grouped across recovery, metabolism, longevity, and hormone research." },
              { title: "Questions worth exploring", body: "Organize the questions behind a claim and identify where evidence is strong, early, or incomplete." },
              { title: "Reading claims carefully", body: "Learn how to separate early research, marketing language, and established evidence." },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-stone bg-ivory-soft p-7">
                <h3 className="font-display text-base font-semibold text-charcoal">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-soft-gray" dangerouslySetInnerHTML={{ __html: item.body }} />
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-lg border border-copper/30 bg-charcoal p-8 text-white">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-copper">Important</p>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              EVLV is an education platform. We do not diagnose, prescribe, provide treatment, recommend doses, or recommend a peptide for personal use. We help you understand the research landscape and its limits.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-charcoal py-16 text-center text-white md:py-24">
        <div className="mx-auto max-w-[600px] px-4">
          <h2 className="font-display text-2xl font-semibold md:text-3xl">Ready to learn more?</h2>
          <p className="mt-4 text-sm text-white/60">Begin with a free 15-minute call about what you want to learn. There is no pitch and no obligation.</p>
          <Link href="/book" className="mt-8 inline-block rounded-md bg-copper px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-charcoal transition hover:bg-copper-light">
            Book Your First Call
          </Link>
        </div>
      </section>
    </>
  );
}
