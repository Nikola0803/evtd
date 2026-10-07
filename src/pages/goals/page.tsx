import { Link } from 'react-router-dom';
import PageHero from '@/components/feature/PageHero';
import Container from '@/components/base/Container';
import Button from '@/components/base/Button';
import Reveal from '@/components/base/Reveal';
import ProgramCard from '@/components/feature/ProgramCard';
import { goals } from '@/mocks/goals';
import { programs } from '@/mocks/programs';
import { CTA_LABEL, CTA_MICROCOPY } from '@/constants/site';
import { usePageMeta } from '@/hooks/usePageMeta';

export default function Goals() {
  usePageMeta({
    title: 'Goals | EVOLV Today Telehealth',
    description:
      'Start with how you want to feel. Explore clinician-guided treatment goals for sleep, energy, body composition, skin, hair and sexual wellness.',
    canonicalPath: '/goals',
  });

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Goals' }]}
        eyebrow="Goals"
        title="Start with how you want to feel."
        description="Most people know the outcome they want long before they know a medication name. Choose a goal and we will show you the clinician-guided options that may apply."
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button to="/assessment" variant="primary" size="lg" iconAfter="ri-arrow-right-line">
            {CTA_LABEL}
          </Button>
          <p className="font-label text-[0.76rem] uppercase tracking-[0.1em] text-foreground-600">
            {CTA_MICROCOPY}
          </p>
        </div>
      </PageHero>

      <section className="bg-background-50 py-16 md:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {goals.map((goal, index) => (
              <Reveal key={goal.id} delay={index * 70}>
                <Link
                  to={`/goals/${goal.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-background-200 bg-background-100 transition-colors duration-300 hover:border-primary-300"
                >
                  <div className="relative h-52 w-full overflow-hidden bg-background-300">
                    <img
                      src={goal.image}
                      alt={`${goal.title} — ${goal.tagline}`}
                      title={`${goal.title} goals`}
                      className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    <span className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-background-50/95 text-foreground-900">
                      <i className={`${goal.icon} text-base leading-none`} aria-hidden="true"></i>
                    </span>
                  </div>
                  <div className="p-6">
                    <h2 className="font-heading text-xl text-foreground-950">{goal.title}</h2>
                    <p className="mt-2 font-label text-[0.76rem] uppercase tracking-[0.08em] text-primary-700">
                      {goal.tagline}
                    </p>
                    <p className="mt-3 text-[0.88rem] leading-relaxed text-foreground-700">{goal.description}</p>
                    <span className="mt-5 inline-flex items-center gap-2 font-label text-sm font-medium text-primary-700">
                      Explore options
                      <i className="ri-arrow-right-line text-base leading-none transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true"></i>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}

            <Reveal delay={goals.length * 70}>
              <div className="flex h-full flex-col justify-center rounded-2xl border border-dashed border-background-300 bg-background-100 p-8 text-center">
                <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-background-200 text-foreground-700">
                  <i className="ri-chat-1-line text-lg leading-none" aria-hidden="true"></i>
                </span>
                <h2 className="mt-4 font-heading text-lg text-foreground-950">Not sure where you fit?</h2>
                <p className="mt-2 text-[0.86rem] leading-relaxed text-foreground-600">
                  Start the assessment and describe how you feel. A licensed clinician will guide your options.
                </p>
                <Button to="/assessment" variant="outline" size="sm" className="mt-5 self-center">
                  Take the assessment
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-background-100 py-16 md:py-20">
        <Container>
          <h2 className="font-heading text-[1.6rem] leading-tight text-foreground-950 md:text-[2.1rem]">
            Programs by goal
          </h2>
          <p className="mt-4 max-w-2xl text-[0.95rem] leading-relaxed text-foreground-700">
            Every program below begins with an independent clinical evaluation. Treatment is prescribed only
            when medically appropriate.
          </p>

          <div className="mt-12 space-y-14">
            {goals.map((goal) => {
              const related = programs.filter((program) => program.goalId === goal.id);
              if (related.length === 0) return null;
              return (
                <div key={goal.id}>
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h3 className="font-heading text-xl text-foreground-950">{goal.title}</h3>
                    <Link
                      to={`/goals/${goal.slug}`}
                      className="font-label text-sm font-medium text-primary-700 transition-colors duration-200 hover:text-primary-600"
                    >
                      View goal details
                    </Link>
                  </div>
                  <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {related.map((program) => (
                      <ProgramCard key={program.id} program={program} className="h-full" />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}