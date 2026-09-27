import Image from "next/image";
import Link from "next/link";

type Foundation = {
  number: string;
  title: string;
  copy: string;
};

type FocusEducationPageProps = {
  eyebrow: string;
  title: string;
  accent: string;
  intro: string;
  image: string;
  imageAlt: string;
  foundationsTitle: string;
  foundationsIntro: string;
  foundations: Foundation[];
  peptideTitle: string;
  peptideParagraphs: string[];
  questions: string[];
};

export function FocusEducationPage({
  eyebrow,
  title,
  accent,
  intro,
  image,
  imageAlt,
  foundationsTitle,
  foundationsIntro,
  foundations,
  peptideTitle,
  peptideParagraphs,
  questions,
}: FocusEducationPageProps) {
  return (
    <main className="overflow-hidden bg-[#F6F0E7] text-[#1B1D19]">
      <section className="px-4 py-5 md:px-8 md:py-8">
        <div className="mx-auto grid min-h-[620px] max-w-[1440px] overflow-hidden rounded-[2rem] bg-[#18231E] lg:grid-cols-[.92fr_1.08fr]">
          <div className="flex flex-col justify-center p-8 text-white md:p-14 lg:p-16">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F2A58C]">{eyebrow}</p>
            <h1 className="mt-5 max-w-2xl font-display text-5xl font-semibold leading-[.96] tracking-[-.045em] md:text-7xl">
              {title} <span className="italic text-[#F2A58C]">{accent}</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-white/68 md:text-lg">{intro}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/book" className="rounded-full bg-[#D77E5F] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#C86B4D]">Book a free education call</Link>
              <Link href="/peptides" className="rounded-full border border-white/20 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-white/10">Peptide education</Link>
            </div>
          </div>
          <div className="relative min-h-[390px] lg:min-h-full">
            <Image src={image} alt={imageAlt} fill priority sizes="(max-width: 1024px) 100vw, 54vw" className="object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#18231E]/35 via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#18231E]/20 lg:to-transparent" />
          </div>
        </div>
      </section>

      <section className="px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-[1240px]">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B45C42]">Start with the foundations</p>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.02] tracking-[-.035em] md:text-6xl">{foundationsTitle}</h2>
            </div>
            <p className="max-w-2xl text-sm leading-relaxed text-[#62675F] md:text-base lg:justify-self-end">{foundationsIntro}</p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {foundations.map((item) => (
              <article key={item.number} className="rounded-[1.5rem] bg-white p-6 shadow-[0_16px_45px_rgba(34,31,25,.05)] md:p-7">
                <span className="text-[11px] font-semibold tracking-[0.18em] text-[#D77E5F]">{item.number}</span>
                <h3 className="mt-8 font-display text-2xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#62675F]">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#DDD0BE] px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-[1240px] gap-10 lg:grid-cols-[1.08fr_.92fr] lg:items-start lg:gap-16">
          <div className="rounded-[1.8rem] bg-[#F9F5EE] p-7 md:p-10 lg:p-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B45C42]">Peptides, without the hype</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.02] tracking-[-.035em] md:text-5xl">{peptideTitle}</h2>
            <div className="mt-7 space-y-5 text-sm leading-relaxed text-[#62675F] md:text-base">
              {peptideParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <div className="mt-8 rounded-2xl border border-[#D77E5F]/25 bg-[#F6E3DA] p-5 text-sm leading-relaxed text-[#6F4639]">
              <strong className="block text-[#8D4A38]">Our boundary is clear.</strong>
              EVLV does not sell or prescribe peptides. We do not recommend products, doses, or personal treatment. Personal medical decisions belong with a licensed medical provider.
            </div>
          </div>

          <div className="pt-2 lg:pt-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8D4A38]">A better way to read a claim</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-[-.035em]">Ask what the evidence actually shows.</h2>
            <div className="mt-8 divide-y divide-black/10 border-y border-black/10">
              {questions.map((question, index) => (
                <div key={question} className="flex gap-4 py-5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#D77E5F] text-[10px] font-semibold text-white">{String(index + 1).padStart(2, "0")}</span>
                  <p className="pt-1 text-sm font-medium leading-relaxed">{question}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#18231E] px-4 py-20 text-white md:px-8 md:py-24">
        <div className="mx-auto flex max-w-[1100px] flex-col items-center text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F2A58C]">One clear next step</p>
          <h2 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.02] tracking-[-.035em] md:text-6xl">Bring the questions. We’ll bring context.</h2>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/60 md:text-base">Your first 15-minute phone call is free. It is an educational conversation, not medical care.</p>
          <Link href="/book" className="mt-8 rounded-full bg-[#D77E5F] px-8 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#C86B4D]">Choose a time</Link>
        </div>
      </section>
    </main>
  );
}
