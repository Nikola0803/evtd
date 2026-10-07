import PageHero from '@/components/feature/PageHero';
import Container from '@/components/base/Container';
import Button from '@/components/base/Button';
import Reveal from '@/components/base/Reveal';
import { clinicians } from '@/mocks/people';
import { CTA_LABEL, CTA_MICROCOPY } from '@/constants/site';
import { usePageMeta } from '@/hooks/usePageMeta';

const networkStats = [
  { value: 'Placeholder', label: 'States with licensed coverage' },
  { value: 'Placeholder', label: 'Contracted clinicians' },
  { value: 'Placeholder', label: 'Average review time' },
  { value: 'Placeholder', label: 'Clinical specialties represented' },
];

const reviewPrinciples = [
  {
    icon: 'ri-user-star-line',
    title: 'Independent decisions',
    copy: 'Every prescription decision is made by a licensed clinician — not by EVOLV Today and not by an algorithm.',
  },
  {
    icon: 'ri-shield-cross-line',
    title: 'Safety first',
    copy: 'If a treatment is not safe or appropriate for you, the clinician will decline it and explain why.',
  },
  {
    icon: 'ri-refresh-line',
    title: 'Continued review',
    copy: 'Renewals are not automatic. Your plan is reviewed again before it continues.',
  },
];

export default function ClinicalTeam() {
  usePageMeta({
    title: 'Clinical Team | EVOLV Today Telehealth',
    description:
      'Every EVOLV Today prescription decision is made independently by a licensed clinician. Learn how our clinical network and review process work.',
    canonicalPath: '/clinical-team',
  });

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Clinical Team' }]}
        eyebrow="Clinical network"
        title="Clinical decisions belong to clinicians."
        description="Every prescription decision is made independently by a provider licensed to care for the patient in their state. EVOLV Today never decides who should receive treatment."
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

      <section className="bg-background-50 py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {networkStats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-dashed border-background-300 bg-background-100 p-6">
                <p className="font-heading text-xl text-foreground-500">{stat.value}</p>
                <p className="mt-2 font-label text-[0.7rem] uppercase tracking-[0.1em] text-foreground-600">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-5 max-w-3xl text-[0.78rem] leading-relaxed text-foreground-600">
            Network figures are shown as placeholders until contracts and licensing are complete. We publish
            numbers only when they can be verified.
          </p>
        </Container>
      </section>

      <section className="bg-background-100 py-16 md:py-24">
        <Container>
          <h2 className="font-heading text-[1.7rem] leading-tight text-foreground-950 md:text-[2.2rem]">
            Meet part of the network
          </h2>
          <p className="mt-4 max-w-2xl text-[0.95rem] leading-relaxed text-foreground-700">
            Clinician profiles below are clearly marked placeholders. Photographs, credentials, specialties and
            biographies are completed once providers are contracted.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {clinicians.map((person, index) => (
              <Reveal key={person.id} delay={index * 70}>
                <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-dashed border-background-300 bg-background-50">
                  <div className="relative h-64 w-full overflow-hidden bg-background-300">
                    <img
                      src={person.image}
                      alt={`${person.name}, ${person.credentials}`}
                      title={`${person.credentials} — ${person.specialty}`}
                      className="h-full w-full object-cover object-top"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-background-50/95 px-3 py-1 font-label text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-foreground-700">
                      Placeholder profile
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5 md:p-6">
                    <h3 className="font-heading text-lg text-foreground-950">{person.name}</h3>
                    <p className="mt-1 text-[0.82rem] font-medium text-primary-700">{person.credentials}</p>
                    <p className="mt-3 text-[0.82rem] text-foreground-700">{person.specialty}</p>
                    <p className="mt-1 text-[0.78rem] text-foreground-500">{person.coverage}</p>
                    <p className="mt-4 flex-1 text-[0.84rem] italic leading-relaxed text-foreground-600">
                      "{person.philosophy}"
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 font-label text-[0.78rem] font-medium text-foreground-500">
                      Biography available at contract
                    </span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-background-50 py-16 md:py-24">
        <Container>
          <h2 className="font-heading text-[1.7rem] leading-tight text-foreground-950 md:text-[2.2rem]">
            How clinical review works
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {reviewPrinciples.map((item, index) => (
              <Reveal key={item.title} delay={index * 70}>
                <div className="h-full rounded-2xl border border-background-200 bg-background-100 p-6">
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

      <section className="bg-primary-600 py-16 text-background-50 md:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-[1.7rem] leading-tight md:text-[2.3rem]">
              A clinician will review your assessment.
            </h2>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-background-50/85">
              Start your private assessment and a licensed provider will independently decide whether treatment
              is appropriate for you.
            </p>
            <div className="mt-8 flex justify-center">
              <Button to="/assessment" variant="primary" size="lg" iconAfter="ri-arrow-right-line">
                {CTA_LABEL}
              </Button>
            </div>
            <p className="mt-4 font-label text-[0.75rem] uppercase tracking-[0.1em] text-background-50/80">
              {CTA_MICROCOPY}
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}