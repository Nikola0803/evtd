import Reveal from '@/components/base/Reveal';
import { director } from '@/mocks/people';

export default function MedicalDirector() {
  return (
    <section className="bg-foreground-950">
      <Reveal className="mx-auto grid w-full max-w-8xl grid-cols-1 md:grid-cols-2">
        <div className="relative h-80 w-full md:h-auto md:min-h-[30rem]">
          <img
            src={director.image}
            alt={`${director.name}, ${director.credentials}`}
            title="EVOLV Today Medical Director"
            className="h-full w-full object-cover object-top"
          />
          {director.placeholder ? (
            <span className="absolute left-5 top-5 rounded-full bg-background-50/95 px-3 py-1 font-label text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-foreground-700">
              Placeholder profile
            </span>
          ) : null}
        </div>

        <div className="flex flex-col justify-center px-6 py-14 md:px-12 lg:px-16">
          <p className="flex items-center gap-3 font-label text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-primary-300">
            <span className="h-px w-6 bg-primary-400"></span>
            A message from our Medical Director
          </p>
          <h2 className="mt-5 font-heading text-[2.1rem] leading-[1.06] tracking-[-0.02em] text-background-50 md:text-[2.9rem]">
            Clinical decisions belong to clinicians.
          </h2>
          <p className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-secondary-200">
            &ldquo;{director.message}&rdquo;
          </p>
          <div className="mt-8 border-t border-background-50/15 pt-6">
            <p className="font-heading text-base text-background-50">{director.name}</p>
            <p className="mt-1 text-[0.8rem] text-secondary-300">
              {director.credentials} · {director.specialty}
            </p>
          </div>
          <p className="mt-6 max-w-lg text-[0.72rem] leading-relaxed text-secondary-400">
            Medical leadership identities are shown as clearly marked placeholders until providers are
            contracted. EVOLV Today never invents medical identities or credentials.
          </p>
        </div>
      </Reveal>
    </section>
  );
}