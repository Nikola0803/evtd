import PageHero from '@/components/feature/PageHero';
import Container from '@/components/base/Container';
import Button from '@/components/base/Button';
import Reveal from '@/components/base/Reveal';
import Accordion from '@/components/base/Accordion';
import { steps, supportTeams } from '@/mocks/homeContent';
import { CTA_LABEL, CTA_MICROCOPY } from '@/constants/site';
import { usePageMeta } from '@/hooks/usePageMeta';

const stepDetails = [
  [
    'Your goals and how you want to feel',
    'Health history, current conditions and prior treatments',
    'Medications, supplements and known allergies',
    'Your state so care is matched to a licensed provider',
  ],
  [
    'A provider licensed in your state reviews your assessment',
    'They may request more information, labs or a video visit',
    'They decide, independently, whether treatment is appropriate',
    'You receive a secure notification with the decision',
  ],
  [
    'If prescribed, a licensed US pharmacy prepares your treatment',
    'Shipping is included, with directions and supplies where applicable',
    'Check-ins and renewal reviews continue your clinical support',
    'You can message your care team and manage your plan anytime',
  ],
];

const clinicianQuestions = [
  {
    id: 'why-ask',
    question: 'Why does a clinician sometimes ask for more information?',
    answer:
      'Making a safe decision often requires detail an initial assessment cannot capture. A clinician may ask follow-up questions, request laboratory testing or ask for a video visit before deciding.',
  },
  {
    id: 'why-decline',
    question: 'Why might a clinician decline treatment?',
    answer:
      'A treatment may be unsafe or inappropriate given your history, medications or conditions. Declining is a clinical decision, not a judgment, and you are not charged for treatment if you are declined.',
  },
  {
    id: 'how-long',
    question: 'How long does the process take?',
    answer:
      'Many assessments are reviewed within one business day. Timing can vary if additional information, testing or a video visit is needed. You will be updated in your portal.',
  },
  {
    id: 'ongoing',
    question: 'What does ongoing care include?',
    answer:
      'Secure clinician messaging, progress check-ins and a renewal review before each renewal. Your plan stays under clinical supervision for as long as you continue treatment.',
  },
];

export default function HowItWorks() {
  usePageMeta({
    title: 'How It Works | EVOLV Today Telehealth',
    description:
      'See how EVOLV Today works: complete a private assessment, a licensed clinician reviews it, and if prescribed, a licensed US pharmacy ships your treatment.',
    canonicalPath: '/how-it-works',
  });

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'How It Works' }]}
        eyebrow="How it works"
        title="Care without the waiting room."
        description="A simple, supported path from your first question to ongoing clinical care — with a licensed clinician responsible for every treatment decision."
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
          <div className="space-y-14 md:space-y-20">
            {steps.map((step, index) => (
              <Reveal key={step.number} delay={index * 60}>
                <div className="grid grid-cols-1 gap-8 border-t border-foreground-950/12 pt-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
                  <div>
                    <span className="font-heading text-[3rem] leading-none text-primary-500">{step.number}</span>
                    <h2 className="mt-5 font-heading text-[1.6rem] leading-tight text-foreground-950 md:text-[2rem]">
                      {step.title}
                    </h2>
                  </div>
                  <div>
                    <p className="max-w-2xl text-[0.98rem] leading-relaxed text-foreground-700">{step.copy}</p>
                    <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {stepDetails[index].map((detail) => (
                        <li
                          key={detail}
                          className="flex items-start gap-3 rounded-md border border-background-200 bg-background-100 p-4"
                        >
                          <i className="ri-check-line mt-0.5 text-base leading-none text-primary-600" aria-hidden="true"></i>
                          <span className="text-[0.86rem] leading-snug text-foreground-800">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-background-100 py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <h2 className="font-heading text-[1.7rem] leading-tight text-foreground-950 md:text-[2.2rem]">
                What a clinician may ask for
              </h2>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-foreground-700">
                Clinical review is a real evaluation, not a checkout step. Here is what can happen after you
                submit your assessment.
              </p>
            </div>
            <Accordion items={clinicianQuestions} defaultOpenId={clinicianQuestions[0].id} />
          </div>
        </Container>
      </section>

      <section className="bg-background-50 py-16 md:py-24">
        <Container>
          <h2 className="font-heading text-[1.7rem] leading-tight text-foreground-950 md:text-[2.2rem]">
            People, not just a platform
          </h2>
          <p className="mt-4 max-w-2xl text-[0.95rem] leading-relaxed text-foreground-700">
            EVOLV Support handles the practical side. Licensed clinicians handle anything medical.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            {supportTeams.map((team, index) => (
              <Reveal key={team.title} delay={index * 70}>
                <div className="h-full rounded-2xl border border-background-200 bg-background-100 p-6 md:p-7">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-100 text-secondary-800">
                    <i className={`${team.icon} text-lg leading-none`} aria-hidden="true"></i>
                  </span>
                  <h3 className="mt-5 font-heading text-xl text-foreground-950">{team.title}</h3>
                  <p className="mt-2 text-[0.88rem] leading-relaxed text-foreground-700">{team.copy}</p>
                  <ul className="mt-5 space-y-2.5">
                    {team.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[0.86rem] text-foreground-800">
                        <i className="ri-check-line mt-0.5 text-sm leading-none text-primary-600" aria-hidden="true"></i>
                        {item}
                      </li>
                    ))}
                  </ul>
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
              Ready when you are.
            </h2>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-background-50/85">
              Complete your private assessment and find out whether an EVOLV Today treatment is appropriate for
              you.
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