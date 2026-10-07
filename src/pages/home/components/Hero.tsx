import { Link } from 'react-router-dom';
import Container from '@/components/base/Container';
import Button from '@/components/base/Button';
import { heroPanel, heroTracker } from '@/mocks/homeContent';
import { CTA_LABEL, CTA_MICROCOPY } from '@/constants/site';

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-background-50 pb-16 pt-32 md:pb-24 md:pt-40">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-gradient-to-b from-secondary-100/80 to-transparent" aria-hidden="true"></div>

      <Container className="relative z-10">
        {/* centered statement */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-foreground-950/10 bg-background-50 px-3.5 py-1.5 font-label text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-primary-700">
            <i className="ri-shield-check-line text-sm leading-none" aria-hidden="true"></i>
            Physician-guided telehealth
          </span>

          <h1 className="mt-6 font-heading text-[2.5rem] leading-[1.03] tracking-[-0.03em] text-foreground-950 sm:text-[3.4rem] md:text-[4.1rem]">
            Feel better today.
            <br />
            Perform better tomorrow.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-[1rem] leading-relaxed text-foreground-700 md:text-[1.08rem]">
            Physician-guided longevity treatments, prescribed online and delivered directly from licensed US
            pharmacies.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button to="/assessment" variant="primary" size="lg" iconAfter="ri-arrow-right-line">
              {CTA_LABEL}
            </Button>
            <Button to="/treatments" variant="outline" size="lg">
              Browse treatments and pricing
            </Button>
          </div>

          <p className="mt-5 font-label text-[0.72rem] uppercase tracking-[0.1em] text-foreground-600">
            {CTA_MICROCOPY}
          </p>
        </div>

        {/* merchandised storefront cards */}
        <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <article
            data-product-shop
            className="overflow-hidden rounded-3xl bg-foreground-950 lg:col-span-2"
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-5 md:pr-0">
                <div className="relative h-60 w-full overflow-hidden rounded-2xl bg-secondary-100 md:h-full md:min-h-[19rem]">
                  <img
                    src={heroPanel.image}
                    alt={`${heroPanel.name} prescription treatment`}
                    title={`${heroPanel.name} — EVOLV Today`}
                    className="h-full w-full object-cover object-top"
                  />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-primary-500 px-3 py-1 font-label text-[0.62rem] font-bold uppercase tracking-[0.12em] text-background-50">
                    <i className="ri-star-smile-line text-xs leading-none" aria-hidden="true"></i>
                    {heroPanel.eyebrow}
                  </span>
                </div>
              </div>

              <div className="flex flex-col justify-center p-6 md:p-8">
                <h2 className="font-heading text-2xl leading-tight text-background-50">{heroPanel.name}</h2>
                <p className="mt-2 text-[0.86rem] leading-relaxed text-secondary-300">{heroPanel.purpose}</p>

                <p className="mt-5 font-heading text-[2rem] leading-none text-background-50">
                  {heroPanel.priceLabel}
                  <span className="ml-1.5 font-body text-sm font-normal text-secondary-300">
                    {heroPanel.priceSuffix}
                  </span>
                </p>
                <p className="mt-2 text-[0.7rem] uppercase tracking-[0.08em] text-secondary-400">
                  {heroPanel.note}
                </p>

                <div className="mt-5">
                  <Button to={`/assessment?program=${heroPanel.slug}`} variant="primary" size="md" fullWidth>
                    See if I qualify
                  </Button>
                </div>
                <Link
                  to={`/treatments/${heroPanel.slug}`}
                  className="mt-4 inline-flex items-center gap-1.5 whitespace-nowrap font-label text-[0.78rem] font-medium text-secondary-300 transition-colors duration-200 hover:text-background-50"
                >
                  Learn more
                  <i className="ri-arrow-right-line text-sm leading-none" aria-hidden="true"></i>
                </Link>
              </div>
            </div>
          </article>

          <article className="relative flex flex-col overflow-hidden rounded-3xl bg-foreground-900">
            <div className="relative h-56 w-full overflow-hidden md:h-64">
              <img
                src={heroTracker.image}
                alt="Patient checking a health tracking app on a smartphone"
                title="EVOLV Today patient portal tracking"
                className="h-full w-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground-900 via-foreground-900/30 to-transparent"></div>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-background-50/10 px-3 py-1 font-label text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-secondary-200">
                {heroTracker.eyebrow}
              </span>
              <h3 className="mt-4 font-heading text-lg leading-snug text-background-50">
                {heroTracker.title}
              </h3>
              <p className="mt-2 text-[0.82rem] leading-relaxed text-secondary-300">{heroTracker.copy}</p>
            </div>
          </article>
        </div>

        {/* compliance safety line */}
        <div className="mt-6 flex flex-col items-center gap-2 rounded-2xl border border-foreground-950/10 bg-background-100 px-5 py-4 text-center sm:flex-row sm:justify-center sm:gap-3">
          <i className="ri-lock-2-line text-base leading-none text-primary-600" aria-hidden="true"></i>
          <p className="text-[0.82rem] leading-relaxed text-foreground-700">
            A licensed clinician independently decides whether treatment is appropriate. Completing an
            assessment never guarantees a prescription.
          </p>
        </div>
      </Container>
    </section>
  );
}