import PageHero from '@/components/feature/PageHero';
import Container from '@/components/base/Container';
import Reveal from '@/components/base/Reveal';
import ReaddyForm from '@/components/feature/ReaddyForm';
import { usePageMeta } from '@/hooks/usePageMeta';

const partnerTypes = [
  {
    icon: 'ri-building-2-line',
    title: 'Licensed US pharmacies',
    copy: '503A compounding and dispensing partners able to prepare patient-specific prescriptions.',
  },
  {
    icon: 'ri-stethoscope-line',
    title: 'Clinical networks',
    copy: 'Licensed providers and clinical groups interested in asynchronous and video-based care.',
  },
  {
    icon: 'ri-test-tube-line',
    title: 'Laboratory partners',
    copy: 'Accredited laboratories supporting clinician-requested testing for patients.',
  },
  {
    icon: 'ri-cpu-line',
    title: 'Technology and logistics',
    copy: 'Secure messaging, identity verification and cold-chain delivery partners.',
  },
];

export default function Partners() {
  usePageMeta({
    title: 'Partners | EVOLV Today Telehealth',
    description:
      'EVOLV Today works with licensed US pharmacies, clinical networks, accredited laboratories and secure technology partners.',
    canonicalPath: '/partners',
  });

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Partners' }]}
        eyebrow="Partners"
        title="Built with licensed professionals."
        description="EVOLV Today works with licensed US pharmacies, licensed clinical networks, accredited laboratories and secure technology partners. Partner details appear here once contracts and verifications are complete."
      />

      <section className="bg-background-50 py-16 md:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {partnerTypes.map((type, index) => (
              <Reveal key={type.title} delay={index * 60}>
                <div className="h-full rounded-2xl border border-background-200 bg-background-100 p-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-100 text-secondary-800">
                    <i className={`${type.icon} text-lg leading-none`} aria-hidden="true"></i>
                  </span>
                  <h2 className="mt-5 font-heading text-lg text-foreground-950">{type.title}</h2>
                  <p className="mt-2 text-[0.87rem] leading-relaxed text-foreground-700">{type.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-14">
            <h2 className="font-heading text-[1.6rem] leading-tight text-foreground-950 md:text-[2.1rem]">
              Verified partner directory
            </h2>
            <p className="mt-4 max-w-2xl text-[0.95rem] leading-relaxed text-foreground-700">
              We publish partner names, licensing and accreditations only when they can be verified. Slots below
              are reserved for that information.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((slot) => (
                <div
                  key={slot}
                  className="flex h-24 items-center justify-center rounded-2xl border border-dashed border-background-300 bg-background-100 font-label text-[0.68rem] uppercase tracking-[0.1em] text-foreground-500"
                >
                  Partner slot {slot}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-background-100 py-16 md:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            <div>
              <h2 className="font-heading text-[1.6rem] leading-tight text-foreground-950 md:text-[2.1rem]">
                Partner with EVOLV Today
              </h2>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-foreground-700">
                If you are a licensed pharmacy, clinical network, accredited laboratory or logistics partner, we
                would like to hear from you. Tell us who you are and how you are licensed.
              </p>
              <ul className="mt-7 space-y-4">
                {[
                  'Verification-first: licensing and accreditation reviewed before listing',
                  'Clear fulfillment standards and traceability expectations',
                  'Patient-safety-focused operating model',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[0.88rem] text-foreground-700">
                    <i className="ri-check-line mt-0.5 text-base leading-none text-primary-600" aria-hidden="true"></i>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <ReaddyForm
              formId="partner-inquiry"
              formName="Partner Inquiry"
              submitAddr="https://readdy.ai/api/form/dar6cq6hq9f5fk98cq10"
              submitLabel="Submit inquiry"
              successTitle="Thank you — your inquiry has been received."
              successCopy="Our partnerships team will review your details and follow up by email. Verified partners are added to the directory after licensing checks."
              fields={[
                { name: 'name', label: 'Contact name', type: 'text', required: true, placeholder: 'Alex Rivera' },
                { name: 'email', label: 'Work email', type: 'email', required: true, placeholder: 'you@company.com' },
                { name: 'organization', label: 'Organization', type: 'text', required: true, placeholder: 'Company name' },
                {
                  name: 'partnerType',
                  label: 'Partnership type',
                  type: 'select',
                  required: true,
                  placeholder: 'Choose a category',
                  options: [
                    'Licensed US pharmacy',
                    'Clinical network',
                    'Laboratory partner',
                    'Technology or logistics',
                  ],
                },
                {
                  name: 'message',
                  label: 'Tell us about your organization',
                  type: 'textarea',
                  required: true,
                  maxLength: 500,
                  placeholder: 'Licensing, coverage and the services you provide.',
                },
              ]}
            />
          </div>
        </Container>
      </section>
    </>
  );
}