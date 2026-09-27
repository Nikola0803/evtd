import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hormone Health Education | evolv",
  description: "Plain-language hormone health education and resources for more informed conversations with a licensed healthcare professional.",
  alternates: { canonical: "/hormone-health" },
};

const TOPICS = [
  {
    icon: "ri-book-open-line",
    title: "Hormone basics",
    body: "Learn common terms, how hormones communicate in the body, and why context matters when reading research.",
  },
  {
    icon: "ri-line-chart-line",
    title: "Patterns and questions",
    body: "Organize what you notice and prepare clearer questions for a licensed healthcare professional.",
  },
  {
    icon: "ri-leaf-line",
    title: "Everyday foundations",
    body: "Explore how sleep, movement, food, stress, and recovery are discussed in hormone health research.",
  },
];

export default function HormoneHealthPage() {
  return (
    <>
      <section className="-mt-[90px] bg-charcoal pb-20 pt-[150px] text-center text-white md:-mt-[100px] md:pb-28 md:pt-[180px]">
        <div className="mx-auto max-w-[820px] px-4 md:px-8">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-copper">Wellness Education</p>
          <h1 className="font-display text-4xl font-semibold leading-tight md:text-6xl">Hormone Health Education</h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            Clear information about hormone health, everyday wellbeing, and the questions you may want to bring to a licensed healthcare professional.
          </p>
          <p className="mt-4 text-xs uppercase tracking-widest text-white/40">Education only · No diagnosis · No treatment</p>
        </div>
      </section>

      <section className="bg-ivory py-16 md:py-24">
        <div className="mx-auto max-w-[1200px] px-4 md:px-8">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {TOPICS.map((topic) => (
              <article key={topic.title} className="rounded-xl border border-stone bg-ivory-soft p-7">
                <i className={`${topic.icon} text-2xl text-copper`} />
                <h2 className="mt-4 font-display text-xl font-semibold text-charcoal">{topic.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-soft-gray">{topic.body}</p>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-3xl rounded-xl border border-stone bg-white p-7 text-center md:p-10">
            <h2 className="font-display text-2xl font-semibold text-charcoal">Start with reliable context.</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-soft-gray">
              Read our educational guides or use your first 15-minute call to tell us what you want to understand. We do not provide medical care.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link href="/journal/hormone-health-after-35" className="rounded-md bg-charcoal px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-sage-deep">
                Read the Guide
              </Link>
              <Link href="/book" className="rounded-md border border-charcoal/20 px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-charcoal transition hover:border-charcoal">
                Book Your First Call
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
