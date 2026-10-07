import PageHero from '@/components/feature/PageHero';
import Container from '@/components/base/Container';
import Button from '@/components/base/Button';
import Accordion from '@/components/base/Accordion';
import ReaddyForm from '@/components/feature/ReaddyForm';
import { faqs } from '@/mocks/faqs';
import { CTA_LABEL, CTA_MICROCOPY } from '@/constants/site';
import { usePageMeta } from '@/hooks/usePageMeta';

const groups = [
  {
    title: 'About EVOLV Today',
    ids: ['what-is-evlt', 'is-evlt-a-pharmacy', 'who-provides-medical-care', 'which-pharmacy-prepares-medication'],
  },
  {
    title: 'Prescriptions and clinical decisions',
    ids: [
      'are-prescriptions-guaranteed',
      'what-if-i-am-declined',
      'how-long-does-review-take',
      'labs-or-video-visit',
      'are-compounded-fda-approved',
    ],
  },
  {
    title: 'Pricing, payment and plans',
    ids: ['when-will-i-be-charged', 'does-evlt-accept-insurance', 'hsa-fsa-eligible', 'how-do-renewals-work', 'pause-or-cancel'],
  },
  {
    title: 'Availability and privacy',
    ids: ['which-states-are-supported', 'how-is-my-information-protected'],
  },
];

export default function Faq() {
  usePageMeta({
    title: 'FAQ | EVOLV Today Telehealth',
    description:
      'Answers about clinical review, prescriptions, pricing, availability and privacy at EVOLV Today. Pay only if prescribed, no insurance needed.',
    canonicalPath: '/faq',
  });

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'FAQ' }]}
        eyebrow="Questions"
        title="Answers before you decide."
        description="Straight answers about clinical review, prescriptions, pricing, availability and privacy. If something is still unclear, EVOLV Support can help — no account required."
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
          <div className="mx-auto max-w-4xl space-y-12">
            {groups.map((group) => {
              const items = faqs
                .filter((faq) => group.ids.includes(faq.id))
                .map((faq) => ({ id: faq.id, question: faq.question, answer: faq.answer }));
              return (
                <div key={group.title}>
                  <h2 className="font-heading text-xl text-foreground-950 md:text-2xl">{group.title}</h2>
                  <div className="mt-4">
                    <Accordion items={items} />
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-background-100 py-16 md:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            <div>
              <h2 className="font-heading text-[1.6rem] leading-tight text-foreground-950 md:text-[2.1rem]">
                Contact EVOLV Support
              </h2>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-foreground-700">
                EVOLV Support assists with accounts, billing, subscription changes and delivery tracking.
                Licensed clinicians handle medical questions and treatment decisions through secure messaging
                in your portal.
              </p>
              <ul className="mt-7 space-y-4">
                {[
                  { icon: 'ri-mail-line', label: 'support@evolvtoday.com' },
                  { icon: 'ri-time-line', label: 'Mon–Fri, 8am–8pm CT · Sat, 9am–3pm CT' },
                  { icon: 'ri-shield-check-line', label: 'Never share sensitive health details in a web form' },
                ].map((item) => (
                  <li key={item.label} className="flex items-start gap-3 text-[0.88rem] text-foreground-700">
                    <i className={`${item.icon} mt-0.5 text-base leading-none text-primary-600`} aria-hidden="true"></i>
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>

            <ReaddyForm
              formId="contact-evlt-support"
              formName="Contact EVOLV Support"
              submitAddr="https://readdy.ai/api/form/dar6cq6hq9f5fk98cq0g"
              submitLabel="Send message"
              successTitle="Your message has been received."
              successCopy="EVOLV Support will respond to the email address you provided. For anything medical, please use secure messaging in your patient portal."
              fields={[
                { name: 'name', label: 'Full name', type: 'text', required: true, placeholder: 'Jordan Ellis' },
                { name: 'email', label: 'Email address', type: 'email', required: true, placeholder: 'you@example.com' },
                { name: 'phone', label: 'Phone (optional)', type: 'tel', placeholder: '(555) 010-2030' },
                {
                  name: 'topic',
                  label: 'What is this about?',
                  type: 'select',
                  required: true,
                  placeholder: 'Choose a topic',
                  options: [
                    'Account access',
                    'Billing',
                    'Subscription changes',
                    'Delivery tracking',
                    'General question',
                  ],
                },
                {
                  name: 'message',
                  label: 'How can we help?',
                  type: 'textarea',
                  required: true,
                  maxLength: 500,
                  placeholder: 'Please do not include medical details here.',
                },
              ]}
            />
          </div>
        </Container>
      </section>
    </>
  );
}