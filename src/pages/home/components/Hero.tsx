import { Link } from 'react-router-dom';
import Container from '@/components/base/Container';
import Button from '@/components/base/Button';
import Reveal from '@/components/base/Reveal';
import { goals } from '@/mocks/goals';

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-background-50 pb-16 pt-32 md:pb-24 md:pt-40">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-gradient-to-b from-secondary-100/80 to-transparent"
        aria-hidden="true"
      ></div>

      <Container className="relative z-10">
        {/* centred statement */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-3.5 py-1.5 font-label text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-primary-700">
            <i className="ri-chat-smile-2-line text-sm leading-none" aria-hidden="true"></i>
            Free pep talk &nbsp;&middot;&nbsp; 15 minutes
          </span>

          <h1 className="mt-6 font-heading text-[2.5rem] leading-[1.03] tracking-[-0.03em] text-foreground-950 sm:text-[3.4rem] md:text-[4.1rem]">
            Wellness optimisation,
            <br />
            guided by experts.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-[1rem] leading-relaxed text-foreground-700 md:text-[1.08rem]">
            Book a free 15-minute pep talk with a wellness expert. We cover peptide literacy, sleep,
            metabolic health, energy and more — education only, not medical advice.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button to="/assessment" variant="primary" size="lg" iconAfter="ri-arrow-right-line">
              Book your free pep talk
            </Button>
            <Button to="/treatments" variant="outline" size="lg">
              Explore wellness goals
            </Button>
          </div>

          <p className="mt-5 font-label text-[0.72rem] uppercase tracking-[0.1em] text-foreground-600">
            15-minute call &nbsp;·&nbsp; Wellness experts &nbsp;·&nbsp; Education only &nbsp;·&nbsp; No commitment
          </p>
        </div>

        {/* wellness goal cards */}
        <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {goals.map((goal, index) => (
            <Reveal key={goal.id} delay={index * 60}>
              <Link
                to={`/goals/${goal.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-background-200 bg-background-100 transition-shadow duration-300 hover:border-primary-200 hover:shadow-md"
              >
                <div className="relative h-36 w-full overflow-hidden bg-background-300 sm:h-44">
                  <img
                    src={goal.image}
                    alt={goal.title}
                    className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground-950/40 to-transparent"></div>
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-100 text-primary-700">
                    <i className={`${goal.icon} text-sm leading-none`} aria-hidden="true"></i>
                  </span>
                  <h3 className="mt-2.5 font-heading text-[0.9rem] leading-snug text-foreground-950">
                    {goal.title}
                  </h3>
                  <p className="mt-1 text-[0.74rem] leading-relaxed text-foreground-600">{goal.tagline}</p>
                  <p className="mt-3 inline-flex items-center gap-1.5 font-label text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-primary-700">
                    Explore
                    <i className="ri-arrow-right-line text-xs leading-none" aria-hidden="true"></i>
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* compliance note */}
        <div className="mt-6 flex flex-col items-center gap-2 rounded-2xl border border-foreground-950/10 bg-background-100 px-5 py-4 text-center sm:flex-row sm:justify-center sm:gap-3">
          <i className="ri-information-line text-base leading-none text-primary-600" aria-hidden="true"></i>
          <p className="text-[0.82rem] leading-relaxed text-foreground-700">
            EVLV Today provides wellness education only — not medical advice, diagnosis or treatment.
            A clinical prescription pathway is coming soon for members who want to explore that route.
          </p>
        </div>
      </Container>
    </section>
  );
}
