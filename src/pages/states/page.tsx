import PageHero from '@/components/feature/PageHero';
import Container from '@/components/base/Container';
import Button from '@/components/base/Button';
import { states } from '@/mocks/states';
import { CTA_LABEL, CTA_MICROCOPY } from '@/constants/site';
import { usePageMeta } from '@/hooks/usePageMeta';

export default function States() {
  usePageMeta({
    title: 'State Availability | EVOLV Today Telehealth',
    description:
      'See where EVOLV Today is available. Clinical coverage depends on clinician licensing and licensed US pharmacy shipping coverage.',
    canonicalPath: '/states',
  });

  const available = states.filter((state) => state.status === 'available').length;
  const limited = states.filter((state) => state.status === 'limited').length;

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'States' }]}
        eyebrow="Availability"
        title="Where EVOLV Today is available."
        description="Clinical coverage depends on where our network is licensed and where pharmacy partners can ship. Your assessment begins by confirming your state so you only see options you can access."
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
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <div className="rounded-2xl border border-background-200 bg-background-100 p-6">
              <p className="font-heading text-2xl text-foreground-950">{states.length}</p>
              <p className="mt-2 font-label text-[0.7rem] uppercase tracking-[0.1em] text-foreground-600">
                Jurisdictions listed
              </p>
            </div>
            <div className="rounded-2xl border border-background-200 bg-background-100 p-6">
              <p className="font-heading text-2xl text-foreground-950">{available}</p>
              <p className="mt-2 font-label text-[0.7rem] uppercase tracking-[0.1em] text-foreground-600">
                Generally available
              </p>
            </div>
            <div className="rounded-2xl border border-background-200 bg-background-100 p-6">
              <p className="font-heading text-2xl text-foreground-950">{limited}</p>
              <p className="mt-2 font-label text-[0.7rem] uppercase tracking-[0.1em] text-foreground-600">
                Limited programs
              </p>
            </div>
            <div className="rounded-2xl border border-dashed border-background-300 bg-background-100 p-6">
              <p className="font-heading text-2xl text-foreground-500">—</p>
              <p className="mt-2 font-label text-[0.7rem] uppercase tracking-[0.1em] text-foreground-600">
                Expanding coverage
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-2 text-[0.78rem] text-foreground-600">
              <span className="h-2.5 w-2.5 rounded-full bg-primary-500"></span>
              Generally available
            </span>
            <span className="inline-flex items-center gap-2 text-[0.78rem] text-foreground-600">
              <span className="h-2.5 w-2.5 rounded-full bg-secondary-500"></span>
              Limited — some programs only
            </span>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {states.map((state) => (
              <div
                key={state.code}
                className={`flex items-center justify-between gap-3 rounded-md border px-4 py-3 ${
                  state.status === 'available'
                    ? 'border-background-200 bg-background-100'
                    : 'border-secondary-200 bg-secondary-50'
                }`}
              >
                <div>
                  <p className="font-label text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-foreground-500">
                    {state.code}
                  </p>
                  <p className="text-[0.82rem] text-foreground-900">{state.name}</p>
                </div>
                <span
                  className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                    state.status === 'available' ? 'bg-primary-500' : 'bg-secondary-500'
                  }`}
                  aria-hidden="true"
                ></span>
              </div>
            ))}
          </div>

          <p className="mt-8 max-w-3xl text-[0.8rem] leading-relaxed text-foreground-600">
            Availability is informational and can change as licensing and pharmacy coverage evolve. It does not
            guarantee eligibility. A licensed clinician determines whether a prescribed treatment is
            appropriate for each patient, and pharmacy partners must be able to ship to your location.
          </p>
        </Container>
      </section>
    </>
  );
}