import { Link } from 'react-router-dom';
import Logo from './Logo';
import Container from '@/components/base/Container';
import NewsletterForm from './NewsletterForm';

const COLUMNS = [
  {
    title: 'Care',
    links: [
      { label: 'Treatments', to: '/treatments' },
      { label: 'Goals', to: '/goals' },
      { label: 'How It Works', to: '/how-it-works' },
      { label: 'Pricing', to: '/pricing' },
      { label: 'Pharmacy Standards', to: '/pharmacy-standards' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/partners' },
      { label: 'Clinical Team', to: '/clinical-team' },
      { label: 'Contact', to: '/faq' },
      { label: 'Partners', to: '/partners' },
      { label: 'Careers', to: '/partners' },
    ],
  },
  {
    title: 'Learn',
    links: [
      { label: 'Learning Center', to: '/learn' },
      { label: 'FAQs', to: '/faq' },
      { label: 'Patient Resources', to: '/learn' },
      { label: 'State Availability', to: '/states' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', to: '/legal/privacy' },
      { label: 'HIPAA Notice', to: '/legal/hipaa' },
      { label: 'Terms', to: '/legal/terms' },
      { label: 'Telehealth Consent', to: '/legal/telehealth-consent' },
      { label: 'Subscription Policy', to: '/legal/subscription-policy' },
      { label: 'Accessibility', to: '/legal/accessibility' },
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'Sign In', to: '/portal' },
      { label: 'Patient Support', to: '/faq' },
      { label: 'Take the Assessment', to: '/assessment' },
      { label: 'Treatment Options', to: '/treatments' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-foreground-950 text-background-50">
      <Container className="pt-16 md:pt-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.7fr] lg:gap-16">
          <div className="max-w-md">
            <Logo tone="light" />
            <p className="mt-5 font-heading text-xl leading-snug text-background-50 md:text-2xl">
              Modern care for a longer, stronger life.
            </p>
            <p className="mt-5 text-sm leading-relaxed text-secondary-200">
              Physician-guided longevity treatments, prescribed online and delivered from licensed US
              pharmacies.
            </p>
            <NewsletterForm />
            <div className="mt-7 flex flex-wrap gap-2">
              {['Licensed US clinicians', 'Licensed US pharmacies', 'Secure & private'].map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-background-50/15 px-3 py-1 font-label text-[0.66rem] uppercase tracking-[0.08em] text-secondary-200"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h3 className="font-label text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-secondary-400">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-[0.84rem] text-secondary-200 transition-colors duration-200 hover:text-background-50"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 border-t border-background-50/12 pt-8 lg:grid-cols-2">
          <div className="space-y-3 text-[0.78rem] leading-relaxed text-secondary-300">
            <p>
              Compounded medications are not FDA-approved. A licensed clinician determines whether a
              prescribed treatment is appropriate for each patient. Completing an assessment does not
              guarantee a prescription.
            </p>
            <p>
              EVOLV Today is a telehealth platform, not a pharmacy. Prescriptions are prepared and dispensed
              by licensed US pharmacy partners. EVOLV Support assists with accounts, billing and delivery;
              licensed clinicians handle medical questions and treatment decisions.
            </p>
          </div>
          <div className="space-y-3 text-[0.78rem] leading-relaxed text-secondary-300 lg:text-right">
            <p className="text-secondary-200">
              <span className="font-semibold text-background-50">EVOLV Today, Inc.</span>
              <br />
              1201 Congress Avenue, Suite 240
              <br />
              Austin, TX 78701
            </p>
            <p>
              EVOLV Support: <span className="text-background-50">support@evolvtoday.com</span>
              <br />
              Mon–Fri, 8am–8pm CT · Sat, 9am–3pm CT
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-background-50/12 pt-6 text-[0.75rem] text-secondary-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} EVOLV Today, Inc. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link to="/portal" className="transition-colors duration-200 hover:text-background-50">
              Sign In
            </Link>
            <Link to="/faq" className="transition-colors duration-200 hover:text-background-50">
              Patient Support
            </Link>
            <Link to="/legal/privacy" className="transition-colors duration-200 hover:text-background-50">
              Privacy
            </Link>
            <Link to="/legal/accessibility" className="transition-colors duration-200 hover:text-background-50">
              Accessibility
            </Link>
          </div>
        </div>
      </Container>

      <div className="mt-12 overflow-hidden" aria-hidden="true">
        <p className="select-none whitespace-nowrap px-5 text-center font-heading font-semibold leading-[0.85] tracking-[-0.03em] text-background-50/[0.08] text-[14vw] md:px-8">
          EVOLV TODAY
        </p>
      </div>
    </footer>
  );
}