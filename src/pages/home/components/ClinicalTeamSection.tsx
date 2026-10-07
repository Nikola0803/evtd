import { Link } from 'react-router-dom';
import Container from '@/components/base/Container';
import SectionHeading from '@/components/base/SectionHeading';
import Reveal from '@/components/base/Reveal';
import { clinicians } from '@/mocks/people';

export default function ClinicalTeamSection() {
  return (
    <section className="bg-background-50 py-20 md:py-28">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Clinical team"
            title="Talk with a licensed clinician."
            description="Every prescription decision is made independently by a provider licensed to care for the patient in their state."
          />
          <Link
            to="/clinical-team"
            className="inline-flex items-center gap-2 whitespace-nowrap font-label text-sm font-medium text-primary-700 transition-colors duration-200 hover:text-primary-600"
          >
            See the full clinical network
            <i className="ri-arrow-right-line text-base leading-none" aria-hidden="true"></i>
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {clinicians.map((person, index) => (
            <Reveal key={person.id} delay={index * 55}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-background-200 bg-background-100">
                <div className="relative h-72 w-full overflow-hidden bg-background-300">
                  <img
                    src={person.image}
                    alt={`${person.name}, ${person.credentials}`}
                    title={`${person.credentials} — ${person.specialty}`}
                    className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
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

        <p className="mt-7 max-w-3xl text-[0.78rem] leading-relaxed text-foreground-600">
          Clinician identities are shown as clearly marked placeholders until providers are contracted. EVOLV
          Today never invents medical identities or credentials.
        </p>
      </Container>
    </section>
  );
}