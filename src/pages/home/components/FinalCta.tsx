import Container from '@/components/base/Container';
import Button from '@/components/base/Button';
import Reveal from '@/components/base/Reveal';
import { finalCtaImage } from '@/mocks/homeContent';
import { CTA_LABEL, CTA_MICROCOPY } from '@/constants/site';

export default function FinalCta() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={finalCtaImage}
          alt="Calm morning mist over a quiet landscape in deep sage and warm stone tones"
          title="Begin your EVOLV Today assessment"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/70 via-foreground-950/55 to-foreground-950/75"></div>
      </div>

      <Container className="relative z-10 py-20 md:py-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-[2rem] leading-[1.1] tracking-[-0.015em] text-background-50 md:text-[2.9rem]">
            Your next chapter can start today.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[0.98rem] leading-relaxed text-background-50/85">
            Complete your private assessment and discover whether an EVOLV Today treatment is appropriate
            for you.
          </p>
          <div className="mt-9 flex justify-center">
            <Button to="/assessment" variant="primary" size="lg" iconAfter="ri-arrow-right-line">
              {CTA_LABEL}
            </Button>
          </div>
          <p className="mt-5 font-label text-[0.78rem] uppercase tracking-[0.1em] text-secondary-200">
            {CTA_MICROCOPY}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}