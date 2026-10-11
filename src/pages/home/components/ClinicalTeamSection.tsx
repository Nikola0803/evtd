import Container from '@/components/base/Container';
import SectionHeading from '@/components/base/SectionHeading';
import Reveal from '@/components/base/Reveal';
import { clinicians } from '@/mocks/people';

export default function ClinicalTeamSection() {
  const featured = clinicians.slice(0, 3);

  return (
    <section className="bg-background-100 py-20 md:py-28">
      <Container>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <SectionHeading
            eyebrow="Coming soon"
            title="Physician-guided prescriptions."
            description="We are building a licensed physician network for members who want a full clinical pathway — lab work, prescription peptides and ongoing medical oversight. Education programmes are available now."
          />
          <span className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-accent-300 bg-accent-50 px-4 py-2 font-label text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-accent-700">
            <i className="ri-time-line text-sm leading-none" aria-hidden="true"></i>
            Clinical pathway · In development
          </span>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((person, index) => (
            <Reveal key={person.id} delay={index * 55}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-background-200 bg-background-50">
                {/* coming soon overlay */}
                <div className="absolute inset-0 z-10 flex items-center justify-center rounded-3xl bg-background-50/80 backdrop-blur-[2px]">
                  <span className="rounded-full border border-primary-200 bg-background-50 px-4 py-2 font-label text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-primary-700">
                    Coming soon
                  </span>
                </div>
                <div className="relative h-72 w-full overflow-hidden bg-background-300">
                  <img
                    src={person.image}
                    alt="Placeholder physician portrait"
                    className="h-full w-full object-cover object-top opacity-60"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <h3 className="font-heading text-lg leading-snug text-foreground-950">{person.name}</h3>
                  <p className="mt-1 text-[0.78rem] font-medium text-primary-700">{person.credentials}</p>
                  <p className="mt-2.5 flex-1 text-[0.82rem] leading-relaxed text-foreground-600">
                    {person.specialty}
                  </p>
                  <p className="mt-3 border-t border-background-200 pt-3 font-label text-[0.66rem] uppercase tracking-[0.1em] text-foreground-500">
                    {person.coverage}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-primary-200 bg-primary-50 px-6 py-5">
          <p className="flex items-start gap-3 text-[0.84rem] leading-relaxed text-foreground-700">
            <i className="ri-stethoscope-line mt-0.5 shrink-0 text-base leading-none text-primary-600" aria-hidden="true"></i>
            <span>
              <strong className="font-semibold text-foreground-950">Interested in the clinical pathway?</strong>
              {' '}Join the waitlist and we’ll notify you when physician-guided prescriptions become available
              in your state. In the meantime, start with a free pep talk to explore your wellness goals.
            </span>
          </p>
        </div>

        <p className="mt-5 max-w-3xl text-[0.78rem] leading-relaxed text-foreground-600">
          Clinician identities shown are clearly marked placeholders. EVLV Today never invents medical
          identities or credentials. Real contracted providers will be listed when the clinical network launches.
        </p>
      </Container>
    </section>
  );
}
