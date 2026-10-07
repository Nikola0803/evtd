import type { ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import Container from '@/components/base/Container';
import Button from '@/components/base/Button';
import Accordion from '@/components/base/Accordion';
import Reveal from '@/components/base/Reveal';
import { programs } from '@/mocks/programs';
import { programDetails } from '@/mocks/programDetails';
import type { Program } from '@/types/content';
import { CTA_LABEL, CTA_MICROCOPY } from '@/constants/site';
import { usePageMeta } from '@/hooks/usePageMeta';

interface TimelineStep {
  label: string;
  copy: string;
}

interface PricingRow {
  name: string;
  price: string;
  note: string;
}

interface DetailFaq {
  id: string;
  question: string;
  answer: string;
}

interface DetailShape {
  updated: string;
  reviewer: string;
  whatItIs: string;
  howItMayWork: string;
  eligibility: string[];
  notEligible: string[];
  sideEffects: string[];
  timeline: TimelineStep[];
  planIncludes: string[];
  formats: string[];
  pricing: PricingRow[];
  reviewProcess: string[];
  pharmacyShipping: string;
  faqs: DetailFaq[];
  safety: string[];
  references: string[];
}

function buildGenericDetail(program: Program): DetailShape {
  return {
    updated: 'Updated September 2026',
    reviewer: 'Medical reviewer: pending',
    whatItIs: `${program.name} is a clinician-guided program focused on ${program.purpose.toLowerCase()}. Treatment is considered only after a licensed clinician reviews your goals, health history and current medications.`,
    howItMayWork:
      'How this treatment may work depends on the individual. Your clinician will explain what is known, what is uncertain, and whether a prescribed option can be considered for you. Individual experiences vary.',
    eligibility: [
      'Adults 18 and over in a supported state',
      'No contraindications identified during clinical review',
      `A stated goal related to ${program.goalLabel.toLowerCase()}`,
      'Willingness to complete follow-up check-ins',
    ],
    notEligible: [
      'Pregnancy or breastfeeding',
      'Known hypersensitivity to the medication or its components',
      'Certain active medical conditions identified by your clinician',
      'Any situation where a clinician determines treatment is not appropriate',
    ],
    sideEffects: [
      'Side effects depend on the specific treatment your clinician may prescribe',
      'Your clinician will review relevant risks with you before treatment',
      'Report any unusual or persistent symptom to your care team',
    ],
    timeline: [
      { label: 'Assessment', copy: 'Share your goals, history and current medications.' },
      { label: 'Clinical review', copy: 'A licensed clinician independently evaluates your information.' },
      { label: 'Prescription', copy: 'If appropriate, it is sent to a licensed US pharmacy partner.' },
      { label: 'Delivery', copy: 'Your treatment ships with clear directions and any supplies needed.' },
      { label: 'Ongoing care', copy: 'Check-ins and renewal reviews continue your clinical support.' },
    ],
    planIncludes: [
      'Licensed clinician review',
      'Individual prescription when appropriate',
      'Pharmacy preparation and dispensing',
      'Shipping',
      'Secure clinician messaging',
      'Progress check-ins and renewal review',
    ],
    formats: [program.format, 'Clinician-set directions', 'Monthly supply where prescribed'],
    pricing: [
      {
        name: 'Monthly plan',
        price: program.priceLabel,
        note: 'Billed monthly; includes clinician review and support.',
      },
      { name: 'Renewal review', price: 'Included', note: 'Your plan is reviewed before each renewal.' },
      {
        name: 'If not prescribed',
        price: 'No treatment charge',
        note: 'You are not charged for treatment if you are declined.',
      },
    ],
    reviewProcess: [
      'A provider licensed in your state reviews your assessment independently.',
      'They may request additional information, laboratory testing or a video visit.',
      'A prescription is issued only when treatment is safe and appropriate.',
      'You receive a secure notification with the decision and next steps.',
    ],
    pharmacyShipping:
      'If prescribed, your prescription is sent to a licensed US pharmacy partner and prepared for you individually. Shipping is included, and delivery timing is confirmed in your patient portal.',
    faqs: [
      {
        id: `${program.slug}-declined`,
        question: 'Can I be declined?',
        answer:
          'Yes. Completing an assessment does not guarantee a prescription. A licensed clinician prescribes only when medically appropriate, and you are not charged for treatment if you are declined.',
      },
      {
        id: `${program.slug}-charged`,
        question: 'When will I be charged?',
        answer:
          'Your payment method may be authorized when you begin. The treatment charge is captured only after clinical approval, according to the policy shown before checkout.',
      },
    ],
    safety: [
      'Compounded medications are not FDA-approved.',
      'A licensed clinician determines whether a prescribed treatment is appropriate for each patient.',
      'Do not start, stop or change treatment without speaking with your care team.',
      'Tell your clinician about all medications, supplements and conditions.',
    ],
    references: ['Clinical reference pending medical review (placeholder).'],
  };
}

function DetailBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-background-200 py-8 first:border-t-0 first:pt-0">
      <h2 className="font-heading text-xl leading-snug text-foreground-950 md:text-2xl">{title}</h2>
      <div className="mt-4 space-y-3 text-[0.92rem] leading-relaxed text-foreground-700">{children}</div>
    </section>
  );
}

function BulletList({ items, icon = 'ri-check-line' }: { items: string[]; icon?: string }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <i className={`${icon} mt-1 text-base leading-none text-primary-600`} aria-hidden="true"></i>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function TreatmentDetail() {
  const { slug } = useParams();
  const program = programs.find((item) => item.slug === slug);

  usePageMeta({
    title: program ? `${program.name} | EVOLV Today Telehealth` : 'Treatment | EVOLV Today Telehealth',
    description: program
      ? `${program.purpose}. Prescribed online only if a licensed clinician determines treatment is appropriate.`
      : undefined,
    canonicalPath: program ? `/treatments/${program.slug}` : '/treatments',
  });

  if (!program) {
    return (
      <Container className="py-32 text-center md:py-40">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-background-200 text-foreground-700">
          <i className="ri-search-line text-xl leading-none" aria-hidden="true"></i>
        </span>
        <h1 className="mt-5 font-heading text-2xl text-foreground-950">Program not found</h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-foreground-600">
          We could not find that treatment. Browse all treatment options to see what is available.
        </p>
        <div className="mt-7 flex justify-center">
          <Button to="/treatments" variant="primary" size="md">
            Browse treatments
          </Button>
        </div>
      </Container>
    );
  }

  const detailMap = programDetails as Record<string, DetailShape>;
  const detail = detailMap[program.slug] ?? buildGenericDetail(program);

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
                <Link to="/treatments" className="transition-colors duration-200 hover:text-primary-700">
                  Treatments
                </Link>
                <i className="ri-arrow-right-s-line text-sm leading-none text-foreground-400" aria-hidden="true"></i>
              </li>
              <li className="text-foreground-800">{program.name}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary-100 px-3 py-1 font-label text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-secondary-900">
                <i className="ri-lock-2-line text-xs leading-none" aria-hidden="true"></i>
                {program.badge}
              </span>
              <h1 className="mt-5 font-heading text-[2.1rem] leading-[1.08] tracking-[-0.015em] text-foreground-950 md:text-[2.9rem]">
                {program.name}
              </h1>
              <p className="mt-4 font-label text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-primary-700">
                {program.goalLabel}
              </p>
              <p className="mt-4 max-w-xl text-[1rem] leading-relaxed text-foreground-700">{program.purpose}.</p>

              <dl className="mt-8 grid grid-cols-2 gap-5 border-y border-background-300 py-6 sm:grid-cols-3">
                <div>
                  <dt className="text-[0.72rem] uppercase tracking-[0.1em] text-foreground-500">Format</dt>
                  <dd className="mt-1.5 text-sm font-medium text-foreground-950">{program.format}</dd>
                </div>
                <div>
                  <dt className="text-[0.72rem] uppercase tracking-[0.1em] text-foreground-500">Starting price</dt>
                  <dd className="mt-1.5 text-sm font-medium text-foreground-950">{program.priceLabel}</dd>
                </div>
                <div>
                  <dt className="text-[0.72rem] uppercase tracking-[0.1em] text-foreground-500">Requirement</dt>
                  <dd className="mt-1.5 text-sm font-medium text-foreground-950">Prescription required</dd>
                </div>
              </dl>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button to={`/assessment?program=${program.slug}`} variant="primary" size="lg" iconAfter="ri-arrow-right-line">
                  See if I qualify
                </Button>
                <Button to="/pricing" variant="outline" size="lg">
                  View pricing
                </Button>
              </div>
              <p className="mt-4 font-label text-[0.75rem] uppercase tracking-[0.1em] text-foreground-600">
                {CTA_MICROCOPY}
              </p>

              <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-3 rounded-md border border-dashed border-background-300 bg-background-50 px-4 py-3">
                  <i className="ri-star-line text-base leading-none text-foreground-500" aria-hidden="true"></i>
                  <span className="font-label text-[0.72rem] uppercase tracking-[0.08em] text-foreground-500">
                    Review integration reserved
                  </span>
                </div>
                <div className="flex items-start gap-3 rounded-md border border-background-300 bg-background-50 px-4 py-3">
                  <i className="ri-information-line mt-0.5 text-base leading-none text-primary-600" aria-hidden="true"></i>
                  <span className="text-[0.74rem] leading-snug text-foreground-600">
                    A clinician decides independently. Treatment is never guaranteed.
                  </span>
                </div>
              </div>
            </div>

            <div className="relative h-80 w-full overflow-hidden rounded-2xl bg-background-300 md:h-[30rem]">
              <img
                src={program.image}
                alt={`${program.name} — ${program.purpose}`}
                title={`${program.name} prescription treatment`}
                className="h-full w-full object-cover object-top"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-background-50 py-16 md:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
            <div>
              <DetailBlock title="What it is">
                <p>{detail.whatItIs}</p>
              </DetailBlock>

              <DetailBlock title="How it may work">
                <p>{detail.howItMayWork}</p>
              </DetailBlock>

              <DetailBlock title="Who may be eligible">
                <BulletList items={detail.eligibility} />
              </DetailBlock>

              <DetailBlock title="Who should not use it">
                <BulletList items={detail.notEligible} icon="ri-close-line" />
              </DetailBlock>

              <DetailBlock title="Potential side effects">
                <p className="text-[0.86rem] uppercase tracking-[0.06em] text-foreground-600">
                  Individual experiences vary.
                </p>
                <BulletList items={detail.sideEffects} icon="ri-error-warning-line" />
              </DetailBlock>

              <DetailBlock title="Expected care timeline">
                <ol className="space-y-4">
                  {detail.timeline.map((step, index) => (
                    <li key={step.label} className="flex items-start gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary-200 bg-background-100 font-label text-[0.72rem] font-semibold text-primary-700">
                        {index + 1}
                      </span>
                      <div>
                        <p className="font-heading text-base text-foreground-950">{step.label}</p>
                        <p className="mt-1 text-[0.88rem] text-foreground-700">{step.copy}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </DetailBlock>

              <DetailBlock title="What the plan includes">
                <BulletList items={detail.planIncludes} />
                <p className="text-[0.82rem] text-foreground-600">
                  Exact inclusions and pricing are shown before you authorize payment.
                </p>
              </DetailBlock>

              <DetailBlock title="Available formats">
                <BulletList items={detail.formats} icon="ri-arrow-right-s-line" />
              </DetailBlock>

              <DetailBlock title="Pricing options">
                <div className="mt-1 divide-y divide-background-200 rounded-2xl border border-background-200">
                  {detail.pricing.map((row) => (
                    <div key={row.name} className="flex flex-col gap-1 p-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-medium text-foreground-950">{row.name}</p>
                        <p className="text-[0.8rem] text-foreground-600">{row.note}</p>
                      </div>
                      <p className="font-heading text-base text-foreground-950">{row.price}</p>
                    </div>
                  ))}
                </div>
              </DetailBlock>

              <DetailBlock title="Clinical review process">
                <BulletList items={detail.reviewProcess} />
              </DetailBlock>

              <DetailBlock title="Pharmacy and shipping">
                <p>{detail.pharmacyShipping}</p>
                <Link
                  to="/pharmacy-standards"
                  className="inline-flex items-center gap-2 pt-1 font-label text-sm font-medium text-primary-700 transition-colors duration-200 hover:text-primary-600"
                >
                  Learn about our pharmacy standards
                  <i className="ri-arrow-right-line text-base leading-none" aria-hidden="true"></i>
                </Link>
              </DetailBlock>

              <DetailBlock title="Frequently asked questions">
                <Accordion
                  items={detail.faqs.map((faq) => ({
                    id: faq.id,
                    question: faq.question,
                    answer: faq.answer,
                  }))}
                />
              </DetailBlock>

              <DetailBlock title="Important safety information">
                <div className="rounded-2xl bg-background-100 p-5">
                  <BulletList items={detail.safety} icon="ri-shield-cross-line" />
                </div>
              </DetailBlock>

              <DetailBlock title="Medical references">
                <ul className="space-y-2.5 text-[0.86rem] text-foreground-600">
                  {detail.references.map((reference) => (
                    <li key={reference} className="flex items-start gap-3">
                      <i className="ri-file-text-line mt-0.5 text-base leading-none text-foreground-500" aria-hidden="true"></i>
                      {reference}
                    </li>
                  ))}
                </ul>
              </DetailBlock>

              <DetailBlock title="Medical reviewer and updated date">
                <p>{detail.reviewer}</p>
                <p className="text-[0.86rem] text-foreground-600">{detail.updated}</p>
              </DetailBlock>
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-2xl border border-background-200 bg-background-100 p-6">
                <h2 className="font-heading text-lg text-foreground-950">At a glance</h2>
                <dl className="mt-5 space-y-3.5 text-[0.86rem]">
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-foreground-600">Category</dt>
                    <dd className="font-medium text-foreground-900">{program.goalLabel}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-foreground-600">Format</dt>
                    <dd className="font-medium text-foreground-900">{program.format}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-foreground-600">Clinician review</dt>
                    <dd className="font-medium text-foreground-900">Included</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-foreground-600">Requirement</dt>
                    <dd className="font-medium text-foreground-900">Prescription</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3 border-t border-background-200 pt-3.5">
                    <dt className="text-foreground-600">Starting price</dt>
                    <dd className="font-heading text-base text-foreground-950">{program.priceLabel}</dd>
                  </div>
                </dl>
                <div className="mt-6">
                  <Button to={`/assessment?program=${program.slug}`} variant="primary" size="md" fullWidth iconAfter="ri-arrow-right-line">
                    See if I qualify
                  </Button>
                </div>
                <p className="mt-3 text-[0.72rem] leading-relaxed text-foreground-600">
                  Completing an assessment does not guarantee a prescription.
                </p>
              </div>

              <div className="mt-4 rounded-2xl border border-background-200 bg-background-50 p-6">
                <h2 className="font-label text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-foreground-600">
                  Explore other goals
                </h2>
                <ul className="mt-4 space-y-2.5">
                  <li>
                    <Link to="/goals" className="text-sm text-primary-700 transition-colors duration-200 hover:text-primary-600">
                      All goals
                    </Link>
                  </li>
                  <li>
                    <Link to="/how-it-works" className="text-sm text-primary-700 transition-colors duration-200 hover:text-primary-600">
                      How care works
                    </Link>
                  </li>
                  <li>
                    <Link to="/learn" className="text-sm text-primary-700 transition-colors duration-200 hover:text-primary-600">
                      Learning center
                    </Link>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section className="bg-primary-600 py-16 text-background-50 md:py-20">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-[1.7rem] leading-tight md:text-[2.3rem]">
              Discover whether this treatment is appropriate for you.
            </h2>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-background-50/85">
              A licensed clinician reviews your assessment independently and decides whether treatment is safe
              and appropriate.
            </p>
            <div className="mt-8 flex justify-center">
              <Button to={`/assessment?program=${program.slug}`} variant="primary" size="lg" iconAfter="ri-arrow-right-line">
                {CTA_LABEL}
              </Button>
            </div>
            <p className="mt-4 font-label text-[0.75rem] uppercase tracking-[0.1em] text-background-50/80">
              {CTA_MICROCOPY}
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}