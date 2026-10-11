import { Metadata } from "next";
import { faqItems } from "@/lib/content";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about EVLV education, membership, and how we work.",
};

export default function FaqPage() {
  return (
    <>
      <section className="-mt-[90px] bg-charcoal pb-20 pt-[150px] text-center text-white md:-mt-[100px] md:pb-32 md:pt-[170px]">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <h1 className="mb-4 font-display text-4xl font-semibold md:text-5xl lg:text-6xl">Popular Questions</h1>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
            Find quick answers to common questions about our education platform, membership, and how we work.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-28">
        <div className="mx-auto max-w-[900px] px-4 md:px-8">
          <Accordion items={faqItems} />

          <div className="mt-12 rounded-lg border border-stone bg-ivory-soft p-8 text-center">
            <h3 className="mb-2 font-display text-xl font-semibold text-charcoal">Still have questions?</h3>
            <p className="mb-4 text-sm text-charcoal/50">Our support team typically responds within minutes during business hours.</p>
            <ButtonLink href="/contact">
              Contact Us <i className="ri-arrow-right-line" />
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="border-t border-stone bg-[#DDD0BE] px-4 py-16 text-center md:px-8 md:py-20">
        <div className="mx-auto max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8D4A38]">Keep learning</p>
          <h2 className="mt-4 font-display text-3xl font-semibold text-charcoal md:text-4xl">Explore the education library.</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-charcoal/60">Browse peptide science, hormone health, weight, longevity, energy, sleep, and recovery at your own pace.</p>
          <ButtonLink href="/shop" className="mt-7">
            Browse the Library <i className="ri-arrow-right-line" />
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
