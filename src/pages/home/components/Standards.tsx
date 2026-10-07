import Container from '@/components/base/Container';
import SectionHeading from '@/components/base/SectionHeading';
import Reveal from '@/components/base/Reveal';
import { standards, standardStats } from '@/mocks/homeContent';

export default function Standards() {
  return (
    <section className="bg-secondary-100 py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="Our standards"
          title="Advanced care deserves a higher standard."
          description="EVOLV Today connects you with licensed clinicians and licensed US pharmacy partners through one simple, supported experience."
        />

        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 border-y border-foreground-950/10 py-10 md:py-12 lg:grid-cols-4">
          {standardStats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 55}>
              <p className="font-heading text-[3rem] leading-none tracking-[-0.03em] text-primary-600 md:text-[4rem]">
                {stat.value}
              </p>
              <p className="mt-4 max-w-[16rem] text-[0.85rem] leading-snug text-foreground-700">{stat.label}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {standards.map((item, index) => (
            <Reveal key={item.title} delay={index * 45}>
              <article className="h-full rounded-2xl border border-foreground-950/10 bg-background-50 p-6 md:p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-100 text-primary-700">
                  <i className={`${item.icon} text-lg leading-none`} aria-hidden="true"></i>
                </span>
                <h3 className="mt-5 font-heading text-lg leading-snug text-foreground-950">{item.title}</h3>
                <p className="mt-2.5 text-[0.88rem] leading-relaxed text-foreground-700">{item.copy}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}