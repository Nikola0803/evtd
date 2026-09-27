import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import Image from "next/image";

const STANDARDS = [
  {
    num: "01",
    title: "Free Consultation",
    body: "A 30-minute discovery call to understand your goals, lifestyle, and where you're starting from.",
  },
  {
    num: "02",
    title: "Custom Wellness Plan",
    body: "Your personalized roadmap - nutrition, movement, sleep optimization, and hormone health education.",
  },
  {
    num: "03",
    title: "Expert Guidance",
    body: "Ongoing support from a certified wellness consultant who knows your case and your goals.",
  },
  {
    num: "04",
    title: "Education & Resources",
    body: "Private access to our evidence-based resource library, workshops, and reference guides.",
  },
  {
    num: "05",
    title: "Community & Accountability",
    body: "Optional membership access to a private group of women working toward the same goals.",
  },
];

export function AboutSection() {
  return (
    <section className="bg-ivory-soft pb-20 pt-8 md:pb-32 md:pt-12">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-14 px-4 md:px-8 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-charcoal">
          <Image src="/images/brand/wellness-consultation.png" alt="A personalized wellness consultation" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
        </Reveal>

        <Reveal>
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">05 / The evolv Approach</p>
          <h2 className="font-display text-4xl font-semibold uppercase leading-[1.05] text-charcoal md:text-5xl">
            Personalized wellness,
            <br />
            at every stage.
          </h2>

          <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal/40">How We Work Together</p>
          <div className="mt-3 divide-y divide-stone border-t border-stone">
            {STANDARDS.map((item) => (
              <div key={item.num} className="flex gap-6 py-5">
                <span className="font-display text-sm text-copper">{item.num}</span>
                <div>
                  <p className="text-sm font-medium uppercase tracking-wide text-charcoal">{item.title}</p>
                  <p className="mt-1.5 max-w-md text-sm leading-relaxed text-soft-gray">{item.body}</p>
                </div>
              </div>
            ))}
          </div>

          <ButtonLink href="/contact" className="mt-10">
            Book Your Free Consultation <i className="ri-arrow-right-line" />
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
