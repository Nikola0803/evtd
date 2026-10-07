import { Link } from 'react-router-dom';
import Container from '@/components/base/Container';
import SectionHeading from '@/components/base/SectionHeading';
import Reveal from '@/components/base/Reveal';
import { pathway, pharmacyImage } from '@/mocks/homeContent';

export default function PharmacyQuality() {
  return (
    <section className="bg-background-50 py-20 md:py-28">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Pharmacy and quality"
              title="Prepared for you. Guided by professionals."
              description="Prescriptions are sent directly to licensed US pharmacy partners and prepared for the individual patient. EVOLV Today does not fulfill prescriptions from a research-product warehouse."
            />
            <Link
              to="/pharmacy-standards"
              className="mt-8 inline-flex items-center gap-2 whitespace-nowrap font-label text-sm font-medium text-primary-700 transition-colors duration-200 hover:text-primary-600"
            >
              Learn about our pharmacy standards
              <i className="ri-arrow-right-line text-base leading-none" aria-hidden="true"></i>
            </Link>
          </div>

          <div className="relative h-72 w-full overflow-hidden rounded-2xl bg-background-300 md:h-96">
            <img
              src={pharmacyImage}
              alt="Neutral prescription packaging and glass vials arranged on a stone surface"
              title="Licensed US pharmacy fulfillment standards"
              className="h-full w-full object-cover object-top"
            />
          </div>
        </div>

        <div className="mt-16 rounded-2xl bg-background-50 p-6 md:p-8">
          <h3 className="font-label text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-primary-700">
            Fulfillment pathway
          </h3>
          <ol className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
            {pathway.map((step, index) => (
              <Reveal key={step.label} delay={index * 70}>
                <li className="flex items-start gap-3 lg:flex-col lg:items-start">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary-200 bg-background-50 text-primary-700">
                    <i className={`${step.icon} text-lg leading-none`} aria-hidden="true"></i>
                  </span>
                  <div className="lg:mt-4">
                    <span className="font-label text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-foreground-500">
                      Step {index + 1}
                    </span>
                    <p className="mt-1 font-heading text-[0.98rem] leading-snug text-foreground-950">
                      {step.label}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>

        <p className="mt-6 max-w-3xl text-[0.78rem] leading-relaxed text-foreground-600">
          Compounded medications are not FDA-approved. A licensed clinician determines whether a prescribed
          treatment is appropriate for each patient.
        </p>
      </Container>
    </section>
  );
}