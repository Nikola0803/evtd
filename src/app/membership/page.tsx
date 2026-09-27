import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Membership",
  description: "EVLV Membership — $199/month. Monthly education sessions, a private resource library, and community access.",
  alternates: { canonical: "/membership" },
};

const INCLUDED = [
  { icon: "ri-file-list-3-line", title: "Personal Learning Guide", body: "A clear collection of topics and resources shaped around what you want to understand." },
  { icon: "ri-video-chat-line", title: "Monthly 1-on-1 Session", body: "A monthly education session with a member of the EVLV team." },
  { icon: "ri-book-open-line", title: "Private Resource Library", body: "Access to EVLV guides, workshop recordings, and reference materials." },
  { icon: "ri-group-line", title: "Community Access", body: "Private group of members working toward similar goals. Accountability, support, shared wins." },
  { icon: "ri-message-3-line", title: "Education Support", body: "Ask general education questions between sessions. We reply within one business day." },
  { icon: "ri-discount-percent-line", title: "Member Pricing", body: "Priority access and member pricing on DNA Blueprint, specialist sessions, and future offerings." },
];

export default function MembershipPage() {
  return (
    <>
      <section className="bg-[#F6F0E7] px-4 py-8 md:px-8 md:py-14">
        <div className="mx-auto grid max-w-[1400px] overflow-hidden rounded-[2rem] bg-[#314238] lg:grid-cols-[1fr_1.05fr]">
          <div className="flex flex-col justify-center p-8 text-white md:p-14 lg:p-16">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#F2A58C]">Monthly Membership</p>
          <h1 className="font-display text-4xl font-semibold leading-tight md:text-6xl">
            Evolve with us,
            <br />
            <em className="text-[#F2A58C] not-italic">every month.</em>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
            Ongoing education, organized resources, and a private community for people who want to learn with care.
          </p>
          <p className="mt-6 font-display text-4xl font-semibold text-copper">$199<span className="text-lg text-white/50">/month</span></p>
          <p className="mt-1 text-xs text-white/40">Cancel anytime · No lock-in contracts</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/book" className="rounded-full bg-[#D77E5F] px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#C86B4D]">
              Start with a Free Call
            </Link>
          </div>
          </div>
          <div className="relative min-h-[360px] lg:min-h-[620px]">
            <Image src="/images/brand/program-membership-education-v2.png" alt="Members learning together around a table" fill priority sizes="(max-width: 1024px) 100vw, 52vw" className="object-cover object-center" />
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
