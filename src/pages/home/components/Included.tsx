import Container from '@/components/base/Container';
import Button from '@/components/base/Button';
import Reveal from '@/components/base/Reveal';
import { inclusions } from '@/mocks/homeContent';

export default function Included() {
  return (
    <section className="bg-secondary-100 py-20 md:py-28">
      <Container>
        <div className="overflow-hidden rounded-3xl border border-foreground-950/10 bg-background-50">
          <div className="grid grid-cols-1 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="flex flex-col justify-center bg-foreground-950 p-8 md:p-10 lg:p-12">
              <div className="mb-4 flex items-center gap-3 font-label text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-primary-300">
                <span className="h-px w-6 bg-primary-400"></span>
                What is included
              </div>
              <h2 className="font-heading text-[1.85rem] leading-[1.1] tracking-[-0.02em] text-background-50 md:text-[2.5rem]">
                One price. No surprise layers.
              </h2>
              <p className="mt-5 text-[0.95rem] leading-relaxed text-secondary-200">
                Your monthly plan is designed to cover the care around your treatment — not just the
                medication.
              </p>
              <p className="mt-5 text-[0.82rem] leading-relaxed text-secondary-300">
                Exact inclusions and pricing are shown before you authorize payment. Not every treatment
                includes identical supplies, testing or services.
              </p>
              <div className="mt-8">
                <Button to="/pricing" variant="primary" size="lg" iconAfter="ri-arrow-right-line">
                  See pricing and inclusions
                </Button>
              </div>
            </div>

            <div className="p-8 md:p-10 lg:p-12">
              <ul className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
                {inclusions.map((item, index) => (
                  <Reveal key={item.label} delay={index * 40}>
                    <li className="flex items-start gap-3 border-b border-background-200 py-3.5">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center text-primary-600">
                        <i className={`${item.icon} text-base leading-none`} aria-hidden="true"></i>
                      </span>
                      <span className="text-[0.88rem] leading-snug text-foreground-900">{item.label}</span>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}