import { Link, useParams } from 'react-router-dom';
import Container from '@/components/base/Container';
import Button from '@/components/base/Button';
import Reveal from '@/components/base/Reveal';
import ProgramCard from '@/components/feature/ProgramCard';
import { goals } from '@/mocks/goals';
import { programs } from '@/mocks/programs';
import { CTA_LABEL, CTA_MICROCOPY } from '@/constants/site';
import { usePageMeta } from '@/hooks/usePageMeta';

export default function GoalDetail() {
  const { slug } = useParams();
  const goal = goals.find((item) => item.slug === slug);

  usePageMeta({
    title: goal ? `${goal.title} Treatment Goals | EVOLV Today` : 'Goals | EVOLV Today Telehealth',
    description: goal ? `${goal.tagline} ${goal.description}` : undefined,
    canonicalPath: goal ? `/goals/${goal.slug}` : '/goals',
  });

  if (!goal) {
    return (
      <Container className="py-32 text-center md:py-40">
        <h1 className="font-heading text-2xl text-foreground-950">Goal not found</h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-foreground-600">
          We could not find that goal. Browse all goals to explore your options.
        </p>
        <div className="mt-7 flex justify-center">
          <Button to="/goals" variant="primary" size="md">
            Browse goals
          </Button>
        </div>
      </Container>
    );
  }

  const related = programs.filter((program) => program.goalId === goal.id);

  return (
    <>
      <section className="bg-background-100">
        <Container className="pb-14 pt-28 md:pb-20 md:pt-36">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-[0.75rem] text-foreground-600">
              <li className="flex items-center gap-2">
                <Link to="/" className="transition-colors duration-200 hover:text-primary-700">
                  Home
                </Link>
                <i className="ri-arrow-right-s-line text-sm leading-none text-foreground-400" aria-hidden="true"></i>
              </li>
              <li className="flex items-center gap-2">
                <Link to="/goals" className="transition-colors duration-200 hover:text-primary-700">
                  Goals
                </Link>
                <i className="ri-arrow-right-s-line text-sm leading-none text-foreground-400" aria-hidden="true"></i>
              </li>
              <li className="text-foreground-800">{goal.title}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary-100 text-secondary-900">
                <i className={`${goal.icon} text-lg leading-none`} aria-hidden="true"></i>
              </span>
              <h1 className="mt-6 font-heading text-[2.1rem] leading-[1.08] tracking-[-0.015em] text-foreground-950 md:text-[2.9rem]">
                {goal.title}
              </h1>
              <p className="mt-4 font-label text-[0.78rem] uppercase tracking-[0.1em] text-primary-700">
                {goal.tagline}
              </p>
              <p className="mt-5 max-w-xl text-[1rem] leading-relaxed text-foreground-700">{goal.description}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button to="/assessment" variant="primary" size="lg" iconAfter="ri-arrow-right-line">
                  {CTA_LABEL}
                </Button>
                <Button to="/treatments" variant="outline" size="lg">
                  Browse treatments
                </Button>
              </div>
              <p className="mt-4 font-label text-[0.75rem] uppercase tracking-[0.1em] text-foreground-600">
                {CTA_MICROCOPY}
              </p>
            </div>

            <div className="relative h-80 w-full overflow-hidden rounded-2xl bg-background-300 md:h-[30rem]">
              <img
                src={goal.image}
                alt={`${goal.title} — ${goal.tagline}`}
                title={`${goal.title} treatment goals`}
                className="h-full w-full object-cover object-top"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-background-50 py-16 md:py-20">
        <Container>
          <h2 className="font-heading text-[1.6rem] leading-tight text-foreground-950 md:text-[2.1rem]">
            Options that may support this goal
          </h2>
          <p className="mt-4 max-w-2xl text-[0.95rem] leading-relaxed text-foreground-700">
            Each program is subject to an independent clinical review. Your clinician will determine whether a
            treatment can be considered for you.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((program, index) => (
              <Reveal key={program.id} delay={index * 60}>
                <ProgramCard program={program} className="h-full" />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-background-100 py-16 md:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                icon: 'ri-stethoscope-line',
                title: 'Independent clinical review',
                copy: 'A provider licensed in your state decides whether treatment is safe and appropriate.',
              },
              {
                icon: 'ri-truck-line',
                title: 'Licensed US pharmacy fulfillment',
                copy: 'If prescribed, your treatment is prepared and shipped by a licensed US pharmacy partner.',
              },
              {
                icon: 'ri-chat-check-line',
                title: 'Ongoing support',
                copy: 'Check-ins and renewal reviews keep your plan under clinical supervision over time.',
              },
            ].map((item, index) => (
              <Reveal key={item.title} delay={index * 70}>
                <div className="h-full rounded-2xl border border-background-200 bg-background-50 p-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-100 text-secondary-800">
                    <i className={`${item.icon} text-lg leading-none`} aria-hidden="true"></i>
                  </span>
                  <h3 className="mt-5 font-heading text-lg text-foreground-950">{item.title}</h3>
                  <p className="mt-2 text-[0.88rem] leading-relaxed text-foreground-700">{item.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}