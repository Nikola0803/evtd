import Container from '@/components/base/Container';
import Button from '@/components/base/Button';
import Reveal from '@/components/base/Reveal';
import { comparisonRows, comparisonImage } from '@/mocks/homeContent';
import { CTA_SHORT } from '@/constants/site';

export default function Comparison() {
  return (
    <section className="bg-foreground-950 py-20 md:py-28">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-3 font-label text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-accent-300">
              <span className="h-px w-6 bg-accent-400"></span>
              A different category of care
            </div>
            <h2 className="font-heading text-[2rem] leading-[1.06] tracking-[-0.02em] text-background-50 md:text-[2.9rem]">
              EVOLV Today vs. unsupervised products.
            </h2>
          </div>
          <p className="max-w-md text-[0.95rem] leading-relaxed text-secondary-200 lg:text-right">
            The difference is not marketing — it is whether a licensed professional is responsible for
            evaluating you and making the prescription decision.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-stretch lg:gap-12">
          <Reveal className="relative min-h-[22rem] w-full overflow-hidden rounded-3xl">
            <img
              src={comparisonImage}
              alt="A calm, confident adult in a bright minimal room"
              title="Physician-guided care versus unsupervised products"
              className="h-full w-full object-cover object-top"
            />
            <div className="absolute inset-x-5 bottom-5 rounded-2xl bg-foreground-950/70 p-4 backdrop-blur-sm">
              <p className="flex items-center gap-2 font-label text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-accent-300">
                <i className="ri-shield-check-line text-sm leading-none" aria-hidden="true"></i>
                A clinician is responsible for your care
              </p>
            </div>
          </Reveal>

          <div>
            <div className="overflow-hidden rounded-2xl border border-background-50/12">
              <div className="grid grid-cols-[1.7fr_1fr_1fr] items-center gap-2 bg-background-50/[0.07] px-4 py-4 font-label text-[0.62rem] font-semibold uppercase tracking-[0.1em] md:px-5">
                <span className="text-background-50/70">What matters</span>
                <span className="text-center text-accent-300">EVOLV Today</span>
                <span className="text-center text-background-50/45">Unsupervised</span>
              </div>
              {comparisonRows.map((row, index) => (
                <div
                  key={row.label}
                  className={`grid grid-cols-[1.7fr_1fr_1fr] items-center gap-2 px-4 py-4 md:px-5 ${
                    index % 2 === 0 ? 'bg-background-50/[0.03]' : 'bg-transparent'
                  }`}
                >
                  <span className="pr-2 text-[0.86rem] leading-snug text-secondary-100">{row.label}</span>
                  <span className="flex justify-center">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-500 text-background-50">
                      <i className="ri-check-line text-sm leading-none" aria-hidden="true"></i>
                    </span>
                  </span>
                  <span className="flex justify-center">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-background-50/10 text-background-50/40">
                      <i className="ri-close-line text-sm leading-none" aria-hidden="true"></i>
                    </span>
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-5 max-w-2xl text-[0.76rem] leading-relaxed text-secondary-300">
              This comparison is factual and general. Compounded medications are not FDA-approved. A licensed
              clinician determines whether a prescribed treatment is appropriate for each patient.
            </p>

            <div className="mt-8">
              <Button to="/assessment" variant="primary" size="lg" iconAfter="ri-arrow-right-line">
                {CTA_SHORT}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}