import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Free Call | evolv",
  description: "Book your free 15-minute first call with evolv. Tell us about your goals and how you want to feel.",
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  return (
    <>
      <section className="-mt-[90px] bg-charcoal pb-20 pt-[150px] text-center text-white md:-mt-[100px] md:pb-32 md:pt-[180px]">
        <div className="mx-auto max-w-[700px] px-4 md:px-8">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-copper">Free Discovery Call</p>
          <h1 className="font-display text-4xl font-semibold leading-tight md:text-5xl">
            Let&apos;s talk about
            <br />
            <em className="text-sage-light not-italic">your goals.</em>
          </h1>
          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-white/70">
            A free 15-minute call about your goals and how you want to feel. No obligation. No sales pressure.
            Just an honest conversation about where you are and what might help.
          </p>
        </div>
      </section>

      <section className="bg-ivory py-16 md:py-24">
        <div className="mx-auto max-w-[700px] px-4 md:px-8">
          <div className="rounded-lg border border-stone bg-ivory-soft p-8 text-center">
            <i className="ri-calendar-check-line mb-4 text-3xl text-copper" />
            <h2 className="font-display text-2xl font-semibold text-charcoal">Booking Coming Soon</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-soft-gray">
              Our online scheduling is being set up. In the meantime, reach out directly and we&apos;ll find a time
              that works for you.
            </p>
            <a
              href="mailto:hello@evolv.co"
              className="mt-6 inline-block rounded-md bg-charcoal px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-ivory transition hover:bg-sage-deep"
            >
              Email Us to Book
            </a>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3 text-center">
            {[
              { icon: "ri-time-line", title: "15 minutes", body: "A focused, structured conversation." },
              { icon: "ri-money-dollar-circle-line", title: "Free", body: "No charge, no obligation." },
              { icon: "ri-video-chat-line", title: "Video or phone", body: "Your preference, wherever you are." },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-stone bg-ivory-soft p-6">
                <i className={`${item.icon} mb-2 text-2xl text-copper`} />
                <p className="font-display text-base font-semibold text-charcoal">{item.title}</p>
                <p className="mt-1 text-sm text-soft-gray">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
