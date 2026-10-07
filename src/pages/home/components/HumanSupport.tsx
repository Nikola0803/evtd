import { Link } from 'react-router-dom';
import Reveal from '@/components/base/Reveal';
import { supportTeams, supportImage } from '@/mocks/homeContent';

export default function HumanSupport() {
  return (
    <section className="bg-background-50">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative min-h-[22rem] w-full lg:min-h-[40rem]">
          <img
            src={supportImage}
            alt="A friendly EVOLV support specialist assisting at a bright minimal desk"
            title="EVOLV Today patient support"
            className="h-full w-full object-cover object-top"
          />
          <div className="absolute inset-x-5 bottom-5 max-w-sm rounded-2xl bg-background-50/95 p-5 backdrop-blur-sm md:inset-x-8 md:bottom-8">
            <p className="flex items-center gap-2 font-label text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-primary-700">
              <i className="ri-customer-service-2-line text-sm leading-none" aria-hidden="true"></i>
              EVOLV Support
            </p>
            <p className="mt-2 text-[0.86rem] leading-relaxed text-foreground-700">
              Real people, no account required. We can help with accounts, billing and delivery.
            </p>
          </div>
        </div>

        <div className="flex items-center px-6 py-16 md:px-12 lg:px-16 lg:py-24">
          <div className="w-full max-w-xl">
            <div className="mb-4 flex items-center gap-3 font-label text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-primary-700">
              <span className="h-px w-6 bg-primary-300"></span>
              Human support
            </div>
            <h2 className="font-heading text-[1.85rem] leading-[1.1] tracking-[-0.02em] text-foreground-950 md:text-[2.8rem]">
              Technology makes it convenient. People make it care.
            </h2>
            <p className="mt-5 text-[0.95rem] leading-relaxed text-foreground-700">
              Real people support you throughout the experience. EVOLV Support assists with accounts, billing
              and delivery. Licensed clinicians handle medical questions and treatment decisions.
            </p>

            <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {supportTeams.map((team, index) => (
                <Reveal key={team.title} delay={index * 80}>
                  <div className="h-full rounded-2xl border border-background-200 bg-background-100 p-5 md:p-6">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary-100 text-secondary-800">
                      <i className={`${team.icon} text-base leading-none`} aria-hidden="true"></i>
                    </span>
                    <h3 className="mt-4 font-heading text-lg text-foreground-950">{team.title}</h3>
                    <p className="mt-1.5 text-[0.82rem] leading-relaxed text-foreground-600">{team.copy}</p>
                    <ul className="mt-4 space-y-2">
                      {team.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-[0.82rem] text-foreground-800">
                          <i
                            className="ri-check-line mt-0.5 text-sm leading-none text-primary-600"
                            aria-hidden="true"
                          ></i>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>

            <Link
              to="/how-it-works"
              className="mt-8 inline-flex items-center gap-2 whitespace-nowrap font-label text-sm font-medium text-primary-700 transition-colors duration-200 hover:text-primary-600"
            >
              See how ongoing care works
              <i className="ri-arrow-right-line text-base leading-none" aria-hidden="true"></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}