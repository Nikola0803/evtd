import Container from '@/components/base/Container';
import SectionHeading from '@/components/base/SectionHeading';
import { reviews } from '@/mocks/people';
import { goals } from '@/mocks/goals';

type Card =
  | {
      kind: 'quote';
      id: string;
      name: string;
      program: string;
      duration: string;
      source: string;
      quote: string;
    }
  | { kind: 'photo'; id: string; image: string; title: string; tagline: string };

const cards: Card[] = [
  { kind: 'quote', ...reviews[0] },
  { kind: 'photo', id: goals[0].id, image: goals[0].image, title: goals[0].title, tagline: goals[0].tagline },
  { kind: 'quote', ...reviews[1] },
  { kind: 'quote', ...reviews[2] },
  { kind: 'photo', id: goals[1].id, image: goals[1].image, title: goals[1].title, tagline: goals[1].tagline },
  { kind: 'quote', ...reviews[3] },
  { kind: 'photo', id: goals[2].id, image: goals[2].image, title: goals[2].title, tagline: goals[2].tagline },
  { kind: 'quote', ...reviews[4] },
  { kind: 'quote', ...reviews[5] },
];

export default function SocialProof() {
  return (
    <section className="bg-secondary-50 py-20 md:py-28">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Patient experience"
          title="Care people feel supported by."
          description="Ratings, review counts and results are never invented. Until verified reviews are available, every card below is clearly marked as a placeholder."
        />

        <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {cards.map((card) => {
            if (card.kind === 'photo') {
              return (
                <figure
                  key={`photo-${card.id}`}
                  className="mb-5 break-inside-avoid overflow-hidden rounded-2xl border border-background-200 bg-background-100"
                >
                  <div className="relative h-56 w-full overflow-hidden bg-background-300">
                    <img
                      src={card.image}
                      alt={`${card.title} — ${card.tagline}`}
                      title={`${card.title} patient goal`}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                  <figcaption className="p-5">
                    <p className="font-heading text-base text-foreground-950">{card.title}</p>
                    <p className="mt-1.5 text-[0.82rem] leading-relaxed text-foreground-600">{card.tagline}</p>
                  </figcaption>
                </figure>
              );
            }
            return (
              <figure
                key={`quote-${card.id}`}
                className="mb-5 break-inside-avoid rounded-2xl border border-dashed border-background-300 bg-background-100 p-6"
              >
                <div className="flex items-center gap-2 font-label text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-foreground-500">
                  <i className="ri-time-line text-sm leading-none" aria-hidden="true"></i>
                  Placeholder
                </div>
                <blockquote className="mt-4 text-[0.9rem] leading-relaxed text-foreground-700">
                  {card.quote}
                </blockquote>
                <figcaption className="mt-5 border-t border-background-200 pt-4">
                  <p className="font-heading text-[0.98rem] text-foreground-950">{card.name}</p>
                  <p className="mt-1 text-[0.76rem] text-foreground-600">{card.program}</p>
                  <p className="mt-0.5 text-[0.72rem] text-foreground-500">{card.duration}</p>
                  <p className="mt-2 font-label text-[0.66rem] uppercase tracking-[0.1em] text-foreground-400">
                    {card.source}
                  </p>
                </figcaption>
              </figure>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-background-200 bg-background-100 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-heading text-lg text-foreground-950">Verified review platform</h3>
            <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-foreground-600">
              Approved third-party review integrations will appear here. Reviews will only display a
              verified badge when verification actually exists.
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-dashed border-background-300 px-4 py-2 font-label text-[0.72rem] uppercase tracking-[0.1em] text-foreground-500">
            <i className="ri-add-line text-sm leading-none" aria-hidden="true"></i>
            Integration reserved
          </span>
        </div>
      </Container>
    </section>
  );
}