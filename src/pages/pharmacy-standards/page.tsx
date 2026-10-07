import PageHero from '@/components/feature/PageHero';
import Container from '@/components/base/Container';
import Button from '@/components/base/Button';
import Reveal from '@/components/base/Reveal';
import { pathway } from '@/mocks/homeContent';
import { CTA_LABEL, CTA_MICROCOPY } from '@/constants/site';
import { usePageMeta } from '@/hooks/usePageMeta';

const qualityControls = [
  {
    icon: 'ri-shield-check-line',
    title: 'Licensed pharmacy partners',
    copy: 'Prescriptions are sent only to licensed US pharmacy partners qualified to dispense for your state.',
  },
  {
    icon: 'ri-file-list-3-line',
    title: 'Patient-specific preparation',
    copy: 'Treatment is prepared for the individual patient based on the prescriber\u2019s directions.',
  },
  {
    icon: 'ri-thermometer-line',
    title: 'Storage and handling standards',
    copy: 'Shipping and storage follow applicable requirements so your treatment arrives as intended.',
  },
  {
    icon: 'ri-search-eye-line',
    title: 'Traceable fulfillment',
    copy: 'Each order is traceable from clinical review through dispensing and delivery.',
  },
  {
    icon: 'ri-test-tube-line',
    title: 'Testing documentation where applicable',
    copy: 'Where a pharmacy provides testing or documentation, it is available on request.',
  },
  {
    icon: 'ri-map-pin-line',
    title: 'Fulfillment locations',
    copy: 'Pharmacy partners and fulfillment locations are listed here once contracts are final.',
  },
];

const disclosures = [
  'Compounded medications are not FDA-approved.',
  'A licensed clinician determines whether a prescribed treatment is appropriate for each patient.',
  'EVOLV Today is a telehealth platform, not a pharmacy, and does not dispense medication.',
  'Prescriptions are prepared and shipped by licensed US pharmacy partners.',
];

export default function PharmacyStandards() {
  usePageMeta({
    title: 'Pharmacy Standards | EVOLV Today Telehealth',
    description:
      'How EVOLV Today fulfills prescriptions: licensed US pharmacy partners, patient-specific preparation, quality controls and traceable delivery.',
    canonicalPath: '/pharmacy-standards',
  });

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Pharmacy Standards' }]}
        eyebrow="Pharmacy and quality"
        title="Prepared for you. Guided by professionals."
        description="Prescriptions are sent directly to licensed US pharmacy partners and prepared for the individual patient. EVOLV Today does not fulfill prescriptions from a research-product warehouse."
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
          <h2 className="font-heading text-[1.7rem] leading-tight text-foreground-950 md:text-[2.2rem]">
            The fulfillment pathway
          </h2>
          <p className="mt-4 max-w-2xl text-[0.95rem] leading-relaxed text-foreground-700">
            Every prescription follows the same traceable path, with a licensed professional responsible at
            each stage.
          </p>
          <ol className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {pathway.map((step, index) => (
              <Reveal key={step.label} delay={index * 70}>
                <li className="flex h-full flex-col rounded-2xl border border-background-200 bg-background-100 p-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-primary-200 bg-background-50 text-primary-700">
                    <i className={`${step.icon} text-lg leading-none`} aria-hidden="true"></i>
                  </span>
                  <span className="mt-4 font-label text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-foreground-500">
                    Step {index + 1}
                  </span>
                  <p className="mt-1 font-heading text-[0.98rem] leading-snug text-foreground-950">{step.label}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-background-100 py-16 md:py-24">
        <Container>
          <h2 className="font-heading text-[1.7rem] leading-tight text-foreground-950 md:text-[2.2rem]">
            Quality controls
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {qualityControls.map((control, index) => (
              <Reveal key={control.title} delay={index * 60}>
                <div className="h-full rounded-2xl border border-background-200 bg-background-50 p-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-100 text-secondary-800">
                    <i className={`${control.icon} text-lg leading-none`} aria-hidden="true"></i>
                  </span>
                  <h3 className="mt-5 font-heading text-lg text-foreground-950">{control.title}</h3>
                  <p className="mt-2 text-[0.87rem] leading-relaxed text-foreground-700">{control.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-background-50 py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="font-heading text-[1.7rem] leading-tight text-foreground-950 md:text-[2.2rem]">
                Pharmacy partners and licensing
              </h2>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-foreground-700">
                Partner names, licensing numbers, accreditations and fulfillment locations appear here once
                contracts are final. We never publish a partner we cannot verify.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((slot) => (
                  <div
                    key={slot}
                    className="flex h-20 items-center justify-center rounded-2xl border border-dashed border-background-300 bg-background-100 font-label text-[0.68rem] uppercase tracking-[0.1em] text-foreground-500"
                  >
                    Logo slot {slot}
                  </div>
                ))}
              </div>

              <ul className="mt-8 space-y-3">
                {[
                  'Pharmacy licensing number — pending',
                  'State licensure coverage — pending',
                  'Accreditation documentation — pending',
                  'Fulfillment locations — pending',
                  'Shipping and storage standards — pending',
                  'Testing documentation — provided where applicable',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[0.88rem] text-foreground-700">
                    <i className="ri-time-line mt-0.5 text-base leading-none text-foreground-500" aria-hidden="true"></i>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-background-300 bg-background-100 p-6 md:p-8">
              <span className="inline-flex items-center gap-2 font-label text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-primary-700">
                <i className="ri-alert-line text-base leading-none" aria-hidden="true"></i>
                Important disclosure
              </span>
              <ul className="mt-6 space-y-4">
                {disclosures.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[0.88rem] leading-relaxed text-foreground-700">
                    <i className="ri-information-line mt-0.5 text-base leading-none text-foreground-500" aria-hidden="true"></i>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-background-200 pt-5 text-[0.8rem] leading-relaxed text-foreground-600">
                Individual experiences vary. Nothing on this page guarantees eligibility, prescription or a
                particular outcome.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}