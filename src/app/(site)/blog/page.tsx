import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getJournalArticles } from "@/lib/journal-data";

export const metadata: Metadata = {
  title: "Wellness Blog",
  description: "Evidence-aware articles on peptide science, hormone health, metabolic wellness, longevity, body composition, performance, and recovery.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "EVLV Wellness Blog",
    description: "Clear wellness education designed to help you ask better questions and make sense of the research.",
    url: "https://evlvtoday.com/blog",
    images: [{ url: "/images/brand/instagram-cartoon-education.png", width: 1200, height: 1200, alt: "EVLV Wellness Blog" }],
  },
};

export default function BlogPage() {
  const [featured, ...articles] = getJournalArticles();

  return (
    <main className="bg-[#FAF2E4] text-[#1B1D19]">
      <section className="px-4 py-6 md:px-8 md:py-10">
        <div className="mx-auto grid max-w-[1400px] overflow-hidden rounded-[2rem] bg-[#18231E] text-white lg:grid-cols-[.9fr_1.1fr]">
          <div className="flex flex-col justify-center p-8 md:p-14 lg:p-16">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#F2A58C]">The EVLV Wellness Blog</p>
            <h1 className="mt-5 max-w-xl font-display text-5xl font-semibold leading-[.96] tracking-[-.04em] md:text-7xl">
              Better questions.<br /><span className="italic text-[#F2A58C]">Clearer context.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/65 md:text-lg">
              Practical, evidence-aware articles that make peptide science, hormone health, metabolism, recovery, and longevity easier to understand.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/55">
              {["Peptides", "Hormones", "Metabolic Health", "Longevity", "Recovery"].map((topic) => (
                <span key={topic} className="rounded-full border border-white/15 px-3 py-2">{topic}</span>
              ))}
            </div>
          </div>
          <div className="relative min-h-[400px] lg:min-h-[650px]">
            <Image src="/images/brand/instagram-cartoon-education.png" alt="EVLV wellness education and research" fill priority sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover object-center" />
          </div>
        </div>
      </section>

      <section className="px-4 py-14 md:px-8 md:py-24">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B45C42]">Featured read</p>
              <h2 className="mt-3 font-display text-4xl font-semibold tracking-[-.035em] md:text-5xl">Start here.</h2>
            </div>
            <p className="hidden max-w-sm text-sm leading-relaxed text-[#62675F] md:block">General education only. Personal medical decisions and lab interpretation belong with a licensed physician.</p>
          </div>

          <Link href={`/blog/${featured.slug}`} className="group grid overflow-hidden rounded-[1.75rem] bg-[#EFE2D0] lg:grid-cols-[1.08fr_.92fr]">
            <div className="relative min-h-[360px] lg:min-h-[540px]">
              <Image src={featured.image} alt={featured.title} fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover object-center transition duration-700 group-hover:scale-[1.025]" />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-12 lg:p-14">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B45C42]">{featured.label}</p>
              <h3 className="mt-4 font-display text-3xl font-semibold leading-tight md:text-5xl">{featured.title}</h3>
              <p className="mt-5 text-sm leading-relaxed text-[#62675F] md:text-base">{featured.excerpt}</p>
              <div className="mt-7 flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1B1D19]/45">
                <span>{featured.readTime}</span><span>·</span><span>Read article</span><i className="ri-arrow-right-line text-base text-[#D77E5F] transition group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      <section className="bg-[#F0E8D5] px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B45C42]">Explore the blog</p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-[-.035em] md:text-5xl">Learn at your own pace.</h2>
          </div>
          <div className="grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Link key={article.slug} href={`/blog/${article.slug}`} className="group">
                <div className="relative aspect-square overflow-hidden rounded-[1.4rem] bg-[#E3D4C0]">
                  <Image src={article.image} alt={article.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover object-center transition duration-700 group-hover:scale-[1.035]" />
                </div>
                <div className="mt-5 flex items-center justify-between gap-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B45C42]">{article.label}</p>
                  <span className="text-[10px] uppercase tracking-[0.12em] text-[#1B1D19]/35">{article.readTime}</span>
                </div>
                <h3 className="mt-2 font-display text-2xl font-semibold leading-snug">{article.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#62675F]">{article.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8D4A38]">Read article <i className="ri-arrow-right-line transition group-hover:translate-x-1" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#D77E5F] px-4 py-16 text-center text-white md:px-8 md:py-20">
        <h2 className="font-display text-3xl font-semibold md:text-4xl">Have questions after reading?</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/80">Bring your goals and questions to a free 15-minute education call. No lab review, diagnosis, or individualized medical plan.</p>
        <Link href="/book" className="mt-7 inline-flex rounded-full bg-[#18231E] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white">Book a Free Call</Link>
      </section>
    </main>
  );
}
