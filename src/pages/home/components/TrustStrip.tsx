import Container from '@/components/base/Container';
import Reveal from '@/components/base/Reveal';
import { trustRow } from '@/mocks/homeContent';

export default function TrustStrip() {
  return (
    <section className="bg-primary-600 text-background-50">
      <Container className="py-12 md:py-16">
        <p className="mx-auto max-w-3xl text-center font-heading text-[1.35rem] leading-[1.28] tracking-[-0.01em] text-background-50 md:text-[1.7rem]">
          Care network licensed across 40+ US states — and every prescription decision belongs to a licensed
          clinician, never a checkout button.
        </p>

        <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-3 lg:grid-cols-5">
          {trustRow.map((item, index) => (
            <li key={item.label}>
              <Reveal delay={index * 55} className="flex flex-col items-center gap-3 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-background-50/15 text-background-50">
                  <i className={`${item.icon} text-xl leading-none`} aria-hidden="true"></i>
                </span>
                <span className="font-label text-[0.78rem] font-medium leading-snug text-background-50/90">
                  {item.label}
                </span>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}