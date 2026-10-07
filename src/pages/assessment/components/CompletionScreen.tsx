import { Link } from 'react-router-dom';
import Container from '@/components/base/Container';
import Button from '@/components/base/Button';

const nextSteps = [
  {
    icon: 'ri-user-star-line',
    title: 'A licensed clinician reviews it',
    copy: 'A provider licensed in your state independently evaluates your information. They may request more information, laboratory testing or a video visit.',
  },
  {
    icon: 'ri-lock-2-line',
    title: 'You receive a secure notification',
    copy: 'We will notify you securely when there is an update. We never include sensitive health details in email or SMS previews.',
  },
  {
    icon: 'ri-information-line',
    title: 'No prescription is guaranteed',
    copy: 'Treatment is prescribed only when medically appropriate. If you are not prescribed, no treatment charge is captured.',
  },
];

export default function CompletionScreen() {
  return (
    <section className="bg-background-100 py-16 md:py-24">
      <Container className="max-w-3xl">
        <div className="rounded-2xl border border-background-200 bg-background-50 p-7 md:p-10">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-700">
            <i className="ri-check-line text-2xl leading-none" aria-hidden="true"></i>
          </span>
          <h1 className="mt-6 font-heading text-[1.8rem] leading-tight text-foreground-950 md:text-[2.4rem]">
            Your assessment has been submitted.
          </h1>
          <p className="mt-4 text-[0.98rem] leading-relaxed text-foreground-700">
            Thank you. Your information is now with our clinical team, and a licensed clinician will review it
            independently.
          </p>

          <div className="mt-9 space-y-5 border-t border-background-200 pt-8">
            {nextSteps.map((step) => (
              <div key={step.title} className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary-100 text-secondary-800">
                  <i className={`${step.icon} text-base leading-none`} aria-hidden="true"></i>
                </span>
                <div>
                  <p className="font-heading text-[1.05rem] text-foreground-950">{step.title}</p>
                  <p className="mt-1 text-[0.88rem] leading-relaxed text-foreground-700">{step.copy}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 rounded-md bg-background-100 px-4 py-3 text-[0.78rem] leading-relaxed text-foreground-600">
            If this is a medical emergency, call 911 or seek immediate in-person care. Do not wait for a
            clinical review for urgent symptoms.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to="/portal" variant="primary" size="lg" iconAfter="ri-arrow-right-line">
              Go to your patient portal
            </Button>
            <Button to="/" variant="outline" size="lg">
              Back to home
            </Button>
          </div>
        </div>

        <p className="mt-6 text-center text-[0.78rem] text-foreground-600">
          Need help with anything non-medical?{' '}
          <Link to="/faq" className="font-medium text-primary-700 transition-colors duration-200 hover:text-primary-600">
            Contact EVOLV Support
          </Link>
          .
        </p>
      </Container>
    </section>
  );
}