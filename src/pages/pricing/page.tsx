import { Link } from 'react-router-dom';
import PageHero from '@/components/feature/PageHero';
import Container from '@/components/base/Container';
import Button from '@/components/base/Button';
import Reveal from '@/components/base/Reveal';
import Accordion from '@/components/base/Accordion';
import { programs } from '@/mocks/programs';
import { inclusions } from '@/mocks/homeContent';
import { CTA_LABEL, CTA_MICROCOPY } from '@/constants/site';
import { usePageMeta } from '@/hooks/usePageMeta';

const paymentSteps = [
  {
    title: 'See pricing without an account',
    copy: 'Starting prices and inclusions are public. You can compare programs before you share any information.',
  },
  {
    title: 'Authorize after your assessment',
    copy: 'Your payment method may be securely authorized when you begin. This places a hold, not a charge.',
  },
  {
    title: 'Captured only after approval',
    copy: 'The treatment charge is captured only after clinical approval, according to the policy shown before checkout.',
  },
  {
    title: 'No treatment charge if declined',
    copy: 'If a clinician decides treatment is not appropriate, no treatment charge is captured.',
  },
];

const pricingFaqs = [
  {
    id: 'consultation-fee',
    question: 'Is there a separate consultation fee?',
    answer:
      'No. Clinician review is included in the monthly plan shown for each program. There are no hidden consultation fees or memberships.',
  },
  {
    id: 'insurance-pricing',
    question: 'Does pricing change if I have insurance?',
    answer:
      'EVOLV Today is a cash-pay service. Prices are the same regardless of insurance, which is what keeps them transparent and simple.',
  },
  {
    id: 'cancel-pricing',
    question: 'What if I want to pause or cancel?',
    answer:
      'You can pause or cancel from your patient portal, subject to the terms shown at checkout. Prescriptions already dispensed cannot be returned.',
  },
  {
    id: 'price-change',
    question: 'Can prices change over time?',
    answer:
      'Plan pricing may change as the clinical menu evolves. Any change to your plan is shown to you before it takes effect.',
  },
];

export default function Pricing() {
  usePageMeta({
    title: 'Pricing | EVOLV Today Telehealth Plans',
    description:
      'Transparent monthly pricing for clinician-guided telehealth programs. Clinician review included, and no treatment charge unless a clinician approves treatment.',
    canonicalPath: '/pricing',
  });

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Pricing' }]}
        eyebrow="Pricing"
        title="Transparent monthly pricing. No surprise layers."
        description="Starting prices are public, clinician review is included, and you are shown the full picture before you authorize anything. Treatment is prescribed only when medically appropriate."
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
            Program pricing
          </h2>
          <p className="mt-4 max-w-2xl text-[0.95rem] leading-relaxed text-foreground-700">
            Prices below are starting points for a monthly plan that includes clinician review, secure
            messaging and renewal review.
          </p>

          <div className="mt-10 overflow-hidden rounded-2xl border border-background-200">
            <div className="hidden grid-cols-[1.4fr_1fr_1fr_auto] gap-4 border-b border-background-200 bg-background-100 px-6 py-4 font-label text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-foreground-600 lg:grid">
              <span>Program</span>
              <span>Goal</span>
              <span>Starting price</span>
              <span className="text-right">Action</span>
            </div>
            {programs.map((program) => (
              <div
                key={program.id}
                className="grid grid-cols-1 gap-4 border-b border-background-200 bg-background-50 px-6 py-5 last:border-b-0 lg:grid-cols-[1.4fr_1fr_1fr_auto] lg:items-center"
              >
                <div>
                  <p className="font-heading text-base text-foreground-950">{program.name}</p>
                  <p className="mt-1 text-[0.82rem] text-foreground-600">{program.purpose}</p>
                  <span className="mt-2 inline-flex items-center gap-1.5 font-label text-[0.66rem] uppercase tracking-[0.1em] text-foreground-500">
                    <i className="ri-lock-2-line text-xs leading-none" aria-hidden="true"></i>
                    Prescription required
                  </span>
                </div>
                <p className="text-[0.86rem] text-foreground-800">{program.goalLabel}</p>
                <p className="font-heading text-base text-foreground-950">{program.priceLabel}</p>
                <div className="flex flex-wrap gap-2 lg:justify-end">
                  <Link
                    to={`/treatments/${program.slug}`}
                    className="whitespace-nowrap rounded-md border border-foreground-950/15 px-3.5 py-2 font-label text-[0.78rem] font-medium text-foreground-900 transition-colors duration-200 hover:border-primary-500"
                  >
                    Learn more
                  </Link>
                  <Link
                    to={`/assessment?program=${program.slug}`}
                    className="whitespace-nowrap rounded-md bg-primary-500 px-3.5 py-2 font-label text-[0.78rem] font-medium text-background-50 transition-colors duration-200 hover:bg-primary-600"
                  >
                    See if I qualify
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-5 max-w-3xl text-[0.78rem] leading-relaxed text-foreground-600">
            Starting prices are shown for planning. Exact inclusions, totals and any applicable policy are
            shown before you authorize payment. Metabolic plans are personalized, so pricing is confirmed after
            clinical review.
          </p>
        </Container>
      </section>

      <section className="bg-background-100 py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="font-heading text-[1.7rem] leading-tight text-foreground-950 md:text-[2.2rem]">
                What every plan includes
              </h2>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-foreground-700">
                Inclusions are designed to cover the care around your treatment, not just the medication.
              </p>
              <ul className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {inclusions.map((item) => (
                  <li key={item.label} className="flex items-start gap-3 rounded-md border border-background-200 bg-background-50 p-4">
                    <i className={`${item.icon} mt-0.5 text-base leading-none text-primary-600`} aria-hidden="true"></i>
                    <span className="text-[0.84rem] leading-snug text-foreground-800">{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-heading text-[1.7rem] leading-tight text-foreground-950 md:text-[2.2rem]">
                How payment works
              </h2>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-foreground-700">
                No surprise charges. Here is exactly when money moves.
              </p>
              <ol className="mt-7 space-y-4">
                {paymentSteps.map((step, index) => (
                  <Reveal key={step.title} delay={index * 60}>
                    <li className="flex items-start gap-4 rounded-2xl border border-background-200 bg-background-50 p-5">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-100 font-label text-[0.74rem] font-semibold text-primary-700">
                        {index + 1}
                      </span>
                      <div>
                        <p className="font-heading text-base text-foreground-950">{step.title}</p>
                        <p className="mt-1 text-[0.86rem] leading-relaxed text-foreground-700">{step.copy}</p>
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-background-50 py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
            <div>
              <h2 className="font-heading text-[1.7rem] leading-tight text-foreground-950 md:text-[2.2rem]">
                Pricing questions
              </h2>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-foreground-700">
                Still unsure about cost? These are the questions patients ask most.
              </p>
            </div>
            <Accordion items={pricingFaqs} defaultOpenId={pricingFaqs[0].id} />
          </div>
        </Container>
      </section>
    </>
  );
}