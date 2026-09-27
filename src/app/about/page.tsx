import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: "About",
  description: "EVLV is a peptide and wellness education platform with plain-language guides, research context, and learning support.",
  alternates: { canonical: "/about" },
};

const PRINCIPLES = [
  { title: "Evidence over trends", body: "Wellness is full of noise. We cut through it with approaches grounded in research and real-world outcomes." },
  { title: "Context over claims", body: "We explain what research can and cannot tell you, without turning information into personal medical guidance." },
  { title: "Education over dependency", body: "We teach you to understand your own body — so your confidence grows alongside your results." },
  { title: "Clarity over overwhelm", body: "Simple, actionable guidance you can implement immediately, without needing a medical degree to follow it." },
  { title: "Real answers, not scripts", body: "You can speak with a real education team member, not a chatbot or canned-reply queue." },
  { title: "Long-term over quick fixes", body: "Sustainable change takes time and intention. We build habits, not just milestones." },
];

const PROCESS = [
  { num: "01", title: "First Call", body: "A free 15-minute call about your goals, how you feel today, and where you want to begin." },
  { num: "02", title: "Learning Priorities", body: "We organize the peptide and wellness topics you want to understand." },
  { num: "03", title: "Guided Learning", body: "Use clear resources and education sessions to build context at your own pace." },
  { num: "04", title: "Education & Tools", body: "Access to our private resource library, workshop recordings, and evidence-based reference guides." },
  { num: "05", title: "Community & Accountability", body: "Optional group membership access where you connect with like-minded women on the same journey." },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-ivory-soft py-16 md:py-24">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-10 px-4 md:grid-cols-2 md:px-8">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-lg">
            <Image src="/images/brand/wellness-consultation.png" alt="EVLV wellness consultation" width={800} height={600} className="h-full w-full object-cover" priority />
          </div>
          <div>
            <span className="mb-4 inline-block rounded-full border border-stone bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-charcoal/60">
              About EVLV
            </span>
            <h1 className="font-display text-4xl font-semibold leading-tight text-charcoal md:text-5xl">
              Peptide and wellness education, without the hype.
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-soft-gray md:text-lg">
              The wellness industry has grown faster than its integrity. Most programs sell on hype: big promises,
              vague &ldquo;transformation,&rdquo; and very little you can actually verify. We built EVLV to be the
              opposite.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-charcoal py-16 text-white md:py-24">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-8 px-4 md:grid-cols-[1fr_1.4fr] md:px-8">
          <h2 className="font-display text-3xl font-semibold leading-tight md:text-4xl">
            Why
            <br />
            EVLV
            <br />
            exists
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
            People deserve clear education before making sense of wellness claims. EVLV turns complex peptide and
            wellness research into plain language, while keeping personal medical decisions with licensed healthcare
            professionals.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <h2 className="mb-10 font-display text-3xl font-semibold text-charcoal md:text-4xl">What we stand for.</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PRINCIPLES.map((p) => (
              <div key={p.title} className="rounded-lg border border-stone bg-ivory-soft p-6">
                <h3 className="font-display text-base font-semibold text-charcoal">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/60">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-charcoal py-16 text-white md:py-24">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">Our Approach</p>
          <h2 className="mb-2 font-display text-3xl font-semibold md:text-4xl">How we work together.</h2>
          <p className="mb-10 text-sm text-white/50">Every client journey follows the same clear, five-step process.</p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PROCESS.map((s) => (
              <div key={s.num} className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-copper">{s.num}</p>
                <h3 className="mt-2 font-display text-base font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{s.body}</p>
              </div>
            ))}
          </div>

          <ButtonLink href="/contact" className="mt-10">
            Book Your Free Call <i className="ri-arrow-right-line" />
          </ButtonLink>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-10 px-4 md:grid-cols-2 md:px-8">
          <div>
            <h2 className="font-display text-3xl font-semibold text-charcoal md:text-4xl">What EVLV is not.</h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-soft-gray">
              EVLV is an education platform. We are not a clinic, a medical practice, or a telehealth provider. We do
              not diagnose, prescribe, or provide treatment. Personal medical decisions belong with a licensed
              healthcare professional.
            </p>
          </div>
          <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-ivory-soft">
            <Image src="/images/brand/molecular-sculpture.png" alt="Abstract molecular sculpture" width={800} height={800} className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-charcoal py-16 text-white md:py-24">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 px-4 md:grid-cols-[1.3fr_1fr] md:px-8">
          <div>
            <h2 className="font-display text-3xl font-semibold md:text-4xl">Built to actually work with your life.</h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-white/60">
              Browse education by goal if you know what you want to understand, or start with your free first call if
              you&apos;re not sure where to begin. Use the <Link href="/#goals" className="font-semibold text-[#F2A58C] hover:underline">goal finder</Link> to choose an education path based on your current priorities.
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
            <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
              <i className="ri-customer-service-2-line text-copper" /> Real guidance, real people
            </p>
            <p className="text-sm leading-relaxed text-white/50">
              Have a question?{" "}
              <Link href="/contact" className="font-semibold text-copper hover:underline">
                Reach out
              </Link>{" "}
              and our team will respond during business hours. A real person from our education team, not a script.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-sage-forest py-16 text-center text-white md:py-24">
        <div className="mx-auto max-w-[800px] px-4 md:px-8">
          <p className="font-display text-2xl font-semibold leading-snug md:text-3xl">
            Clear education. Careful context. No medical promises.
          </p>
          <p className="mx-auto mt-5 max-w-md text-xs leading-relaxed text-white/40">
            EVLV provides education only. We are not a medical or telehealth provider. Speak with a licensed
            healthcare professional about personal decisions and care.
          </p>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
