import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Membership | evolv",
  description: "evolv Membership — $199/month. Monthly education sessions, a private resource library, and community access.",
  alternates: { canonical: "/membership" },
};

const INCLUDED = [
  { icon: "ri-file-list-3-line", title: "Personal Learning Guide", body: "A clear collection of topics and resources shaped around what you want to understand." },
  { icon: "ri-video-chat-line", title: "Monthly 1-on-1 Session", body: "A monthly education session with a member of the evolv team." },
  { icon: "ri-book-open-line", title: "Private Resource Library", body: "Access to evolv guides, workshop recordings, and reference materials." },
  { icon: "ri-group-line", title: "Community Access", body: "Private group of members working toward similar goals. Accountability, support, shared wins." },
  { icon: "ri-message-3-line", title: "Education Support", body: "Ask general education questions between sessions. We reply within one business day." },
  { icon: "ri-discount-percent-line", title: "Member Pricing", body: "Priority access and member pricing on DNA Blueprint, specialist sessions, and future offerings." },
];

export default function MembershipPage() {
  return (
    <>
      <section className="-mt-[90px] bg-charcoal pb-20 pt-[150px] text-center text-white md:-mt-[100px] md:pb-32 md:pt-[180px]">
        <div className="mx-auto max-w-[800px] px-4 md:px-8">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-copper">Monthly Membership</p>
          <h1 className="font-display text-4xl font-semibold leading-tight md:text-6xl">
            Evolve with us,
            <br />
            <em className="text-sage-light not-italic">every month.</em>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
            Ongoing education, organized resources, and a private community for people who want to learn with care.
          </p>
          <p className="mt-6 font-display text-4xl font-semibold text-copper">$199<span className="text-lg text-white/50">/month</span></p>
          <p className="mt-1 text-xs text-white/40">Cancel anytime · No lock-in contracts</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/book" className="rounded-md bg-copper px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-charcoal transition hover:bg-copper-light">
              Start with a Free Call
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <h2 className="mb-10 text-center font-display text-3xl font-semibold text-charcoal md:text-4xl">Everything included</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {INCLUDED.map((item) => (
              <div key={item.title} className="rounded-lg border border-stone bg-ivory-soft p-7">
                <i className={`${item.icon} mb-4 text-2xl text-copper`} />
                <h3 className="font-display text-base font-semibold text-charcoal">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-soft-gray">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sage-deep py-16 text-center text-white md:py-24">
        <div className="mx-auto max-w-[600px] px-4">
          <p className="font-display text-2xl font-semibold md:text-3xl">Ready to commit to yourself?</p>
          <p className="mt-4 text-sm text-white/60">
            Start with a free 15-minute first call. No obligation. No pressure.
          </p>
          <Link href="/book" className="mt-8 inline-block rounded-md bg-ivory px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-charcoal transition hover:bg-sage-light">
            Book Free Call
          </Link>
        </div>
      </section>
    </>
  );
}
