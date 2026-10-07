import Container from '@/components/base/Container';
import SectionHeading from '@/components/base/SectionHeading';
import Button from '@/components/base/Button';
import Reveal from '@/components/base/Reveal';
import { steps } from '@/mocks/homeContent';
import { CTA_SHORT } from '@/constants/site';

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-background-50 py-20 md:py-28">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="How it works"
            title="Care without the waiting room."
            description="Three steps, with a licensed clinician in the middle of every decision."
          />
          <Button to="/assessment" variant="primary" size="lg" iconAfter="ri-arrow-right-line">
            {CTA_SHORT}
          </Button>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-7">
          {steps.map((step, index) => (
            <Reveal key={step.number} delay={index * 90}>
              <article className="group flex h-full flex-col">
                <div className="relative h-64 w-full overflow-hidden rounded-3xl bg-background-300 md:h-80">
                  <img
                    src={step.image}
                    alt={step.title}
                    title={`${step.title} — EVOLV Today`}
                    className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground-950/55 to-transparent"></div>
                  <span className="absolute bottom-4 left-5 font-heading text-[2.6rem] leading-none tracking-[-0.04em] text-background-50">
                    {step.number}
                  </span>
                </div>
                <h3 className="mt-6 font-heading text-xl leading-snug tracking-[-0.01em] text-foreground-950">
                  {step.title}
                </h3>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-foreground-700">{step.copy}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 overflow-hidden rounded-3xl bg-primary-500 md:mt-14">
          <div className="flex flex-col items-start gap-6 p-8 md:flex-row md:items-center md:justify-between md:p-10">
            <div>
              <p className="font-heading text-xl leading-snug text-background-50 md:text-2xl">
                Usually takes about three minutes.
              </p>
              <p className="mt-2 max-w-xl text-[0.88rem] leading-relaxed text-background-50/85">
                You are not charged unless a licensed clinician determines treatment is appropriate and a
                prescription is issued.
              </p>
            </div>
            <Button to="/assessment" variant="light" size="lg" iconAfter="ri-arrow-right-line">
              {CTA_SHORT}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}